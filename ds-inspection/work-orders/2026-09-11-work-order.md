# Work Order — Sample Design System (`sds`)

_From inspection: `reports/2026-09-11-inspection.md` · Written: 2026-09-11_

Reds get fixed now, yellows get scheduled, and greens get left alone (and celebrated). Every item cites its station and evidence. The team owns prioritisation, which here means Christine; this is the technician's recommendation.

**Who:** 🎨 Design · 🛠️ Dev · 🤝 Shared (both have a part)

## At a glance

|  # | Light | Who | Fix                                                          | Effort |
|---:|:-----:|:---:|:-------------------------------------------------------------|:------:|
|  1 |  🔴   | 🤝  | Retune colour contrast, and make CI check it                 | M      |
|  2 |  🔴   | 🛠️  | Open every story in CI, with an accessibility check          | M      |
|  3 |  🔴   | 🛠️  | Fix the standalone Checkbox crash                            | S      |
|  4 |  🟡   | 🤝  | Make the Figma check two-way, and catch Figma going stale    | M      |
|  5 |  🟡   | 🛠️  | Protect `main`                                               | S      |
|  6 |  🟡   | 🛠️  | Release tags, changelog, bug tracker                         | S      |
|  7 |  🟡   | 🛠️  | Fix the 7 stale docs lines                                   | S      |
|  8 |  🟡   | 🤝  | Write "when to use" notes where people and AI read them      | S–M    |
|  9 |  🟡   | 🤝  | Make "mirror it in Figma" part of done (library published ✅) | S      |
| 10 |  🟡   | 🛠️  | Enforce the pixel and right-to-left rules                    | M      |
| 11 |  🟡   | 🛠️  | Close the context gaps the AI test hit                       | S      |
| 12 |  🟡   | 🛠️  | Open agent access beyond Claude Code on this machine         | S      |
| 13 |  🟡   | 🎨  | Decide the open design questions                             | S      |
| 14 |  🟡   | 🎨  | Design the focus ring, hover and error states                | M      |

**The designer's list, in order:** #1 pick the colours · #13 decide · #14 design the states · #8 write the notes · #9 ✅ published · #4 watch for "Figma out of date" alerts once they exist.

## 🔴 Fix now (reds)

### 1. 🤝 Retune contrast in the tokens, and make CI check it
- **Station:** 3, Accessibility · **Evidence:** [verified] 22 of 70 token checks fail.
  - Light: Badge status text at 2.86–3.95:1; input and control borders at 1.30 and 1.49:1.
  - Dark: primary button 4.47:1 (1.99:1 pressed); danger button 3.76:1; Alert body text 2.42–3.12:1; Badge text 1.72–2.56:1.
  - Figma's variables mirror the same values.
- **🎨 Design part:** choose the new colours. Brand look and contrast are a design judgement: the agent can propose options that pass, and you choose.
- **🛠️ Dev part:**
  1. Move `ds-inspection/checks/contrast-pairs.mjs` into `scripts/` and call it from `validate --strict`.
  2. Put the chosen values into `tokens/tier-2-usage/semantic.*.json`.
  3. Run the figma-mirror skill's "tokens changed" procedure so the Figma variables follow.
- **Why it's first:** one fix at the token level lands in every component and in Figma.
- **Done when:** `validate --strict` fails on today's tokens and passes on the new ones, the Figma variables match, and CI is green.
- **Effort:** M

### 2. 🛠️ Open every story in CI, with an accessibility check
- **Station:** 5 (also 3) · **Evidence:** [verified] 0 tests and 0 play functions; 251 stories are built but never opened. `a11y: 'error'` has nothing to run it. The Checkbox crash merged with CI green.
- **First move:** add the Storybook Vitest addon or the test-runner, run all stories in light and dark, and fail on errors and axe violations.
- **Note:** it's a new dev dependency, which bumps against CLAUDE.md rule 5 in spirit, so that's your call.
- **Done when:** one CI step fails on today's Checkbox and passes once item 3 lands.
- **Effort:** M

