# Multi-Point Inspection Report — Sample Design System (`sds`), second pass

_Inspected: 2026-09-11, afternoon · Technician: Claude Code (Claude Opus 5), orchestrating six station inspectors · Previous inspection: 2026-09-11 morning (`2026-09-11-inspection.md`)_
_Vehicle profile: `ds-inspection/GARAGE.md` (checked in 2026-09-11) · Branch inspected: `main` @ `7429586`, **the same commit as this morning**_

## The short version

**Nothing in the system changed since this morning.** It's the same commit, and 0 of the 14 work-order items are closed. The second pass found the same picture in finer detail:

- **The one red is still accessibility.** 28 of 80 colour pairs fail, 20 of them in dark mode. Code and Figma fail identically, and nothing in CI would notice.
- **Crashes merge unnoticed.** The same gap let a crashing Checkbox merge with CI green, and SignUpForm crashes too (now confirmed). CI compiles the stories but never opens one.
- **The drift guard catches renamed things, not changed things.** Of 11 test changes, only 3 fail CI.

What's genuinely good:
- Figma matches the code value for value on everything sampled.
- The Figma file itself is clean: 0 detached instances, and every colour is bound to a variable.
- A fresh agent built an on-system page on the first try (grade A−).

**Do this Monday:** in `ci.yml`, run `validate` after the Storybook build, and protect `main`. That's ten minutes together. Then pick the colours on the "Colour decisions" board, and fix the Checkbox.

**Overall: 61/100\*** (64 this morning, on the same commit). It's a conversation starter, not a grade. Fix the red, schedule the yellows, and re-run on a cadence.
\*The score is pro-rata to 100 from 55/90. Station 8 wasn't inspected, because there are no consuming teams. The 3-point drop is mostly scoring noise, with one real gain: the library was published after this morning's pass, which lifts Station 1. See *What changed since this morning*.

## Inspection sheet

Each station asks one plain question. For each, the table gives the one thing designers (🎨) and developers (🛠️) need to do; a dash (–) means nothing. **Before** is this morning's score on the same commit. **Now** is this pass.

|  # | Station          | What it checks                         | 🎨 Design                                             | 🛠️ Dev                                                 | Before  | Now          |
|---:|:-----------------|:---------------------------------------|:------------------------------------------------------|:-------------------------------------------------------|:-------:|:------------:|
|  1 | Coverage         | Do we have the components people need? | Show error and focus states for form fields           | Fix the Checkbox crash and the invisible separator     | 🟡 7    | 🟢 **8**     |
|  2 | Best practices   | Are the components built well?         | Decide control-height sizes and a Menu text style     | Reduced motion and right-to-left rules                 | 🟡 7    | 🟡 7         |
|  3 | Accessibility    | Can everyone use it?                   | **Pick new colours (28 pairs fail, 20 in dark)**      | Contrast check and axe in CI                           | 🔴 3    | 🔴 3         |
|  4 | Shared language  | Same names everywhere?                 | Toast `error` → `danger`; pick Toast's success colour | Write the prop vocabulary down                         | 🟢 8    | 🟡 **7**     |
|  5 | Testing          | Do checks catch mistakes?              | –                                                     | Render every story in CI · fix the Checkbox            | 🟡 5    | 🟡 5         |
|  6 | Orchestration    | Do code and Figma stay in step?        | List the 3 left-out components in `GAPS.md`           | Validate after the Storybook build · check code → Figma | 🟡 7    | 🟡 7         |
|  7 | Governance       | Is there a clear process?              | –                                                     | Protect `main` · template · tag `v0.1.0`               | 🟡 6    | 🟡 **5**     |
|  8 | Feedback         | Do people use it?                      | –                                                     | –                                                      | N/I     | N/I          |
|  9 | AI-readable docs | Can AI build with it?                  | Write "when to use" notes                             | Describe the 14 components and their parts             | 🟢 8    | 🟡 **7**     |
| 10 | Agent access     | Can AI tools reach it?                 | Try a "connect your agent" guide                      | Register the Storybook MCP · `AGENTS.md` · merge PR #4 | 🟡 7    | 🟡 **6**     |
|    | **Overall**      |                                        |                                                       |                                                        | **64\*** | **61/100\*** |

**Lights:** 🟢 1 green · 🟡 7 yellow · 🔴 1 red · 1 not inspected

**Key:** 🔴 Red (0–3): broken or missing, the light is ON · 🟡 Yellow (4–7): drift or gaps, schedule a fix · 🟢 Green (8–10): healthy, no action needed · **N/I**: not inspected (no evidence access; never guessed)

## Evidence basis

