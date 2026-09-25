# Component authoring conventions

Every component in this library follows these rules. No exceptions without a note in the PR.

## Folder shape

```
src/components/<Name>/
  <Name>.tsx           implementation
  <Name>.module.css    styles
  <Name>.stories.tsx   stories
  index.ts             named exports only, no default
```

Export the component and its props type from `index.ts`, then re-export from `src/index.ts`.

## Implementation rules

1. **Wrap, do not rebuild.** If Base UI ships a primitive, wrap it. Never reimplement focus management, keyboard handling or ARIA.
2. **Verify the API before writing.** Check `storybook-static/manifests/components.json` for what already exists, and `node_modules/@base-ui/react/<part>/index.d.ts` for Base UI's actual part names in `1.8.0`. Do not write from memory. See `CLAUDE.md`.
3. **Semantic tokens only.** Components may reference `--sds-color-background-*`, `--sds-color-content-*`, `--sds-color-border-*`, `--sds-space-*`, `--sds-radius-*`, `--sds-typography-*`, `--sds-duration-*`, `--sds-easing-*`, `--sds-elevation-*`. Never a primitive like `--sds-color-brand-indigo-600` or `--sds-shadow-*` (use `--sds-elevation-*`), never a raw hex, never a magic pixel value where a token exists. Tokens are edited in `tokens/**/*.json`, never in the generated `src/tokens/*.css`.
   **Type comes from a text style.** Every rule that sets type sets all six `--sds-typography-<style>-*` properties (family, size, weight, line-height, letter-spacing, text-transform) from one style in `tokens/tier-2-usage/text-style.json` — never `--sds-font-size-*`, `--sds-line-height-*` or `--sds-letter-spacing-*` by hand. `--sds-font-weight-*` on its own is allowed only to emphasise inherited text. `npm run validate` flags the rest (`raw-type-in-component`).
4. **Style by data attribute.** Base UI exposes state as `[data-checked]`, `[data-disabled]`, `[data-open]`, `[data-highlighted]`, `[data-selected]`, `[data-starting-style]`, `[data-ending-style]`. Style those rather than tracking state in React.
5. **Focus is visible.** Every interactive element gets `outline: 2px solid var(--sds-color-border-focus); outline-offset: 2px;` on `:focus-visible`.
6. **Class merging.** Accept `className` and merge: `[styles.root, className ?? ''].filter(Boolean).join(' ')`.
7. **Icons are inline SVG**, 16px, `stroke="currentColor"` or `fill="currentColor"`. No icon package.
8. **Typing.** Several Base UI prop types are unions and cannot be extended with `interface X extends ...` (TS2312). Use an intersection instead: `export type XProps = React.ComponentProps<'div'> & { ... }`, or `React.ComponentProps<typeof Base.Root> & { ... }` where that resolves cleanly. Build must pass `tsc -b` with zero errors.
9. **Compound components** are exported as `Object.assign(Primary, { Root, ... })` (see `Dialog`), so consumers keep control of composition. It must be `Object.assign` around a real component and not a plain object literal, or Storybook cannot resolve `component:` and the component drops out of the manifest agents read. Point the story's `component:` at the bare namespace (`component: Dialog`), not at a member.

## Story rules

- `title` uses the group prefix given in the build brief, e.g. `'Components/Forms/Checkbox'`.
- `tags: ['autodocs']`.
- A `Default` story, then one story per meaningful variant and state. Disabled always gets a story.
- Every story must render without console errors and pass the a11y panel.
- Use `satisfies Meta<typeof Component>` and `StoryObj<typeof meta>`.
- Overlay components (anything portalled) need `parameters: { layout: 'centered' }` and a visible trigger.

## Anti-patterns

- Hardcoded colours or spacing
- `useState` for something Base UI already tracks
- A story that only shows the happy path
- Divs with click handlers where a Base UI primitive exists
