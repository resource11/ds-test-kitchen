/**
 * Recomputes the WCAG contrast ratios behind Station 3 of the 2026-09-10
 * inspection, straight from the token JSON (not the generated CSS).
 *
 *   node ds-inspection/checks/contrast-pairs.mjs
 *
 * Exits 1 if any pair fails, so it can be wired into CI or validate.mjs as-is.
 * Pairs are the ones components actually paint; extend the list when a new
 * foreground/background combination ships.
 */
import { readFileSync } from 'node:fs';

// ds-inspection/ sits in the course workspace, next to the repo.
const read = (p) =>
  JSON.parse(readFileSync(new URL(`../../tokens/${p}`, import.meta.url)));
const ramps = read('tier-1-definitions/color.json').color;

const resolve = (v) => {
  const m = /^\{color\.([a-z]+)\.(\d+)\}$/.exec(v);
  return m ? ramps[m[1]][m[2]].$value : v;
};
const lum = (hex) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum, where it is painted]
const PAIRS = [
  ['content.default', 'background.default', 4.5, 'body text'],
  ['content.default', 'background.surface', 4.5, 'text on cards, inputs, popups'],
  ['content.muted', 'background.surface', 4.5, 'descriptions, placeholders'],
  ['content.muted', 'background.success-subtle', 4.5, 'Alert body (success)'],
  ['content.muted', 'background.warning-subtle', 4.5, 'Alert body (warning)'],
  ['content.muted', 'background.danger-subtle', 4.5, 'Alert body (danger)'],
  ['content.accent', 'background.surface', 4.5, 'ghost Button, active Tab'],
  ['content.accent', 'background.accent-subtle', 4.5, 'Badge accent'],
  ['content.success', 'background.success-subtle', 4.5, 'Badge success'],
  ['content.warning', 'background.warning-subtle', 4.5, 'Badge warning'],
  ['content.danger', 'background.danger-subtle', 4.5, 'Badge danger'],
  ['content.on-accent', 'background.accent', 4.5, 'primary Button'],
  ['content.on-accent', 'background.accent-hover', 4.5, 'primary Button :hover'],
  ['content.on-danger', 'background.danger', 4.5, 'danger Button'],
  ['content.on-danger', 'background.danger-hover', 4.5, 'danger Button :hover'],
  ['border.default', 'background.surface', 3, 'TextField/Select/Textarea boundary (1.4.11)'],
  ['border.strong', 'background.surface', 3, 'Checkbox box, Switch off-track (1.4.11)'],
  ['border.focus', 'background.surface', 3, 'focus ring'],
];

let failed = 0;
for (const mode of ['light', 'dark']) {
  const s = read(`tier-2-usage/semantic.${mode}.json`).color;
  const get = (path) => {
    const [group, name] = path.split('.');
    return resolve(s[group][name].$value);
  };
  console.log(`\n${mode}`);
  for (const [fg, bg, min, where] of PAIRS) {
    const r = ratio(get(fg), get(bg));
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`  ${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1 (min ${min})  ${fg} on ${bg}  — ${where}`);
  }
}
console.log(`\n${failed} failing pair(s)`);
process.exit(failed ? 1 : 0);