- **Why run it again on an unchanged commit:** Christine asked for a full pass anyway. It works as a calibration test: the code didn't move, so any movement in the scores is the inspection's own variance, not the system's.
- **Design library:** live, through the official Figma MCP's `use_figma`, which runs the Plugin API. All reads were read-only.
  - The orchestrator's probe found 43 pages, 176 variables in 5 collections, 14 text styles and 3 effect styles, which matches GARAGE.
  - **New this pass:** the station inspectors read Figma themselves, which they couldn't do this morning.
    - Inspector A swept the whole file.
    - Inspector B read all 35 colour variables in both modes.
    - Inspector C traced five components and the full variable list.
    - Inspector E read the descriptions on all 43 pages.
  - **The Figma Console bridge is connected too:** port 9223, with this file open. It got one probe call and wasn't used for evidence. A stale second instance holds port 9224. Access state: both bridges connected.
- **Code:** live, on a clean export of `main` @ `7429586`. Christine's uncommitted work on `design` was not touched.
  - Every CI step was run locally, in CI order and in reverse order.
  - 12 `validate` mutation experiments were run on a private copy.
- **Rendered stories:** live. Storybook was built from `main` and served locally.
  - 16 stories were scanned with axe-core 4.13 in light and dark (32 runs).
  - Tabs, Menu, Select and Dialog were tested with the keyboard.
- **Storybook MCP:** live. It was started from `main` on a private port, and its tool list was read (7 tools).
- **Generation test:** run. A fresh agent built an *Account settings* page using only the repo's context (Stations 9 and 10).
- **Process:** live, through git and `gh` (read-only).
- **Not connected:** no design-systems knowledge MCP, so the coverage benchmark is from the inspectors' own knowledge.
- **Findings:** 121 `[verified]` · 12 `[reported]`, across the six inspectors and the orchestrator's spot-check. Most of the `[reported]` ones are facts from GARAGE or earlier today that weren't re-probed: the Chromatic token, the whole-file layer audit, Base UI not shipping Drawer.

## Station records

### Station 1 — Coverage & gaps: 🟢 GREEN (8/10)
- **Inventory:** 39 of 42 code components in Figma · 42 in code · 42 with a Storybook docs page. The whole Figma file was swept, and all 42 component folders read.
- **Evidence level:** design live, whole file (43 pages) · code live · docs live (stories and MDX).
- **Findings:**
  - [verified] **The three legs are even.**
    - Figma has 97 components: 49 sets, and 48 singles (28 icons and 20 parts). Also 287 variants, 176 variables, 14 text styles and 3 effect styles.
    - Only Form, ScrollArea and ContextMenu aren't mirrored, by decision, though `GAPS.md` doesn't list them (Station 6).
    - No Figma component is missing its code.
  - [verified] **Every component has docs.**
    - 42 of 42 have a stories file with autodocs (238 stories).
    - 42 of 42 carry JSDoc. In 14 it sits at the top of the file rather than on the exported component, so the manifest shows only 28 descriptions (Station 9).
    - 97 of 97 Figma components have a description pointing at the source.
    - There's no accessibility or right-to-left guidance page.
  - [verified] **Two staples are broken in code:**
    - The standalone Checkbox (`Field.Item` without `Field.Root`). The crash is confirmed at Stations 3 and 5, including SignUpForm.
    - `Select.Separator`, which has no CSS and no Figma component, so it renders nothing.
  - [verified] **Staple gaps:**
    - No Link, Pagination or empty-state pattern.
    - Benchmarked against Material, Carbon and Primer from knowledge, since no knowledge MCP is connected: no date picker, stepper, tree view, skeleton, file upload or search field, and no Button `loading` state.
    - [reported] No Drawer or OTP field: Base UI 1.8.0 doesn't ship them.
  - [verified] **States:**
    - Code has hover, focus and disabled on all five sampled (Button, TextField, Select, Checkbox, Tabs), and error on the three form controls. Only Button `primary` shows a pressed state.
    - Figma has disabled and the open, selected and checked states, but **no hover, focus or error**. `GAPS.md` documents why: they're CSS states, not props.
    - So a designer can't draw a form with a failed field, and code has no per-component `Invalid` story to copy either.
  - [verified] **Tokens are tiered and complete by category:**
    - 78 tier-1 tokens, 38 colour and elevation tokens per mode, and 84 text-style tokens.
    - One gap: there's no control-height token. `min-height: 40/32/48px` is written raw 16 times, and Figma's heights are raw too.
  - [verified] **Hardcoded values:** 0 hex in component CSS. Of 174 px declarations, 116 are the house convention (1px borders, 2px focus outlines).
  - [verified] **Distribution:**
    - The Figma library is **published**: `search_design_system` finds it, with Button updated 2026-09-11. That's the change since this morning.
    - The package is private at `0.0.0`, and the repo isn't a template.
    - Storybook isn't published. GitHub Pages was switched on during this pass (deploy from a workflow, source `main`), but nothing has been built yet: the site returns 404. PR #4 adds the deploy step.
