/**
 * Checks generated and hand-written UI against the rules in CLAUDE.md.
 *
 * Warn-only by default: it reports and exits 0, so it never blocks a designer
 * mid-prototype. Pass --strict to exit 1, which is what CI would use.
 *
 *   npm run validate
 *   npm run validate -- --strict
 *
 * The point is not to be clever. Every rule here is one an agent has already
 * been told in CLAUDE.md, restated somewhere that actually checks.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

const STRICT = process.argv.includes('--strict');
const findings = [];
const report = (file, line, rule, message) => findings.push({ file, line, rule, message });

// `.storybook` and `base.css` too: both reference tokens outside any component,
// and a renamed token there silently un-themes every page and every story.
const files = execSync(
  "find src .storybook -type f \\( -name '*.module.css' -o -name '*.tsx' -o -name 'base.css' \\) -not -path '*/node_modules/*'",
  { encoding: 'utf8' },
).trim().split('\n').filter(Boolean);

// ---------------------------------------------------------------- token names
const TOKENS_CSS = ['src/tokens/primitives.css', 'src/tokens/semantic.css'];
const defined = new Set();
for (const f of TOKENS_CSS) {
  if (!existsSync(f)) continue;
  for (const m of readFileSync(f, 'utf8').matchAll(/^\s*(--sds-[\w-]+)\s*:/gm)) defined.add(m[1]);
}

/**
 * Tier-1 tokens are plumbing for tier 2. A component using one has reached past
 * the semantic layer, which is what breaks theming.
 *
 * Deliberately narrow: only where a semantic replacement actually exists. The
 * raw type scale is tier 1 too, but it has its own rule below
 * (raw-type-in-component): components now take their type from text styles,
 * so size, line height and letter spacing are checked there instead.
 */
const isPrimitive = (t) =>
  /^--sds-color-(neutral-(white|\d+)|brand-[a-z]+-\d+|utility-[a-z]+-\d+)$/.test(t) ||
  /^--sds-shadow-/.test(t);

