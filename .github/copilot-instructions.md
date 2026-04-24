# Carbon (carbon-react) — Copilot Agent Instructions

Trust these instructions. Only fall back to repo-wide search if something here is incorrect or incomplete.

## 1. What this repo is

- **`carbon-react`** — Sage's React component library, published to npm.
- **Language / stack**: TypeScript + React 18 (peer-supports 17 & 18), styled-components v5, Storybook 8 (8.6.x, Vite builder), Rollup build, Jest (jsdom + node projects), Playwright Component Testing (Chromium only).
- **Size**: Large monorepo-style single package. ~90 components under [src/components/](../src/components), large `package.json` (~9.6 KB), `package-lock.json` ~800 KB. `npm ci` is slow (several minutes); the `lib/`/`esm/` build is also slow.
- **Distribution**: Two outputs — `lib/` (CJS) and `esm/` (ESM), both produced by Rollup + `tsc` for `.d.ts`.

## 2. Required environment

ALWAYS use these versions; CI pins them and mismatches break installs/tests:

- **Node**: pinned in [.nvmrc](../.nvmrc) as `lts/krypton` (Node **24.x**, `>=24.11.0`). CI also runs Jest on Node **22**.
- **npm**: `>=11.11.1` (CI runs `npm install -g npm@11.11.1` before every job — do the same if the local npm is older).
- **OS**: Linux/macOS. Windows requires WSL.
- **`.npmrc`** sets `ignore-scripts=true`. After `npm ci` you MUST run `npm run prepare` (husky install) — this is what `npm run setup` does.

## 3. Bootstrap (always run first, in this order)

```sh
nvm use                 # picks up .nvmrc -> Node 24
npm install -g npm@11.11.1
npm run setup           # = npm ci && npm run prepare  (husky)
```

`npm ci` is the only supported install — never use `npm install` (lockfile is authoritative and `package-lock.json` changes will fail CI).

## 4. Generated assets — design tokens (gotcha)

Most scripts implicitly run `generate-tokens:dev` first (it writes into `src/components/tokens-wrapper/static-tokens/`). If you invoke `jest`, `eslint`, `tsc`, or `playwright` **directly** (not via `npm run …`), run this first or imports of static tokens will fail to resolve:

```sh
npm run generate-tokens:dev
```

`npm run build` uses the production variant `npm run generate-tokens` (no dark theme) — do not mix them.

## 5. Validation pipeline (mirror of CI in [.github/workflows/ci.yml](workflows/ci.yml))

Run these locally before pushing — CI runs the exact same commands and a PR will fail if any of them fail:

| Step | Command | Notes |
|---|---|---|
| Format check | `npx prettier --check './src/**/*.{js,jsx,ts,tsx}'` | Auto-fix with `npm run format`. |
| Lint | `npm run lint` | ESLint flat config in [eslint.config.mjs](../eslint.config.mjs). Uses `--max-warnings=636` and `--report-unused-disable-directives`; do not introduce new warnings or unused `eslint-disable` lines. |
| Type check | `npm run type-check` | `tsc --noEmit` against [tsconfig.json](../tsconfig.json). |
| Skills sync | `npm run build:skills -- --check` | Fails if files in [skills/](../skills) are stale relative to component changes. Regenerate with `npm run build:skills` and commit the diff. |
| Unit tests | `npm test` | Sharded 4 ways in CI; matrix runs on Node 22 and Node 24. Locally use Node 24 (`.nvmrc`). Two Jest projects: `Client` (jsdom) for `*.spec.*`/`*.test.*`, `Server` (node) for `*.server.spec.*`. |
| Coverage | (CI merges shards) | 100% coverage policy is expected for new code. Thresholds in [coverage-thresholds.json](../coverage-thresholds.json). Run a single test file with `npm test -- path/to/file.spec.tsx`. |
| Build | `npm run build` | Order is fixed: `clean-lib → generate-tokens → type-check → rollup → generate package.jsons → copy svg → build:types`. |
| Playwright CT | `npm run test:ct` | Separate workflow [.github/workflows/playwright.yml](workflows/playwright.yml). Runs against Chromium via `mcr.microsoft.com/playwright:v1.55.1-noble` in CI. Locally requires `npx playwright install --with-deps chromium` once. Tests live in `*.pw.tsx` next to components. |

Common failure patterns observed:

- "Cannot find module .../static-tokens/..." → forgot `generate-tokens:dev` (see §4).
- `nwsapi` `SyntaxError` from jsdom in a Jest test → caused by CSS `:has()` selectors in styled-components (especially in dialog/sidebar/popover styles). Avoid `:has()` in styles touched by jsdom tests, or assert via roles instead of querying the offending DOM.
- Husky pre-commit running `lint-staged` will run prettier + eslint on staged files; if it fails, fix and re-stage rather than bypassing with `--no-verify`.
- Commit messages MUST follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, etc.) — enforced by `commitlint` in [.husky/commit-msg](../.husky/commit-msg). Breaking changes via `!` or `BREAKING CHANGE:` footer drive `semantic-release` versioning.

## 6. Project layout & key conventions

