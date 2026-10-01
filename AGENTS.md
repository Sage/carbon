# carbon-react agent instructions

These are repository-wide instructions for coding agents working in
`carbon-react`.

## Applicability and precedence

- These instructions apply to every task performed in this repository.
- Follow higher-priority instructions first, in this order: platform rules,
  security policies, organization policies, then user instructions. Apply all
  repository instructions relevant to the task and files being worked on, but
  only once they don't conflict with any of the above. When two repository
  instructions conflict at the same priority level, resolve the conflict
  using whichever precedence mechanism your specific agent tooling defines;
  absent that, the instruction with the most specific applicable scope wins.
  If a conflict remains unresolved, stop and report it before changing files.
- Use available tools to follow these instructions. If a required tool or
  capability is unavailable, do not invent its result or silently skip the
  requirement; report the limitation and use a safe alternative when one exists.

## Scope and existing work

- Make only the changes required by the user's request; do not fix unrelated
  issues.
- At the start of every task, run `git status --short` and treat all reported
  files as pre-existing work. A file becomes task-owned only when the user's
  request authorizes changing it; existing edits in that file must still be
  preserved.
- Treat user-supplied file lists as strict write allowlists. Other files may be
  read, but not changed. If another file must change, stop and ask first.
- Dependencies and related components may be inspected, but not modified unless
  they are explicitly part of the requested scope. A request to update related
  tests authorizes tests for the requested component or behavior, not changes
  to dependency components.
- Preserve all pre-existing changes. Never revert, overwrite, reformat, stage,
  or delete work that predates the task.
- Do not stage, commit, push, or create a pull request unless the user explicitly
  requests that action.
- Before finishing, run `git status --short` again, compare it with the initial
  result, and report every file newly changed during the task. Do not
  automatically clean up an unexpected change; stop and report it.

## Commands and validation

- Distinguish read-only checks from commands that write files. Prefer targeted,
  read-only checks proportionate to the change.
- Do not run broad `npm run format`, generators, snapshot updates, autofix,
  installation, dependency updates, migrations, or other write-producing
  commands unless the task requires their output and that output is in scope or
  the user approves it.
- Format only explicitly authorized files, for example with
  `npx prettier --check <files>` for a read-only check or
  `npx prettier --write <files>` when formatting those files is authorized.
- Relevant checks, from narrowest to broadest, are targeted Jest or Playwright
  tests, Prettier check on changed files, `npm run lint`, `npm run type-check`,
  `npm test`, `npm run build:skills -- --check`, and `npm run build`. Do not run
  every check by default.
- `npm run format`, `npm run build:skills`, `npm run generate-tokens`,
  `npm run build`, and setup/install scripts write files. Inspect their scripts
  and expected outputs before running them.
- `npm run lint`, `npm test`, and `npm run test:ct` invoke token generation and
  can rewrite `src/components/tokens-wrapper/static-tokens/`. Direct Jest,
  ESLint, TypeScript, or Playwright commands do not generate tokens; use them
  only when the required generated tokens already exist and the direct command
  is appropriate. If token generation is needed, ensure its generated output
  is authorized before running it.
- If validation modifies files outside the approved scope, stop and report the
  files. Do not restore, delete, or include them without approval.

## Repository conventions

- This is a Sage React component library using TypeScript, React 17 and 18,
  styled-components v5, Storybook 10, Rollup, Jest, and Playwright component
  tests. Storybook and Chromatic cover documentation and visual states.
- Public API is defined by exports from component `index.ts` files and
  `src/index.ts`, not source location. Unexported code, including under
  `__internal__/`, is private.
- Use the Node version specified by `.nvmrc` and an npm version satisfying
  `package.json#engines`. When installation is authorized, use `npm ci`; do not
  use another package manager.
- Never commit `lib/`, `esm/`, `coverage/`, `storybook-static/`,
  `bundle-stats/`, Playwright result/cache/coverage directories, or
  `src/components/tokens-wrapper/static-tokens/`.
- We test against the latest versions of Chrome, Firefox, Safari, and Edge,
  with polyfills covering the latest two versions of each for a grace period.
  Avoid relying on browser APIs outside that support window without a
  polyfill.
- Never add unused `eslint-disable` comments or raise lint warning ceilings.
- Use Conventional Commits. User-visible behavior, public API, or runtime
  dependency changes require `feat:` or `fix:`, not a non-user-facing type
  (`chore:`, `refactor:`, `docs:`, etc). Breaking changes require a
  `BREAKING CHANGE:` footer with migration guidance, even for a type that
  normally triggers no release. Adding a deprecation is non-breaking and needs
  no footer; removing or renaming the deprecated API is breaking and does. See
  [CONTRIBUTING.md](CONTRIBUTING.md) for the full type-to-release-type table.

