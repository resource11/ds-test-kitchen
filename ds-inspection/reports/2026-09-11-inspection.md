# Multi-Point Inspection Report — Sample Design System (`sds`)

_Inspected: 2026-09-11 · Technician: Claude Code (Claude Opus 5), orchestrating three station inspectors · Previous inspection: 2026-09-10_
_Vehicle profile: `ds-inspection/GARAGE.md` (checked in 2026-09-11) · Branch inspected: `main` @ `7429586`, right after the Figma library merged (PR #2)_

## The short version

The system moved forward on almost every front in a day:
- CI runs, with `validate --strict` in it.
- Both feature branches reached `main` through pull requests.
- The Figma library went from empty to a full mirror: 39 of 42 components plus 28 icons, every layer bound to a token, and the manifest matching Figma 97 of 97.
- Names agree across code, tokens and Figma, and a renamed prop now fails CI.

The light that's on is **accessibility**. 22 of 70 contrast checks fail at the token level (13 of 18 in dark mode, including the primary button), and nothing automated would catch it. The same gap let a **crashing Checkbox** merge with CI green: CI builds stories but never renders one.

The drift guard is also **weaker than the docs say**:
- It checks names, not values.
- It only checks one way: what Figma has must exist in code.
- In CI it skips its Figma variant checks, because it runs before Storybook is built.

**Do this Monday:** retune the contrast tokens until `contrast-pairs.mjs` passes, and make CI run it. Then add a CI step that renders every story with axe, and fix the Checkbox.

**Overall: 64/100\*** (58 on 2026-09-10) is a conversation starter, not a grade. Fix the red, schedule the yellows, and re-run on a cadence.
\*Score is pro-rata to 100 from 58/90. One station wasn't inspected: Station 8 doesn't apply, because there are no consuming teams.

## Inspection sheet

Each station asks one plain question. For each, the table gives the one thing designers (🎨) and developers (🛠️) need to do; a dash (–) means nothing. Scores are out of 10.

_Since the inspection, the Figma library has been published (checked in Figma's library search on 2026-09-11)._

|  # | Station          | What it checks                         | 🎨 Design                                         | 🛠️ Dev                                               | Before | Now          |
|---:|:-----------------|:---------------------------------------|:-------------------------------------------------|:-----------------------------------------------------|:------:|:------------:|
|  1 | Coverage         | Do we have the components people need? | Design hover, focus and error states             | Fix the Checkbox crash and the invisible separator   | 🟡 6   | 🟡 7         |
|  2 | Best practices   | Are the components built well?         | –                                                | Add right-to-left and pixel rules                    | 🟡 7   | 🟡 7         |
|  3 | Accessibility    | Can everyone use it?                   | **Pick new colours (22 fail)** · design the focus ring | Add the contrast check to CI                   | 🟡 4   | 🔴 **3**     |
|  4 | Shared language  | Same names everywhere?                 | Choose `primary` or `accent`                     | Fix 7 stale docs lines                               | 🟡 7   | 🟢 **8**     |
|  5 | Testing          | Do checks catch mistakes?              | –                                                | Open every story in CI · protect `main`              | 🔴 3   | 🟡 **5**     |
|  6 | Orchestration    | Do code and Figma stay in step?        | ⚠️ No alert yet when Figma falls behind          | Make the Figma check two-way, and catch Figma going stale | 🟡 6   | 🟡 7         |
|  7 | Governance       | Is there a clear process?              | –                                                | Tags, changelog, bug tracker                         | 🟡 5   | 🟡 6         |
|  8 | Feedback         | Do people use it?                      | –                                                | –                                                    | N/I    | N/I          |
|  9 | AI-readable docs | Can AI build with it?                  | Write "when to use" notes                        | Put the notes where AI reads them                    | 🟢 8   | 🟢 8         |
| 10 | Agent access     | Can AI tools reach it?                 | –                                                | Register the Storybook MCP, add `AGENTS.md`          | 🟡 6   | 🟡 7         |
|    | **Overall**      |                                        |                                                  |                                                      | **58** | **64/100\*** |

**Lights:** 🟢 2 green · 🟡 6 yellow · 🔴 1 red · 1 not inspected

**Key:** 🔴 Red (0–3) — broken or missing; the light is ON · 🟡 Yellow (4–7) — drift or gaps; schedule a fix · 🟢 Green (8–10) — healthy, no action needed · **N/I** — not inspected (no evidence access; never guessed)

## Evidence basis

- **Design library:** live, whole-file, through the Figma MCP's `use_figma`, which runs the Plugin API.
  - Today's orchestrator read: 43 pages, 97 components (49 sets, 48 single), 176 variables (173 with web code syntax; the 3 elevation colours have none by design), 14 text styles, 3 effect styles.
  - Earlier today: a full audit of 1,184 layers found nothing unbound, and a fingerprint of every component matched `figma/manifest.json` 97 of 97.
  - The station inspectors couldn't sign in to the native Figma connector (`plugin:figma:figma` needs authorising), so they cited the orchestrator's reads.
- **Code:** live, on the `main` worktree.
  - `validate --strict` found nothing, `tsc` found 0 errors, and lint found 0 errors with 105 warnings.
  - Contrast was computed from the token JSON with `contrast-pairs.mjs`.
  - Ten `validate` mutation tests were run on a throwaway copy.
- **Docs:** live. The Storybook manifest is current: built 2026-09-10 20:20, with no source changes since.
- **Process:** live, through git and `gh`: PRs, Actions runs, branch protection and repo settings.
- **Generation test:** run again, with a fresh agent grounded only by the repo (Station 9).
- **Not rendered this time:** the dev server on :6006 serves the other folder (`design`), so there were no axe runs on rendered stories. Last time there were.
- **Findings tagged `[verified]`:** all but one. **`[reported]`:** 1, the Storybook MCP's live tool list, because the server was down.

## Station records

### Station 1 — Coverage & gaps: 🟡 YELLOW (7/10)
- **Inventory:**
  - Design: 39 components (97 Figma entries: 69 components or sets plus 28 icons).
  - Code: 42.
  - Docs: 42 of 42 have a Storybook page; 28 of 42 have a description.
- **Evidence level:** design live (orchestrator) · code live · docs live
- **Findings:**
  - [verified] **The three legs are now even.** Figma mirrors 39 of the 42 folders in `src/components/`. ContextMenu, Form and ScrollArea are left out by a decision recorded in `SKILL.md` and the brief, but they are **not listed in `figma/GAPS.md`**. That file says "anything not listed is expected to match".
  - [verified] **14 of 42 components have no manifest description:** Accordion, AlertDialog, Collapsible, Dialog, Fieldset, Menubar, NavigationMenu, Popover, PreviewCard, ScrollArea, Separator, Tabs, Toolbar, Tooltip. Their JSDoc sits at the top of the file, not on the exported component. 6 list 0 props.
  - [verified] **Two staples are broken in code:**
    - The standalone **Checkbox** crashes. `Field.Item` is used without `Field.Root`, which throws "FieldRootContext is missing". All 8 Checkbox stories render it standalone.
    - The **SignUpForm** pattern probably crashes the same way (`SignUpForm.stories.tsx:122`).
    - **`Select.Separator`** renders nothing.
  - [verified] **Gaps against the staple list** (benchmarked from knowledge; no knowledge MCP is connected):
    - No Link, Pagination, empty state or Skeleton. The patterns themselves note "there is no Link component".
    - No date picker, stepper, tree view or file upload.
    - No Drawer, because Base UI 1.8.0 has none.
    - Button has no loading state.
  - [verified] **Control heights are still raw pixels:** 40px ×13, 32px ×10, 24px ×6, 48px ×5, 20px ×4. There is no size token.
  - [verified] **Nothing is distributed:**
    - The package is private at `0.0.0`, with no release tags and no releases.
    - Storybook isn't published.
    - The Figma library isn't published.
    - `branching.md` tells students to press "Use this template", but the repo is not a template (`is_template: false`).
- **Deviations noted:** no Code Connect, and two token tiers. The three components left out of Figma, and hover and focus not mirrored, are both recorded decisions.
- **First move:** turn on "Template repository" and tag `v0.1.0`, so the one distribution channel the docs promise actually exists.

### Station 2 — Best practices: 🟡 YELLOW (7/10)
- **Sampled:**
  - Read in full: Button, IconButton, Checkbox, Alert, Dialog and Tabs (TSX), and Button, Badge, Alert, TextField and Checkbox (CSS).
  - All 42 CSS modules checked by grep.
  - The docs page template, and the Figma audit results.
- **Evidence level:** code live · docs live · design live (orchestrator)
- **Findings:**
  - [verified] **House rules are written down and enforced by machine.** `validate --strict` reports nothing, and 0 type errors. Lint has 105 warnings: 103 are `only-export-components`, which the house `Object.assign` compound pattern triggers. On 2026-09-10 there were 8, and more compounds exist now. The lint rule and the house pattern contradict each other.
  - [verified] **Component code is good.** All behaviour comes from Base UI, with no hand-rolled focus or keyboard handling. Styling reads Base UI's data attributes, and the comments explain why.
  - [verified] **RTL is still half-done:** 18 physical-direction declarations against 17 logical ones. Examples are `Table.module.css` `text-align: left/right`, Menu's `margin-left: auto` and `padding-left`, Toast's `right`, and the NavigationMenu and Tabs offsets.
  - [verified] **"No magic pixel" is written but not enforced.** Beyond the control heights there are six `13px` arrow offsets and Alert's `margin-top: 2px`, and `validate` has no pixel rule.
  - [verified] **The icons have drifted:** two chevron-down drawings, two chevron-right drawings, and a check at two stroke widths. There is no shared icon module, and Figma mirrors the drift on purpose.
  - [verified] **Code decisions are open:**
    - Alert's warning icon is a diamond and its danger icon a triangle, the reverse of the usual convention. The comment says this is deliberate.
    - Menu uses a line height that no text style has. The CSS marks it `validate-allow: type` as an open decision.
  - [verified] **Docs pages are useful but thin on guidance.** Each page has the description, primary story, controls, stories, and the component's own CSS with its text styles. There is no anatomy, no do/don't and no usage guidance.
  - [verified] **Stale docs:**
    - README calls the branching model "the Gitflow variant".
    - `architecture.md` roadmap item 5 says "nothing catches that drift today".
    - Roadmap item 6 lists Code Connect.
  - [verified] **The design-file craft is strong.**
    - Across 1,184 layers, nothing is unbound (orchestrator's read).
    - `GAPS.md` gives a reason for every divergence.
    - `audit.figma.js` makes the check repeatable.
  - [verified] **Figma descriptions are inconsistent** (orchestrator's read):
    - 13 components from the first session put a sentence before "Contract —", against the skill's own rule. They are Alert, Avatar, Badge, Button, Card, Separator, the 4 Breadcrumb parts and the 3 NavigationMenu parts.
    - 6 of those descriptions show escaped HTML (`&lt;a&gt;` where `<a>` should be).
- **Not inspected:** auto-layout, layer names and detached instances in Figma, beyond what the audit covers. The other 36 components were checked by grep only.
- **Deviations noted:** no Code Connect. The icon drift is mirrored into Figma until the code consolidates it.
- **First move:** add a raw-pixel rule and a physical-property rule to `validate.mjs`, so they're enforced the way colour and type already are.

### Station 3 — Accessibility: 🔴 RED (3/10)
- **Sampled:**
  - Components: Button, IconButton, Checkbox, Alert, Dialog, Tabs.
  - Focus styles and reduced motion across all 42 CSS modules.
  - Contrast: 35 foreground and background pairs in both themes, from the token JSON (70 checks).
  - Design side: the Figma variables are generated from the same JSON, so their contrast results are the same.
- **Evidence level:** code and tokens computed live · design live (orchestrator) · not rendered this time
- **Findings:**
  - [verified] **Component semantics are sound:**
    - Behaviour comes from Base UI: Dialog traps focus, and Tabs moves focus with the arrow keys.
    - The type system requires accessible names: IconButton's `label`, Dialog's `title`.
    - Alert uses `role="status"`, and `role="alert"` for danger only.
    - 29 of 42 modules have `:focus-visible` rings. The other 13 aren't interactive, or leave focus to a child component.
  - [verified] **Contrast fails in both themes. 22 of 70 checks fail.**
    - **Light: 5 of 18 painted pairs fail.**
      - Badge text: success 3.00:1, warning 2.86:1, danger 3.95:1.
      - Input borders: 1.30:1.
      - Checkbox and Switch boundaries: 1.49:1.
    - **Dark: 13 of 18 fail.**
      - Primary button: 4.47:1 at rest, 2.98:1 on hover, 1.99:1 pressed.
      - Danger button: 3.76:1, 1.90:1 on hover.
      - Ghost button and active tab text: 3.45:1.
      - Alert body text: 2.42 to 3.12:1.
      - Badge text: 1.72 to 2.56:1.
      - Input borders: 1.89:1.
    - **Why dark mode fails:** button backgrounds get lighter on hover and press while the text stays white.
    - **Figma inherits every failure**, because its variables are generated from the same tokens.
  - [verified] **Nothing automated would catch it:**
    - CI has no axe step and no story rendering.
    - The `a11y: 'error'` setting in `preview.tsx` has nothing to run it.
    - `validate` has no contrast rule.
    - `contrast-pairs.mjs` isn't in the repo. It sits in this untracked folder.
  - [verified] **The definition of done is on paper only.** `conventions.md` says every story must "pass the a11y panel", but all 8 Checkbox stories throw.
  - [verified] **Reduced motion:** only 5 components respect it. 28 animated modules don't, and there's no global rule. Low severity (AAA).
  - [verified] **The design side:**
    - There is no focus ring or invalid state in Figma (recorded in `GAPS.md`), so designers have no focus ring to design with.
    - There is no annotation kit.
    - Accessible names do reach Figma: IconButton's `label` and Toggle's `aria-label` are carried as hidden text properties.
  - [verified] **Target sizes pass.** Controls are 32, 40 or 48px, and the Checkbox label is clickable.
- **Not inspected:** a rendered keyboard walk-through, screen readers, and the a11y panel on any story.
- **Deviations noted:** none.
- **First move:** retune `semantic.dark.json`, and the light status and border roles, until `contrast-pairs.mjs` passes. In the same PR, move the checker into `scripts/` and call it from `validate --strict`.

### Station 4 — Shared language: 🟢 GREEN (8/10)
- **Swept:**
  - Every prop the code adds, across all 42 components.
  - All tier-1 and tier-2 token names and the 14 text styles.
  - All 97 entries in `figma/manifest.json`.
  - A trace of Button, Card, Badge, Alert, Toggle, Select and Tabs across Figma, code and docs.
  - The vocabulary used in the docs.
- **Evidence level:** code, tokens and docs live · design live (orchestrator) plus the manifest
- **Findings:**
  - [verified] **Prop names are consistent:**
    - `size` is `sm | md | lg`, with default `md`, on all 8 components that have it.
    - Every visual choice is `variant`. Meter's `tone` → `variant` rename is done.
    - `label`, `description`, `showValue` and `orientation` mean the same thing everywhere.
  - [verified] **Token names follow one scheme.** Tier 2 is named by role, `validate` blocks tier-1 names in components, and each Figma name is the token path with `.` → `/`.
  - [verified] **Names match across the boundary.** Figma's Button is `variant=primary, size=md, disabled=false`, matching the code's props, values and defaults. All 7 traced components match.
  - [verified] **A renamed prop or token fails CI.** Tested on a throwaway copy:
    - Button `size` → `scale` fails with `figma-unknown-prop`.
    - The token `color.content.muted` → `subtle` fails with `figma-missing` and `figma-drift`.
  - [verified] **Four small vocabulary splits remain:**
    - Button and IconButton say `primary`; Badge and Meter say `accent`.
    - Toast uses `type` with `error`; everything else uses `variant` with `danger`.
    - IconButton's name is `label`; the icon-only Toggle's is `aria-label`.
    - Card's `variant` is a surface style, not a colour.
  - [verified] **7 stale docs lines:**
    - README says "Gitflow".
    - `architecture.md` says "nothing catches that drift".
    - README and `architecture.md` both list Code Connect.
    - `branching.md` calls the repo a template.
    - `GettingStarted.mdx` says a text style has "five" properties; it has six.
    - The brief says PR #2 is "in review".
    - `architecture.md` lists 6 composed components; `CLAUDE.md` lists 7.
  - [verified] **The prop vocabulary isn't written down.** It is not in `conventions.md`, and nothing checks it across components.
- **Deviations noted:**
  - No Code Connect.
  - Two token tiers.
  - Alert's `info` and Badge's `accent` are kept apart on purpose.
- **First move (green, so optional):**
  - Fix the 7 stale docs lines.
  - Add a prop-vocabulary section to `conventions.md` that settles `primary`/`accent` and `danger`/`error`, before students start naming things after the Figma library.

### Station 5 — Testing & validation: 🟡 YELLOW (5/10)
- **Inspected:**
  - `ci.yml`, and the log of run 34573700385.
  - `validate.mjs`, read in full and tested with 10 mutations.
  - The Storybook config and lint config.
  - A search for tests and play functions.
  - Branch protection.
  - The Figma audit and snapshot scripts.
- **Evidence level:** live
- **Findings:**
  - [verified] **CI runs on every PR into `main`:** `npm ci` → lint → `validate --strict` → build → build-storybook. All 3 runs are green.
  - [verified] **There are no behaviour tests.** 0 test files, 0 play functions across 251 stories, and no test runner.
  - [verified] **CI never renders a story, so a crashing component merges green.** The standalone Checkbox throws, and PR #2 and its merge push both passed.
  - [verified] **`validate` is weaker in CI than it looks.** CI runs it before `build-storybook`, and the log says "components.json not found". So the manifest-gap check and the Figma variant value and default check are skipped in CI. A Figma rename of Button `primary` → `main` is caught locally and passes under CI conditions.
  - [verified] **The a11y setting has no runner.** `a11y: 'error'` only affects the panel.
  - [verified] **No visual regression.** Chromatic is blocked on a token.
  - [verified] **`main` isn't protected** (404 "Branch not protected"), so "merge when CI is green" is a habit, not a gate.
  - [verified] **Design-side checks run by hand.** `audit.figma.js` and `snapshot.figma.js` are deterministic and thorough, but CI doesn't run them.
  - [verified] **The four known code bugs are real, and none has a test.**
- **Deviations noted:** no CI gauntlet or eval gate, by decision. This score is capped by nothing rendering, not by the missing evals.
- **First move:**
  1. Run `build-storybook` before `validate` in `ci.yml`. One line, and it switches on the skipped checks.
  2. Render every story in CI with axe. That needs a new dev dependency, so it's your call.
  3. Protect `main`.

### Station 6 — Orchestration: 🟡 YELLOW (7/10)
- **Diffed:**
  - The Figma manifest against the code: all 39 components, with 7 traced by hand.
  - The token pipeline to CSS and to Figma.
  - Docs against reality.
  - What's published against what's in the repo.
  - What `validate` actually notices, tested with 10 mutations.
- **Evidence level:** code, docs and process live · design live (orchestrator)
- **Findings:**
  - [verified] **Tokens have one source.** `tokens/*.json` feeds both the CSS and the Figma variables. `validate` imports the same payload to check Figma, and the only exceptions are the 3 Figma-only elevation colours, which are documented.
  - [verified] **Figma components are generated from the stylesheets, not retyped.** The fingerprint matches 97 of 97, and 1,184 layers are bound. `GAPS.md` has about 60 rows, each with a reason.
  - [verified] **Drift detection only checks names, and only one way.** These mutations **pass silently**:
    - M5: Badge deleted from Figma.
    - M6: Button loses its `size` property in Figma.
    - M10: the code gains a Button variant value Figma doesn't have.
    - M8: a tier-1 colour value changes.
    - M9: Button's padding changes.

    Value and CSS changes leave Figma stale without any signal (`validate.mjs:195–196`).
  - [verified] **The value and default check misses half the library, even locally.** It looks components up by docgen display name, and 20 of the 39 mirrored folders don't match (Card's name is `Root`, Select's is `SelectField`). A Card `outlined` → `outline` rename passed. In CI it covers 0 of 39.
  - [verified] **Nothing compares against the live Figma file automatically.** The manifest refreshes only when someone runs a snapshot.
  - [verified] **Changes flow one way, code → Figma.** The Figma → Storybook return trip is planned, not built.
  - [verified] **The definition of done doesn't include Figma.** `conventions.md` and `CONTRIBUTING.md` never mention mirroring or `GAPS.md`, so a new component or prop passes CI with Figma untouched.
  - [verified] **`design` is 15 commits behind `main`.** The playground doesn't have the manifest, the skill or `GAPS.md`.
  - [verified] **Mirroring worked as a review.** It surfaced 4 code bugs, all logged and still open.
- **Deviations noted:**
  - Code → Figma is one-way by design; the return trip is planned.
  - `design` is one-way.
  - Three components are left out of Figma by decision.
- **First move:**
  - Make `validate` check both directions:
    - every code component has a Figma counterpart or a named exclusion;
    - every code variant value exists in Figma;
    - look components up by source path.
  - Record a hash of each component's CSS in `figma/manifest.json`, so a changed stylesheet reports "Figma may be stale".

### Station 7 — Governance & version control: 🟡 YELLOW (6/10)
- **Inspected:**
  - `CONTRIBUTING.md`, `branching.md`, `conventions.md`, the README, `architecture.md` and the brief.
  - The CI history.
  - Git log, tags and branches.
  - `gh`: repo settings, PRs #1 and #2, all Actions runs, issues, branch protection, rulesets.
- **Evidence level:** live
- **Findings:**
  - [verified] **The process documents are clear and current.** Engineers and designers each get their own guide. `branching.md` is authoritative, and the brief has a dated decision table of about 25 rows.
  - [verified] **The documented path was walked twice.** Both changes arrived as `feature/*` → `main` PRs. PR #2 has green CI on the PR and on the merge push. **PR #1 has no checks at all.** It was merged 5 minutes after it opened, and its body says "checked locally". All 35 non-merge commits follow Conventional Commits.
  - [verified] **Branch protection is documented but not set.** `branching.md` has a "Branch protection to set" section, yet the API returns 404 and there are no rulesets.
  - [verified] **No release hygiene:**
    - No CHANGELOG, although Conventional Commits were adopted to generate one.
    - No `v*` tags.
    - No PR or issue templates, and no CODEOWNERS.
    - Breaking renames are recorded only in the brief and in commit messages.
  - [verified] **The tracker isn't used.** 0 issues, ever. The 4 known bugs live only in the PR #2 body, the brief and `GAPS.md`, and the "separate task" for the Checkbox crash isn't a GitHub issue.
  - [verified] **Stale process claims:**
    - The repo is not a template, although the docs say so.
    - The README says "Gitflow".
    - The roadmaps list Code Connect.
  - [verified] **Ownership is clear:** one named maintainer.
- **Deviations noted:**
  - A solo owner with no approval requirement.
  - `design` is one-way.
  - Not published as a package.
- **First move:** turn on the protection `branching.md` already specifies (a PR, a required `ci` check, no force-push), then tag `v0.1.0` with a generated CHANGELOG.

### Station 8 — Feedback & adoption: N/I (not applicable)
- There are no consuming product teams, so this is N/I by agreement, not a guess.
- **What would unlock it:** the first learner cohort. For this project, the equivalent of adoption telemetry is where learners get stuck.

### Station 9 — Machine-readable docs & context: 🟢 GREEN (8/10)
- **Inventoried:**
  - DTCG tokens: 238 leaf values.
  - The generated CSS.
  - 176 Figma variables with code syntax.
  - The Storybook `components.json` and `docs.json`.
  - `figma/manifest.json`.
  - `validate.mjs`: 327 lines, about 20 rule IDs.
  - `CLAUDE.md`, the `figma-mirror` skill, `GAPS.md` and the docs.
  - Missing: no `llms.txt` or `AGENTS.md`.
- **Generation test:** run and **passed**. A fresh agent had only `CLAUDE.md` and was asked to build a "Notification settings" panel. Its output:
  - It used 9 system components and invented none.
  - It typechecks with 0 errors.
  - It used 0 unknown tokens, 0 raw hex and no invented surfaces.
  - It chose Checkbox over Switch because of an encoded rule: "a switch takes effect immediately" versus a Save button.
  - It avoided the Checkbox crash by using CheckboxGroup.
  - Cost: 43 tool calls, about 143k tokens and 5 minutes, against 62 calls, 160k tokens and 9 minutes last time.
- **Evidence level:** live
- **Findings:**
  - [verified] **The component manifest is generated and current.** 42 of 42 components resolve, and the 8 errors are Foundations and Patterns pages.
  - [verified] **14 of 42 components have no description**, and 6 list no props: Base UI pass-throughs, which `CLAUDE.md`'s caveat covers.
  - [verified] **Token guidance is uneven.** All 14 text styles say when to use them; only 3 of the 38 semantic colours per theme do.
  - [verified] **Rules are enforced by a check.** Every `CLAUDE.md` rule has a `validate` rule, strict in CI, plus the Figma contract checks.
  - [verified] **The contract is machine-readable on both sides:** `figma/manifest.json`, and the "Contract —" descriptions in Figma. 13 of those descriptions don't follow the format (Station 2).
  - [verified] **Context gaps the test agent reported:**
    - `src/patterns/`, where `CLAUDE.md` sends agents to learn usage, sets `--sds-font-size-*` and `--sds-line-height-*` by hand. `validate` only enforces the type rule under `src/components/`, so copying a pattern breaks rule 1 silently.
    - Two "canonical" settings rows conflict: SettingsPage writes its ids by hand, while the Switch story uses the Field wiring.
    - The switch-vs-checkbox rule lives only in Switch's JSDoc.
    - `CLAUDE.md`'s Base UI caveat points at `index.d.ts`, which only re-exports. The props live in files like `switch/root/SwitchRoot.d.ts`.
    - `RadioGroupItem`, `FormActions` and Card's parts have no manifest entries.
    - There's no pattern for a Card that submits a Form.
  - [verified] **Freshness:** `storybook-static/` is gitignored, so a fresh clone has no manifest until `build-storybook` runs. `CLAUDE.md`'s "cannot be out of date" overstates it.
- **Deviations noted:** no Code Connect, and two token tiers.
- **First move (green, so optional):**
  - Describe the 14 components.
  - Extend `validate`'s type rule to `src/patterns/` and fix the patterns.
  - Correct the Base UI type path in `CLAUDE.md`.
  - Add an `AGENTS.md` pointer.

### Station 10 — Agent access: 🟡 YELLOW (7/10)
- **Surfaces mapped:**
  - In Claude Code: `CLAUDE.md` and the `figma-mirror` skill.
  - `@storybook/addon-mcp` 10.6.0, configured in `.storybook/main.ts`.
  - The Figma library, reached through the skill.
  - Nothing published.
- **Live test:** run through Claude Code (the Station 9 test). Grade: **A**, on-system.
- **Evidence level:** repo live · Storybook MCP `[reported]` (the server was down) · design live (orchestrator)
- **Findings:**
  - [verified] **Agents reach the system in the maintainer's own tool, and produce on-system work.**
  - [verified] **The Storybook MCP isn't registered with any agent.** There is no `.mcp.json` and no `mcpServers` entry, and it serves only from the dev server.
  - [reported] **The addon may now expose catalog tools.** The installed 10.6.0 contains docs tools (`list-all-documentation`, `get-documentation`) behind an availability check, but the brief says it ships one tool. Unverified: probe it live.
  - [verified] **The design↔code bridge is real in one direction.** The skill, scripts, audit and snapshot built 97 components, and `validate` fails CI on name drift.
  - [verified] **The Figma library isn't published**, so students' own files and Figma MCP library search can't reach it.
  - [verified] **Reach ends at a local clone in Claude Code:**
    - Storybook isn't hosted.
    - There's no `AGENTS.md` or `.cursorrules` for students on other tools.
    - The repo isn't a template.
    - The README's tree omits `figma/` and `.claude/skills/`.
  - [verified] **Where agents can be trusted is written down:** the skill's "When to stop" section and `GAPS.md`.
- **Deviations noted:** no Code Connect, by decision.
- **First move:**
  1. Publish the Figma library.
  2. Register the Storybook MCP in `.mcp.json` and probe its tool list.
  3. Add an `AGENTS.md` and a "connect your agent" section to the README.

## What changed since last inspection

| Station                  | 09-10 | 09-11 | Movement | Why |
|:-------------------------|------:|------:|:--------:|:----|
|  1 Coverage & gaps       |     6 |     7 |    ▲     | The design leg exists: 39 of 42 components, 14 text styles. Still undistributed, and a staple is broken |
|  2 Best practices        |     7 |     7 |    =     | The Figma craft adds strength; RTL, raw pixels and icon drift are unchanged |
|  3 Accessibility         |     4 |     3 |    ▼     | Contrast wasn't retuned (22 of 70 fail), nothing automated checks it, and a crashing Checkbox shows the definition of done is on paper only. **The light is ON** |
|  4 Shared language       |     7 |     8 |    ▲     | `tone` → `variant`, dead token names fixed, and name drift across the boundary now fails CI. **Now green** |
|  5 Testing & validation  |     3 |     5 |    ▲     | CI runs, with `validate --strict`. Still no rendering, and validate's Figma checks are skipped in CI. **Light turned off** |
|  6 Orchestration         |     6 |     7 |    ▲     | Figma is generated from the stylesheets and matches 97 of 97; the drift check is one-way and names only |
|  7 Governance            |     5 |     6 |    ▲     | The path was walked: PR #1 and PR #2. Protection, tags and a changelog are still missing |
|  9 Machine-readable docs |     8 |     8 |    =     | The generation test passed again, and more cheaply. Descriptions are still missing for 14 |
| 10 Agent access          |     6 |     7 |    ▲     | A real skill-driven design bridge; the MCP is unregistered and nothing is published |
| **Overall**              |  **58** | **64** | **▲ 6** | pro-rata /100, Station 8 N/I both times |

**Lights:** one red went off (5), one yellow turned green (4), and one yellow turned red (3).

**Items from the 2026-09-10 work order:**

| #  | Item                               | Status |
|:---|:-----------------------------------|:-------|
| 1  | Make CI run, with teeth            | ✅ Runs on PRs with `validate --strict`. `contrast-pairs` is still not in CI |
| 2  | Render stories headlessly with axe | ❌ Open. This gap let the Checkbox crash through |
| 3  | Restore page bg/text tokens        | ✅ Done: `validate` now scans `.storybook/` |
| 4  | Fix RadioGroup's label             | ✅ Done: `nativeLabel={false}` |
| 5  | Sweep 9 stale docs lines           | ✅ Those 9 are fixed, but 7 new stale lines have appeared (Station 4) |
| 6  | Retune contrast in tokens          | ❌ Open: 22 of 70 fail, and Figma now mirrors them |
| 7  | Widen validate's eyes              | ✅ Done for `.storybook/` and docs. `src/patterns/` is still outside the type rule |
| 8  | Composition into the manifest      | ❌ Open: 14 components still have no description |
| 9  | Walk the process once              | ✅ Walked twice. Protection and CHANGELOG are still open |
| 10 | Build the design leg               | ✅ Text styles, 97 components, name checks in `validate`. Publishing is still open |
| 11 | Vocabulary and craft gaps          | ◐ `tone` → `variant` is done. RTL and reduced motion are open |

**New lights:**
- The standalone Checkbox crash.
- `Select.Separator` renders nothing.
- `validate` skips its Figma checks in CI, and only checks one way.
- `main` has no protection, and PR #1 merged with no CI.
- `src/patterns/` bypasses the type rule.
- 13 Figma descriptions don't follow the format.

## Next service

- Work order: `ds-inspection/work-orders/2026-09-11-work-order.md`
- Recommended cadence:
  - A deep inspection quarterly (next by **2026-12-11**).
  - A quick re-run of Stations 3 and 5 as soon as the contrast retune and the render step land.
  - Stations 1, 6 and 10 again after the library is published and the return trip exists.
- Everyday checks to wire into CI now:
  1. `build-storybook` before `validate --strict`
  2. `contrast-pairs.mjs` inside `validate`
  3. every story rendered with axe, in both themes
  4. the `validate` type rule extended to `src/patterns/`

## Appendix — reproducing the evidence

- **Contrast:** `node ds-inspection/checks/contrast-pairs.mjs`, pointed at the `main` worktree's tokens.
- **Figma:** `scripts/figma/audit.figma.js` and `snapshot.figma.js`, run through the Figma MCP. For the fingerprint, hash each snapshot entry and compare it with `figma/manifest.json`.
- **validate mutations:** the 10 cases in Stations 4 to 6 (M1 to M10), run on a scratch copy.
- **Generation test:** a "Notification settings" panel, grounded only by the repo. Track the cost (43 calls, ~143k tokens, 5 minutes) as well as correctness.