```
src/
  components/<kebab-name>/        # one folder per public component (~90 components)
    <name>.component.tsx          # implementation + exported Props interface
    <name>.style.ts               # styled-components
    <name>.spec.tsx               # Jest + RTL tests (jsdom)
    <name>.pw.tsx                 # Playwright CT tests
    <name>.stories.tsx            # Storybook stories
    <name>.mdx                    # docs (carbon.sage.com)
    index.ts                      # public re-exports
    __internal__/                 # NOT exported; internal subcomponents
  __internal__/                   # shared internal helpers
  __spec_helper__/                # Jest setup, test utilities (excluded from coverage)
  hooks/  locales/  style/        # shared
playwright/
  components/<name>/{index.ts,locators.ts}  # custom locators by component
  index.html, index.tsx           # Playwright CT harness
  global-teardown.js
skills/                           # agent skills — MUST be regenerated when a component's public API changes (see §5 "Skills sync")
scripts/                          # repo automation (token gen, svg copy, package.json gen, skills build, commit helper)
.storybook/                       # Storybook 8 config (Vite)
.github/workflows/                # ci.yml, playwright.yml, chromatic.yml, semantic-release.yml, codeql-analysis.yml, semantic-commit-lint.yml, ...
contributing/                     # codebase-overview.md, dev-environment-setup.md, testing-guide.md (READ FIRST for deeper context)
__mocks__/                        # Jest manual mocks (fs, styles, carbon-react)
coverage-thresholds.json          # global Jest thresholds enforced in CI
jest.config.ts                    # 2 projects: Client (jsdom) + Server (node)
playwright-ct.config.ts           # CT config; testMatch = *.pw.tsx; testIdAttribute = data-role
rollup.config.mjs, tsconfig-build.json   # library build
eslint.config.mjs                 # flat ESLint config
babel.config.js                   # used by babel-jest
```

Key conventions (follow them — CI/lint will enforce most):

- Use `data-role` (NOT `data-testid`) for test queries; `data-component` is reserved for component roots, `data-element` for sub-elements. Both Jest (RTL) and Playwright are configured to read `data-role` as the test-id attribute.
- Each component folder's `index.ts` re-exports the component + its `Props` type. Internal-only subcomponents go under `__internal__/` and must not be re-exported.
- Stories: TS in `*.stories.tsx`, docs in `*.mdx`. Chromatic snapshots ALL stories by default.
- Imports: `color` from `styled-system` is banned — import from `src/style/utils/color` instead (enforced by ESLint `no-restricted-imports`).
- `console.log/warn/error` is banned in source (`no-console: error`). For tests, console output triggers failures via `jest-fail-on-console`.
- Prefer behaviour-based RTL queries (`getByRole`, `getByLabelText`) over `getByTestId`.
- Don't snapshot-test broadly; use snapshots only for small, focused output.

## 7. Making a change — recommended sequence

1. `nvm use && npm run setup` (first time / after pulling new deps).
2. Edit code under [src/](../src). If you change a component's public API, props, behaviour, or docs, regenerate skills with `npm run build:skills` and commit the result.
3. Add/adjust tests:
   - Jest unit test in `<name>.spec.tsx` (jsdom). Aim for 100% coverage of new branches.
   - If browser behaviour matters (focus, real events, layout), add to `<name>.pw.tsx`.
4. Run, in order:
   ```sh
   npm run format
   npm run lint
   npm run type-check
   npm test -- <path-to-changed-spec>          # fast inner loop
   npm test                                    # full unit suite before pushing
   npm run build:skills -- --check
   npm run build                               # only if you changed build inputs / public exports
   npm run test:ct -- <path-to-changed.pw.tsx> # if you touched a Playwright test
   ```
5. Commit with a Conventional Commit message; `husky` will run `lint-staged` (prettier + eslint on staged files) and `commitlint`. Commits must be GPG-signed for human contributors — for the cloud agent's own commits, follow whatever signing policy the workflow provides; do NOT bypass hooks with `--no-verify`.

## 8. Things NOT to do

- Don't run `npm install`, `yarn`, or hand-edit `package-lock.json` — use `npm ci`.
- Don't add `eslint-disable` comments without need; unused ones fail `--report-unused-disable-directives`.
- Don't bump the lint warning ceiling (`--max-warnings=636`) just to pass — fix the warning instead.
- Don't add CSS `:has()` selectors to styled-components used by components covered by jsdom tests (see §5).
- Don't introduce new snapshot tests by default; prefer assertions.
- Don't delete or restructure `lib/`, `esm/`, `coverage/`, `bundle-stats/`, `playwright/test-results`, `playwright/test-report`, `playwright/.cache`, or `src/components/tokens-wrapper/static-tokens/` — they are generated.
- Don't commit changes to generated files unless `npm run build:skills` produced them and the source change requires them.

## 9. Where to look when stuck

