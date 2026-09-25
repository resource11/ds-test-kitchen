/**
 * Sync status: is the code and the Figma library still in sync? One row per
 * component, code and Figma side by side.
 *
 *   npm run sync-status               writes docs/sync-status.md and prints a summary
 *   npm run sync-status -- --summary  prints the summary only (the session hook)
 *
 * Nothing is checked here that validate does not already check. This script
 * runs `validate --json` and lays its findings out per component, next to what
 * each side contains, so a designer can see the whole picture on one page.
 *
 * Code is the source. The Figma side is read from figma/manifest.json, the
 * last snapshot of the library, not from the live file: the overview says
 * when that snapshot was taken, so an old one is visible rather than trusted.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SUMMARY_ONLY = process.argv.includes('--summary');
const FIGMA = 'figma/manifest.json';
const STORYBOOK = 'storybook-static/manifests/components.json';
// Not mirrored to Figma, by decision (see the figma-library-from-code skill's build order).
const NOT_MIRRORED = { Form: 'no visuals of its own', ScrollArea: 'behaviour, not something you draw', ContextMenu: 'the same popup as Menu' };

const findings = JSON.parse(execSync('node scripts/validate.mjs --json', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
const fm = existsSync(FIGMA) ? JSON.parse(readFileSync(FIGMA, 'utf8')) : null;
const sb = existsSync(STORYBOOK) ? Object.values(JSON.parse(readFileSync(STORYBOOK, 'utf8')).components) : [];
const git = (cmd) => { try { return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
// When the Figma side was last read. The check never reaches Figma itself:
// only Claude can, through the Figma Console MCP, by taking a snapshot. So
// every output says when that was, and how to take a new one.
// A snapshot not committed yet is dated by when the file was saved; a
// committed one by its commit (a checkout rewrites the file's time).
const snapshotDirty = git(`git status --porcelain -- ${FIGMA}`) !== '';
const snapshotAt = snapshotDirty
  ? (existsSync(FIGMA) ? statSync(FIGMA).mtime : null)
  : new Date(git(`git log -1 --format=%cI -- ${FIGMA}`) || NaN);
const pad = (n) => String(n).padStart(2, '0');
const stamp = (d) => (d && !isNaN(d) ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}` : 'never');
const ago = (d) => {
  if (!d || isNaN(d)) return '';
  const min = Math.round((Date.now() - d) / 60000);
  return min < 60 ? `${min} min ago` : min < 60 * 48 ? `${Math.round(min / 60)} h ago` : `${Math.round(min / 1440)} days ago`;
};
const snapshotDate = stamp(snapshotAt);
const snapshotNote = snapshotDirty ? `saved ${snapshotDate}, not committed yet` : `committed ${snapshotDate}`;
const HOW_TO_REFRESH = 'To check the live library: open it in Figma, run the Desktop Bridge plugin, ask Claude "take a snapshot of the library", then run npm run sync-status again.';

// Which component a finding belongs to: Figma findings name the Figma item
// first ("Card.Header: …", "Meter has no key"); code findings sit in its folder.
const figmaItems = (fm?.components ?? []).filter((c) => c.source?.startsWith('src/components/'));
const folderOf = (source) => source.split('/')[2];
const itemsByLength = [...figmaItems].sort((a, b) => b.name.length - a.name.length);
const ownerOf = (f) => {
  if (f.file === FIGMA) {
    const item = itemsByLength.find((c) => f.message.startsWith(c.name + ':') || f.message.startsWith(c.name + ' '));
    return item ? folderOf(item.source) : null;
  }
  const m = f.file.match(/^src\/components\/([^/]+)\//);
  return m ? m[1] : null;
};
const byComponent = {};
const systemWide = [];
for (const f of findings) {
  const owner = ownerOf(f);
  if (owner) (byComponent[owner] ??= []).push(f);
  else systemWide.push(f);
}

// What "agree" means, one check per column. Each is a question validate
// already answers; a finding moves that column to ❌ for that component.
const CHECKS = [
  { id: 'keys', label: 'Figma key *', means: 'The Figma manifest has the key needed to find it and place it in another file (see * below the table)' },
  { id: 'both', label: 'Same name', means: 'The Figma component is called what the code calls it (Accordion, Accordion.Item) and points to this code file' },
  { id: 'names', label: 'Same property names', means: 'Every Figma property is a real prop, part or text of the code component' },
  { id: 'options', label: 'Same options', means: 'Every variant option in Figma is an allowed value in code' },
  { id: 'defaults', label: 'Same defaults', means: 'The default Figma variant uses the code defaults' },
  { id: 'rules', label: 'Code follows the rules', means: 'Its CSS uses existing semantic tokens and whole text styles, no raw colours' },
];
const checkOf = (f) => {
  if (f.rule === 'figma-orphan' || f.rule === 'figma-unknown-name') return 'both';
  if (f.rule === 'figma-unknown-prop') return 'names';
  if (f.rule === 'figma-drift' && f.message.includes(' default ')) return 'defaults';
  if (f.rule === 'figma-drift') return 'options';
  if (f.rule === 'figma-keys') return 'keys';
  return 'rules';
};

const components = readdirSync('src/components').filter((d) => statSync(`src/components/${d}`).isDirectory()).sort();
const rows = components.map((name) => {
  const items = figmaItems.filter((c) => folderOf(c.source) === name);
  const figmaProps = [...new Set(items.flatMap((c) => c.props.filter((p) => p.type === 'VARIANT').map((p) => p.name)))];
  const doc = sb.find((d) => d.path?.startsWith(`./src/components/${name}/`))?.reactDocgen?.props ?? {};
  const codeProps = Object.keys(doc);
  const issues = byComponent[name] ?? [];
  const notMirrored = NOT_MIRRORED[name] && !items.length;
  const checks = Object.fromEntries(CHECKS.map(({ id }) => {
    if (notMirrored) return [id, id === 'rules' ? !issues.length : null];
    if (!items.length) return [id, id === 'rules' ? !issues.some((f) => checkOf(f) === 'rules') : false];
    if (id === 'keys' && !items.every((c) => fm.keys?.components?.[c.name]?.key)) return [id, false];
    return [id, !issues.some((f) => checkOf(f) === id)];
  }));
  const status = notMirrored ? 'not mirrored' : !items.length ? 'missing in Figma' : issues.length ? 'drift' : 'match';
  return { name, figma: items.filter((c) => !c.name.startsWith('icon/')).map((c) => c.name), figmaProps, codeProps, checks, issues: issues.map((f) => ({ check: checkOf(f), message: f.message, rule: f.rule })), status, why: notMirrored ? NOT_MIRRORED[name] : null };
});

const count = (s) => rows.filter((r) => r.status === s).length;
const drift = rows.filter((r) => r.status === 'drift' || r.status === 'missing in Figma');
const tokenCount = fm ? Object.values(fm.variables).reduce((n, c) => n + c.names.length, 0) : 0;
const summary = [
  `Sync status: ${count('match')} of ${rows.length - count('not mirrored')} mirrored components match` +
    (drift.length ? `, ${drift.length} need attention: ${drift.map((r) => `${r.name} (${r.issues[0]?.message ?? r.status})`).join('; ')}` : '') +
    (systemWide.length ? `. ${systemWide.length} system-wide finding(s): ${[...new Set(systemWide.map((f) => f.rule))].join(', ')}` : '') + '.',
  `Figma side: the snapshot ${snapshotNote} (${ago(snapshotAt)}), not the live file. A new snapshot identical to it keeps this time.` +
    (fm?.keys ? ` Key map: ${Object.keys(fm.keys.components).length} components, ${Object.keys(fm.keys.textStyles).length} text styles, ${Object.keys(fm.keys.variables).length} variables.` : ' No key map yet.'),
  sb.length ? '' : 'Storybook manifest not built: code props are not listed (npm run build-storybook).',
  HOW_TO_REFRESH,
].filter(Boolean);


// Badges for the Markdown page. Markdown cannot use the Badge component, so
// each one is drawn as a small SVG in the Badge's own tokens (light theme),
// resolved from the generated CSS. Change a token and they follow.
const cssVars = new Map();
for (const f of ['src/tokens/primitives.css', 'src/tokens/semantic.css']) {
  for (const m of readFileSync(f, 'utf8').matchAll(/(--sds-[\w-]+)\s*:\s*([^;]+);/g)) if (!cssVars.has(m[1])) cssVars.set(m[1], m[2].trim());
}
const token = (name) => { let v = cssVars.get(name); while (v?.startsWith('var(')) v = cssVars.get(v.slice(4, -1)); return v; };
const px = (v) => (v.endsWith('rem') ? parseFloat(v) * 16 : parseFloat(v));
const BADGE = Object.fromEntries(['success', 'danger', 'neutral'].map((variant) => {
  const bg = variant === 'neutral' ? 'background-sunken' : `background-${variant}-subtle`;
  const fg = variant === 'neutral' ? 'content-muted' : `content-${variant}`;
  const bd = variant === 'neutral' ? 'border-default' : `border-${variant}`;
  return [variant, { bg: token(`--sds-color-${bg}`), fg: token(`--sds-color-${fg}`), bd: token(`--sds-color-${bd}`) }];
}));
const escapeXml = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function badgeSvg(text, variant, size) {
  const { bg, fg, bd } = BADGE[variant];
  const type = size === 'sm' ? 'label-sm' : 'label-md';
  const fontSize = px(token(`--sds-typography-${type}-font-size`));
  const padX = px(token(size === 'sm' ? '--sds-space-2' : '--sds-space-3'));
  const h = size === 'sm' ? 20 : 24;
  const w = Math.ceil(text.length * fontSize * 0.56 + padX * 2); // no font metrics in Node: an estimate
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeXml(text)}">` +
    `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${(h - 1) / 2}" fill="${bg}" stroke="${bd}"/>` +
    `<text x="${w / 2}" y="${h / 2}" dominant-baseline="central" text-anchor="middle" fill="${fg}" font-family="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="${token(`--sds-typography-${type}-font-weight`)}">${escapeXml(text)}</text></svg>\n`;
}

if (!SUMMARY_ONLY) {
  mkdirSync('docs/sync-status', { recursive: true });
  rmSync('docs/sync-status/summary-attention.svg', { force: true }); // redrawn below only when needed
  const badge = (file, text, variant, size = 'sm') => {
    writeFileSync(`docs/sync-status/${file}.svg`, badgeSvg(text, variant, size));
    return `![${text}](sync-status/${file}.svg)`;
  };
  const AGREE = badge('agree', '✓ agree', 'success');
  const DIFFERS = badge('differs', '✗ differs', 'danger');
  const NOT_MIRRORED_BADGE = badge('not-mirrored', 'not mirrored', 'neutral');
  const mark = (v) => (v === null ? NOT_MIRRORED_BADGE : v ? AGREE : DIFFERS);
  const summaryBadges = [
    badge('summary-agree', `${count('match')} of ${rows.length - count('not mirrored')} mirrored components agree`, drift.length ? 'danger' : 'success', 'md'),
    drift.length ? badge('summary-attention', `${drift.length} need attention`, 'danger', 'md') : null,
    badge('summary-not-mirrored', `${count('not mirrored')} not mirrored, by decision`, 'neutral', 'md'),
    badge('summary-snapshot', `Figma snapshot of ${snapshotDate}`, 'neutral', 'md'),
  ].filter(Boolean).join(' ');
  const md = [
    '# Sync status: code and Figma',
    '',
    '<!-- Generated by `npm run sync-status`. Do not edit: change the code or the Figma library, then run it again. -->',
    '',
    'Every component, in code and in the Figma library, side by side. **Code is the source**: when the two disagree, Figma is updated (with the `figma-library-from-code` skill), never the other way round.',
    '',
    `- **Figma side:** the snapshot **${snapshotNote}**, read from \`figma/manifest.json\`, not the live file. This check cannot reach Figma; only Claude can, through the Figma Console MCP. ${HOW_TO_REFRESH}`,
    `- **Checks:** everything below comes from \`npm run validate\`. ${findings.length ? `${findings.length} finding(s) in total.` : 'No findings.'}`,
    `- **Tokens:** ${tokenCount} Figma variables, ${fm?.textStyles.length ?? 0} text styles, ${fm?.effectStyles.length ?? 0} effect styles.`,
    '',
    summaryBadges,
    '',
    `**How to read it:** every column is one thing code and Figma must agree on. ${AGREE} they agree · ${DIFFERS} they do not, the reason is under *Needs attention* · ${NOT_MIRRORED_BADGE} not mirrored to Figma, by decision.`,
    '',
    ...CHECKS.map((c) => `- **${c.label}:** ${c.means}.`),
    '',
    // GitHub squeezes the narrowest column and scales its badge images down;
    // a header that cannot wrap keeps every column at least a badge wide.
    `| Component | ${CHECKS.map((c) => c.label.replace(/ /g, '&nbsp;')).join(' | ')} | In Figma |`,
    `| --- | ${CHECKS.map(() => ':---:').join(' | ')} | --- |`,
    ...rows.map((r) => `| **${r.name}** | ${CHECKS.map((c) => mark(r.checks[c.id])).join(' | ')} | ${r.figma.length ? r.figma.join(', ') : r.why ?? '–'} |`),
    '',
    '\\* **Why the Figma key matters.** A name says *which* component to use; Figma only places a library component by its key. With every key saved in `figma/manifest.json`, Claude builds a Figma screen by looking keys up instead of searching the whole library. On the booking flow (2026-09-23) the search alone was about 59,000 characters, more than building all four screens (about 25,000); with the key map, the whole job is roughly a third. Using library instances instead of drawing components also keeps the screen linked to the system, so it cannot drift.',
    '',
    '## Needs attention',
    '',
    ...(drift.length ? drift.flatMap((r) => [`**${r.name}**`, ...(r.issues.length ? r.issues.map((f) => `- ${CHECKS.find((c) => c.id === f.check).label}: ${f.message} (\`${f.rule}\`)`) : ['- No Figma component yet.']), '']) : ['Nothing. Code and Figma agree.', '']),
    '## System-wide',
    '',
    ...(systemWide.length ? systemWide.map((f) => `- ${f.message} (\`${f.rule}\`, ${f.file})`) : ['No findings outside single components.']),
    '',
    '## What this page does not check',
    '',
    '- **The look.** Names, props, options, defaults and keys are compared: the API. Auto layout, paddings, colours and radii inside a Figma component are not, so changing them does not turn anything red. The `figma-library-from-code` audit checks that they are bound to *a* variable (not the right one), and comparing screenshots finds the rest (the Accordion panel padding, 2026-09-23).',
    '- **The live Figma file.** Only its last snapshot.',
    '- **Known differences.** Where Figma cannot match the code on purpose, `figma/GAPS.md` explains why.',
    '',
    '## Not yet (parked)',
    '',
    '- **A "Same look" column.** Compare what each Figma layer is bound to (padding, gap, radius, colour, text style, shadow) with what the CSS says, matching `.header` to `Card.Header` and `size=md` to `.md`. Tested on Card, Button and Accordion: all three match. Known differences (Card body padding) would carry a mark on the Figma layer, with `figma/GAPS.md` as the explanation. Parked until the prototype skill is done; the first full run needs decisions on what is drift and what is a known gap.',
    '',
  ].join('\n');
  writeFileSync('docs/sync-status.md', md);
  // The same, as data, for the Sync status page in Storybook (src/SyncStatus.mdx).
  writeFileSync('docs/sync-status.json', JSON.stringify({
    snapshotDate: snapshotNote, howToRefresh: HOW_TO_REFRESH, findings: findings.length, checks: CHECKS, rows,
    systemWide: systemWide.map((f) => ({ message: f.message, rule: f.rule, file: f.file })),
    tokens: { variables: tokenCount, textStyles: fm?.textStyles.length ?? 0, effectStyles: fm?.effectStyles.length ?? 0 },
  }, null, 2) + '\n');
}
console.log(summary.join('\n'));
