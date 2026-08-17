---
applyTo: "**/*"
excludeAgent: "code-review"
description: "Use for implementation work in this repository. Covers setup, worktree safety, generated output, and validation."
---

# Carbon React — Shared implementation instructions

- Use the Node version in `.nvmrc` and an npm version satisfying `package.json#engines`. For a clean setup, run `nvm use`, verify the npm requirement, then run `npm run setup`; do not replace the lockfile-based install with another package manager.
- Inspect the relevant implementation, tests, stories, docs, and nearby components before editing. Keep changes minimal and do not resolve or overwrite unrelated worktree changes.
- Do not commit `lib/`, `esm/`, `coverage/`, `storybook-static/`, `bundle-stats/`, Playwright result/cache/coverage directories, or `src/components/tokens-wrapper/static-tokens/`.
- Do not add unused `eslint-disable` directives or raise lint warning ceilings. Use Conventional Commits. Adding a public deprecation is non-breaking; removing or renaming that deprecated API is breaking and requires a `BREAKING CHANGE:` footer with migration guidance.
- Prefer npm scripts over direct tool commands. The test, lint, and Playwright scripts generate static tokens; run `npm run generate-tokens` before direct tools or `npm run type-check` when tokens are absent.
- Run the narrowest relevant check first, then expand in proportion to risk. Broader checks are `npm run lint`, `npm run type-check`, `npm test`, and `npm run build`. `npm run format` writes files.
- Public API, prop, behavior, or documentation changes must regenerate `skills/` with `npm run build:skills`; use `npm run build:skills -- --check` to detect drift.