- [contributing/codebase-overview.md](../contributing/codebase-overview.md) — component file conventions, exports, lint policy.
- [contributing/testing-guide.md](../contributing/testing-guide.md) — RTL & Playwright patterns, code coverage commands.
- [contributing/dev-environment-setup.md](../contributing/dev-environment-setup.md) — Node/npm/git setup.
- [playwright/README.md](../playwright/README.md) — Playwright harness details.
- [.github/workflows/ci.yml](workflows/ci.yml) and [.github/workflows/playwright.yml](workflows/playwright.yml) — authoritative source for what must pass.

## 10. PR review checklist (Copilot-as-reviewer)

When reviewing a PR, in addition to the conventions in §6, explicitly check the following and raise blocking findings where appropriate:

1. **Undeclared breaking changes.** Treat as a blocking finding any of the following when the PR has *no* commit using `!` or a `BREAKING CHANGE:` footer:
   - Removal or rename of an export from any component `index.ts` or from `src/index.ts`.
   - Removal or rename of a `Props` interface or any of its required properties.
   - Narrowing of a prop's type (e.g. `string` → union of literals), removal of enum/union members, or change of a default value that alters rendered output.
   - Removal of a documented `data-component` / `data-element` / `data-role` value, or removal of a stable CSS class consumers may target.
   - Removal of a Storybook story that documents a supported usage.

   Removals are only acceptable when the symbol carried a `/** @deprecated … */` JSDoc tag in a previously released version, or the PR is explicitly marked breaking. Changes under `__internal__/` are exempt.

2. **Skills out of sync.** If a component's public API, props, behaviour or docs change, the PR must include a corresponding update under [skills/](../skills). Flag if missing (CI also fails this via `npm run build:skills -- --check`).

3. **Commit type vs. content.** Commits typed `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `build:`, or `ci:` produce *no* `semantic-release` version bump. Flag any user-visible behaviour change, public API change, or runtime dependency change in such PRs — they likely need `feat:` or `fix:` (and `!` / `BREAKING CHANGE:` if the change is breaking).

4. **Don't restate Prettier / ESLint / TypeScript findings.** CI already runs `prettier --check`, `npm run lint` (with `--max-warnings=636` and `--report-unused-disable-directives`) and `npm run type-check`. Skip stylistic nits already covered there; focus on the rules above and the conventions in §6.

5. **Keep these instructions in sync.** Flag (non-blocking) any PR that changes one of the facts asserted in this file but does not also update [.github/copilot-instructions.md](copilot-instructions.md). Specifically watch for:
   - `engines.node`, [.nvmrc](../.nvmrc), or the Node/npm versions in [.github/workflows/](workflows) (affects §2).
   - The major version of `storybook` / `@storybook/*` in [package.json](../package.json) (affects §1 and §6 `.storybook/` description).
   - Major version of `react`, `styled-components`, `jest`, `playwright`, `rollup`, or `typescript` in [package.json](../package.json) (affects §1).
   - Renames or additions in `scripts` in [package.json](../package.json), or changes to the ordered build pipeline (`clean-lib → generate-tokens → type-check → rollup → …`) in §5.
   - Changes to [eslint.config.mjs](../eslint.config.mjs) that move the `--max-warnings` ceiling, alter `no-restricted-imports`, or add/remove globally-banned rules (affects §5 and §6).
   - Changes to [coverage-thresholds.json](../coverage-thresholds.json), [jest.config.ts](../jest.config.ts) project layout, or [playwright-ct.config.ts](../playwright-ct.config.ts) `testMatch` / `testIdAttribute` (affects §5 and §6).
   - Renames of root config files (e.g. `babel.config.js` ↔ `babel.config.cjs`, `tsconfig*.json`, `rollup.config.mjs`) (affects the layout block in §6).
   - Changes to the Conventional Commits accepted types or release behaviour in [CONTRIBUTING.md](../CONTRIBUTING.md) / `release` config in [package.json](../package.json) (affects §10.3).
   - Changes to required component file structure or the `data-role` / `data-component` / `data-element` convention (affects §6).

6. **Use Conventional Comments for review feedback.** Format every review comment with a [Conventional Comments](https://conventionalcomments.org/) prefix: `<label> [decorations]: <subject>`. Use these labels:
   - `praise:` — highlight something done well (only for non-trivial wins).
   - `nitpick:` — trivial, preference-based; always non-blocking.
   - `suggestion:` — propose a specific improvement.
   - `issue:` — a problem with the code that needs addressing.
   - `question:` — request clarification before forming an opinion.
   - `thought:` — share an idea sparked by the code; non-actionable.
   - `chore:` — a small required task (e.g. update a comment, rename a variable).
   - `note:` — neutral information the author should be aware of.

   Add decorations in parentheses when relevant, e.g. `(blocking)`, `(non-blocking)`, `(if-minor)`. Use `(blocking)` for the breaking-change / undeclared-API-removal findings in §10.1; mark §10.5 ("instructions in sync") comments `(non-blocking)`.

   Examples:

   ```text
   issue (blocking): removes exported `TextboxProps.size` without a `@deprecated` tag in the previous release; this is a breaking change but the PR is typed `fix:`.
   suggestion (non-blocking): consider extracting this branch into a helper to keep the render function under 50 lines.
   nitpick: prefer `getByRole('button')` over `getByTestId` here (see §6).
   ```
