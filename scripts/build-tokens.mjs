/**
 * Builds the CSS and TypeScript token layers from tokens/.
 *
 * tokens/ is the source of truth. src/tokens/*.css is generated output — edit
 * the JSON, never the CSS. The same JSON is what maps to Figma variables, so
 * there is exactly one place a design decision is written down.
 *
 *   tier-1-definitions  raw values, no theme   -> primitives.css
 *   tier-2-usage        roles, themed          -> semantic.css (light + dark)
 *
 * Run with: npm run build:tokens
 */
import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';

const PREFIX = 'sds';
const OUT = 'src/tokens';
const BANNER = (source) =>
  `/**\n * GENERATED FILE — do not edit.\n * Source: ${source}\n * Regenerate with: npm run build:tokens\n */\n`;

/**
 * `space.4` -> `sds-space-4`, `color.on-accent` -> `sds-color-on-accent`.
 *
 * Registered as a real name transform rather than computed inline so that each
 * token carries a unique `name`. Without one, every token's name is undefined
 * and Style Dictionary reports them all as colliding — which would drown out a
 * genuine collision.
 */
StyleDictionary.registerTransform({
  name: 'sds/name',
  type: 'name',
  transform: (token) => `${PREFIX}-${token.path.join('-')}`,
});

const cssVarName = (token) => `--${token.name}`;

/**
 * Emit a reference as a `var()` rather than the value it resolves to, so the
 * semantic layer keeps pointing at the primitive layer at runtime. That
 * indirection is the architecture — and it is also what a Figma variable alias
 * maps onto, so flattening it here would break the sync later.
 *
 *   "{brand.600}" -> "var(--sds-brand-600)"
 */
const refsToVars = (value) =>
  String(value).replace(/\{([^}]+)\}/g, (_, path) => `var(--${PREFIX}-${path.split('.').join('-')})`);

/**
 * Values are authored as valid CSS already, so no value transforms are applied.
 * Style Dictionary's `css` group would rewrite them: it re-quotes font stacks
 * and collapses `rgb(0 0 0 / 0.4)` to `#000000`, silently dropping the alpha.
 */
StyleDictionary.registerFormat({
  name: 'sds/css-variables',
  format: ({ dictionary, options }) => {
    const lines = dictionary.allTokens.map((t) => {
      const authored = t.original?.$value ?? t.original?.value ?? t.$value ?? t.value;
      return `  ${cssVarName(t)}: ${refsToVars(authored)};`;
    });
    return `${BANNER(options.sourceLabel)}${options.selector} {\n${lines.join('\n')}\n}\n`;
  },
});

/**
 * Breakpoints are emitted to TypeScript as well as CSS, because a CSS custom
 * property cannot be used inside a media query — `@media (min-width: var(--x))`
 * is not valid CSS. Anything that needs to branch on a breakpoint (Storybook
 * viewports, JS matchMedia) reads these constants instead.
 */
StyleDictionary.registerFormat({
  name: 'sds/breakpoints-ts',
  format: ({ dictionary }) => {
    const bps = dictionary.allTokens.filter((t) => t.path[0] === 'breakpoint');
    const entries = bps.map((t) => `  ${t.path[1]}: '${t.$value ?? t.value}',`).join('\n');
    return (
      `${BANNER('tokens/tier-1-definitions/breakpoint.json')}` +
      `/** A CSS custom property cannot be used in a media query, so breakpoints\n` +
      ` *  are consumed from here rather than from a var(). */\n` +
      `export const breakpoints = {\n${entries}\n} as const;\n\n` +
      `export type Breakpoint = keyof typeof breakpoints;\n`
    );
  },
});

const TIER1 = 'tokens/tier-1-definitions/**/*.json';

async function buildPrimitives() {
  const sd = new StyleDictionary({
    source: [TIER1],
    platforms: {
      css: {
        transforms: ['sds/name'],
        buildPath: `${OUT}/`,
        options: { selector: ':root', sourceLabel: 'tokens/tier-1-definitions/' },
        files: [{ destination: 'primitives.css', format: 'sds/css-variables' }],
      },
      ts: {
        transforms: ['sds/name'],
        buildPath: `${OUT}/`,
        files: [{ destination: 'breakpoints.ts', format: 'sds/breakpoints-ts' }],
      },
    },
  });
  await sd.buildAllPlatforms();
}

/**
 * Semantic tokens are built once per theme. Both themes reference the same
 * tier-1 files, so a rename in tier 1 breaks loudly here rather than silently
 * resolving to nothing.
 */
async function buildTheme(theme, selector) {
  const sd = new StyleDictionary({
    source: [TIER1, `tokens/tier-2-usage/semantic.${theme}.json`, 'tokens/tier-2-usage/text-style.json'],
    platforms: {
      css: {
        transforms: ['sds/name'],
        buildPath: `${OUT}/`,
        options: { selector, sourceLabel: `tokens/tier-2-usage/semantic.${theme}.json` },
        files: [
          {
            destination: `.semantic.${theme}.css`,
            format: 'sds/css-variables',
            // tier-1 is present only so references resolve; it must not be re-emitted here
            filter: (t) => t.filePath.includes('tier-2-usage'),
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

mkdirSync(OUT, { recursive: true });
await buildPrimitives();
await buildTheme('light', ':root,\n[data-theme="light"]');
await buildTheme('dark', '[data-theme="dark"]');

// Concatenate the two theme blocks into the single semantic.css components import.
const light = readFileSync(`${OUT}/.semantic.light.css`, 'utf8');
const dark = readFileSync(`${OUT}/.semantic.dark.css`, 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
writeFileSync(
  `${OUT}/semantic.css`,
  `${light}\n${dark}`.replace('Source: tokens/tier-2-usage/semantic.light.json', 'Source: tokens/tier-2-usage/'),
);

// The per-theme files are intermediates; only the concatenated one is imported.
rmSync(`${OUT}/.semantic.light.css`);
rmSync(`${OUT}/.semantic.dark.css`);

console.log('Built src/tokens/{primitives,semantic}.css and breakpoints.ts');