### 3. 🛠️ Fix the standalone Checkbox (and check the sign-up pattern)
- **Station:** 1, 3, 5 · **Evidence:** [verified] `Checkbox.tsx:26` renders `Field.Item` with no `Field.Root`. Base UI throws "FieldRootContext is missing", and all 8 Checkbox stories crash. `SignUpForm.stories.tsx:122` very probably crashes too.
- **🎨 For designers:** nothing to do. The Figma component already shows the intended look.
- **First move:** use the task already queued ("Fix standalone Checkbox crashing without Field.Root"). Keep the `Field.Label` and `Field.Description` part names, since the Figma contract uses them.
- **Done when:** every Checkbox, CheckboxGroup and SignUpForm story renders.
- **Effort:** S

## 🟡 Schedule (yellows)

### 4. 🤝 Make the Figma check two-way, and catch Figma going stale
- **Station:** 5, 6 · **Evidence:** [verified]
  - CI runs `validate` before `build-storybook`, so the Figma value checks are skipped.
  - Components are looked up by the wrong name, which misses 20 of 39.
  - It only checks one way: a Badge deleted from Figma, a new code variant, a token value change and a CSS change all passed.
- **🎨 Why designers care:** this is what will tell you when a Figma component no longer matches the code. Until it lands, nothing will.
- **🛠️ First move:**
  1. Swap the order in `ci.yml`: build-storybook, then validate.
  2. Look components up by source path.
  3. Check code → Figma too: every component mirrored or named as an exclusion, and every variant value present.
  4. Store a hash of each component's CSS in `figma/manifest.json`, so a changed stylesheet reports "Figma may be out of date".
- **Done when:** mutations M3 to M10 each produce a finding, and the report can list components that are out of date in Figma.
- **Effort:** M · **Timing:** this sprint

### 5. 🛠️ Protect `main`
- **Station:** 5, 7 · **Evidence:** [verified] "Branch not protected", and PR #1 merged with no checks.
- **First move:** require a PR and the `ci` check, and block force-pushes, as `branching.md` already specifies.
- **Effort:** S · **Timing:** now (it takes five minutes)

### 6. 🛠️ Release tags, changelog, bug tracker
- **Station:** 7, 1 · **Evidence:** [verified] No tags, no CHANGELOG and 0 issues. The known bugs live only in the PR body and the docs. The repo isn't the template `branching.md` promises.
- **First move:**
  1. Tag `v0.1.0` and generate the CHANGELOG from the commits.
  2. Open GitHub issues for the 4 known bugs.
  3. Turn on "Template repository", or delete the line.
- **Effort:** S · **Timing:** this sprint

### 7. 🛠️ Fix the 7 stale docs lines
- **Station:** 4, 6, 7 · **Evidence:** [verified]
  - The README says "Gitflow".
  - `architecture.md` says "nothing catches that drift".
  - Code Connect is still on two roadmaps.
  - `branching.md` says "template".
  - `GettingStarted.mdx` says "five" properties.
  - The brief says PR #2 is "in review".
  - The lists of composed components disagree.
- **First move:** one `docs:` commit. **Effort:** S · **Timing:** this sprint

### 8. 🤝 Write "when to use" notes where people and AI read them
- **Station:** 9, 1, 2 · **Evidence:** [verified]
  - 14 of 42 components have no description.
  - 3 of 38 colours say when to use them.
  - 13 Figma descriptions are messy, and 6 of them show code like `&lt;a&gt;`.
- **🎨 Design part:** write the "when to use" guidance for those components and colours. That's design knowledge, and it's exactly what the AI is missing.
- **🛠️ Dev part:**
  1. Put the notes on the exported components and the colour tokens.
  2. Clean up the 13 Figma descriptions in one pass.
- **Done when:** 42 of 42 components and all 38 colours have a note.
- **Effort:** S–M · **Timing:** this quarter

### 9. 🤝 Make "mirror it in Figma" part of done
- **Station:** 6, 10 · **Evidence:** [verified]
  - The Figma library is published ✅ (checked 2026-09-11).
  - `conventions.md` and `CONTRIBUTING.md` never mention Figma.
  - `design` is 15 commits behind `main`.
  - Three components left out of Figma aren't listed in `GAPS.md`.