- **Not inspected:** real product needs (there are no consumers).
- **Deviations noted:** three components left out of Figma; hover and focus not mirrored; two token tiers; no Code Connect; Figma copies the icon drift.
- **First move:** decide how Figma shows error and focus for form fields (example frames, since they aren't props), and fix the Checkbox and `Select.Separator`.

### Station 2 — Best practices: 🟡 YELLOW (7/10)
- **Sampled:**
  - **Figma:** craft checks on all 39 component pages plus Icons, 5 in depth (Button, TextField, Select, Checkbox, Tabs).
  - **Code:** Button, TextField, Select, Dialog and Tabs end to end, plus Checkbox, Alert, Menu and ToggleGroup. All CSS counted.
  - **Docs:** Getting started, the docs page template, Button's stories, conventions, CONTRIBUTING and `CLAUDE.md`.
- **Evidence level:** all live.
- **Findings:**
  - [verified][format] **The Figma file is well made.**
    - 0 detached instances across 43 pages.
    - Every visible fill and stroke is bound to a variable.
    - 2,275 of 2,295 padding and gap values are bound. The 20 exceptions are 2px nudges copied from the code (Alert's icon, Switch's padding), since the space scale has no 2px step.
    - Every component radius is bound.
    - Auto-layout is used everywhere except tracks, arrows and icons, where free positioning is right.
    - Layer names match the code's parts (`Select.ItemText`, `Tabs.Indicator`). Only 12 default "Group" names remain, inside popup arrows.
    - It's a library-only file, with a clean page order.
  - [verified][format] **Text:** 570 of 646 text layers use a text style. The other 76 bind every field to variables, for weight emphasis. The exception is 10 `Menu.Item` layers with a raw 120% line height (the open Menu decision).
  - [verified][industry] **The code is sound.** Base UI does the behaviour and the ARIA. There's no div soup in the five read, and the APIs are small (Button adds 4 props, TextField 3).
  - [verified][industry] **Right-to-left isn't safe.**
    - 19 left/right declarations in 12 files would break RTL layouts: Menu's shortcut (`margin-left: auto`), Table's `text-align`, Toast, the popup arrows, NavigationMenu and the Tabs indicator.
    - There are only 24 logical declarations in all, and no RTL story or guidance.
  - [verified][industry] **Reduced motion:** 5 of the 33 component stylesheets that animate honour it, and there's no global fallback.
  - [verified][org] **"No magic pixel" is written but not enforced.** Control heights of 40/32/48px, 2px nudges and `-13px` arrow offsets are all raw, and `validate` has no pixel or physical-property rule.
  - [verified][org] **The written rule and the check disagree.** `--sds-font-sans`, a tier-1 token, is used in 17 component files, but it isn't in `CLAUDE.md`'s allowed list, and `validate` doesn't flag it.
  - [verified][org] **Small convention slips:** TextField uses `outline-offset: -1px` (the convention says 2px) and puts `className` on the input instead of the root.
  - [verified] **Open code decisions are mirrored faithfully in Figma:**
    - Alert's reversed warning/danger icons.
    - Menu's line height.
    - ToggleGroup's segmented look.
    - Icon drift: 4 chevron drawings, and 2 checks with different strokes (1.75 vs 2).
  - [verified][docs] **Docs pages are useful but thin on guidance.** Getting started explains the why. Each page shows the CSS that actually ships, with its text styles, which is excellent for designers. But there's no anatomy, do/don't or usage guidance.
- **Not inspected:** rendered output (Station 3 covers it); Figma prototype interactions.
- **Deviations noted:** Figma copies the code's drift (icons, 2px nudges); motion isn't mirrored in Figma.
- **First move:** add one global reduced-motion rule and switch the 19 left/right declarations to logical ones. Then add both rules to `validate`.

### Station 3 — Accessibility: 🔴 RED (3/10)
- **Sampled:**
  - Code read for Button, IconButton, Dialog, Menu, Tabs, Checkbox, Switch, Select, TextField, Alert, Badge and Toggle.
  - 16 stories rendered in light and dark with axe.
  - Keyboard tested live on Tabs, Menu, Select and Dialog.
  - **Design side:** all 35 Color variables contrast-checked in Light and Dark mode, and 11 Figma pages read. There is no annotation kit.
- **Evidence level:** code, rendered stories and Figma all live.
- **Findings:**
  - [verified] **Contrast fails in 28 of 80 painted colour pairs** (40 pairs × 2 modes): 8 in light, 20 in dark.
    - **Dark, buttons (1.4.3):**
      - primary Button text 4.47:1 (hover 2.98, pressed 1.99)
      - danger Button 3.76:1 (hover 1.90)
      - ghost Button / active Tab 3.45:1 on a surface
    - **Dark, Alert and Badge (1.4.3):**
      - Alert body text 2.42–3.12:1
      - Badge text 1.72–2.56:1
      - field error text 4.10:1
    - **Dark, Alert icons (1.4.11):** all four fail, 1.72–2.56:1.
    - **Light (1.4.3):** Badge success, warning and danger text 3.00, 2.86 and 3.95:1.
    - **Control edges (1.4.11):**
      - TextField, Select and Textarea border 1.30:1 in light, 1.89:1 in dark
      - Checkbox box and Switch off-track 1.42–1.49:1 in light
  - [verified] **Figma matches the code value for value (70 of 70),** so it fails the same 28 pairs. The Foundations page says the `on-*` colours are "contrast-paired", but in dark mode they aren't.
  - [verified] **The rendered check agrees.** Axe flags colour contrast in Badge (light), and in Button, Tabs, the Dialog trigger, Alert and Badge (dark). Axe can't see the border failures; only the token check does.
  - [verified] **Behaviour is sound, thanks to Base UI.**
    - Tabs use roving focus with arrow keys.
    - Menu and Select open with ArrowDown and close with Escape, and focus comes back to the trigger.
    - Dialog traps focus.
    - IconButton requires a `label`.
    - Alert uses `role="alert"` for danger and `status` for the rest.
    - The focus ring passes on every surface (4.47–5.17:1).
  - [verified] **Dialog focus return:** in the test harness, focus landed on `<body>` after Escape, not back on the trigger (2.4.3). Check this by hand; the harness may cause it.
  - [verified] **The Checkbox can't be tested at all.** Every standalone story crashes, in both themes.
  - [verified] **Reduced motion:** only 5 component stylesheets handle it (Accordion, Collapsible, Progress, ScrollArea, Spinner). Dialog, Menu, Select, Switch and the Tabs indicator always animate.
  - [verified] **No safety net.**
    - `ci.yml` has no accessibility step.
    - `a11y: { test: 'error' }` in `preview.tsx` has no test runner behind it.
    - There are no keyboard tests and no screen-reader test plan.
  - [verified] **The definition of done says "clean a11y panel in both themes"** (CONTRIBUTING). That's broken today in 6 stories, plus the Checkbox crash. Switch's `DescriptionOnly` fails on purpose, to teach the pitfall.
  - [verified] **Figma has no focus or error examples, and 0 annotations** on the 11 pages read. The missing variants are a documented decision (`GAPS.md`: they're CSS states, not props), so this counts as a spec gap for designers, not drift.
- **Not inspected:**
  - VoiceOver, forced colours, zoom and reflow.
  - Keyboard behaviour of the other ~33 components.
  - Toast and AlertDialog announcements.
  - Open popups in axe.
- **Deviations noted:** CSS states aren't Figma variants (documented). Figma follows the code.
- **First move:** retune the status and dark-mode colour tokens until every painted pair passes in both modes. Then put that check, and axe, into CI.

### Station 4 — Shared language: 🟡 YELLOW (7/10)
- **Swept:**
  - Prop types of all 42 components.
  - Every token name against the 176 live Figma variables, 14 text styles and 3 effect styles.
  - Button, Alert, Badge, Toast and Toggle traced across Figma, code and docs.
  - All 49 story titles.
  - The name checks in `validate.mjs`.
- **Evidence level:** code, tokens and docs live · Figma live (whole variable list, 8 pages).
- **Findings:**
  - [verified] **One clear token naming rule.**
    - Tier 1 is named by value, tier 2 by role, and each Figma name is the token path with `.` → `/`.
    - The live variable list hashes the same as `figma/manifest.json`, and 68 of 76 Color values are aliases.
  - [verified] **All five traces match word for word.** For example, Button is `variant=primary|secondary|ghost|danger`, `size=sm|md|lg`, `disabled` in Figma and in code, with the same defaults.
  - [verified] **`danger` vs `error`.** Everything says `danger` except Toast, whose `type` is `error` in code and in Figma.
  - [verified] **A status that doesn't match its colour.** Toast `success` draws the *accent* border in code and in Figma. Alert and Badge use the success colour.
  - [verified] **`primary` vs `accent`.** Button and IconButton `primary` fill with the accent colour, while Badge and Meter call the same emphasis `accent`.
  - [verified] **Small flag split:** `clearable` sits beside `showTrigger`, `showChevron` and `showValue`, and Table's `hideCaption` flips the direction.
  - [verified] **The docs disagree with the code about IconButton.** `CLAUDE.md:47` and `GettingStarted.mdx:37` say it has no Base UI primitive, but it wraps `@base-ui/react/button`.
  - [verified] **4 of 49 story titles have no group** (Button, Dialog, Switch, TextField). `conventions.md:32` points to a "build brief" that isn't in the repo.
  - [verified] **Icon names describe drift.** `icon/chevron-down-accordion`, `icon/chevron-right-collapsible` and `icon/check-checkbox` are named after their owner, not their shape.
  - [verified] **Guardrails.**
    - `validate` fails CI on a renamed prop or token.
    - Nothing checks that the prop vocabulary is the same *across* components, so `danger`/`error` passes.
    - The vocabulary is written only in the project brief and the `figma-mirror` contract, not in `conventions.md`.
- **Not inspected:** layer names beyond the sampled sets; the rendered docs pages.
- **Deviations noted:** no Code Connect; two token tiers; Figma follows the code's icon drift.
- **First move:** add a short prop vocabulary to `docs/conventions.md` (`danger`, never `error`; what `primary` means vs `accent`; `show*` for optional parts). Then rename Toast's `error` in code and Figma together.

### Station 5 — Testing & validation: 🟡 YELLOW (5/10)
- **Inspected:**
  - `ci.yml`, with every step run locally in CI order and in reverse.
  - `validate.mjs`, read in full.
  - All 50 story files.
  - The `figma-mirror` audit.
  - The GitHub Actions history.
  - Two render probes of the Checkbox.
- **Evidence level:** live.
- **Findings:**
  - [verified] **CI exists and passes.** It runs on every PR into `main` and on pushes to `main` and `design`.
    - Lint shows 0 errors and 105 warnings; warnings don't fail the run.
    - `validate --strict`, build and build-storybook all pass locally, each in under 6 seconds.
  - [verified] **`validate` is a real, deterministic net for AI-written code.** It catches unknown tokens, tier-1 tokens in components, raw colours, raw type in components, split text styles, patterns drawing surfaces, token names in docs, and the Figma manifest against the code (names and structure).
  - [verified] **CI runs `validate` before the Storybook build.** So the manifest-gap check and the Figma variant-value and default checks are skipped in CI; the log says "components.json not found". In reverse order they run and find nothing, so nothing is hidden today, but they can't catch anything on a PR.
  - [verified] **Nothing asserts behaviour.**
    - 0 test files, 0 `play` functions and 0 `storybook/test` imports across 251 stories.
    - No test runner, visual regression or Chromatic in `package.json`.
  - [verified] **Nothing renders a story in CI.** `build-storybook` only compiles.
  - [verified] **The silent-bug test fails.**
    - The standalone Checkbox throws "FieldRootContext is missing" in all 8 of its stories.
    - **New this pass:** both SignUpForm pattern stories crash the same way.
    - CI was green on `7429586` with both crashes in place.
    - `conventions.md` says "every story must render without console errors", and nothing enforces it.
  - [verified] **The design-side audit** (`audit.figma.js`) exists and runs by hand through the `figma-mirror` skill, never in CI.
  - [verified] **No evals for AI-written output** beyond `validate`'s deterministic half.
  - [verified] **Definition of done:** CONTRIBUTING asks for a story per state, a clean a11y panel and green CI. It doesn't mention `validate`; `CLAUDE.md` does.
- **Not inspected:** `npm ci` (no installs allowed; local Node 24 vs CI's Node 22).
- **Deviations noted:** "no CI gauntlet or eval gate" and "validate warn-only locally" (GARAGE). A crashing story passing CI is covered by neither.
- **First move:** add a smoke step that renders every story, and check that it goes red on today's Checkbox before the fix lands.

### Station 6 — Orchestration: 🟡 YELLOW (7/10)
- **Diffed:**
  - Button, Alert, Badge, Toast and Toggle, live Figma against code.
  - Tokens JSON → CSS → Figma.
  - `figma/manifest.json` and `GAPS.md` against all 42 components.
  - Every line of the README, CONTRIBUTING, `docs/*.md`, `GettingStarted.mdx` and `CLAUDE.md`.
  - 12 `validate` mutation experiments.
  - `main` vs `design` on GitHub.
- **Evidence level:** live.
- **Findings:**
  - [verified] **Design matches code on all five components.** Button primary resolves to `#4f46e5` on both sides and danger to `#dc2626`; padding is `space/4` and `space/2`, radius `radius/md`.
  - [verified] **One token source.** DTCG JSON feeds both Style Dictionary and `tokens-to-figma.mjs`. Updating Figma is a deliberate agent step (the `figma-mirror` skill), not automatic.
  - [verified] **The drift check misses more than it catches.** 3 of 11 mutations fail CI and 2 more fail only locally (full table below).
    - It catches renamed props and renamed tokens.
    - It misses a changed token value, a changed stylesheet, a new variant value, a new component, and a component deleted from the manifest.
    - It compares against the *committed* snapshot, so a change made in Figma is invisible until someone re-snapshots.
  - [verified] **Completeness is checked one way only.** Every Figma entry must point at code, but code never has to reach Figma. Form, ScrollArea and ContextMenu aren't mirrored and aren't listed in `GAPS.md`, although `GAPS.md:5` says "anything not listed is expected to match".
  - [verified] **"Mirrored in Figma" is in no definition of done:** not in `conventions.md`, CONTRIBUTING or `CLAUDE.md`'s "after you change UI" list, and there's no PR template.
  - [verified] **`design` is 15 commits behind `main`, 0 ahead.** The Figma library, manifest and checks haven't reached the branch where Figma and code are meant to meet.
  - [verified] **19 stale docs lines** (list below). Open PR #3 (CI green) removes `project-brief.md` and 5 of them with it.
  - [verified] Alert's reversed warning/danger icons are mirrored faithfully in Figma.
  - [reported] Earlier today's whole-file audit (1,184 layers unbound: 0) and the 97/97 fingerprint match. Only five components were re-verified this pass.
- **Not inspected:** the other 34 component pages; screenshot comparisons.
- **Deviations noted:** no Code Connect (a generated manifest instead); `design` is one-way.
- **First move:** in `ci.yml`, build Storybook before running `validate --strict`. It's one line, and two checks start working in CI.

| Mutation (on a private copy)                        | Fails CI? | Fails locally? |
|:----------------------------------------------------|:---------:|:--------------:|
| M1 delete Button from `figma/manifest.json`         | no        | no             |
| M2 add a Button variant value `link` in code        | no        | no             |
| M3 change the token value brand-600 → `#000000`     | no        | no             |
| M4 change Button's padding in CSS                   | no        | no             |
| M5 rename the prop `variant` → `appearance`         | **yes**   | yes            |
| M6 rename the value `danger` → `destructive`        | no        | **yes**        |
| M7 change Button's default size `md` → `sm`         | no        | **yes**        |
| M8 rename the token `background.accent`             | **yes**   | yes            |
| M9 add a new component (Chip)                       | no        | no             |
| M10 delete a `GAPS.md` row                          | no        | no             |
| M11 rename `Alert.onDismiss` → `onClose`            | **yes**   | yes            |

**Stale docs lines (19):**
- **README:**
  - `README.md:49` says "Gitflow".
  - `README.md:83` lists Code Connect.
  - `README.md:82` credits the Figma Console bridge and has no component-library line.
  - `README.md:33-34` says `scripts/` holds only one script.
  - `README.md:60` says only tier 2 maps to Figma.
- **`docs/architecture.md`:**
  - `:60` says "nothing catches that drift".
  - `:61` lists Code Connect.
- **`CLAUDE.md`:**
  - `:47` claims IconButton has no Base UI primitive.
  - `:61-65` says "4 checks" and "what CI would use".
  - `:79-80` says Figma value drift "fails CI".
- **`src/GettingStarted.mdx`:**
  - `:37` repeats the IconButton claim.
  - `:29` says "5 properties" (it's 6).
- **`scripts/validate.mjs:5`** says "what CI would use".
- **`docs/project-brief.md`:**
  - `:216-217` says the code default is checked in CI.
  - `:265-266` says PR #2 is "in review".
  - `:283` says "next: merge → publish".
  - `:43` refers to a deploy promise that doesn't exist.
- **The template promise:** `docs/project-brief.md:56` and `docs/branching.md:38`.
- **Others:**
  - `docs/conventions.md:32` points to a missing "build brief".
  - `figma/GAPS.md:5` says "anything not listed is expected to match".

### Station 7 — Governance & version control: 🟡 YELLOW (5/10)
- **Inspected:**
  - CONTRIBUTING, `branching.md`, conventions, README and `.github/`.
  - Via `gh`: repo settings, protection, rulesets, tags, releases, issues and PRs #1–#4.
  - `main`'s history.
- **Evidence level:** live, read-only.
- **Findings:**
  - [verified] **The process docs are clear and short.** CONTRIBUTING has one part for engineers and one for designers, and `branching.md` is authoritative.
  - [verified] **Missing:** a PR template, issue templates, CODEOWNERS, a release doc and a CHANGELOG. There has never been a CHANGELOG.
  - [verified] **No releases.** `package.json` is `0.0.0`, with 0 tags and 0 releases. `branching.md` promises tags (`v0.1.0`) and a generated changelog.
  - [verified] **`main` is unprotected:** protection 404, rulesets `[]`. `branching.md` lists the settings to turn on, but names the required check `ci`; GitHub reports it as `build`.
  - [verified] **Not a template.** `is_template: false`, while `branching.md:38` tells students "Use this template".
  - [verified] **The tracker is unused:** 0 issues ever. The known bugs live in `GAPS.md`, the PR #2 body, the brief and the skill.
  - [verified] **Paper vs reality:**
    - PR #2 and #3 followed the path: `feature/*` → PR → green `build` check.
    - PR #1 merged after 5 minutes, with no checks run.
    - All non-merge commits follow Conventional Commits.
    - `design` was never merged into `main` (as intended).
  - [verified] **Ownership isn't written down.** `branching.md` says "one person maintains it" without a name, and there's no CODEOWNERS. In practice every commit and merge is Christine's. This morning read the same facts as "clear"; this pass reads them as unrecorded (see *What changed*).
  - [verified] **In flight:** PR #3 (decisions doc, CI green) and **PR #4 (publish Storybook to GitHub Pages)**, opened 17:02 today from Christine's account, during this inspection. It isn't on `main`, so it isn't scored.
  - [verified] **Housekeeping:** delete-branch-on-merge is off, so `feature/figma-mirror` is still there.
- **Deviations noted:** solo owner with no approvals; `design` one-way.
- **First move:** turn on the protection `branching.md` already describes (require a PR and the `build` check, block force-pushes), and tick "Template repository".

### Station 8 — Feedback & adoption: N/I (not applicable)
- There are no consuming product teams, so this station is N/I by agreement, not a guess.
- **What would unlock it:** the first learner cohort. For this project, the equivalent of adoption telemetry is where learners get stuck.

### Station 9 — Machine-readable docs & context: 🟡 YELLOW (7/10)
- **Inventoried:**
  - DTCG tokens (238), generated into CSS.
  - Typed props.
  - The Storybook `components.json` (generated on every build, gitignored).
  - `figma/manifest.json`, `CLAUDE.md` and one project skill.
  - Missing: no `llms.txt`, `AGENTS.md` or `.cursorrules`.
- **Generation test:** run. **Grade A−.** A fresh agent built an *Account settings* page (a Profile form, notification switches, a radio choice, a Danger zone with a confirm dialog, and a Save toast) using only the repo's context.
  - `validate --strict`, lint, `tsc` and the Storybook build all passed first time.
  - It used 12 system components and invented no props. Every type came from whole text styles and all spacing from tokens.
  - It read no component source: the manifest and story snippets were enough.
  - Cost: 46 tool calls, about 50k tokens read, about 9 minutes.
- **Evidence level:** live (repo, the manifest built from `main`, Figma on all 43 pages).
- **Findings:**
  - [verified] **`CLAUDE.md` is strong.** Its rules are phrased as rules, and all 13 paths it names exist.
  - [verified] **14 of 42 components have no description:** Accordion, AlertDialog, Collapsible, Dialog, Fieldset, Menubar, NavigationMenu, Popover, PreviewCard, ScrollArea, Separator, Tabs, Toolbar, Tooltip. Only **4 of 42** say when to use them instead of a neighbour.
  - [verified] **Compound parts are invisible to agents.**
    - `RadioGroupItem`, `FormActions` and Card's parts have no manifest entries.
    - Tabs, Menubar, NavigationMenu, Toolbar and Toast document 0 props.
    - The test agent learned how to fire a Toast only from the story file.
  - [verified] **Colour roles are barely described:** 2 of 35 semantic roles have a `$description` (4 of 107 colour tokens across both modes).
  - [verified] **37 of 97 Figma descriptions show raw HTML entities** (76 in all), e.g. `Rendered as &lt;span aria-current=&quot;page&quot;&gt;`. Designers and agents both read them that way. Spot-checked by the orchestrator on the Breadcrumb page: 3 of 4 affected.
  - [verified] **The example layer breaks the rules, and no check notices.**
    - `src/patterns/Patterns.module.css` sets font sizes by hand.
    - `validate`'s text-style rules only scan `src/components/`.
    - An agent that copies the patterns, as `CLAUDE.md` rule 3 suggests, goes off-system and every check still passes. The test agent noticed and didn't copy it; a less careful one would.
  - [verified] **Patterns reach agents empty.** Through the Storybook MCP, a pattern returns only its story names, no code.
  - [verified] **Conflicting instructions.** The Storybook MCP tells agents never to answer prop questions from source; `CLAUDE.md` says to read the Base UI types when the manifest is thin. For Tabs (0 props documented) they collide.
  - [verified] **The rule for one design call contradicts itself:** Switch vs Checkbox on a form with Save. Switch's description says a switch applies immediately, but the SettingsPage pattern mixes switches with Save. The test agent picked Switch and flagged it.
  - [verified] **Stale:** the brief says the MCP addon ships one tool, but it serves 7.
- **Not inspected:** Figma variable descriptions; every JSDoc block in full.
- **Deviations noted:** no Code Connect; two token tiers.
- **First move:** describe the 14 components and the compound parts in JSDoc, and extend `validate`'s text-style rules to `src/patterns/` (fixing the patterns). Then re-run the generation test.

### Station 10 — Agent access: 🟡 YELLOW (6/10)
- **Surfaces mapped:**
  - The Storybook MCP (dev server only).
  - The official Figma MCP (live).
  - `CLAUDE.md`, the `figma-mirror` skill and `.claude/launch.json`.
- **Live test:** the Station 9 generation test, through `CLAUDE.md` and the generated manifest. **Grade A−**, on-system.
- **Evidence level:** live. The Storybook MCP was started from `main` on a private port, probed, and stopped.
- **Findings:**
  - [verified] **The Storybook MCP works and is a real catalog.** On `main` it serves 7 tools, including `docs-list` (42 components, 4 foundations, 4 patterns) and `docs-show` (description, typed props, snippets). This morning the tool list was `[reported]`; now it's verified.
  - [verified] **No agent config registers it.** There's no `.mcp.json` on any ref or in the workspace, and none in Claude Code, Cursor or Claude Desktop on this machine.
  - [verified] **Port 6006 serves the `design` folder,** so an agent pointed at the default port reads `design`, not `main`.
  - [verified] **Not reachable off this machine yet.** There's no published Storybook (PR #4 would fix that) and no `AGENTS.md`, so Cursor, Copilot and Codex get none of the rules.
  - [verified] **Discoverability is near zero.** README, Getting started, `CLAUDE.md` and CONTRIBUTING never say how to connect an agent to Storybook or to Figma.
  - [verified] **One repeatable workflow ships with the repo:** `figma-mirror` (code → Figma, with a "when to stop" section). GARAGE says "two project skills", but only one is in the repo; `ds-inspection` and `ds-ascii` are user-level skills, and students don't get them.
  - [verified] **Figma → code has no workflow.** Nothing covers the way back: resolving a Figma frame to real components, or prototyping a screen on `design`.
  - [reported] The Figma library is published (GARAGE, checked earlier today).
- **Deviations noted:** no Code Connect, by decision.
- **First move:**
  - Commit `.mcp.json` registering the Storybook MCP.
  - Add a "Connect your agent" section to the README.
  - Merge PR #4.

## What changed since this morning

**The system didn't change.** `main` is on the same commit (`7429586`), and 0 of this morning's 14 work-order items are closed. So every movement below is the inspection measuring again, not the system moving. In flight but not scored:
- PR #3, the decisions doc, which clears 5 stale lines.
- PR #4, publish Storybook, opened during this pass.

| Station          | Morning | Now   | Move | Why                                                                                                                                                  |
|:-----------------|:-------:|:-----:|:----:|:-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 Coverage       | 🟡 7    | 🟢 8  | +1   | **A real change:** the Figma library was published after this morning's pass, so the "nothing is distributed" light is off. Everything else is the same: 39 of 42 mirrored, the Checkbox crash, no Link or Pagination. |
| 2 Best practices | 🟡 7    | 🟡 7  | =    | The inspector verified the Figma craft directly this time, across all 43 pages (0 detached instances; 2,275 of 2,295 spacing values bound). The RTL count is 19 (was 18).                     |
| 3 Accessibility  | 🔴 3    | 🔴 3  | =    | Same picture, sharper. 40 painted pairs checked instead of 35 (28 fail, was 22), stories rendered with axe, and Figma's variables checked directly.  |
| 4 Shared language| 🟢 8    | 🟡 7  | −1   | The same splits both times (`primary`/`accent`, `danger`/`error`). This pass also found Toast `success` on the accent colour, the IconButton contradiction, and 19 stale lines instead of 7, and weighed "nothing checks vocabulary across components" harder. A boundary call. |
| 5 Testing        | 🟡 5    | 🟡 5  | =    | The SignUpForm crash went from "very probably" to confirmed.                                                                                         |
| 6 Orchestration  | 🟡 7    | 🟡 7  | =    | 11 mutations instead of 10. Confirms that code never has to reach Figma (M1, M9).                                                                    |
| 7 Governance     | 🟡 6    | 🟡 5  | −1   | The same facts. This morning read ownership as "clear: one named maintainer"; this pass found the name written nowhere. Also new: the required check is `build`, not `ci`. |
| 8 Feedback       | N/I     | N/I   |      | Not applicable.                                                                                                                                      |
| 9 AI-readable    | 🟢 8    | 🟡 7  | −1   | The generation test passed both times (A, then A−). This pass counted 37 messy Figma descriptions (this morning's count only looked for code-like text), found that patterns reach agents empty, and found that the MCP and `CLAUDE.md` give conflicting instructions. A boundary call. |
| 10 Agent access  | 🟡 7    | 🟡 6  | −1   | The Storybook MCP is now verified live, which is a plus, but this pass weighed discoverability harder. The library was published after this morning's pass, which neither score credits. Honestly a 6–7. |
| **Overall**      | **64\*** | **61\*** | −3 | 55/90, pro-rata. One real +1, four boundary −1s.                                                                                                     |

**What this tells us.** On an unchanged commit, four stations moved by one point, each at a boundary. Every major finding from this morning came back this afternoon, so the *findings* are stable. The *scores* are judgment, and carry about ±1 per station, which adds up to about ±4 overall. Read a movement under about 5 points as noise. The signal is which lights went off and which work-order items closed.

**New evidence this pass** (everything else confirms this morning):
- **Crashes:** SignUpForm crashes too, in 2 of 2 stories.
- **Colour:**
  - Toast `success` uses the accent border.
  - 5 more painted pairs were checked, including primary pressed (1.99:1), error text (4.10:1) and the Alert icons (1.4.11).
  - Figma matches code 70 of 70 on colour.
- **Agent access:**
  - The Storybook MCP serves 7 tools on `main`.
  - Port 6006 serves `design`, not `main`.
- **Keyboard:** Dialog may not return focus after Escape. Check by hand.
- **Process and docs:**
  - GitHub names the required check `build`, not `ci`.
  - 19 stale docs lines, up from 7.
  - PR #4 was opened during this pass.
- **Design:**
  - Icon drift is 4 chevron drawings, not 3.
  - 37 of 97 Figma descriptions show raw HTML codes.
- **GARAGE correction:** one project skill ships in the repo, not two.

## Next service

- Work order: `ds-inspection/work-orders/2026-09-11-work-order-2.md`. It replaces this morning's; the items are the same plus this pass's new ones.
- Recommended cadence:
  - Deep inspection quarterly.
  - Stations 3 and 5 as a quick pass as soon as the colours, Checkbox and story rendering land.
  - Stations 4, 6 and 9 already run partly in CI through `validate`. Wire the contrast check and a story render in too.
- Re-inspect by: 2026-12-11, or as soon as the first three work-order items are merged.
- **Don't re-run the full inspection on an unchanged commit again.** This pass shows what that buys: finer evidence, the same picture, and ±1 of scoring noise.
