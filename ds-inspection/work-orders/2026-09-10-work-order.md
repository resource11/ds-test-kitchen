# Work Order — Sample Design System (`sds`)

_From inspection: `reports/2026-09-10-inspection.md` · Written: 2026-09-10_

Reds get fixed now. Yellows get scheduled. Greens get left alone (and celebrated). Every item cites its station and evidence. The team owns prioritization (here, that's Christine); this is the technician's recommendation.

Several yellows are marked **before merge**. They're small, they only exist on `feature/ai-foundation`, and they're cheapest to fix before that branch lands on `develop`.

## 🔴 Fix now (reds)

### 1. Make CI actually run, and give it teeth
- **Station:** 5, Testing & validation · **Evidence:** [verified] The `ci` workflow has been active since the first commit and Actions is enabled, but the GitHub API reports 0 runs, despite pushes to `develop` and `design` that match its triggers. There are 0 test files. `validate.mjs` isn't in CI.
- **Why it's first:** every other fix in this work order can quietly regress without it. This branch already shows how. The token rename left two undefined tokens and a RadioGroup console error behind, and nothing noticed.
- **First move:**
  1. Open the repo's Actions tab and find out why nothing ran (a disabled workflow, an account setting, a trigger mismatch).
  2. Add these steps to `ci.yml` after `npm run lint`: `npm run validate -- --strict` and `node ds-inspection/checks/contrast-pairs.mjs`.
  3. Push to a `feature/*` branch and open a PR, so the run is real.
- **AI assist:** the agent can edit `ci.yml` and read the failing run logs. Deciding whether contrast failures block merges or only warn is your call, since warn-only is a deliberate project value.
- **Done when:** the Actions tab shows a green or red run on a PR, and that run includes `validate --strict`.
- **Effort:** S

### 2. Run every story headlessly for console errors and axe
- **Station:** 5 (also 3) · **Evidence:**
  - [verified] `addon-a11y` is set to `test: 'error'`, but no test runner is installed.
  - [verified] RadioGroup logs a Base UI console error on every render (`RadioGroup.tsx:67`).
  - [verified] The Storybook dark theme renders text at 1.05:1. Both went unnoticed.
- **Why it's first:** it turns `conventions.md`'s "every story must render without console errors and pass the a11y panel" from a promise into a check. That covers 251 stories in two themes, where today only the ones someone happens to open get checked.
- **First move:** add Storybook's Vitest addon (or the test-runner) to run all stories with a11y set to error, in both themes. **Note:** this is a new devDependency. CLAUDE.md rule 5 forbids dependencies in general ("no component library, no icon package, no CSS framework"), so it's your call whether test tooling counts.
- **AI assist:** the agent can wire it up and triage the first failure list. Which failures to fix and which to accept belongs to you.
- **Done when:** one command fails on the current RadioGroup error and on the Badge contrast, and passes once they're fixed.
- **Effort:** M

## 🟡 Schedule (yellows)

### 3. Restore the page background and text tokens *(before merge)*
- **Station:** 3, 4, 6 · **Evidence:** [verified]
  - `--sds-color-bg` and `--sds-color-text` are undefined since `7ec5df7`, but are still used in `src/tokens/base.css` (body) and `.storybook/preview.tsx` (theme wrapper).
  - Rendered result: both backgrounds compute to transparent, and dark-theme text is 1.05:1, with 11 violations on the Settings page.
  - `origin/develop` still defines both names.
- **First move:** replace them with `--sds-color-background-default` and `--sds-color-content-default` in both files.
- **Done when:** axe on `patterns-settings-page--default` with `theme:dark` reports no contrast violations from page text.
- **Effort:** S · **Suggested timing:** before merging `feature/ai-foundation`

### 4. Fix RadioGroup's label *(before merge)*
- **Station:** 5 (also 2) · **Evidence:** [verified] `RadioGroup.tsx:67` renders `<Field.Label render={<div />}>` without `nativeLabel={false}`, and Base UI logs an error on every render.
- **First move:** add `nativeLabel={false}`. Then confirm the group still has an accessible name: check the `radiogroup`'s labelling in the accessibility tree.
- **Done when:** the RadioGroup stories render with no console errors and the group announces its label.
- **Effort:** S · **Suggested timing:** before merge

### 5. Sweep the nine stale docs lines *(before merge)*
- **Station:** 6 (also 2, 4, 7) · **Evidence:** [verified]
  1. `CONTRIBUTING.md:20` tells designers to edit the generated `semantic.css`.
  2. `README.md:88` and `GettingStarted.mdx:54` say "Everything currently sits on `main`".
  3. `README.md:81` shows the finished DTCG roadmap item as unchecked.
  4. `conventions.md` rule 5 names the nonexistent `--sds-color-focus-ring` (should be `--sds-color-border-focus`).
  5. The Badge Matrix story comment says no success variant exists.
  6. `SettingsPage.stories.tsx:56` and `:370` say Switch has no description.
  7. `branching.md` says "Protected" (see item 9).
  8. `project-brief.md` still says the Figma MCP is blocked.
  9. `README.md`, `architecture.md` (roadmap item 4) and `project-brief.md` ("Next") list syncing tokens to Figma variables as future work. It's done.
- **First move:** one `docs:` commit. For CONTRIBUTING, point designers at `tokens/tier-2-usage/*.json` followed by `npm run build:tokens`.
- **Done when:** a grep for each quoted string comes back clean.
- **Effort:** S · **Suggested timing:** before merge

### 6. Retune contrast at the token level, before tokens go to Figma
- **Station:** 3 · **Evidence:** [verified], rendered and computed:
  - **Light:** Badge success, warning and danger text at 2.86–3.95:1. Input and control boundaries at 1.30 and 1.49:1 (1.4.11).
  - **Dark:** primary button 4.46:1 (hover 2.98), danger 3.76:1 (hover 1.90), accent text on a surface 3.45:1, Alert body on the status fills 2.41–3.11:1, and every Badge status variant 1.71–2.55:1.
- **First move:** edit `tokens/tier-2-usage/semantic.*.json` and re-run `node ds-inspection/checks/contrast-pairs.mjs` until it exits 0. Candidate directions to verify with the script, not assume:
  - darker status content tokens in light mode
  - a deeper accent and danger fill behind white text in dark mode
  - a control-border token that clears 3:1
  - Alert body on `content-default` rather than `muted` in dark mode
- **AI assist:** the agent can propose and test ramp swaps quickly. How the brand colour looks is a design judgment.
- **Done when:** the script exits 0, and a re-run of axe in both themes is clean on the 10 stories in the report.
- **Effort:** M · **Suggested timing:** this quarter. Push the retuned values to the Figma variables in the same pass: they mirror the failing values exactly today, and the Console bridge can write them.

### 7. Widen validate's eyes
- **Station:** 4 · **Evidence:** [verified] `validate.mjs` scans only `src/**/*.module.css|tsx`, and it skips `src/tokens/`. So it missed `base.css`, `.storybook/preview.tsx` and the `conventions.md` token name. Four story titles also break the group-prefix convention (Button, Dialog, Switch, TextField).
- **First move:**
  - Add `src/tokens/base.css` and `.storybook/**` to the unknown-token check, and scan `docs/*.md`, `CLAUDE.md` and `CONTRIBUTING.md` for `--sds-*` names.
  - Add a check that every story `title` under `Components/` has three segments.
  - Add `--sds-line-height-*` to CLAUDE.md rule 1's allow-list, or migrate those 56 usages to `--sds-typography-*`.
- **Done when:** `validate` flags the current three dead names (before item 3 fixes them), and passes after.
- **Effort:** S · **Suggested timing:** this sprint

### 8. Put composition into the manifest
- **Station:** 9 (also 2) · **Evidence:** [verified] 14 of 42 components have no manifest description. The generation test needed about 30 files and ~160k tokens, reading source and Base UI `.d.ts` files to learn how compound parts fit together.
- **First move:** move each compound's file-level JSDoc, including its existing `Usage:` block, onto the exported component, and write descriptions for the rest of the 14. Rebuild Storybook and confirm `description` is filled.
- **Done when:** all 42 entries have a description, and re-running the generation test takes noticeably fewer source reads.
- **Effort:** S–M · **Suggested timing:** this quarter

### 9. Walk the documented process once, and make the doc match
- **Station:** 7 · **Evidence:** [verified] `main` and `develop` aren't protected, although `branching.md` says they are. No PR has ever been opened. There's no CHANGELOG, no version (`0.0.0`) and no tags.
- **First move:**
  1. Merge `feature/ai-foundation` through a PR into `develop`.
  2. Decide on protection: either require `ci` with no approval (the solo reality), or reword `branching.md` so it describes the future team.
  3. Add a CHANGELOG seeded from the Conventional Commits.
- **Done when:** the first PR is merged with a CI run on it, and `branching.md` matches GitHub's settings.
- **Effort:** S · **Suggested timing:** this sprint

### 10. Build the design leg from the manifest
- **Station:** 1, 6, 10 · **Evidence:**
  - [verified] The Figma file `sample-design-system` has 104 variables and 3 effect styles, all matching the code exactly, but 0 components and 0 text styles, and nothing is published.
  - [verified] The native Figma MCP is authenticated.
  - [verified] Storybook isn't published.
- **First move:** tokens → variables is already done, and exact. What remains, in order:
  1. the 8 text styles from `text-style.json`
  2. font family as STRING variables
  3. publish the library
  4. generate the components from the manifest
  5. a name and value check in `validate.mjs`, seeded by the code-syntax ↔ CSS comparison from this pass
- **Done when:** text styles and components exist, the library is published, and both the variable and component names diff clean against the code.
- **Effort:** L · **Suggested timing:** this quarter

### 11. Close the smaller vocabulary and craft gaps
- **Station:** 2, 3, 4 · **Evidence:** [verified]
  - Status colour is split between Meter's `tone` and `variant`, and Alert's `'info'` vs Badge's `'accent'`.
  - Icon-only is split between Toggle's `iconOnly` and IconButton.
  - Physical properties in `Menu.module.css:77–89` and Toast break RTL.
  - Only 5 components respect `prefers-reduced-motion`.
- **First move:**
  - Rename now, while there are no consumers to break: `tone` → `variant`, and pick one of `info` or `accent`.
  - Swap the physical properties for logical ones.
  - Add a reduced-motion override that zeroes the `--sds-duration-*` tokens.
- **Done when:** the props sweep shows one name per concept, and the grep for physical properties comes back empty in Menu and Toast.
- **Effort:** S · **Suggested timing:** before the Figma library is generated, since names cross the boundary

## 🔧 Access upgrades (sharper next inspection)

- **Done 2026-09-10: Figma file linked and read.** It's [`sample-design-system`](https://www.figma.com/design/PvLNUW3xI3A9kTumVi7O3d/sample-design-system?node-id=0-1), and it's currently empty. Once content exists, link specific component nodes so the native MCP can read them.
- **Done 2026-09-10: the Figma Console bridge is connected** (token refreshed, stale server gone). What remains is updating the Desktop Bridge plugin: it reports an update available, and `figma_get_text_styles` failed with "Unknown method".
- **Connect a design-systems knowledge MCP** so Station 1's benchmark is citable rather than from memory: `claude mcp add --transport http design-systems https://design-systems-mcp.southleft.com/mcp`.
- **Register the Storybook MCP** in a project `.mcp.json`, so agents can hand back preview URLs. It's preview-only, but it's already running.

## 🟢 Keeping the greens green

- **Station 9:** keep the manifest generated, never hand-edited, and re-run the Notification preferences generation test after any change to CLAUDE.md, the manifest, or a compound component's API. Track the grounding cost (files read, tokens) as well as correctness, since cost is the early warning.

## Cadence

- Re-inspect (deep, all stations): 2026-12-10. Quick passes on Stations 3, 5 and 6 right after `feature/ai-foundation` merges, and on Stations 1, 4 and 6 after the first code↔Figma round trip.
- Everyday checks to wire into CI now:
  - `validate --strict`, with a wider scope
  - `contrast-pairs.mjs`
  - a headless story run with console errors and axe
  - `tsc` (already in `build`)
- Owner of this work order: Christine Vallaure · Review: at the start of each work session on this repo, until the before-merge items are closed