for (const file of files) {
  if (/^src\/tokens\/(primitives|semantic|\.semantic\.[\w-]+)\.css$/.test(file)) continue; // generated
  const isFoundation = file.startsWith('src/foundations/'); // documents primitives on purpose
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  let surfaceAllowed = false;
  let typeAllowed = false;

  lines.forEach((line, i) => {
    const n = i + 1;

    // 1. every token referenced must exist
    for (const m of line.matchAll(/var\((--sds-[\w-]+)\)/g)) {
      if (!defined.has(m[1])) report(file, n, 'unknown-token', `${m[1]} is not defined in the token layer`);
    }

    // 2. components may not reach past the semantic layer
    if (!isFoundation) {
      for (const m of line.matchAll(/var\((--sds-[\w-]+)\)/g)) {
        if (isPrimitive(m[1])) {
          report(file, n, 'primitive-in-component',
            `${m[1]} is a tier-1 token; use a semantic one (e.g. --sds-elevation-* instead of --sds-shadow-*)`);
        }
      }
    }

    // 3. no raw colour where a token exists.
    //    Only in stylesheets, and only in the value half of a declaration —
    //    `'Build #482'` and `href="#ada"` are not colours, and matching them
    //    is how this rule loses its credibility.
    if (!isFoundation && file.endsWith('.module.css')) {
      const decl = line.replace(/\/\*.*?\*\//g, '').match(/^\s*[a-z-]+\s*:\s*(.+?);/);
      const value = decl?.[1];
      if (value && !/url\(|data:/.test(value)) {
        if (/#[0-9a-fA-F]{3,8}\b/.test(value)) {
          report(file, n, 'raw-colour', 'hard-coded hex — use a --sds-color-* token');
        }
        if (/\b(rgb|rgba|hsl|hsla)\(/.test(value) && !/var\(--sds-/.test(value)) {
          report(file, n, 'raw-colour', 'hard-coded colour function — use a --sds-color-* token');
        }
      }
    }

    // 5. component type comes from a text style, never the raw scale.
    //    One text style is one decision shared by code, the Figma text style
    //    and the type ramp. Setting size or line height by hand is how a label
    //    quietly becomes 14/1.5 in one component and 14/1.2 in the next.
    //    Weight stays allowed on its own: bolding a word inside inherited text
    //    is emphasis, not a new style. A rule that genuinely is not type (or
    //    is an open decision) opts out with `/* validate-allow: type — why */`
    //    as its first line, like the surface rule below.
    if (file.startsWith('src/components/') && file.endsWith('.module.css')) {
      if (line.includes('{')) typeAllowed = false;
      if (line.includes('validate-allow: type')) typeAllowed = true;
      for (const m of typeAllowed ? [] : line.matchAll(/var\((--sds-(?:font-size|line-height|letter-spacing)-[\w-]+)\)/g)) {
        report(file, n, 'raw-type-in-component',
          `${m[1]} — use a text style (--sds-typography-<style>-*), so code and the Figma text styles stay one decision`);
      }
    }

    // 4. page CSS lays components out; it does not draw its own surfaces.
    //    A pattern or prototype that paints a background, border, shadow or
    //    radius is usually rebuilding a component (Card, Separator) out of
    //    divs — the drift a designer cannot see in the browser, because a real
    //    Card and a hand-rolled one render the same. Known gaps opt out with
    //    `/* validate-allow: surface — why */` as the first line of the rule,
    //    so the reason sits next to the exception instead of in someone's head.
    if (file.startsWith('src/patterns/') && file.endsWith('.module.css')) {
      if (line.includes('{')) surfaceAllowed = false;
      if (line.includes('validate-allow: surface')) surfaceAllowed = true;
      const decl = line
        .replace(/\/\*.*?\*\//g, '')
        .match(/^\s*(background(?:-color)?|border(?:-(?:top|right|bottom|left|color|radius))?|box-shadow)\s*:\s*(.+?);/);
      if (decl && !surfaceAllowed && !/^(none|0|transparent)$/.test(decl[2].trim())) {
        report(file, n, 'surface-in-page',
          `${decl[1]} — page CSS should only lay components out. Use a component (Card, Separator, …) or mark a known gap with /* validate-allow: surface — reason */`);
      }
    }
  });
}

// ------------------------------------------------ text styles travel together
// Eddie applies a text style as one unit (a SCSS mixin), so its properties
// cannot come apart. Without SCSS the unit is six declarations; this checks
// they stay six, all from the same style — a rule that takes label-md's size
// but someone's hand-picked line height is a new, unnamed style.
const TEXT_STYLE_PROPS = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'text-transform'];
for (const file of files.filter((f) => f.startsWith('src/components/') && f.endsWith('.module.css'))) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const used = [...m[2].matchAll(/([a-z-]+)\s*:\s*var\(--sds-typography-([a-z0-9-]+?)-(font-family|font-size|font-weight|line-height|letter-spacing|text-transform)\)/g)];
    if (!used.length) continue;
    const selector = m[1].replace(/\/\*[\s\S]*?\*\//g, '').trim().replace(/\s+/g, ' ');
    const line = src.slice(0, m.index + m[1].length).split('\n').length;
    const styleNames = [...new Set(used.map((u) => u[2]))];
    if (styleNames.length > 1) {
      report(file, line, 'text-style-split', `${selector} mixes text styles: ${styleNames.join(', ')}`);
    }
    const missing = TEXT_STYLE_PROPS.filter((p) => !used.some((u) => u[1] === p));
    if (missing.length) {
      report(file, line, 'text-style-split',
        `${selector} takes ${styleNames[0]} but not its ${missing.join(', ')} — a text style is applied whole`);
    }
  }
}

// ------------------------------------------------------ token names in docs
// Prose names tokens without `var()`. A renamed token left in a doc teaches the
// next reader — and the next agent — a name that no longer exists, which is how
// `--sds-color-focus-ring` survived the colour rename. Wildcards and patterns
// (`--sds-space-*`, `--sds-typography-<style>-*`) are skipped: the character
// after the name is `-`.
const DOCS = [
  'CLAUDE.md', 'CONTRIBUTING.md', 'README.md',
  ...execSync("find docs src -name '*.md' -o -name '*.mdx'", { encoding: 'utf8' }).trim().split('\n'),
].filter((f) => f && existsSync(f));
for (const file of DOCS) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/--sds-[a-z0-9]+(?:-[a-z0-9]+)*/g)) {
      if (line[m.index + m[0].length] === '-') continue;
      if (!defined.has(m[0])) report(file, i + 1, 'unknown-token-in-docs', `${m[0]} is not defined in the token layer`);
    }
  });
}

