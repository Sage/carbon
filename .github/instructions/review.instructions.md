---
applyTo: "**/*.{js,jsx,ts,tsx,md,mdx,mjs,cjs,json,yml,yaml}"
excludeAgent: "cloud-agent"
description: "Use for pull request review in this repo. Covers breaking changes, skills drift, commit-type mismatches, instruction drift, skips, and preferred comment style."
---

# carbon-react — Review Instructions

- Pull request review only. Use shared repo rules from `.github/copilot-instructions.md`.
- Prioritize bugs, regressions, breaking changes, and missing tests over style comments.
- Do not restate prettier, eslint, or type-check output already covered by CI.
- Prefer Conventional Comments: `<label> [decorations]: <subject>`.
- Labels: `praise:`, `nitpick:`, `suggestion:`, `issue:`, `question:`, `thought:`, `chore:`, `note:`. Decorations: `(blocking)`, `(non-blocking)`, `(if-minor)`.
- Breaking: flag missing `BREAKING CHANGE:` when a PR removes or renames a public export from component `index.ts` or `src/index.ts`; removes or renames a public `Props` interface or required prop; narrows a public prop type; removes public union members; or changes a default that affects output or runtime behavior.
- Ignore breaking checks for `__internal__/` paths and previously `@deprecated` symbols or props.
- Skills: public API, props, behavior, or docs changes must update `skills/`; use `npm run build:skills -- --check` as source of truth.
- Commit type: `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `build:`, and `ci:` must not include user-visible behavior changes, public API changes, or runtime dependency changes; those should use `feat:` or `fix:` and add `BREAKING CHANGE:` when breaking.
- Instruction drift: flag changes to `.nvmrc`, Node/npm workflow versions, major deps, script names/order, eslint config, coverage thresholds, Jest/Playwright config, root config names, conventional commit types, or component file conventions when instructions are not updated.
- Skip `skills/**`, `package-lock.json`, `lib/**`, `esm/**`, `storybook-static/**`, `coverage/**`, `bundle-stats/**`, `playwright/test-results/**`, `playwright/test-report/**`, `playwright/coverage/**`, `playwright/.cache/**`, `src/components/tokens-wrapper/static-tokens/**`, `CHANGELOG.md`, `CHANGELOG-OLD.md`.