# Multi-Point Inspection Report — Sample Design System (`sds`)

_Inspected: 2026-09-10 · Technician: Claude Code (Claude Opus 5) · Previous inspection: first inspection_
_Vehicle profile: `ds-inspection/GARAGE.md` (checked in 2026-09-10) · Branch inspected: `feature/ai-foundation` @ `88dd557`_

## The short version

The code itself is in good shape. Every component I read wraps Base UI properly and uses semantic tokens only. In a blind test, an agent given only CLAUDE.md and the manifest built a working screen with no invented props and no off-system values.

The warning lights are in what surrounds the code:

- **Nothing runs automatically.** CI is configured but has never run, and there are no tests. So a regression on this branch went unnoticed: after the token rename, two undefined tokens left Storybook's dark theme showing near-white text on white.
- **Contrast fails at the token level.** Dark mode's primary and danger buttons fail WCAG AA, and so do all Badge status colours in both themes.
- **Docs prose has drifted from the code in 9 places.** One of them is CONTRIBUTING telling designers to edit a generated file.

**The Figma side, from a same-day design pass:** the file holds an exact mirror of the tokens. It has 104 variables and 3 elevation effect styles, all 142 values match the code, and all 101 code-syntax names resolve to real CSS variables. It has no components and no text styles yet, and it inherits the same contrast failures as the code.

**Do this Monday:** before merging `feature/ai-foundation`, fix the two undefined tokens and the RadioGroup label, and sweep the stale docs. Then get CI to actually run, with `validate --strict` in it.

**Overall: 58/100\*** (54 before the design-side pass) is a conversation starter, not a grade. Fix the red, schedule the yellows, and re-run on a cadence.
\*Score is pro-rata to 100 from 52/90. One station wasn't inspected: Station 8 doesn't apply to a teaching instrument with no consuming teams.

## Inspection sheet

|  # | Station                         | Quality      | Light |        Score |
|---:|:--------------------------------|:-------------|:-----:|-------------:|
|  1 | Coverage & gaps                 | Complete     |  🟡   |         6/10 |
|  2 | Best practices                  | Sound        |  🟡   |         7/10 |
|  3 | Accessibility                   | Sound        |  🟡   |         4/10 |
|  4 | Shared language                 | Sound        |  🟡   |         7/10 |
|  5 | Testing & validation            | Sound        |  🔴   |         3/10 |
|  6 | Orchestration                   | Synchronized |  🟡   |         6/10 |
|  7 | Governance & version control    | Extensible   |  🟡   |         5/10 |
|  8 | Feedback & adoption             | Extensible   |  N/I  |          N/I |
|  9 | Machine-readable docs & context | AI-Ready     |  🟢   |         8/10 |
| 10 | Agent access                    | AI-Ready     |  🟡   |         6/10 |
|    | **Overall**                     |              |       | **58/100\*** |

**Lights:** 🟢 1 green · 🟡 7 yellow · 🔴 1 red · 1 not inspected

**Key:** 🔴 Red (0–3) — broken or missing; the light is ON · 🟡 Yellow (4–7) — drift or gaps; schedule a fix · 🟢 Green (8–10) — healthy, no action needed · **N/I** — not inspected (no evidence access; never guessed)

## Evidence basis