// ------------------------------------------------- components exist as claimed
const MANIFEST = 'storybook-static/manifests/components.json';
if (existsSync(MANIFEST)) {
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const broken = Object.values(manifest.components).filter(
    // Foundations, patterns and prototypes are compositions, not components.
    (c) => c.error && !/^(foundations|patterns|prototypes)-/.test(c.id),
  );
  for (const c of broken) {
    report(c.path ?? MANIFEST, 0, 'manifest-gap',
      `${c.id} has no resolvable component, so agents cannot ground against it`);
  }
} else {
  console.error(`note: ${MANIFEST} not found — run \`npm run build-storybook\` to check manifest coverage\n`);
}

// --------------------------------------------- the Figma library mirrors the code
// figma/manifest.json records what the Figma library contains. It is written by
// scripts/figma/snapshot.figma.js through the Figma MCP, and checked here
// against the tokens and the components, so a Figma name that drifts from its
// token or its prop fails CI like any other rule. This is the contract a frame
// coming back from Figma resolves through. Values are not compared here: the
// figma-library-from-code skill's token sync does that against the live file.
const FIGMA_MANIFEST = 'figma/manifest.json';
if (existsSync(FIGMA_MANIFEST)) {
  const F = FIGMA_MANIFEST;
  const fm = JSON.parse(readFileSync(F, 'utf8'));
  const { buildPayload } = await import('./figma/tokens-to-figma.mjs');
  const expected = buildPayload();

  // Variables: every token has one, in the right collection, and nothing in
  // Figma is unaccounted for.
  const figmaVars = new Map(Object.entries(fm.variables).flatMap(([coll, { names }]) => names.map((n) => [n, coll])));
  const expectedVars = new Map(expected.variables.map((v) => [v.name, v]));
  for (const [name, v] of expectedVars) {
    if (!figmaVars.has(name)) report(F, 0, 'figma-missing', `${name} — a token with no Figma variable (${v.collection})`);
    else if (figmaVars.get(name) !== v.collection) report(F, 0, 'figma-drift', `${name} is in ${figmaVars.get(name)}, expected ${v.collection}`);
  }
  for (const name of figmaVars.keys()) {
    if (!expectedVars.has(name)) report(F, 0, 'figma-drift', `${name} exists in Figma but no token produces it`);
  }

  // Code syntax: exactly the CSS variable the token generates, and it exists.
  for (const [name, v] of expectedVars) {
    if (!figmaVars.has(name)) continue;
    const actual = name in fm.codeSyntaxExceptions ? fm.codeSyntaxExceptions[name] : `var(--sds-${name.replace(/\//g, '-')})`;
    if (actual !== v.web) report(F, 0, 'figma-code-syntax', `${name} points at ${actual}, expected ${v.web}`);
    else if (v.web && !defined.has(v.web.slice(4, -1))) report(F, 0, 'figma-code-syntax', `${name} → ${v.web} is not defined in the token layer`);
  }

  // Styles
  const figmaText = new Map(fm.textStyles.map((s) => [s.name, s]));
  for (const s of expected.textStyles) {
    const f = figmaText.get(s.name);
    if (!f) { report(F, 0, 'figma-missing', `${s.name} — a text style with no Figma text style`); continue; }
    if (f.textCase !== s.textCase) report(F, 0, 'figma-drift', `${s.name} has case ${f.textCase}, the token says ${s.textCase}`);
    const unbound = Object.keys(s.bind).filter((field) => !f.bound.includes(field));
    if (unbound.length) report(F, 0, 'figma-unbound', `${s.name} does not bind ${unbound.join(', ')} to its typography/* variables`);
  }
  for (const name of figmaText.keys()) {
    if (!expected.textStyles.some((s) => s.name === name)) report(F, 0, 'figma-drift', `text style ${name} exists in Figma but not in tokens/tier-2-usage/text-style.json`);
  }
  for (const s of expected.effectStyles) {
    if (!fm.effectStyles.includes(s.name)) report(F, 0, 'figma-missing', `${s.name} — an elevation token with no effect style`);
  }

  // Icons: every drawing the code has exists in Figma, and every Figma icon is
  // still drawn somewhere. scripts/figma/icons.mjs names them by shape.
  const { buildIcons } = await import('./figma/icons.mjs');
  const { icons } = buildIcons();
  const figmaIcons = new Set(fm.components.filter((c) => c.name.startsWith('icon/')).map((c) => c.name));
  for (const icon of icons) {
    if (!figmaIcons.has(icon.name)) report(F, 0, 'figma-missing', `${icon.name} — drawn in ${icon.source}, with no Figma icon`);
  }
  for (const name of figmaIcons) {
    if (!icons.some((i) => i.name === name)) report(F, 0, 'figma-drift', `${name} exists in Figma but no component or story draws it`);
  }

  // Components: every property is a real prop, part or content of the code
  // component — or of the Base UI part it wraps. Values and defaults are checked
  // against the Storybook manifest when it has been built (locally; CI validates
  // before building Storybook).
  const docgen = existsSync(MANIFEST) ? Object.values(JSON.parse(readFileSync(MANIFEST, 'utf8')).components) : [];
  const kebab = (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  // The Base UI parts a component wraps: the one it is named after, plus every
  // one its source imports (IconButton wraps Base UI's Button).
  const baseUiTypes = (component, src) => {
    const parts = new Set([kebab(component), ...[...src.matchAll(/from '@base-ui\/react\/([\w-]+)'/g)].map((m) => m[1])]);
    return [...parts].map((part) => `node_modules/@base-ui/react/${part}`).filter((dir) => existsSync(dir))
      .flatMap((dir) => readdirSync(dir, { recursive: true }).filter((f) => String(f).endsWith('.d.ts')).map((f) => readFileSync(`${dir}/${f}`, 'utf8')))
      .join('\n');
  };
  const unquote = (v) => String(v).replace(/^'|'$/g, '');
  for (const c of fm.components) {
    if (!c.source || !existsSync(c.source)) {
      report(F, 0, 'figma-orphan', `${c.name} — its description names no existing source file ("Contract — src/components/…")`);
      continue;
    }
    const component = c.source.split('/').at(-2);
    const src = readFileSync(c.source, 'utf8');
    const baseUi = baseUiTypes(component, src);
    const parts = new Set([...src.matchAll(/^(?:export )?function (\w+)\(/gm)].map((m) => m[1]));
    // The name itself: what a Figma screen hands back to code. `Accordion` or
    // `RadioGroupItem` must be exported by the source, and `.Item` must be a
    // part of it. A renamed component (Accordion1) no longer resolves.
    if (!c.name.startsWith('icon/')) {
      const [base, part] = c.name.split('.');
      if (!new RegExp(`export (?:function|const) ${base}\\b`).test(src)) {
        report(F, 0, 'figma-unknown-name', `${c.name}: "${base}" is not a component exported by ${c.source}, so a screen using it cannot come back into code`);
      } else if (part && !new RegExp(`\\b${part}\\b`).test(src)) {
        report(F, 0, 'figma-unknown-name', `${c.name}: "${part}" is not a part of ${base} in ${c.source}`);
      }
    }
    const isProp = (p) => new RegExp(`\\b${p}\\??\\s*:`).test(src) || new RegExp(`\\b${p}\\??\\s*:`).test(baseUi);
    const capitalised = (s) => s[0].toUpperCase() + s.slice(1);
    // HTML attributes a component forwards to its element, inherited by its types
    // rather than declared: a field's placeholder, a header cell's scope
    const HTML_ATTRS = new Set(['placeholder', 'scope']);
    const doc = docgen.find((d) => d.reactDocgen?.displayName === component)?.reactDocgen?.props ?? {};
    for (const p of c.props) {
      if (p.type === 'BOOLEAN' && p.name.includes('.')) {
        // A part the component defines (Card.Header), or a Base UI part it
        // renders for an optional prop, by Base UI's name: Checkbox's description
        // → <Field.Description>, Progress's label → <BaseProgress.Label>.
        const renders = new RegExp(`<(?:Base)?${p.name.replace('.', '\\.')}[\\s>/]`).test(src);
        if (!parts.has(p.name.split('.').pop()) && !renders) report(F, 0, 'figma-unknown-prop', `${c.name}: ${p.name} is not a part of ${component}`);
      } else if (p.type === 'TEXT') {
        // aria-* attributes pass through to every component's element (an icon-only Toggle's aria-label)
        // …or the part it fills, defined here (title → Card.Title) or rendered by Base UI's name (action → <BaseToast.Action>)
        const fillsPart = parts.has(capitalised(p.name)) || new RegExp(`<Base${component}\\.${capitalised(p.name)}[\\s>/]`).test(src);
        if (!(p.name === 'children' || p.name.startsWith('aria-') || HTML_ATTRS.has(p.name) || isProp(p.name) || fillsPart)) {
          report(F, 0, 'figma-unknown-prop', `${c.name}: text property "${p.name}" is not children, a prop or a part of ${component}`);
        }
      } else if (p.name !== 'children' && !HTML_ATTRS.has(p.name) && !isProp(p.name)) { // children: an icon swap (IconButton, Toggle)
        report(F, 0, 'figma-unknown-prop', `${c.name}: "${p.name}" is not a prop of ${component} or of the Base UI part it wraps`);
      } else if (p.type === 'VARIANT' && doc[p.name]?.tsType?.name === 'union') {
        const allowed = doc[p.name].tsType.elements.map((e) => unquote(e.value));
        const extra = p.values.filter((v) => !allowed.includes(v));
        if (extra.length) report(F, 0, 'figma-drift', `${c.name}: ${p.name}=${extra.join('|')} is not a value of ${component}.${p.name} (${allowed.join(' | ')})`);
        const codeDefault = doc[p.name].defaultValue?.value;
        if (codeDefault && p.default !== unquote(codeDefault)) {
          report(F, 0, 'figma-drift', `${c.name}: default ${p.name}=${p.default}, but the code default is ${unquote(codeDefault)} — put it top-left`);
        }
      }
    }
  }

  // Keys: the key map an agent places library items by. Every component,
  // variant, text style, effect style and variable the manifest names has one,
  // so building a screen is a lookup, not a search through the library.
  if (!fm.keys) {
    report(F, 0, 'figma-keys', 'no key map — run scripts/figma/snapshot.figma.js on the library to add one');
  } else {
    for (const c of fm.components) {
      const k = fm.keys.components?.[c.name];
      if (!k?.key) report(F, 0, 'figma-keys', `${c.name} has no key`);
      else if (c.kind === 'set' && Object.keys(k.variants ?? {}).length !== c.variants) report(F, 0, 'figma-keys', `${c.name}: ${Object.keys(k.variants ?? {}).length} variant keys for ${c.variants} variants`);
    }
    for (const s of fm.textStyles) if (!fm.keys.textStyles?.[s.name]) report(F, 0, 'figma-keys', `text style ${s.name} has no key`);
    for (const s of fm.effectStyles) if (!fm.keys.effectStyles?.[s]) report(F, 0, 'figma-keys', `effect style ${s} has no key`);
    for (const n of figmaVars.keys()) if (!fm.keys.variables?.[n]) report(F, 0, 'figma-keys', `variable ${n} has no key`);
  }
}

// ------------------------------------------------------------------- report
// --json: the findings as data, for scripts/sync-status.mjs. Never fails.
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(findings));
  process.exit(0);
}
const byRule = findings.reduce((a, f) => ((a[f.rule] ??= []).push(f), a), {});
if (!findings.length) {
  console.log('validate: no findings.');
  process.exit(0);
}
for (const [rule, list] of Object.entries(byRule)) {
  console.log(`\n${rule}  (${list.length})`);
  for (const f of list.slice(0, 20)) console.log(`  ${f.file}:${f.line}  ${f.message}`);
  if (list.length > 20) console.log(`  ... and ${list.length - 20} more`);
}
console.log(`\n${findings.length} finding(s).`);
if (STRICT) {
  console.log('--strict: failing.');
  process.exit(1);
}
console.log('warn-only: not failing. Pass --strict to make these block.');