## Generated Carbon skill

- Source components, public exports, stories, and selected `docs/*.mdx` files
  feed the tracked `skills/carbon-react/` catalog.
- When a task changes public API, props, behavior, stories/examples, or
  referenced docs, run the read-only
  `npm run build:skills -- --check` after relevant source validation.
- `npm run build:skills` deletes and recreates generated skill directories. Run
  it only when all resulting `skills/carbon-react/` changes are authorized, then
  rerun `npm run build:skills -- --check`.
- Skill drift is enforced by a required CI check, not just a recommended
  validation: a PR whose `skills/` catalog is out of sync with a component's
  API, props, behavior, or docs will fail CI and cannot merge.

## Security

- `eslint-plugin-no-unsanitized` is enforced: do not introduce unsanitized
  `dangerouslySetInnerHTML`, `innerHTML`, or similar HTML/script-injection
  sinks. If a component must render rich content, sanitize it first and
  explain why sanitization is safe in review.
- Report suspected vulnerabilities through Sage's disclosure policy in
  [SECURITY.md](SECURITY.md) rather than filing a public issue or PR.

## Subagents

- If the agent platform supports subagents, use them only when explicitly
  requested or when an applicable skill defines a bounded subagent workflow.
- Prefer independent, read-only work such as exploration, research, review
  lanes, and log analysis.
- Keep all repository edits owned by the primary agent. Do not run parallel
  write-heavy agents in the same worktree.
- Give each subagent an exact boundary and require concise, evidence-linked
  results. The primary agent must verify, reconcile, and deduplicate them.
- Do not delegate small or inherently sequential tasks.

## Pull request review

- Review the PR description, changed files, relevant exports, adjacent
  implementation, and tests. Compare the proposed behavior with the current
  implementation and public contract, including defaults and documented
  examples. Make only evidence-backed, actionable findings on the smallest
  relevant changed line range, and explain the impact on library consumers or
  maintainers.
- Prioritize bugs, regressions, breaking changes, security, accessibility, and
  missing tests; do not restate formatter, lint, or type-check output already
  covered by CI.
- React compatibility and accessibility are reviewed against the same
  checklists as the `src/**/*` conventions below — this library supports
  React 17 and 18, and code is reviewed to the same accessibility standard
  it's implemented against. Browser-dependent interactions need Playwright
  coverage, not jsdom alone.
- Jest/RTL enforce 100% branch, function, line, and statement coverage — new
  or changed behavior must maintain that, not just add "a test."
- Scrutinize unexpected runtime dependency or lockfile changes.
- Flag committed generated output (build, coverage, Storybook/Playwright
  cache, static-token output) instead of reviewing it line by line.
- When a task changes Node/npm versions, major dependencies, npm scripts,
  lint/coverage/test configuration, or commit/layout conventions, check
  whether these instructions need a matching update.
- Use a Conventional Comments label for review feedback:
  `issue:`, `suggestion:`, `question:`, `nitpick:`, `praise:`, `thought:`,
  `chore:`, or `note:`, formatted as `<label> [decorations]: <subject>`. Add
  `(blocking)` only when the finding must be resolved before merge,
  `(non-blocking)` when feedback may be deferred, and `(if-minor)` when
  resolution depends on scope; otherwise omit the decoration. If no label
  clearly fits, use a direct, concise comment instead of forcing one.
- Treat removed/renamed public exports or props, narrowed public prop types,
  removed union members, and output-affecting default changes as potentially
  breaking. Exclude `__internal__/` and already deprecated APIs. Carbon takes
  a deliberately cautious stance here: mark something breaking even if the
  impact on consumers seems extremely unlikely, and prefer flagging frequent
  small breaking changes over letting them go unmarked or batching them
  without a technical reason to.
- Use `npm run build:skills -- --check` to detect generated catalog drift.

## Path-specific conventions

### `src/**/*`

#### Structure and exports

- Components live in `src/components/<kebab>/`; next-generation work lives in
  `__next__/`, which keeps the same file-suffix layout as the legacy
  implementation it replaces; shared internals live in `src/__internal__/`,
  `src/__spec_helper__/`, `src/hooks/`, `src/locales/`, and `src/style/`.
