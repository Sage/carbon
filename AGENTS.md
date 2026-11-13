# carbon-react agent instructions

- Stack: TypeScript, React (peer range 17 or 18; developed on 18, so do not use 18-only APIs such as
  `useId` or `useTransition`), styled-components v5, Storybook 10, Jest, Playwright. Setup:
  `contributing/dev-environment-setup.md`. If a task changes Node/npm, dependencies, npm scripts, or
  lint/test config, check whether this file needs updating.

## Scope and existing work

- Treat user-supplied file lists as strict write allowlists, including files the user names as the
  ones to edit. Other files may be read, not changed. If another file must change, stop and ask first.
- Dependencies and related components: inspect, do not modify, unless explicitly in scope. Updating
  related tests covers the requested component or behavior, not dependency components.
- At the start of every task, run `git status --short` and treat all reported files as pre-existing
  work. A file becomes task-owned only when the request authorizes changing it; existing edits in it
  must still be preserved.
- Never revert, overwrite, reformat, stash, stage, or delete pre-existing work. If finishing would
  require staging it (including a file that mixes it with task edits), stop and ask.
- Do not commit, push, or create a pull request unless explicitly asked. Before finishing, run
  `git status --short` again, compare with the initial result, and report every newly changed file.
  Do not clean up an unexpected change; stop and report it.
- If two instructions conflict, stop, make no further changes, and ask (or report, if you can't ask).

## Breaking changes and deprecation

- A change is breaking only when existing consumer code must change to compile, import, or
  configure. Visual or layout changes from altered defaults are not breaking. This definition takes
  precedence over other repo files.
- Public API is what component `index.ts` files and `src/index.ts` export, not source location.
  Unexported code, including under `__internal__/`, is private.
- Conventional Commits. User-visible behavior, public API, or runtime dependency changes need
  `feat:` or `fix:`. Breaking changes need a `BREAKING CHANGE:` footer with migration guidance.
  Adding a deprecation is non-breaking; removing or renaming the deprecated API is breaking. Types:
  [CONTRIBUTING.md](CONTRIBUTING.md).
- `@deprecated` must name the replacement. Deprecate before removing. A deprecated prop must not
  silently stop working. New deprecations: JSDoc; `Logger.deprecate` is legacy.

## Code rules (`src/**/*`)

- Prefer Fusion tokens and components over legacy ones. Replace legacy pieces rather than edit them.
- Remove dead, redundant, and no-op code: props matching defaults, unused constants, commented-out
  code, skipped tests.
- Stories and MDX must match the current implementation.
- Prefer Sage/Carbon design tokens over hard-coded visual values. Use the matching `-none` token
  (for example `var(--global-radius-none)`) instead of a literal `0` when one exists. Check themes
  and dark mode when touching themeable styling.
- Reuse existing helpers, types, and tokens. Before adding a helper, type, or token mapping, check
  whether one already exists. Never import `color` from `styled-system`; use `src/style/utils/color`.
- File suffixes: `.component.tsx`, `.style.ts`, `.test.tsx` (jsdom), `.pw.tsx` (Playwright),
  `.test-pw.tsx` (Playwright component wrappers), `.stories.tsx` (public docs), `-test.stories.tsx`
  (private, Chromatic/Playwright only), `.mdx`.
- `data-component` on roots, `data-element` on sub-elements, `data-role` for queries. Reserve
  `data-testid` for Storybook interaction stories.
- Each component `index.ts` exports the component and its `Props`. Add no new re-exports from
  `__internal__/`; move public definitions out first. Existing ones stay public API.
- Translations come from `useLocale()`; never import `en-gb` or add component fallbacks. New keys go
  in the locale contract, `en-gb.ts`, and translation-key docs. Locale changes: new or changed keys go in
  en-gb.ts only (it is the fallback). Do not report other locales lagging as a defect. When the task
  or user asks to update other locales, do so. When removing a key: remove it from every locale file that has it.
- Tests: cheapest single seam, no duplicate coverage, no style assertions in jsdom. Prefer accessible
  RTL queries; no broad snapshots. Jest enforces 100% coverage (`contributing/testing-guide.md`).
- Interactive components: cover browser-dependent behavior in Playwright and call
  `checkAccessibility(page, ...disableRules)` (`playwright/support/helper.ts`) in new or changed
  `.pw.tsx` tests. Checklist: `.agents/skills/carbon-a11y/`.

## Commands and validation

- Do not run broad `npm run format`, generators, snapshot updates, autofix, installs, dependency
  updates, or other write-producing commands unless the task requires their output, and it is in
  scope or the user approves. Format only authorized files (`npx prettier --check <files>`).
- During PR review: do not run lint, test, typecheck, or build. The PR has passed commit hooks and
  CI. Review by reading.
- During review of uncommitted changes: run the narrowest direct commands against only the changed
  files — npx eslint <files>, npx prettier --check <files>, npx tsc --noEmit. Do not run npm scripts
  (lint, test, build) as they trigger generate-tokens and other side effects. Run tests only if the
  change is non-trivial and a specific test file exists.
- During implementation: before finishing, verify your own changes the same way as uncommitted
  review above.
- `npm run format`, `build:skills` (without `--check`), `generate-tokens`, `build`, and setup
  scripts write files; inspect them first. If generated tokens are absent, report it and ask before
  running `generate-tokens`.
- When running a single test file, use `npx jest <file> --coverage=false`. The global coverage
  threshold blocks single-file runs.
- In test files, `innerHTML` assignments are acceptable for test setup; use `eslint-disable` with a
  comment.
- When running `npx prettier --write <files>`, if the file has pre-existing uncommitted changes, run
  `--check` first and report conflicts instead of writing.
- Never add unused `eslint-disable` comments or raise the lint warning ceiling.

## Generated Carbon skill (`skills/carbon-react/`)

- When a task changes public API, props, behavior, stories/examples, or referenced docs, run
  read-only `npm run build:skills -- --check` after source validation, even with a restricted write
  scope, and state the result. On drift with `skills/carbon-react/` not explicitly in scope, ask
  before regenerating. In a read-only review, do not run it (pre-commit and CI enforce it); flag a
  public-surface change with no `skills/carbon-react/` change instead.
- `npm run build:skills` deletes and recreates generated directories. Run it only when
  `skills/carbon-react/` is in the write scope (or the user approves) and the drift comes only from
  this task. Rerun `--check`; report every changed catalog file.

## Security, subagents, review

- No unsanitized `dangerouslySetInnerHTML`, `innerHTML`, `insertAdjacentHTML`, or `document.write`.
  Sanitize rich content; explain why in review.
- Report vulnerabilities via [SECURITY.md](SECURITY.md), not a public issue or PR. Use subagents
  only when explicitly requested or when a skill defines a bounded subagent workflow.
- Review comments use a Conventional Comments label (`issue:`, `suggestion:`, `question:`,
  `nitpick:`, `praise:`, `thought:`, `chore:`, `note:`) as `<label> [decorations]: <subject>`.
  `(blocking)` only if it must be resolved before merge; `(non-blocking)` if deferrable; `(if-minor)`
  if scope-dependent.