- **🎨 Design part:** done. Enable the library in your prototype files.
- **🛠️ Dev part:**
  1. Add "mirrored in Figma, or logged in `figma/GAPS.md`" to the definition of done.
  2. List the three exclusions in `GAPS.md`.
  3. Merge `main` into `design`.
- **Effort:** S · **Timing:** this week

### 10. 🛠️ Enforce the pixel and right-to-left rules
- **Station:** 2, 3 · **Evidence:** [verified]
  - 18 physical-direction declarations: Table, Menu, Toast, NavigationMenu and Tabs.
  - Raw control heights: 40px ×13, 32px ×10.
  - Only 5 components respect reduced motion.
- **First move:**
  1. Add validate rules for raw pixels and physical properties.
  2. Convert the 18 declarations to logical properties.
  3. Add a global reduced-motion rule.
- **🎨 Heads-up:** whether control heights get a size token is a design decision.
- **Effort:** M · **Timing:** this quarter

### 11. 🛠️ Close the context gaps the AI test hit
- **Station:** 9, 10 · **Evidence:** [verified]
  - `src/patterns/` sets font sizes by hand, outside validate's type rule.
  - `CLAUDE.md` points to the wrong Base UI files.
  - `RadioGroupItem`, `FormActions` and Card's parts have no manifest entries.
- **First move:**
  1. Extend the type rule to `src/patterns/` and fix those patterns.
  2. Correct the path in `CLAUDE.md`.
- **Effort:** S · **Timing:** this sprint

### 12. 🛠️ Open agent access beyond Claude Code on this machine
- **Station:** 10 · **Evidence:** [verified] No `.mcp.json`, no `AGENTS.md`, and Storybook isn't online. [reported] The Storybook MCP may have more tools than the brief says.
- **First move:**
  1. Register the Storybook MCP and probe its tools.
  2. Add `AGENTS.md` and a "connect your agent" section to the README.
  3. Publish Storybook once the Chromatic token exists.
- **Effort:** S · **Timing:** this quarter

### 13. 🎨 Decide the open design questions
- **Station:** 2, 4 · **Evidence:** [verified]
  - Alert's warning/danger icons look reversed.
  - `Select.Separator` is invisible.
  - Menu's line height has no text style.
  - The segmented look is applied by ToggleGroup, not Toggle.
  - The icons have drifted: 2 chevron-downs, 2 chevron-rights, 2 checks.
  - `primary` vs `accent`, and Toast's `error` vs `danger`.
- **First move:** decide each one and note it in the brief. The code changes follow, and Figma follows the code.
- **Effort:** S per decision · **Timing:** before students start copying names

### 14. 🎨 Design the focus ring, hover and error states
- **Station:** 1, 3 · **Evidence:** [verified] These states exist in code, but Figma has none of them (`figma/GAPS.md`), so there's no focus ring or error state to design with.
- **First move:** decide how focus and error should look, check them against contrast, then have them mirrored into the library as variants.
- **Effort:** M · **Timing:** this quarter

## 🔧 Access upgrades (sharper next inspection)

- **Authorise the `plugin:figma:figma` connector,** so the station inspectors can read Figma themselves.
- **Run Storybook on `main` during inspections,** so accessibility can be checked on rendered stories again.
- **Connect a design-systems knowledge MCP,** so the coverage benchmark can be cited.

## 🟢 Keeping the greens green

- **Station 4 (names):** keep the Figma name checks in `validate --strict`, and write the prop vocabulary into `conventions.md`.
- **Station 9 (AI-readable docs):** re-run the generation test after big changes, and track its cost. It was 43 calls and ~143k tokens today, down from 62 and 160k.

## Cadence

- **Re-inspect (deep, all stations):** 2026-12-11.
- **Quick passes:**
  - Stations 3 and 5, as soon as items 1–3 land.
  - Stations 1, 6 and 10, after the Figma check is two-way.
- **Owner:** Christine Vallaure. **Review:** at the start of each work session, until items 1–5 are closed.
