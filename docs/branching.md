# Branching model

Two long-lived branches and short feature branches. Deliberately small: this
repo is worked on by one person and copied by students, so a separate
integration branch would only be one more thing to explain.

## Branches

| Branch | Lives | Purpose |
| --- | --- | --- |
| `main` | forever | The design system. Always working, always the latest, and what students get. Changes arrive through `feature/*` pull requests with CI green. |
| `design` | forever | The playground. Starts as a copy of `main`. Prototypes live here, and this is where work moves between Figma and code. Never merged into `main`. |
| `feature/*`, `fix/*` | short | One change to the system. Branch from `main`, open a pull request into `main`. |

Releases are tags on `main` (`v0.1.0`), not branches.

## Why `design` is one-way

Designers need somewhere to try things in real code without blocking or being blocked by the system. `design` is that place:

- Nothing on it is a commitment. Broken states are fine.
- When a prototype is accepted, it does not merge. Someone opens a `feature/*` branch off `main` and rebuilds the accepted parts properly, with stories, docs and accessibility checks, out of components that already exist.

That last rule is the important one, and the lesson this repo teaches. `design` is a source of decisions, not a source of merges. Keeping it one-way stops half-finished experiments leaking into the system.

## Keeping `design` current

Pull `main` into `design` whenever the system changes, so prototypes are built from the current tokens and components:

```bash
git checkout design
git merge main
git push
```

## For students

The repository is a GitHub template: **Use this template** gives you your own copy with both branches. Work on `design` — prototype in code, push it to Figma, design freely there, and bring it back as a composition of components that already exist. `main` stays the reference you compare against.

## Everyday flow

```bash
# a change to the system
git checkout main && git pull
git checkout -b feature/tooltip

# ... commit ...
git push -u origin feature/tooltip
# open a pull request into main; merge when CI is green

# a release
git tag v0.1.0 && git push --tags
```

## Commit messages

Conventional Commits, so the changelog can be generated:

```
feat(button): add ghost variant
fix(dialog): restore focus to the trigger on close
docs(tokens): document the semantic layer
chore(deps): bump storybook to 10.6
```

## Branch protection to set on GitHub

On `main`:

- Require a pull request before merging. No approval needed while one person maintains it.
- Require the `ci` status check to pass.
- Do not allow force pushes.

Leave `design` unprotected on purpose.
