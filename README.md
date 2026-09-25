# Sample Design System

A playground for design enginneers learning AI design system workflows. It is a small, plain-label system built on [Base UI](https://base-ui.com) primitives, and mirrored into Figma, so you can try the whole loop yourself: tokens in code, components in Storybook, the same system as Figma variables and components, and AI tools connected to both through MCP.

It is a teaching repo, not a production system. 42 components, 4 foundations pages, 4 full-screen patterns.

| | |
| --- | --- |
| **Live Storybook** | [christinevall.github.io/ds-base-ui](https://christinevall.github.io/ds-base-ui/), no install needed. Updates on every merge to `main` |
| **Figma library** | [Figma Community](https://www.figma.com/community/file/1681312616396112992): the same system as Figma variables, text styles and components, generated from this code. Duplicate it to explore |
| **Code** | this repository. Use the green **Code** button → *Download ZIP*, or **Use this template** |

## Start here

| You want to… | Go to |
| --- | --- |
| See every component, live | [Live Storybook](https://christinevall.github.io/ds-base-ui/) → *Getting started* |
| Explore the same system in Figma | [Figma Community file](https://www.figma.com/community/file/1681312616396112992) |
| Understand how it is built, no code knowledge needed | [In plain words](#in-plain-words), then [the stack](#the-stack-tool-by-tool) |
| Try the workflow with AI | [How I use this playground](#how-i-use-this-playground) |
| Run it on your computer | [Run it on your computer](#run-it-on-your-computer) |
| Check that Figma and the code are still in sync, component by component | *Sync status* in Storybook, or [`docs/sync-status.md`](docs/sync-status.md) (`npm run sync-status` updates both) |
| Prototype with Claude from Figma alone, before there is a Storybook | *Figma only* in Storybook, or [`docs/figma-only.md`](docs/figma-only.md) |
| See how a page is laid out: the six layout words and the page anatomy | *Layout* in Storybook, or [`docs/layout.md`](docs/layout.md) |
| See every manifest, check, command, skill and MCP, or demo them | *Toolkit* in Storybook, or [The toolkit](#the-toolkit-lists-checks-commands-skills) below |
| Know where Figma and the code differ on purpose, and what is still open | *Gaps* in Storybook, or [`figma/GAPS.md`](figma/GAPS.md) |

## In plain words

**A design system in code is the same idea as a Figma library.** Figma has components, variables and styles. The code has the same things, written as text files a browser can show.

| In Figma you know… | In this code it is… | Where |
| --- | --- | --- |
| A component (Button) with variants | A **React component** with **props**: `<Button variant="primary" size="md">` | `src/components/Button/Button.tsx` |
| Variables (colours, spacing, type) | **Design tokens**, written as JSON and turned into CSS variables | `tokens/` → `src/tokens/*.css` |
| The look of a component | A **stylesheet** that uses those tokens | `src/components/Button/Button.module.css` |
| The library file you browse | **Storybook**, a website with every component and state | [live](https://christinevall.github.io/ds-base-ui/) or http://localhost:6001 |

### How a colour gets from a token to the screen (and into Figma)

1. **Primitive token:** `tokens/tier-1-definitions/color.json` defines `color.brand.indigo.600` as #4F46E5. It says *what* the colour is.
2. **Semantic token:** `tokens/tier-2-usage/semantic.light.json` defines `color.background.accent` → `{color.brand.indigo.600}`. It says *what it is for*.
3. **Build:** `npm run build:tokens` (Style Dictionary) writes `src/tokens/semantic.css`:<br>`--sds-color-background-accent: var(--sds-color-brand-indigo-600);`
4. **Component:** the primary button's stylesheet says `background: var(--sds-color-background-accent);`, never the hex.
5. **Browser:** the page looks the token up and paints #4F46E5. Flip the theme in Storybook and it reads the dark file instead.
6. **Figma:** the same token becomes the variable `color/background/accent`, an alias of `color/brand/indigo/600`, with the CSS name as its code syntax.

So **change the token once, and every component that uses it changes**, in code and, after a sync, in Figma. The JSON files are the one source: code and Figma are both generated from them.

## The stack, tool by tool

A design system in code is a small chain of tools, not one. You do not need to write any of it to use the system. It helps to know what each piece is *for*.

| Tool | What it is | What it does here |
| --- | --- | --- |
| **Node.js + npm** | The engine that runs JavaScript tools on your computer, and the store they are installed from | Installs everything (`npm install`) and starts Storybook (`npm run storybook`) |
| **React** 19 | A library for building interfaces out of reusable components | All 42 components are React components |
| **TypeScript** 6 | JavaScript that says which values are allowed | Lists each prop and its options. The Figma variants use exactly these names |
| **Base UI** 1.8 (`@base-ui/react`) | Unstyled building blocks with the hard parts done: keyboard, focus, screen readers | Every interactive component wraps one. States arrive as `data-` attributes (`data-checked`) that the CSS styles |
| **CSS Modules** + custom properties | One stylesheet per component; class names cannot clash | Every colour, space and radius is a token, inspectable in the browser |
| **Design tokens** (DTCG JSON) | Named design decisions in a standard JSON format | `tokens/`: tier 1 definitions, tier 2 usage with Light and Dark, text styles |
| **Style Dictionary** 5 | A converter from token JSON to code | `npm run build:tokens` writes the CSS variables and the breakpoints |
| **Vite** 8 | A fast development server and bundler | Shows a code change in the browser within a second. Runs quietly under Storybook |
| **Storybook** 10 | A workshop where each component is shown on its own, in every state | Getting started, Foundations, Components, Patterns, and the Prototypes |
| **Storybook MCP** and **a11y** addons | A plug for AI assistants, and an accessibility checker | Claude or Cursor ask Storybook which components exist (http://localhost:6001/mcp); every story is checked for accessibility |
| **Figma Console MCP** | A plug that lets an AI assistant read and build inside the Figma desktop app | Generated the Figma library from this code, following the `figma-library-from-code` skill |
| **Claude Code** + `CLAUDE.md` | An AI coding assistant, and the rules it reads first | Ground before writing, semantic tokens only, wrap Base UI; `npm run validate` checks the result |

## How Figma and code stay in sync

**Code is the source. Figma follows.**

```
tokens/*.json ──npm run build:tokens──►  CSS variables ──►  React components ──►  Storybook
      │
      └── figma-library-from-code skill (Claude + Figma Console MCP) ──►  Figma variables, text styles, components
                                                                       │
                              npm run validate ◄── figma/manifest.json ┘   (fails if a name, option, default or key drifts)
```

- **Names match on purpose.** `color/background/accent` in Figma is `--sds-color-background-accent` in CSS, and a Figma layer `Button · variant=primary` resolves to `<Button variant="primary">` through `figma/manifest.json`.
- **One page shows whether code and Figma are in sync.** *Sync status* in Storybook (and [`docs/sync-status.md`](docs/sync-status.md)) lists every component with one column per check: Figma key, same name, same property names, same options, same defaults, code follows the rules. It checks names, not the look. `npm run sync-status` regenerates it, and Claude runs the same check at the start of every session and tells you the result.
- **The key map.** `figma/manifest.json` also stores each Figma item's key, the handle an AI needs to place a library component in another file. With it, building a screen in Figma is a lookup instead of a search through the whole library.
- **Where Figma cannot express the CSS**, it is written down in [`figma/GAPS.md`](figma/GAPS.md) instead of simplifying the CSS.
- **Code Connect** is not set up: it needs an Organization or Enterprise plan.

## The toolkit: lists, checks, commands, skills

Everything that keeps Figma and code together, in one place. Most of it runs on
its own; this is where to look when you want to see it, or show it.

### Four files that describe the system

Think of them as inventories. Each one is written by a script, never by hand,
so it cannot go stale without a check noticing.

| File | What it lists | Written by | Read by |
| --- | --- | --- | --- |
| **Storybook manifest** · [live](https://christinevall.github.io/ds-base-ui/manifests/components.json) · `storybook-static/manifests/components.json` | Every component **in code**: its props, their allowed values, defaults and stories | `npm run build-storybook` | Claude, through the Storybook MCP; `validate` |
| **Figma manifest** · [`figma/manifest.json`](figma/manifest.json) | Everything **in the Figma library**: components with their options and **descriptions** (the text of Figma's description box, so *use when* written in Figma reaches Claude), variables, text styles, plus the **key map** (the handle an AI needs to place each item in another file) | `scripts/figma/snapshot.figma.js`, run in Figma through the Figma Console MCP | `validate`, `sync-status`, Claude when building in Figma |
| **Sync status** · in Storybook under *Sync status* · [`docs/sync-status.md`](docs/sync-status.md) | The two above **side by side**: one row per component, one column per check (Figma key, same name, same property names, same options, same defaults, code follows the rules). It checks the names, not the look: a changed padding or auto layout in Figma does not show here | `npm run contract` | You. Claude reads it out at the start of every session |
| **Known differences** · [`figma/GAPS.md`](figma/GAPS.md) | Where Figma cannot match the code **on purpose**, and why | People and Claude, by hand | Anyone wondering "is this a bug or a decision?" |

### The checks

| Check | Answers | Run it |
| --- | --- | --- |
| **validate** | Does every token exist? Does any component skip the semantic layer, hard-code a colour or invent a text style? Do Figma's names, options, defaults and keys match the code? | `npm run validate` (warns) · `npm run validate -- --strict` (fails, for CI) |
| **sync-status** | The same, laid out per component on one page | `npm run sync-status` · `npm run sync-status -- --summary` (the one-line version) |
| **audit** | Inside a Figma component: is every colour, padding, gap and radius bound to a variable? | Ask Claude to run `scripts/figma/audit.figma.js` on a component (needs Figma open) |
| **contrast** | Do the colour pairs pass WCAG contrast? | `npm run check:contrast` |
| **Session check** | Runs `sync-status -- --summary` automatically when a Claude session opens, so the first reply says whether code and Figma still match | Nothing to do: [`.claude/settings.json`](.claude/settings.json) |

What the checks do **not** see: values inside Figma components (a padding that drifts is found by the audit or by comparing screenshots), and the live Figma file (only its last snapshot, whose date the contract page shows).

### Every command

| Command | Does |
| --- | --- |
| `npm run storybook` | Opens Storybook on http://localhost:6001, with the MCP at http://localhost:6001/mcp |
| `npm run build-storybook` | Builds the static Storybook and regenerates the Storybook manifest |
| `npm run build:tokens` | `tokens/*.json` → the generated CSS. Run after editing a token |
| `npm run validate` | The rules check above |
| `npm run sync-status` | Rewrites [`docs/sync-status.md`](docs/sync-status.md) and the Storybook page, and prints the summary |
| `npm run check:contrast` | The contrast check |
| `npm run figma:tokens` | What the Figma variables and text styles should be, from the tokens (the `figma-library-from-code` skill compares it with the live file) |
| `npm run figma:spec -- <Name>` | A component's CSS turned into a Figma build spec: bindings, text styles, gaps to decide |
| `npx tsc -b --noEmit` · `npm run lint` | Type check and lint, before any pull request |

Two scripts run **inside Figma**, not in the terminal. Ask Claude with Figma open and the Desktop Bridge plugin running: [`scripts/figma/snapshot.figma.js`](scripts/figma/snapshot.figma.js) ("take a snapshot of the library") and [`scripts/figma/audit.figma.js`](scripts/figma/audit.figma.js) ("audit the Accordion").

### Skills

A skill is a written procedure Claude follows for one kind of job. Call it by name (`/figma-library-from-code`) or just describe the job.

| Skill | For | Say |
| --- | --- | --- |
| [`figma-library-from-code`](.claude/skills/figma-library-from-code/SKILL.md) | Building or updating the Figma library from the code: a component, its variants, variables, text styles | "Mirror the Accordion to Figma", "the tokens changed, sync Figma" |
| [`ds-inspection`](.claude/skills/ds-inspection/SKILL.md) | A health check of the whole system across ten stations, with a red/yellow/green report and a work order ([reports](ds-inspection/reports), [work orders](ds-inspection/work-orders)). **By [Brad Frost](https://bradfrost.com)**, from [bradfrost/skills](https://github.com/bradfrost/skills) (MIT), unchanged; customised for this system in [`ds-inspection/GARAGE.md`](ds-inspection/GARAGE.md): one report for designers and developers, with 🎨 Design / 🛠️ Dev columns | "Run the inspection" |
| [`storybook-figma-sync`](.claude/skills/storybook-figma-sync/SKILL.md) *(first version, being tested)* | **Needs the Storybook MCP and the Figma Console MCP.** Prototypes in both directions: a Storybook story → Figma screens made of library instances with prototype connections, and Figma screens → a Storybook story. A four-part notes overview on each side. Also shared on its own: [christinevall/skills](https://github.com/christinevall/skills) | "Put the booking flow into Figma", "bring this Figma screen back to Storybook" |

### The plugs (MCP)

| MCP | Connects Claude to | Set up in |
| --- | --- | --- |
| **Storybook MCP** | The running Storybook: which components exist, their props and stories | [`.mcp.json`](.mcp.json) (Claude Code) · [`.cursor/mcp.json`](.cursor/mcp.json) (Cursor). Needs `npm run storybook` |
| **Figma Console MCP** | The Figma desktop app: read and build in any open file | Run the *Figma Desktop Bridge* plugin in the file (Plugins → Development) |

### A five-minute demo

1. `npm run storybook`: the system, live.
2. Open *Sync status* in the Storybook sidebar: every component, code and Figma side by side, one column per check.
3. Start a Claude session: its first line is the same check, unprompted.
4. Open the [Figma manifest](figma/manifest.json) and search for `"keys"`: the handles that let Claude place real library components in any file.
5. Ask Claude to put a Storybook prototype into Figma (or back): the screens come out as library instances, with a notes frame listing what is real, what was built by hand and what is missing.

### The two token tiers, in detail

**Edit `tokens/**/*.json`, then run `npm run build:tokens`.** The CSS is output.

Tier 1 is the raw material: `--sds-color-brand-indigo-600`, `--sds-space-4`. Nothing in a component may reference a tier-1 colour.

Tier 2 is the contract, organised into three categories — `--sds-color-background-*`, `--sds-color-content-*`, `--sds-color-border-*` — plus `--sds-typography-heading-lg-font-size` and friends. Components use only these. Theming means redefining tier 2, never touching tier 1 or components.

That separation is also what makes the Figma sync work. Tier-2 names map one-to-one to Figma variables, the light and dark files map to Figma variable modes, and the `var()` references map to Figma variable aliases.

Flip the theme in the Storybook toolbar to see it.

**Breakpoints are emitted twice**, to CSS and to TypeScript, because `@media (min-width: var(--x))` is not valid CSS. Storybook viewports are generated from the TypeScript so they cannot drift from the tokens.

## How I use this playground

This is the workflow I'm exploring with it, and it will keep changing while I build a course around it.

1. **Work on the `design` branch.** A branch is a parallel copy of the code. `design` is where prototypes live, so nothing you try there touches `main` ([docs/branching.md](docs/branching.md)).
2. **See the system in Storybook.** Every component, live and working, so you can see the codebase instead of reading it.
3. **Keep Figma in step with the code.** The Figma library is generated from this code through the Figma Console MCP (MCP is a standard plug that lets an AI tool read from another tool and work in it), following the `figma-library-from-code` skill in `.claude/skills/`. Variables, text styles and components use the same names and options as the code. Where Figma cannot express the CSS, it is written down in `figma/GAPS.md` rather than simplifying the CSS.
4. **Prototype in Storybook with real components**, then ask the agent to build the screen in Figma, where the library is already set up.
5. **Explore in Figma.** Move things by hand, put research and references next to it, and stay in the system or step out of it on purpose when the design needs something custom.
6. **Bring it back to code.** Ask the agent to rebuild the Figma screen from the real components. `figma/manifest.json` is how a Figma name like `Button · variant=primary` resolves back to `<Button variant="primary">`. The result is a real, clickable prototype in Storybook.
7. **Hand off.** An accepted prototype does not merge as it is. It gets built properly on a `feature/*` branch through a pull request, where developers run the tests and checks production code needs.

**What has been tried and what has not.** The Figma to Storybook direction has been done here once: the booking flow under *Prototypes* in Storybook started as a Figma prototype. Steps 6 and 7 have not been run inside a real product team yet, and there is no packaged skill for moving prototypes between Figma and Storybook. You ask for it in plain words.

## Run it on your computer

**If you have never run code before, you need exactly two things:**

1. **[Claude Code](https://claude.com/claude-code)** — the desktop app.
2. **[Node.js](https://nodejs.org)** — download the LTS build and run the
   installer. Node 22 or newer (this repo is developed on Node 24). To check
   whether you already have it, open Terminal and type `node -v`.

Then download this repository (green **Code** button → **Download ZIP**),
unzip it, open the folder in Claude Code, and say:

> Show me Storybook

Claude installs the dependencies and starts it for you. To run the health
check on this system, say:

> Run the design system inspection

The inspection skill already ships inside this repo — nothing to install.

### Or, from the terminal

```bash
npm install
npm run storybook   # http://localhost:6001  <- the real workspace
npm run dev         # http://localhost:5173  <- scratch playground
npm run build       # tokens + typecheck + production build
npm run build:tokens # regenerate the CSS token layer from tokens/
npm run build-storybook
npm run check:contrast # colour contrast of every token pair
```

Open **Getting started** in the Storybook sidebar first.

## What's where

```
tokens/                SOURCE OF TRUTH for design decisions (DTCG JSON)
  tier-1-definitions/  raw ramps and scales, themeless
  tier-2-usage/        roles, themed light/dark, plus composite text styles
scripts/
  build-tokens.mjs     Style Dictionary build: tokens/ -> src/tokens/
  validate.mjs         the rules check (npm run validate)
  sync-status.mjs      writes docs/sync-status.md (npm run sync-status)
  figma/               snapshot, audit, token and spec scripts for the Figma side
figma/
  manifest.json        what the Figma library contains, plus the key map
  GAPS.md              where Figma cannot match the code, and why
.claude/
  skills/              figma-library-from-code, ds-inspection, storybook-figma-sync
  settings.json        the session-start sync check
.mcp.json              the Storybook MCP for Claude Code
src/
  tokens/              GENERATED — do not edit
    primitives.css     from tier-1-definitions/
    semantic.css       from tier-2-usage/, light and dark blocks
    breakpoints.ts     breakpoints as values, for media queries and viewports
    base.css           imports the generated CSS, plus a minimal reset
  components/          42 components, one folder each
  foundations/         Colour, Typography, Space and shape, Motion
  patterns/            Settings page, Sign-up form, Data table, App shell
  index.ts             the public surface of the library
CLAUDE.md              the rails: ground before writing, then the rules
docs/
  architecture.md      why the repo is shaped this way
  conventions.md       how to add a component
  branching.md         the Gitflow variant, including the design branch
  layout.md            the layout words: Stack, Cluster, Split, Columns, Grid, Page
  sync-status.md       GENERATED — code and Figma side by side (sync-status.json feeds the Storybook page)
```

## Going further

### Adding a component

See [docs/conventions.md](docs/conventions.md). The short version:

1. If Base UI has a primitive, wrap it. Never rebuild focus management or ARIA.
2. Read the primitive's types and Base UI's own reference demo before writing. Not from memory.
3. Semantic tokens only. No raw hex, no primitive colours.
4. Style from Base UI's `data-` state attributes, not from React state.
5. A story per meaningful state, disabled included, and a clean a11y panel in both themes.

### Branching

See [docs/branching.md](docs/branching.md). `main` is the design system; changes land on it through `feature/*` pull requests. `design` exists as a long-lived branch for designers to prototype in real code, and accepted prototypes come back through a normal feature branch rather than merging `design` directly.

### Roadmap

- [x] Base UI + Storybook, token layer, 42 components, foundations and patterns
- [x] On GitHub with the branch model documented
- [ ] Semantic scale tokens for space, radius and type, so density theming is possible without editing primitives
- [x] Move tokens to a DTCG source of truth (`tokens/**/*.json`) with a generator emitting the CSS
- [x] Sync tokens to Figma variables (mirrored 2026-09-10 through the Figma Console bridge)
- [ ] Code Connect mappings so Figma components point at these files
- [x] Publish Storybook from `main` (GitHub Pages)
- [ ] Publish Storybook per branch, including `design`

## Words you will hear

| Word | Means |
| --- | --- |
| **Repository (repo)** | The project folder, with the full history of every change. This one lives on GitHub |
| **npm / Node.js** | The tools that install and run everything. You type `npm run storybook`, they do the rest |
| **Build** | Turning the source files into a finished website. The live Storybook is a build |
| **Component** | A reusable piece of interface, like a Figma component. In code it is a file you use as `<Button />` |
| **Prop** | A component property. `variant="primary"` in code is `variant=primary` in Figma |
| **Token** | A named design decision (a colour, a spacing step) that code and Figma share |
| **Primitive / semantic token** | *What* a value is (a colour from a ramp) / *what it is for* (the background of a primary button). Components use semantic tokens |
| **Story** | One example of a component in one state, shown in Storybook |
| **MCP** | A plug that lets an AI assistant (Claude, Cursor) look things up in a tool and work in it: Storybook, or the Figma desktop app |
| **Code Connect** | A Figma feature that shows the real code of a component in Dev Mode. Needs an Organization or Enterprise plan |
| **Branch** | A parallel copy of the code. `main` is the design system, `design` is where prototypes live |
| **Pull request** | A proposal to bring changes from one branch into another, with checks and a review first |

## Not done / not checked

- Some colour pairs still fail contrast: `npm run check:contrast` lists them.
- Steps 6 and 7 of the workflow have not been run inside a real product team, and there is no packaged skill for moving prototypes between Figma and Storybook.
- Code Connect is not set up (Organization or Enterprise plan).
- Storybook is published from `main` only, not per branch.

## Made by

[Christine Vallaure](https://christinevallaure.com), founder of [moonlearning.io](https://moonlearning.io). I teach designers how Figma, code and AI fit together.

- **The full course on this workflow** is in the making: advanced, for designers with solid Figma skills. The [newsletter](https://moonlearning.io/newsletter) is where I announce it.
- **Live course on Maven:** [Build Scalable UI in Figma & AI: Design Systems Agents Can Actually Use](https://maven.com/moonlearning/figma). Four weeks, hybrid, all levels.
- **Lightning session:** *Design Figma Files That Scale with AI*, with materials at [moonlearning.io/scaleAI](https://moonlearning.io/scaleAI).
- **Self-paced Figma courses** in the [moonlearning store](https://moonlearning.io/store), and [free sessions](https://moonlearning.io/resources).
- **For design teams:** in-house AI workshops and consulting, through [moonlearning.io](https://moonlearning.io).

## Credits

This repo is based off of **[Christine Vallalaure's ds-base-ui playground](https://github.com/christinevall/ds-base-ui)**. The design system health check in `.claude/skills/ds-inspection/` is the
`ds-inspection` skill by **[Brad Frost](https://bradfrost.com)**, from
<https://github.com/bradfrost/skills>, bundled here under the MIT licence so
that it runs with no setup. See
[`.claude/skills/ds-inspection/ATTRIBUTION.md`](.claude/skills/ds-inspection/ATTRIBUTION.md).

## License
MIT License - see the [LICENSE](https://github.com/southleft/ds-audit/blob/master/LICENSE).
