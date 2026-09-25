# GARAGE.md — Sample Design System (`sds`)
_Checked in: 2026-09-11 (re-inspection, then a second pass in the afternoon on the same commit) · First check-in: 2026-09-10_

## Vehicle
- System: Sample Design System. It serves no product. It is a teaching instrument for moonlearning.io: a small, real system used to test and teach how designers and AI work on a real codebase without drift.
- Team: solo (Christine Vallaure) plus AI agents. Consumers: 0 product teams. The audience is designers learning to prototype against real components, in code and in Figma.
- Age: first commits 2026-09-09. `feature/ai-foundation` merged to `main` as PR #1. The Figma library merged as PR #2 on 2026-09-11, CI green.
- Reason for service: re-inspection after the Figma library was completed and merged, to compare against the 2026-09-10 baseline. A second full pass ran the same afternoon on the unchanged commit (`7429586`), as a calibration run: any score movement is the inspection's own variance.

## Assets
- Design library: [`sample-design-system`](https://www.figma.com/design/PvLNUW3xI3A9kTumVi7O3d/sample-design-system), file key `PvLNUW3xI3A9kTumVi7O3d`. Read live on 2026-09-11:
  - 43 pages: Cover, Foundations, Icons, then one page per component.
  - 176 local variables in 5 collections: Color Primitives, Color (Light/Dark), Size, Typography, Motion.
  - 14 text styles and 3 effect styles.
  - 97 components (49 sets and 48 single components): 28 icons, plus 39 of the 42 code components. Form, ScrollArea and ContextMenu are left out by decision.
  - Published (confirmed in Figma's library search, 2026-09-11).
- Code library: React 19 plus `@base-ui/react` 1.8.0, CSS Modules plus custom properties, 42 components in `src/components/`.
  - Tokens: DTCG JSON in `tokens/` goes through Style Dictionary 4 and comes out as `src/tokens/*.css` and `breakpoints.ts`.
  - Package: `private: true`, version `0.0.0`. Not published.
- Figma bridge in the repo:
  - `figma/manifest.json`: what the library contains.
  - `figma/GAPS.md`: every gap between Figma and the code, each with its reason.
  - `scripts/figma/`: generators, the audit and the snapshot.
  - `.claude/skills/figma-library-from-code/SKILL.md`: the build process.
- Docs: Storybook 10 with autodocs, the a11y addon and the MCP addon, plus `docs/*.md` and `docs/project-brief.md`. Storybook is not published; Chromatic is planned and blocked on a token.
- Process: GitHub `christinevall/sample-design-system`. Two branches:
  - `feature/*` → `main` by PR, with CI.
  - A one-way `design` branch.
  - No `develop` any more.
  - CI (`.github/workflows/ci.yml`) runs lint, `validate --strict`, build and build-storybook.
- AI surface:
  - `CLAUDE.md` grounding rules, including whole text styles only.
  - The Storybook component manifest.
  - `@storybook/addon-mcp` 10.6.0: 7 tools on `main`, verified live on 2026-09-11. It serves only from a dev server, and no agent config registers it.
  - `scripts/validate.mjs`, strict in CI. It now also checks the Figma manifest against the code.
  - One project skill in the repo: `figma-library-from-code`. (`ds-inspection` and `ds-ascii` are user-level skills in `~/.claude/skills`; students don't get them.)
  - No `llms.txt`. No Code Connect, by decision.

## Evidence access map
| Asset | Access | Verified how |
|---|---|---|
| Design library | live, whole-file (Figma MCP `use_figma`, which runs the Plugin API) | 2026-09-11 probe: 43 pages, 97 components, 176 variables, 14 text styles, 3 effect styles. Earlier the same day: a full audit of 1,184 layers found nothing unbound, and the fingerprint of every component matched `figma/manifest.json` 97 of 97. The `plugin:figma:figma` connector is unauthorised, so it was not used. In the afternoon pass the station inspectors read the file themselves through `use_figma` (all 43 pages). **The Figma Console bridge is connected too:** port 9223 with this file open, plus a stale second instance on 9224. |
| Code library | live | `../sample-design-system/`, the repo inside this workspace (moved there 2026-09-11). The 2026-09-11 inspection read `main` at `7429586`. Source read; validate, lint and tsc run by the station inspectors. |
| Docs | live | Storybook manifest and `docs/*.md`. The dev server on :6006 serves the other folder (`design` branch), not `main`. The 2026-09-11 afternoon pass built Storybook from a clean `main` export on private ports: stories rendered with axe, and the MCP probed. |
| Process | live | git plus `gh`. `git fetch` failed over SSL on 2026-09-11, but `gh api` worked. Open on 2026-09-11: PR #3 (decisions doc) and PR #4 (publish Storybook to GitHub Pages). |

## Known symptoms
Found during the Figma build and logged; none of them fixed yet:
- The standalone Checkbox crashes in every story: `Field.Item` is used without `Field.Root`. It works inside CheckboxGroup. Both SignUpForm pattern stories crash the same way (confirmed 2026-09-11).
- `Select.Separator` has no styles, so it renders nothing.
- Alert's warning and danger icons are the reverse of the usual convention.
- Menu items use a line height that no text style has. The CSS marks this as an open decision.
- ToggleGroup's segmented look is set by its parent.
- The component icons have drifted: four chevron drawings (two down, two right) and two check marks.
- Toast says `type=error` where everything else says `danger`, and Toast `success` draws the accent border (code and Figma).

Still absent because Base UI 1.8.0 doesn't ship them: Drawer and OTP Field.

## Intentional deviations
- **No Code Connect.** A manifest-generated Figma library instead, so names match by construction.
- **Two token tiers, not three.**
- **`validate`** is warn-only locally and `--strict` in CI.
- **The `design` branch is one-way.** It is a source of decisions, not of merges.
- **No CI gauntlet or eval gate.**
- **Station 8 (Feedback & adoption) is not applicable.** There are no consuming teams.
- **Figma follows the code, including its drift** (the icons). Merging them is a code decision.

## Report format (this project's preference — apply every run)
Readers are a designer and a developer. Write in plain language.

**Overview table in the report**, one row per station, with these columns:

| # | Station | What it checks | 🎨 Design | 🛠️ Dev | Before | Now |

- "What it checks" is one plain question, e.g. "Can everyone use it?".
- 🎨 Design and 🛠️ Dev each hold the one thing that audience needs to do. Use a dash (–) when there's nothing.
- Anything that touches Figma always goes in 🎨, even when a developer does the fix. Examples: a Figma component that no longer matches the code, a missing state, colours that change.
- Before and Now show the light plus the score, e.g. `🟡 6`.

**Work order:**
- Every item heading starts with who it's for: 🎨 Design · 🛠️ Dev · 🤝 Shared.
- Start with an "At a glance" table (#, light, who, fix, effort), followed by a one-line list of the designer's items.
- Shared items split into a 🎨 Design part and a 🛠️ Dev part.
- Dev-only items don't explain themselves to designers. Add a 🎨 heads-up line only when the item changes something a designer sees.

## Scope & frame
- Stations this pass: 1–7, 9, 10 in full. Station 8 is recorded as N/I (not applicable).
- Scoring frame: a solo teaching instrument.
- Out of scope: product adoption and consumer telemetry.