- Prefer small, focused components and helpers over large multi-purpose ones.
- Within a component folder, split by suffix: `.component.tsx` (logic),
  `.style.ts` (styled-components), `.config.ts` (config, where used),
  `.test.tsx` (jsdom unit tests), `.pw.tsx` (Playwright browser tests),
  `.stories.tsx` (public docs stories), `-test.stories.tsx` (private,
  Chromatic/Playwright-only stories, not shown in docs), and `.mdx` (docs).
  Any `contributing/*.md` guide that conflicts with this (for example naming
  unit tests `.spec.tsx`) is stale; follow the convention actually used in
  existing component folders.
- Use `data-component` on roots, `data-element` on sub-elements, and `data-role`
  for queries. Reserve `data-testid` for Storybook interaction stories.
- Each component `index.ts` exports the component and its `Props`. Do not add
  new re-exports from `__internal__/`; move public definitions to
  non-internal modules before exporting them. Treat existing re-exports from
  `__internal__/` as public API — do not remove or break them as a side
  effect of this rule. Public-ready `__next__` exports use a `Next` prefix
  from `src/index.ts` (for example `NextLoader`); legacy wrappers delegate
  and map legacy props.

#### Styling, tokens, and code style

- Prefer `/** @deprecated ... */` over runtime logging. Never import `color`
  from `styled-system`; use `src/style/utils/color`. Do not use `console.*`.
- Prefer Sage/Carbon design tokens over hard-coded visual values, including
  for zero/none values — use the matching "-none" token (for example
  `var(--global-radius-none)`, `var(--global-borderwidth-none)`) instead of a
  literal `0` when one exists for that property, so themed overrides still
  apply. Check supported themes and dark mode when the diff touches themeable
  styling.
- Avoid magic numeric or string constants where a named token, enum, or
  existing constant already expresses the same value; a repeated literal that
  duplicates an existing name is a maintainability risk even when it behaves
  correctly today.

#### Internationalization

- Components must obtain translations through `useLocale()`. Do not import
  `en-gb` or implement component-level translation fallbacks; the i18n context
  and `I18nProvider` centrally provide and merge the default `en-GB` locale.
  Add new keys to the locale contract and `en-gb.ts`, and update relevant
  translation-key documentation. Only `en-GB` is required to gain new or
  changed keys immediately; other locale files are community-maintained per
  `docs/i18n.mdx` and may legitimately lag behind without that being a defect.
  Do not report an untranslated non-`en-GB` key as a regression; check instead
  that the translation-keys table/docs were updated for the new keys.

#### Testing

- Keep jsdom tests focused, prefer accessible RTL queries, avoid broad
  snapshots and `:has()` in tested styles. Add tests for each new or changed
  behavior and branch — Jest/RTL enforce 100% branch, function, line, and
  statement coverage.
- `*.test.tsx` runs under the jsdom project; `*.server.test.tsx` runs under a
  separate Jest project with `testEnvironment: "node"` (see
  `jest.config.ts`) — no DOM or browser globals are available there, so use
  it only for genuinely server-side behavior, not as a jsdom substitute.
- Chromatic snapshots every story on each PR and flags visual regressions
  against the baseline. To add a visual test, add a story demonstrating the
  behavior (use a `-test.stories.tsx` file for a private, docs-excluded
  story). Snapshots are enabled by default but can be disabled per story
  file in its metadata-level Storybook parameters — check for that before
  assuming a missing visual diff means no regression.

#### React behavior and accessibility

- This library supports React 17 and 18: preserve compatibility with both.
  Watch for unsafe render side effects, Strict Mode regressions, hydration or
  SSR-unsafe browser globals, controlled/uncontrolled state changes, stale
  closures, and missing effect cleanup.
- Accessibility is a first-class concern: check semantics, accessible names
  and labels, ARIA relationships, keyboard behavior, focus
  movement/restoration, escape and dismissal behavior, disabled states, and
  reduced motion. Cover browser-dependent interactions with Playwright, not
  jsdom alone. Use the `checkAccessibility(page, ...disableRules)` helper
  from `playwright/support/helper.ts` (backed by `@axe-core/playwright`) in
  new or changed `.pw.tsx` tests for interactive components, rather than
  relying on manual review alone; Storybook's `@storybook/addon-a11y` also
  surfaces violations during development.

### `playwright/**/*`

- Put browser behavior in `<name>.pw.tsx` and helpers in
  `playwright/components/<name>/`.

### `docs/**/*`

- Use `*.mdx`.

### `scripts/**/*`

- Use `console.*` only for intentional CLI output.
