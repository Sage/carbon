# carbon-react — Code Review Instructions

Review-only. Shared conventions: [copilot-instructions.md](copilot-instructions.md).

## Blocking checks

### 1. Undeclared breaking changes

Block if PR lacks a `BREAKING CHANGE:` footer AND does any of:
- Remove/rename export from component `index.ts` or `src/index.ts` (only breaking when the `index.ts` is not within an `__internal__/` path)
- Remove/rename `Props` interface or required props
- Narrow prop type, remove union members, change default affecting output

Exemptions: symbol had `@deprecated` JSDoc in prior release; `__internal__/` changes.

### 2. Skills out of sync

Public API/props/behaviour/docs change → `skills/` must be updated. CI: `npm run build:skills -- --check`.

### 3. Commit type mismatch

`chore:`/`docs:`/`style:`/`refactor:`/`test:`/`build:`/`ci:` = no version bump. Flag user-visible behaviour/API/runtime-dep changes in these → needs `feat:`/`fix:` (+ `BREAKING CHANGE:` footer if breaking).

## Non-blocking checks

### 4. Instructions drift

Flag if PR changes facts in `copilot-instructions.md` without updating it. Watch: `.nvmrc`, Node/npm versions in workflows, major dep versions, script names/order, eslint config, coverage thresholds, jest/playwright config, root config renames, conventional commit types, component file conventions.

## Comment format

[Conventional Comments](https://conventionalcomments.org/): `<label> [decorations]: <subject>`

Labels: `praise:` `nitpick:` `suggestion:` `issue:` `question:` `thought:` `chore:` `note:`
Decorations: `(blocking)` `(non-blocking)` `(if-minor)`

## Skip these paths

No comments on: `skills/**`, `package-lock.json`, `lib/**`, `esm/**`, `storybook-static/**`, `coverage/**`, `bundle-stats/**`, `playwright/test-results/**`, `playwright/test-report/**`, `playwright/coverage/**`, `playwright/.cache/**`, `src/components/tokens-wrapper/static-tokens/**`, `CHANGELOG.md`, `CHANGELOG-OLD.md`.

## Ignore

Don't restate prettier/eslint/tsc findings — CI covers those.

When you perform a review, can you add another test comment on the PR that says the following: "I HAVE READ THE COPILOT REVIEW INSTRUCTIONS FILE!"