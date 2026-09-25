# Decisions, and why

Why this repository is shaped the way it is. Read it before changing how the
system works, and add a row when a decision changes. Notes, findings and
articles about the project live outside the repo.

## What this project is

A deliberately small, deliberately real design system used to test **how
designers and AI can work together on a real codebase without drift**, and to
teach that workflow. It is not a product. Every decision optimises for
*legible and demonstrable*, not for scale.

Christine Vallaure — founder of moonlearning.io, trains designers in
design-to-code, Figma and AI workflows. The audience for this repo is
designers learning to prototype against real components.

## The thesis being tested

Prototyping with only a codebase and an LLM is a **drift guarantee**. With the
right guardrails, you can mix code and Figma creatively:

```
research (Miro) → prototype in code on `design` → push to Figma
  → design freely there → push back as a prototype made of components
  that already exist → hand off → production code on a feature branch
```

Figma is **not** the source of truth. Code is. Figma is an exploration surface
fed by code — a sketchpad that speaks the system's vocabulary.

## Decisions made, and why

| Decision | Reason |
| --- | --- |
| **JSON is the token source of truth**, CSS is generated | One file per design decision, and the same file maps to Figma variables |
| **DTCG format** (`$value`/`$type`) | The actual W3C standard; Brad's Eddie uses the older `value`/`type` form |
| **Two tiers, not three** | Eddie has a component tier; 42 components need none yet. Documented as the extension point |
| **Brad's `background`/`content`/`border`** colour categories | The role colours are genuinely multi-role — `accent` was used 17× as content, 15× as background, 9× as a border under one name that carried no intent |
| **Primitives are named Brad's way: group → colour → step** (2026-09-14) | Follows Eddie's tier 1 (`brand`, `neutral`, `utility`): `neutral` (white named, 50–950), `brand.indigo`, `utility.green` / `yellow` / `red`. The old `success` / `warning` / `danger` ramps put meaning into tier 1, which only tier 2 should carry — a red that is not an error had no honest name. Semantic names are unchanged, so no component moved. Figma variables were renamed in place, so every alias and binding survived. `yellow` is Eddie's word; the values are the amber ramp |
| **No Code Connect** | A per-component binding file, maintained by hand, Figma-proprietary, rots when either side changes. A second sync surface |
| **Component contracts instead** | The manifest already publishes the contract. Generate the Figma library from it and names match *by construction* — nothing to bind |
| **Validate is warn-only** | It must never block a designer mid-prototype. `--strict` exists for CI |
| **No Steel Curtain** (Brad's station 8) | Explicitly out of scope. This is a teaching instrument, not a team shipping to production |
| **Chromatic for publishing** | Per-branch deploys, which is what `docs/branching.md` already promises for `design` |
| **`design` is one-way** | A source of decisions, not a source of merges. Accepted prototypes get rebuilt on `feature/*` |
| **Figma name = token path**, `.` → `/` | One rule, no exceptions: `color.background.accent` is `color/background/accent`. It is what the round-trip name check will test |
| **WEB code syntax on every variable** | Dev Mode shows `var(--sds-…)`, not hex, so a Figma selection points straight back at code |
| **Inter and Roboto Mono, in code and Figma** (2026-09-23) | Code used to name no font, only system stacks, so the system had no typographic voice and Figma could only guess (SF Pro and SF Mono on a Mac, Inter and Roboto Mono in Figma). Both are now self-hosted in `src/fonts/` (four woff2 files from Google Fonts, 190 KB, OFL) and named first in `font.sans` and `font.mono`; the system stacks stay behind them as fallback. Files, not an npm package, so the no-dependencies rule holds |
| **Composite type as resolved-px variables** | `typography/<style>/line-height` holds pixels (24 × 1.2 = 28.8) with code syntax pointing at the real CSS variable, so all five properties of every text style are bound. Renders identically; does not follow a font-size change on its own |
| **Figma properties use the code's names** | `variant=primary`, `size=md`, `disabled=false`, text property `children` — not Figma's usual `Size=Medium`. A frame coming back resolves to the component that already exists |
| **Code parts become boolean properties named after them** | `Card.Header`, `Card.Description`, `Card.Footer`, so a Figma instance says which parts to render |
| **Components are built from the stylesheet** | A parser maps each declaration in `*.module.css` through the naming contract to a variable, or flags it as raw. Nothing is transcribed by hand |
| **Prototype docs are generated from their own source** | A real `Card` and a hand-rolled `<div>` render identically, so a designer cannot audit composition in the browser. Each prototype story reads its own file (`?raw`) and derives "Show code" and a *Components used* table from it (`src/patterns/prototypeDocs.ts`) |
| **Components take type from text styles** (2026-09-10) | 55 of 102 component text rules matched no text style. Added five roles that already existed in practice — `caption`, `label-lg`, `label-xl`, `title-sm`, `title-md` (8 → 13 styles) — and snapped 24 near-misses to existing styles (form labels to `label-md`, dialog titles to `heading-xl`, small badge/avatar and group labels to `label-sm`). `validate` rule `raw-type-in-component` now flags a hand-set size, line height or letter spacing. This is what lets Figma bind text styles instead of loose variables |
| **Text-style structure follows Eddie; names and sizes stay ours** (2026-09-10) | Compared against Brad's `eddie-design-tokens`. Adopted: a style carries six properties including `text-transform` (maps to Case in Figma), so the uppercase group labels became a style (`overline`) instead of a one-off rule; a style is applied whole (`validate` rule `text-style-split`, the no-SCSS equivalent of his mixin); every style has a when-to-use `$description`; breakpoints are named and described by width, not device. Kept ours: t-shirt scale names, ratio line heights, breakpoints as tokens, two tiers |
| **One name per concept, before Figma** (2026-09-10) | Names cross into Figma as property names, so they are fixed while nothing consumes them. Meter's `tone` became `variant`, like every other colour choice. Kept apart on purpose: Alert's `info` is a *status*, Badge's `accent` is *emphasis* — merging them loses the meaning. Toggle's `iconOnly` and `IconButton` stay separate components, because a Toggle holds a pressed state |
| **Two long-lived branches, not three** (2026-09-10) | `main` is the system, `design` the playground, `feature/*` in between. `develop` was a team-sized layer that a solo maintainer and a class of students do not need. The repo becomes a GitHub template so each student gets both branches. `design` stays one-way — that rule is the lesson |
| **Page CSS lays out; it does not draw** | `validate` rule `surface-in-page`: a background, border, shadow or radius in pattern CSS is usually a component rebuilt from divs. Known gaps opt out in place with `/* validate-allow: surface — reason */`, so every exception carries its reason |
| **Skills are named after what they do** (2026-09-23) | `figma-mirror` became `figma-library-from-code`: "Figma Mirror" is already an app, and the name did not say what the skill makes. It sits next to `storybook-figma-sync`: one builds the Figma library from the code, the other builds screens from that library. Dated reports from before keep the old name |
