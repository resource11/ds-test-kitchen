# Architecture

Why this repo is shaped the way it is. Start here before adding anything.

## Stack

- **Vite 8 + React 19 + TypeScript** for the build
- **Base UI `1.8.0`** (`@base-ui/react`) for unstyled, accessible primitives
- **Storybook `10.6.0`** with `@storybook/react-vite`, `addon-docs`, `addon-a11y`, `addon-mcp`
- **CSS Modules + CSS custom properties** for styling. No CSS-in-JS, no Tailwind. Tokens stay inspectable in devtools and portable to Figma.

## Token architecture

**`tokens/` is the source of truth. `src/tokens/*.css` is generated — never edit it.**

DTCG-format JSON, built by `scripts/build-tokens.mjs` (Style Dictionary 4) via `npm run build:tokens`. One file describes each design decision, and that same file is what maps to Figma variables.

Two tiers, deliberately separated so the semantic tier can map one-to-one to Figma variables:

`tokens/tier-1-definitions/` holds raw ramps and scales: `--sds-color-brand-indigo-600`, `--sds-space-4`. Referenced only by tier 2, never by a component. Emits `primitives.css`.

`tokens/tier-2-usage/` holds the contract components use. Colour is split into three categories after Brad Frost's Eddie conventions — `background`, `content`, `border` — so a token names the role it plays, not just the hue: `--sds-color-background-accent` fills with the accent, `--sds-color-content-accent` renders text in it, `--sds-color-content-on-accent` is what stays readable on top of it. Typography composites live under `--sds-typography-*`. Split into `semantic.light.json` and `semantic.dark.json`, which become the two blocks in `semantic.css` and the two Figma variable modes. `text-style.json` holds composite text styles, the unit that maps to a Figma text style.

References are emitted as `var()` rather than resolved values, so the tier-1 -> tier-2 indirection survives into the CSS. A Figma variable alias maps onto exactly that indirection.

Brad Frost's `eddie-design-tokens` adds a third tier for component-level tokens. We have no need for one yet; that is the extension point if we do.

**Breakpoints are the exception.** They live in tier 1 but are emitted to `src/tokens/breakpoints.ts` as well as CSS, because a CSS custom property cannot be used inside a media query — `@media (min-width: var(--x))` is not valid CSS. Storybook viewports are generated from them.

`src/tokens/base.css` imports the generated CSS plus a minimal reset.

The rule that makes the whole thing work: components reference semantic tokens only. Never a primitive, never a raw hex value. Theming then means redefining one file, and the Figma sync becomes a name-for-name translation rather than a negotiation.

## Components

42 components across Actions, Forms, Navigation, Overlays, Content, Layout, Display and Feedback. Most wrap a Base UI primitive; Card, Badge, Alert, Table, Spinner and Breadcrumb have no primitive to wrap because they carry no interaction logic.

Each lives in its own folder with `Component.tsx`, `Component.module.css`, `Component.stories.tsx` and `index.ts`. The public surface of the library is `src/index.ts`.

`src/foundations/` renders the token layers as four pages — Colour, Typography, Space and shape, Motion — so the tokens have a page rather than only a file. They read *computed* values, so they show what the browser resolved for the theme selected in the toolbar.

## Gotchas

**Storybook's manifest needs a real component reference.** `storybook-static/manifests/components.json` is the catalog an agent grounds itself against. Storybook cannot resolve `component: X.Root` through a plain object namespace, so compound components are exported as `Object.assign(Root, { Root, ... })` — a real component that is also the namespace. Exporting a plain object silently drops the component from the manifest.

**The package moved orgs.** `@base-ui-components/react` was abandoned at `1.0.0-rc.0`; the maintained package is `@base-ui/react`, now at 1.8.0. The old name still resolves on npm and looks current, which is a trap. Check the org before trusting a version number.

**Base UI's `ButtonProps` is a union type** (`nativeButton` true and false branches), so `interface X extends React.ComponentPropsWithoutRef<typeof BaseButton>` fails with TS2312. Type the wrapper as `React.ComponentProps<'button'> & { ... }` and pull `render` off the Base UI type separately.

**Install dependencies on the machine you run them on.** npm skips extracting optional platform packages that do not match the current OS, leaving empty directories. A `node_modules` installed on Linux will crash on macOS inside `oxc-resolver`, which Vite 8 uses for module resolution. Fix is `rm -rf node_modules && npm install` on the target machine.

**Keep `node_modules` out of Dropbox sync.** `xattr -w com.dropbox.ignored 1 node_modules`.

## Roadmap

1. Protect `main` on GitHub (pull request plus the `ci` check).
2. ~~Move tokens to a DTCG source of truth with a generator.~~ Done.
3. Publish Storybook, so the manifest and the docs have a stable URL.
4. ~~Sync tokens to Figma variables.~~ Done 2026-09-10, through the Figma Console bridge.
5. A naming contract between semantic tokens and Figma variables, checked both ways. Nothing catches that drift today.
6. Code Connect mappings so Figma components point at these files.
7. Per-branch Storybook deploys, including `design`.