- **Code:** live. I read source, ran `validate`, `lint` and `tsc`, parsed the manifest, and computed contrast from the token JSON.
- **Docs:** live. I read `storybook-static/manifests/*.json` and `docs/*.md`, and ran axe-core 4.10.2 against 10 stories in both themes in the running Storybook at localhost:6006.
- **Process:** live. git, plus `gh` for branch protection, Actions runs, issues, PRs and push events.
- **Design library:** live, through two bridges, on [`sample-design-system`](https://www.figma.com/design/PvLNUW3xI3A9kTumVi7O3d/sample-design-system?node-id=0-1).
  - The native Figma MCP read the canvas and published assets: one page, no nodes, no attached libraries.
  - After a token refresh, the Figma Console bridge read the file itself through the Plugin API: 104 local variables in 5 collections, 3 effect styles, 0 text styles and 0 components.
  - See "Design-side pass" below.
- **Generation test:** run. A subagent grounded only by the repo built a Notification preferences screen, and I graded the output independently (Station 9).
- **Findings tagged `[verified]`: 60 · `[reported]`: 0.**
- **Not captured:** a screenshot of the dark-theme regression. The browser pane was hidden, so it couldn't render frames. The evidence is axe results and computed styles instead.

## Station records

### Station 1 — Coverage & gaps: 🟡 YELLOW (6/10)
- **Inventory:** design has 0 components, 104 variables and 3 effect styles · code has 42 components · docs: 42 of 42 have Storybook stories with autodocs, and 28 of 42 have a manifest description. Scope: every component.
- **Evidence level:** code live · docs live · design live (native Figma MCP and Figma Console bridge)
- **Findings:**
  - [verified] The staples are well covered. Present:
    - actions: Button, IconButton
    - form controls: TextField, Textarea, Select, Checkbox and CheckboxGroup, RadioGroup, Switch, NumberField, Slider, Combobox, Autocomplete
    - form structure: Form, Fieldset
    - containers and overlays: Card, Table, Dialog, AlertDialog, Popover, Tooltip, PreviewCard
    - navigation: Tabs, Accordion, Collapsible, Breadcrumb, NavigationMenu, Menu, Menubar, ContextMenu, Toolbar
    - feedback and display: Alert, Toast, Badge, Avatar, Spinner, Progress, Meter
    - plus four full-screen patterns
  - [verified] Gaps against the staple list, benchmarked from my own knowledge because no design-systems knowledge MCP is connected (lower confidence):
    - no Link, Pagination, empty state or Skeleton
    - no Drawer or Sheet (Base UI 1.8.0 ships none)
    - no Date picker, Stepper or File upload
    - Button has no loading state: its props are `variant`, `size`, `fullWidth` and `render`
  - [verified] Tokens cover colour, space, radius, type, motion, elevation and breakpoints, in two tiers. The semantic tier covers colour, elevation and text styles only. Space, radius and type have no semantic tier yet (README roadmap, still open).
  - [verified] There are 54 pixel literals of 3px or more, across 18 of the 42 CSS modules.
    - Most are control heights: 32, 40 and 48px in Button, IconButton, Toggle, TextField, Select, Tabs and others.
    - The rest are arrow offsets: −8 and −13px in Popover, PreviewCard and Tooltip.
    - No size token exists for these, so they're a missing token rather than an ignored one.
  - [verified] Nothing is distributed: `package.json` is `private: true` at `0.0.0`, and Storybook isn't published (no Chromatic config yet).
  - [verified] The design leg has its token foundation but no components. The Console bridge found:
    - 104 local variables in 5 collections: Color Primitives (37), Color with Light and Dark modes (38), Size (18), Typography (8) and Motion (3)
    - 3 elevation effect styles
    - no nodes on the canvas, so 0 of 42 components have a design counterpart
  - [verified] Two token groups are missing from Figma: the 8 text styles in `text-style.json` (there are 0 text styles), and the 7 tier-1 tokens for font family, line height and letter spacing. Nothing is published, so no other Figma file can use the variables yet.
- **Not inspected:** product needs (there's no consuming product).
- **Deviations noted:** none. For a teaching instrument, distribution matters less, but a published Storybook URL is how learners will reach it.
- **First move:** build the design leg from the manifest. It's already next on the roadmap, and the native Figma MCP is now authenticated, so nothing blocks it.

### Station 2 — Best practices: 🟡 YELLOW (7/10)
- **Sampled:** Button, Dialog, Select, Card and Tabs, each TSX and CSS end to end. I also swept all 42 CSS modules, and read `Badge.stories.tsx`, `SettingsPage.stories.tsx`, Getting Started and `conventions.md`.
- **Evidence level:** code live · docs live · design not inspected
- **Findings:**
  - [verified] *org and format.* The code craft is strong. Every sampled component wraps its Base UI primitive, styles from data attributes (`[data-disabled]`, `[data-popup-open]`, `[data-active]`) and uses only semantic tokens. Comments explain the reasoning: Tabs styles `data-active` because Base UI has no `data-selected` there, and Select's scroll container sits on `List`. `Card.Title` takes a `render` prop so the page can set the heading level, and `IconButton.label` is required.
  - [verified] *industry.* There are 18 physical property usages against 16 logical ones. `Menu.module.css:77–89` uses `margin-left: auto` and `padding-left` for shortcuts and submenu arrows, and Toast is pinned with `right:`. All of these will sit on the wrong side in RTL.
  - [verified] *format.* 14 of 42 components have no description in the manifest: Accordion, AlertDialog, Collapsible, Dialog, Fieldset, Menubar, NavigationMenu, Popover, PreviewCard, ScrollArea, Separator, Tabs, Toolbar and Tooltip. Dialog and Tabs do have good JSDoc, but it sits at file level or on the type exports, not on the exported component, so docgen misses it.
  - [verified] *format.* The docs are autodocs plus one story per state. There's no do/don't guidance anywhere, and 0 stories set `parameters.docs.description`. Getting Started is excellent, including its worked example of six bugs found by comparing against Base UI's source.
  - [verified] *org.* Story comments contradict the code in two places:
    - The `Badge.stories.tsx` Matrix comment says "There is no `success` variant… no `--sds-color-content-success`". Both exist, and the story renders success badges right below the comment.
    - `SettingsPage.stories.tsx:56` and `:370` say Switch "has no description slot", but the manifest lists `label` and `description`.
  - [verified] `oxlint` reports 8 warnings, all `only-export-components` in Card and Tooltip. They're cosmetic.
  - [verified] *format.* The Figma variables are carefully built.
    - Every semantic colour aliases a primitive, and the Light and Dark modes map to `semantic.light.json` and `semantic.dark.json`.
    - Scopes follow the categories: background is limited to frame and shape fills; content to text, shape and stroke; border to stroke and shape; space to gaps; radius to corners.
    - Primitives have no scopes, which keeps them out of designers' pickers.
    - 101 of 104 variables carry their CSS name as code syntax.
    - The 3 elevation effect styles bind their shadow colour to variables, so switching to Dark switches the shadows too.
- **Not inspected:** Figma component craft (auto layout, variants, layer names), because no components exist yet.
- **Deviations noted:** none.
- **First move:** move the component-level JSDoc onto the exported component in the 14 description-less components. It's mechanical, and it feeds autodocs and the manifest at the same time.

### Station 3 — Accessibility: 🟡 YELLOW (4/10), right on the red line
- **Sampled:** axe-core 4.10.2 (WCAG 2.2 A/AA tags) on 10 rendered stories in both themes: Badge, Button, Alert and IconButton matrices, TextField, Select, Tabs, Switch, the Settings page and Sign-up with error. I computed 27 token pairs per mode from JSON, read 5 components, and swept the CSS for focus and motion. On the design side, I compared the Figma Color variables in both modes and read the bridge's own contrast audit.
- **Evidence level:** code live · rendered live · design live (Figma Console bridge)
- **Findings:**
  - [verified] The fundamentals are sound where Base UI carries them.
    - Every interactive component has a `:focus-visible` ring: 39 uses of the same 2px `--sds-color-border-focus` outline, which passes 3:1 in both themes (4.24–6.19:1).
    - There are no `div` or `span` click handlers.
    - ARIA is added only where semantics don't cover it.
  - [verified, rendered] **Light theme:** everything sampled passes axe except Badge. Its text is 3.00:1 for success, 2.86:1 for warning and 3.95:1 for danger, against the 4.5:1 that WCAG 1.4.3 requires.
  - [verified, rendered] **Dark theme:** real token pairs fail 1.4.3.
    - Primary button text is 4.46:1 (white on brand-500).
    - Danger button is 3.76:1.
    - Alert body text on the status fills is 2.41–3.11:1.
    - Every Badge status variant is 1.71–2.55:1.
    - From the token maths (hover states weren't rendered): primary hover is 2.98:1, danger hover 1.90:1, and accent text on a surface 3.45:1 (ghost Button, active Tab).
  - [verified] **Non-text contrast (1.4.11).**
    - For TextField, Textarea, Select, NumberField, Combobox and Autocomplete, the only visible boundary is `border-default`, at 1.30:1 in light and 1.89:1 in dark.
    - The Checkbox box and the Switch's off track use `border-strong`, at 1.49:1 in light.
  - [verified, rendered, this branch only] **Storybook's dark theme is unreadable.**
    - What happens: the story wrapper and `<body>` compute to `rgba(0,0,0,0)`, because `--sds-color-bg` and `--sds-color-text` no longer exist, so text sits on the iframe's white page. Near-white text on white is 1.05:1.
    - Where it shows: 11 violations on the Settings page (title, lead, nav links, breadcrumb), plus the Tabs, TextField, Select and Switch labels.
    - Cause: commit `7ec5df7`. `origin/develop` is unaffected.
  - [verified] Reduced motion is respected in only 5 components: Accordion, Collapsible, Progress, ScrollArea and Spinner. Dialog, Popover, Select and the Tabs indicator animate regardless, and there's no global rule or motion-token override. This is WCAG 2.3.3 (AAA), so best practice rather than a requirement.
  - [verified] There's no safety net.
    - `addon-a11y` is set to `test: 'error'`, but no test runner is installed and CI has never run, so axe only runs when someone opens the panel.
    - There are no keyboard tests and no screen-reader test plan.
  - [verified] **Figma inherits the code's contrast failures exactly.**
    - All 35 semantic colour variables resolve to the same primitive as the code in both modes, so every failing pair above fails in Figma too.
    - The bridge's audit found the same problem independently: `color/content/success` on `color/background/default` at 3.1:1, and `color/content/warning` at 3.0:1.
    - There's no annotation kit or focus-order spec, since there are no components.
- **Not inspected:** screen-reader behaviour, the focus move into AlertDialog in a visible browser (flagged by the generation test, unconfirmed).
- **Deviations noted:** none.
- **First move:** retune contrast once, in `tokens/`, then push the new values to the Figma variables, which currently mirror the failing ones exactly. Use `ds-inspection/checks/contrast-pairs.mjs`: it exits 1 on failure and prints what each pair paints.

### Station 4 — Shared language: 🟡 YELLOW (7/10)
- **Swept:** every prop across the 42 manifest entries, the tier-2 token names, every story title, and token references in component CSS, `src/tokens/base.css`, `.storybook/`, `docs/` and `CLAUDE.md`.
- **Evidence level:** code live · docs live · design not inspected
- **Findings:**
  - [verified] The prop vocabulary is mostly one language:
    - `size` is `sm|md|lg` on 8 components (Meter, Progress and Badge stop at `md`)
    - `label` and `description` appear on all 14 form controls
    - `side`, `align` and `sideOffset` are identical across all 5 overlays
    - Select, Combobox and Autocomplete share `placeholder` and `contentProps`
  - [verified] Status colour goes by two names. Meter uses `tone` (`'accent'|'danger'`) where Badge and Alert use `variant`. Alert also calls the accent status `'info'` where Badge calls it `'accent'`.
  - [verified] Icon-only controls follow two patterns: IconButton is a separate component with a required `label`, while Toggle has an `iconOnly` prop.
  - [verified] Four stories break the title convention in `conventions.md`: `Components/Button`, `Components/Dialog`, `Components/Switch` and `Components/TextField`. Their manifest ids read `components-button` next to `components-actions-iconbutton`, and they sort outside their groups in the sidebar.
  - [verified] Two type vocabularies coexist. The raw scale (`--sds-font-size-*`) has 133 references, while the `--sds-typography-*` composites have 0 consumers outside Foundations. The generated screen in Station 9 is the first consumer.
  - [verified] Names that no longer exist, or that the rules don't list:
    - `--sds-color-bg` and `--sds-color-text` are still used in `base.css` and `.storybook/preview.tsx`.
    - `conventions.md` rule 5 prescribes `--sds-color-focus-ring`, which isn't defined. The code uses `--sds-color-border-focus` 39 times.
    - CLAUDE.md rule 1's token allow-list leaves out `--sds-line-height-*`, which components use 56 times.
  - [verified] The guardrail has blind spots. `validate.mjs` checks that referenced tokens exist, but only in `src/**/*.module.css|tsx`, and it skips `src/tokens/`. So it can't see `base.css` (which is hand-written, not generated), `.storybook/` or `docs/`. There's no code↔Figma name check yet (known).
  - [verified] **The name contract across the code↔Figma boundary holds.**
    - Figma variable names are the token paths written with slashes, e.g. `color/background/default`.
    - All 101 code-syntax entries resolve to a custom property the token build defines, e.g. `var(--sds-color-background-default)`. There are 0 dead names.
    - The 3 elevation effect styles name `--sds-elevation-*` in their descriptions, and all 3 exist.
  - [verified] The naming rule is followed, but nothing enforces it.
    - I checked it by hand this session, and nothing in the repo runs that comparison.
    - 50 of the 154 CSS custom properties have no Figma counterpart: the 40 values behind the 8 typography composites, plus font family, line height and letter spacing, and the 3 shadow primitives (represented by the effect styles instead).
- **Not inspected:** Figma component and variant names, because none exist yet.
- **Deviations noted:** CLAUDE.md permits the raw type scale for now, and `validate.mjs` documents why.
- **First move:** widen `validate`'s unknown-token check to `src/tokens/base.css`, `.storybook/` and `docs/*.md`, then fix the three dead names. This is exactly the drift `validate` exists to catch.

### Station 5 — Testing & validation: 🔴 RED (3/10)
- **Inspected:** `.github/workflows/ci.yml`, the GitHub Actions API and push events, the repo's test files, devDependencies, the Storybook config, `validate.mjs`, and the browser console on RadioGroup.
- **Evidence level:** live throughout
- **Findings:**
  - [verified] **CI exists on paper only.** `ci.yml` (lint, build, build-storybook) has been on every branch since the first commit, and Actions is enabled, but the API reports **0 workflow runs**. That's despite pushes to `develop` (2026-09-09 11:32Z) and `design` (13:20Z) that match its triggers. I didn't diagnose the cause.
  - [verified] There are 0 test files: no unit, interaction, keyboard or visual-regression tests.
  - [verified] **A silent bug class is live.** `RadioGroup.tsx:67` renders `<Field.Label render={<div />}>` without `nativeLabel={false}`, so Base UI logs a console error on every render: "expected a `<label>` element… `htmlFor` will not work". `conventions.md` says every story must render without console errors, and nothing checks.
  - [verified] `validate.mjs` is a good deterministic check aimed at AI output: token existence, primitive leakage, raw colour, manifest coverage. But it isn't in CI, and it's blind to exactly where this branch's regression lives (`base.css`, `.storybook/`).
  - [verified] `addon-a11y` is set to `test: 'error'`, but with no test runner nothing executes it headlessly.
  - [verified] There's no visual regression net. Chromatic is planned but not configured, and commit `7ec5df7` rewrote colour references across 40+ CSS modules with nothing watching the result.
  - [verified] The only eval so far is this inspection's generation test (Station 9). Today, trust comes from Christine's own verification, which is well documented in the project brief (findings 3–5), not from the system.
- **Not inspected:** why Actions never ran. Check the Actions tab on GitHub.
- **Deviations noted:** No Steel Curtain, and `validate` is warn-only locally, both by decision. Neither excuses CI that doesn't run: the documented intent is `--strict` in CI.
- **First move:** find out why Actions has 0 runs, then add `npm run validate -- --strict` and `node ds-inspection/checks/contrast-pairs.mjs` to `ci.yml`.

### Station 6 — Orchestration: 🟡 YELLOW (6/10)
- **Diffed:**
  - token JSON → generated CSS → components
  - manifest → source
  - docs prose (README, CONTRIBUTING, Getting Started, `conventions.md`, `branching.md`, the project brief, two story files) → repo and GitHub reality
  - design ↔ code: not possible
- **Evidence level:** code and docs live · design live (Figma Console bridge)
- **Findings:**
  - [verified] The pipeline has one source, and it's the right shape: DTCG JSON → Style Dictionary → `primitives.css`, `semantic.css` and `breakpoints.ts`. Storybook viewports come from the breakpoints, and the manifest is generated from source.
  - [verified] **Docs prose has drifted from reality in 9 places:**
    1. `CONTRIBUTING.md:20` tells designers to "Change token values in `src/tokens/semantic.css`". That's a generated file, which CLAUDE.md rule 4 forbids editing, and the next `build:tokens` would silently overwrite the change.
    2. `README.md:88` and `GettingStarted.mdx:54` say "Everything currently sits on `main`", but `develop`, `design` and feature branches exist.
    3. `README.md:81` still shows "Move tokens to a DTCG source" unchecked. It's done, and `architecture.md` says so.
    4. `conventions.md` rule 5 prescribes `--sds-color-focus-ring`, which is undefined.
    5. The Badge story says the success variant and token don't exist, but both do.
    6. The SettingsPage story says Switch has no description, but it does.
    7. `branching.md` says `main` and `develop` are "Protected". GitHub says they aren't.
    8. `project-brief.md` says "Blocked: the Figma MCP server is not authenticated". The native Figma MCP `whoami` succeeds today, with Full seats.
    9. `README.md` (roadmap), `architecture.md` (roadmap item 4) and `project-brief.md` ("Next") all list syncing tokens to Figma variables as future work. It's done: 104 variables match the tokens exactly.
  - [verified] The rename in `7ec5df7` updated generated CSS and component modules, but missed the two hand-written consumers: `src/tokens/base.css` and `.storybook/preview.tsx`.
  - [verified] **Tokens reach Figma, exactly.**
    - All 142 compared values match the code: 37 primitives, 35 semantic colours in both modes, the overlay alphas, spacing, radius, breakpoints, font size and weight, motion, and the elevation shadows' geometry and alphas.
    - Aliases are preserved (68 of 142 values are aliases), so the tier-1→tier-2 indirection survives the crossing.
  - [verified] **The sync is a one-off.**
    - `scripts/` holds only `build-tokens.mjs` and `validate.mjs`, so nothing re-pushes a token change to Figma or notices when the two drift apart.
    - The variables aren't published as a library, no components exist, and the typography composites never made it across.
- **Not inspected:** component parity, because Figma has no components yet.
- **Deviations noted:** No Code Connect, by decision. Component contracts come from the manifest instead, and I respected that.
- **First move:** one docs-drift commit fixing the 8 lines above, before `feature/ai-foundation` merges.

### Station 7 — Governance & version control: 🟡 YELLOW (5/10)
- **Inspected:** `CONTRIBUTING.md`, `docs/branching.md`, git branches, tags and log, GitHub branch protection, issues, PRs and push events.
- **Evidence level:** live
- **Findings:**
  - [verified] The documented process is thoughtful and specific: Gitflow plus a one-way `design` branch, `release/*` and `hotfix/*` flows, and protection rules spelled out. All 14 commits follow Conventional Commits.
  - [verified] **Paper vs reality:** `branching.md` says `main` and `develop` are protected, with a required `ci` check and one approval. GitHub returns "Branch not protected" for both, and a required `ci` check couldn't pass anyway, because CI has never run.
  - [verified] No PR has ever been opened. `origin/main`, `origin/develop` and `origin/design` all point at `4bee7c2`, and `feature/ai-foundation` is 8 commits ahead of `develop`, unmerged. The documented path hasn't been walked once yet.
  - [verified] Release artifacts are missing: no CHANGELOG, version `0.0.0`, no release tags (only `backup/pre-consolidate-main`), and no PR or issue templates. `branching.md`'s release step "update CHANGELOG" points at a file that doesn't exist.
  - [verified] Ownership is clear (solo). The tracker has 0 issues, which is expected for a one-day-old solo repo, not a warning light.
- **Not inspected:** none.
- **Deviations noted:** the solo frame. "One approval" can't be satisfied by one person, so decide whether `branching.md` describes the solo reality or the future team.
- **First move:** merge `feature/ai-foundation` into `develop` through a PR, the first walk of the documented path. Then either turn on protection, requiring `ci` but no approval, or rewrite that section to match how the repo actually works.

### Station 8 — Feedback & adoption: N/I (not applicable)
- There are no consuming product teams, so there's no adoption to measure and no product feedback loop to audit. Recorded as N/I by agreement at check-in, not guessed.
- **What would unlock it:** the first learner cohort or product using the system. A feedback path from learners (where do they get stuck?) is this project's equivalent of adoption telemetry.

### Station 9 — Machine-readable docs & context: 🟢 GREEN (8/10)
- **Inventoried:**
  - DTCG token JSON and CSS custom properties
  - typed props
  - `storybook-static/manifests/components.json` and `docs.json`, generated from source
  - CLAUDE.md grounding rules with a three-source lookup order
  - `validate.mjs`
- **Generation test:** run and passed.
- **Evidence level:** live
- **Findings:**
  - [verified] The raw materials are all machine-consumable, and the manifest is generated, so it can't go stale. All 42 components resolve. The 8 manifest errors are Foundations and Patterns pages, which document no single component.
  - [verified] **The generation test passed.** The prompt was a product-style request for a "Notification preferences" screen, with no mention of the manifest. The agent read CLAUDE.md, then the manifest, patterns, `src/index.ts`, tokens, source and Base UI types, in CLAUDE.md's order. The output:
    - chose the right parts: Card (with `Card.Title render={<h2 />}` for heading order), Fieldset, Switch, RadioGroup and RadioGroupItem, Button (`type="submit"`), AlertDialog (controlled, with `Close render`), Alert (`variant="success"`, `onDismiss`), Form and Separator
    - typechecks with 0 errors against the repo's real types (I re-ran it)
    - uses 19 token references, all defined, with 0 primitives, 0 hex values, and one `1px` border (no border-width token exists)
    - has one inline `style` on Separator, copied from a pattern
  - [verified] **Grounding works, but it's expensive.** The agent needed about 30 files, 62 tool calls, ~160k tokens and 9 minutes. For Switch, RadioGroup and AlertDialog, the manifest doesn't carry how the compound parts compose (`AlertDialog.Close`, `.Actions`, `RadioGroupItem`), so the agent had to read the source, the stories and Base UI's `.d.ts` files.
  - [verified] Context gaps the agent actually hit:
    - CLAUDE.md's allow-list leaves out `--sds-line-height-*`
    - the SettingsPage comment says Switch has no description, and the agent resolved it against the manifest
    - there's no border-width token
    - `Fieldset.Legend` is set at `font-size-lg`, the same size as the card title
  - [verified] There's no llms.txt, 14 of 42 components have no manifest description, and no component carries anti-patterns or composition rules in machine-readable form. The rules live in CLAUDE.md and `conventions.md` as prose, phrased as rules, which helps.
  - [verified] One freshness caveat: the manifest lives in git-ignored `storybook-static/`, so a fresh clone has no catalog until `npm run build-storybook` runs. CLAUDE.md says to do exactly that.
  - [verified] **The design side is machine-readable too.**
    - 101 of 104 Figma variables carry their CSS name as code syntax, so Dev Mode and agents reading Figma see `var(--sds-…)` rather than a raw value.
    - All 67 non-primitive variables have descriptions. The semantic colours share one line per category ("Text and icons."), and spacing notes its rem value in code. The 37 primitives have no descriptions.
- **Not inspected:** a second, harder composition, such as a data-heavy screen or an overlay inside an overlay.
- **Deviations noted:** none.
- **First move:** put a short composition example (the `Usage:` block already in the JSDoc) on the exported component of each compound, and fill in the 14 missing descriptions. That moves "how do the parts fit together" into the manifest, so the next agent doesn't pay for it in source reads.

### Station 10 — Agent access: 🟡 YELLOW (6/10)
- **Surfaces mapped:**
  - CLAUDE.md, auto-loaded by Claude Code
  - the manifest, as a file
  - `@storybook/addon-mcp` at `localhost:6006/mcp`
  - native Figma MCP
  - Figma Console MCP
- **Live test:** run through Claude Code, the tool this project actually uses. Grade: on-system (see Station 9).
- **Evidence level:** live
- **Findings:**
  - [verified] In the real toolchain, access works. CLAUDE.md loaded automatically in the subagent, and it followed the lookup order exactly. That's the point of the project, and it holds.
  - [verified] There's no query surface. Agents reach the system by reading files. The Storybook MCP answers `tools/list` with one tool, `stories-preview` (the brief calls it `preview-stories`), which returns preview URLs, not catalog data. It isn't registered anywhere: there's no `.mcp.json`, and no `mcpServers` in the project or user config.
  - [verified] **The design tool is reachable through both bridges.**
    - The native Figma MCP is authenticated (`whoami` shows Full seats on 7 plans).
    - After a token refresh, the Figma Console bridge connected to `sample-design-system` on port 9223 (14 ms round trip). It reads variables and styles through the Plugin API, and it could write them.
    - The Desktop Bridge plugin is out of date: it reports an update available, and `figma_get_text_styles` failed with "Unknown method".
  - [verified] The rails only exist for Claude Code. There's no `AGENTS.md` or other tool-neutral rules file, so an agent in another editor won't get CLAUDE.md's grounding order.
  - [verified] The repeatable workflow is documented: CLAUDE.md's "After you change UI" checklist, plus `validate`. It's the start of a shared sense of where agents can be trusted.
- **Not inspected:** agents in other IDEs; there are none in use.
- **Deviations noted:** No Code Connect, by decision. That's not scored as a warning light, because contracts come through the manifest.
- **First move:** tokens already reach Figma, so the next code→Figma leg is text styles, then components generated from the manifest. That turns the design bridge from "has the tokens" into "speaks the components". Update the brief's "Blocked" line while you're there.

## Design-side pass — what changed

This pass ran the same day, after the Figma Console bridge was reconnected with a fresh token. Stations 1, 2, 3, 4, 6, 9 and 10 took their Figma evidence from the file itself, not just the canvas.

**Correction.** The first pass called the Figma file empty and said the tokens hadn't been synced. Both claims were wrong. The native Figma MCP reads only the canvas and published assets, and this file's variables are local and unpublished. The Console bridge reads them through the Plugin API.

| Station            |     Before |     After | Why                                                                   |
|:-------------------|-----------:|----------:|:----------------------------------------------------------------------|
| 1 Coverage         |          5 |         6 | The token foundation exists in Figma; components and text styles don't |
| 4 Shared language  |          6 |         7 | The name contract holds: 101 of 101 code-syntax names resolve         |
| 6 Orchestration    |          5 |         6 | Values match exactly (142 of 142), but the sync is a one-off           |
| 2, 3, 9, 10        | 7, 4, 8, 6 | unchanged | Findings added; the scores hold (Figma inherits the contrast failures) |

**The bridge's own audit** scored the file 85/100 ("needs work"). Here's how to read its findings:
- **Real:**
  - no components (Coverage 0)
  - contrast failures, the same as in code
  - undescribed primitives (64% description coverage)
  - no STRING variables, which is where font family belongs
- **Deliberate, not warning lights:**
  - "maximum alias depth 2" is the two-tier decision in the project brief
  - "missing error and info colour families" refers to this system's `danger` and `accent`
- **Not meaningful yet:** its component checks defaulted to passing because there are no components, so its 100s for naming and metadata don't mean anything.

## Next service

- Work order: `ds-inspection/work-orders/2026-09-10-work-order.md`
- Recommended cadence:
  - a deep inspection quarterly
  - a quick re-run of Stations 3, 5 and 6 straight after `feature/ai-foundation` merges
  - again after the first code↔Figma round trip, because that's when Stations 1, 4 and 6 can see the design leg for the first time
- Everyday checks to wire into CI now:
  - `npm run validate -- --strict`, with a wider scope (Station 4)
  - `node ds-inspection/checks/contrast-pairs.mjs` (Station 3)
  - a headless story run for console errors and axe (Stations 3 and 5)
- Re-inspect by: 2026-12-10

## Appendix — reproducing the evidence

- **Contrast:** `node ds-inspection/checks/contrast-pairs.mjs`. It reads the token JSON, and it reproduces the token-maths numbers in Station 3.
- **Generation test prompt:** a "Notification preferences" screen with a heading and description; a card of Comments, Mentions and Weekly digest, each with Email and Push toggles; a Daily/Weekly/Never digest frequency; Save and Cancel; a "Turn off all notifications?" confirmation when everything is off; and an inline success message. Written outside the repo, importing from `src/index.ts`, and not told about the manifest. Re-run the same prompt after a major change and compare the grounding cost as well as the output.
- **Rendered axe:** axe-core 4.10.2 injected into `iframe.html?id=<story>&globals=theme:<light|dark>`, with tags `wcag2a`, `wcag2aa`, `wcag21aa` and `wcag22aa`.
