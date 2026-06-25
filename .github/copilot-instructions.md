# carbon-react — Shared Copilot Instructions

Applies to all surfaces (coding, review, chat).

## Repo

- Sage React component library, npm-published
- TS + React 18, styled-components v5, Storybook 8, Rollup, Jest (jsdom+node), Playwright CT (Chromium)
- ~90 components in `src/components/`
- Outputs: `lib/` (CJS) + `esm/` (ESM) via Rollup + tsc

## Environment

- Node 24.x (`lts/krypton`, see `.nvmrc`), npm >=11.15.0
- `npm ci` only. Never `npm install` or edit `package-lock.json`
- Setup: `nvm use && npm install -g npm@11.15.0 && npm run setup`

## Conventions

- Test selectors: `data-role` (queries), `data-component` (roots), `data-element` (sub). No `data-testid` except Storybook interaction stories
- Each component `index.ts` exports component + Props. `__internal__/` never re-exported
- `__next__/` subdirectory: next-gen redesign of a component, alongside the current one
  - Same file structure (`index.ts`, `.component.tsx`, `.style.ts`, `.test.tsx`, `.pw.tsx`, `.stories.tsx`)
  - Public-ready: export from `src/index.ts` with `Next` prefix (e.g. `NextLoader`)
  - Inside `__internal__/`: follows same no-re-export rule
  - Wrapper pattern: original component imports `__next__`, maps legacy props, fires deprecation warnings, then delegates
- Deprecations: prefer `/** @deprecated ... */` JSDoc annotations on props over `Logger.deprecate` runtime calls
- Never import `color` from `styled-system` → use `src/style/utils/color`
- No `console.*` in source
- Stories: `*.stories.tsx`, docs: `*.mdx`
- Commits: Conventional Commits (`feat:`/`fix:`/`docs:`/`chore:`/`test:`/`build:`/`ci:`/`refactor:`/`style:`). Breaking: `BREAKING CHANGE:` footer

## Tokens

Run `npm run generate-tokens:dev` before direct `jest`/`eslint`/`tsc`/`playwright` invocations (`npm run …` scripts do it automatically). Never commit `src/components/tokens-wrapper/static-tokens/`.

## Versioning checks

- Public API breakage is gated in `commit-msg` via `scripts/types/check_breaking_changes.mjs`.
- The type snapshot file `types/carbon-react/types.json` is generated and should not be manually edited.
- Snapshot regeneration happens in `pre-commit` when staged files include `src/components/`.
- Manual full check: `npm run versioning-check`
- Manual scoped check: `npm run versioning-check -- <ComponentName>`
- Breaking changes must be acknowledged in commit messages with a `BREAKING CHANGE:` footer

## CI validation

| Step   | Command                                                                         |
| ------ | ------------------------------------------------------------------------------- |
| Format | `npx prettier --check './src/**/*.{js,jsx,ts,tsx}'`                             |
| Lint   | `npm run lint` (max-warnings=636, --report-unused-disable-directives)           |
| Types  | `npm run type-check`                                                            |
| Test   | `npm test` (jsdom: `*.test.*`, node: `*.server.test.*`, 100% coverage new code) |
| PW CT  | `npm run test:ct` (`*.pw.tsx`)                                                  |
| Build  | `npm run build` (clean→tokens→types→rollup→pkg-jsons→svg→d.ts)                  |
| Skills | `npm run build:skills -- --check`                                               |

## Layout

```
src/components/<kebab>/
  <name>.component.tsx .style.ts .test.tsx .pw.tsx .stories.tsx .mdx index.ts __internal__/
  __next__/
src/__internal__/ __spec_helper__/ hooks/ locales/ style/
playwright/components/<name>/{index.ts,locators.ts}
skills/ scripts/ .storybook/ .github/workflows/ contributing/
```

## Do NOT

- `npm install`/`yarn`/edit lockfile
- Add unused `eslint-disable`
- Raise `--max-warnings` ceiling
- Broad snapshot tests
- Commit generated dirs (`lib/` `esm/` `coverage/` `static-tokens/`)
- `--no-verify` on commits (except emergency/unblock scenarios with immediate follow-up)

## References

- Deeper docs: `contributing/codebase-overview.md`, `contributing/testing-guide.md`, `contributing/dev-environment-setup.md`
- CI source: `.github/workflows/ci.yml`, `.github/workflows/playwright.yml`
- Review guidance: [copilot-review-instructions.md](copilot-review-instructions.md)
- VS Code agent: [.vscode/copilot.md](../.vscode/copilot.md)
