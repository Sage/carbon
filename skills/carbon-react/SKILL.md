---
name: carbon-react
description: Carbon component catalog with typed props, Storybook usage examples, and curated docs references. Use proactively when the user asks about any Carbon component and its props, which component to use for a given UI need, migrating a deprecated component, usage guidance or when implementing or reviewing any UI built with carbon-react.
---

# Carbon Component Catalog

Use `index.md` to find a component and its description.
Use `components/{slug}/index.md` for a component's props and examples.
Use `components/{slug}/examples/*.md` for example source code.

## Deprecated components

Deprecated components are marked in `index.md` and in their file.
Prefer the non-legacy version (`button`) over the legacy one (`button-legacy`) unless explicitly asked.
Do not use deprecated props unless explicitly asked.
For migrating a deprecated component, read `references/docs/deprecation-migration.md`.

## Reference docs

- `references/docs/usage.md` — general usage guide
- `references/docs/installation.md` — installation
- `references/docs/recommended-practices.md` — recommended practices
- `references/docs/validations.md` — validation for input components
- `references/docs/useMediaQuery.md` — custom React hook and a JavaScript implementation of a CSS media query
- `references/docs/deprecation-migration.md` — deprecated components migration guide
- `references/docs/usage-with-routing.md` — using Carbon components with routing libraries
- `references/docs/i18n.md` — how localisation works in Carbon
