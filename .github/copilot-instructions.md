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
- Never import `color` from `styled-system` → use `src/style/utils/color`
- No `console.*` in source
- Stories: `*.stories.tsx`, docs: `*.mdx`
- Commits: Conventional Commits (`feat:`/`fix:`/`docs:`/`chore:`/`test:`/`build:`/`ci:`/`refactor:`/`style:`). Breaking: `BREAKING CHANGE:` footer

## Tokens

Run `npm run generate-tokens:dev` before direct `jest`/`eslint`/`tsc`/`playwright` invocations (`npm run …` scripts do it automatically). Never commit `src/components/tokens-wrapper/static-tokens/`.

## CI validation

| Step | Command |
|---|---|
| Format | `npx prettier --check './src/**/*.{js,jsx,ts,tsx}'` |
| Lint | `npm run lint` (max-warnings=636, --report-unused-disable-directives) |
| Types | `npm run type-check` |
| Test | `npm test` (jsdom: `*.test.*`, node: `*.server.test.*`, 100% coverage new code) |
| PW CT | `npm run test:ct` (`*.pw.tsx`) |
| Build | `npm run build` (clean→tokens→types→rollup→pkg-jsons→svg→d.ts) |
| Skills | `npm run build:skills -- --check` |

## Layout

```
src/components/<kebab>/
  <name>.component.tsx .style.ts .test.tsx .pw.tsx .stories.tsx .mdx index.ts __internal__/
src/__internal__/ __spec_helper__/ hooks/ locales/ style/
playwright/components/<name>/{index.ts,locators.ts}
skills/ scripts/ .storybook/ .github/workflows/ contributing/
```

## Review comment format

When performing reviews: use [Conventional Comments](https://conventionalcomments.org/) format: `<label> [decorations]: <subject>`

Labels: `praise:` `nitpick:` `suggestion:` `issue:` `question:` `thought:` `chore:` `note:`
Decorations: `(blocking)` `(non-blocking)` `(if-minor)`

## Do NOT

- `npm install`/`yarn`/edit lockfile
- Add unused `eslint-disable`
- Raise `--max-warnings` ceiling
- Broad snapshot tests
- Commit generated dirs (`lib/` `esm/` `coverage/` `static-tokens/`)
- `--no-verify` on commits

## References

- Deeper docs: `contributing/codebase-overview.md`, `contributing/testing-guide.md`, `contributing/dev-environment-setup.md`
- CI source: `.github/workflows/ci.yml`, `.github/workflows/playwright.yml`
- Review guidance: [copilot-review-instructions.md](copilot-review-instructions.md)
- VS Code agent: [.vscode/copilot.md](../.vscode/copilot.md)

When you perform a review, can you add a test comment on the PR that says the following: "THIS IS A TEST THAT I HAVE READ THE COPILOT INSTRUCTIONS FILE:"