# carbon-react — Shared Copilot Instructions

- Repo: Sage React component library; TS + React 18; styled-components v5; Storybook 8; Rollup; Jest; Playwright CT; outputs `lib/` + `esm/`.
- Env: Node 24.x (`.nvmrc`), npm >=11.18.0. Use `npm ci` only. Setup: `nvm use && npm install -g npm@11.18.0 && npm run setup`.
- Never commit `lib/`, `esm/`, `coverage/`, `src/components/tokens-wrapper/static-tokens/`.
- Never add unused `eslint-disable`. Never raise lint warning ceilings.
- Use Conventional Commits. Breaking changes require `BREAKING CHANGE:`.
- Run `npm run generate-tokens:dev` before direct `jest` / `eslint` / `tsc` / `playwright` commands. `npm run ...` scripts already do this.
- Layout: components in `src/components/<kebab>/`; next-gen work in `__next__/`; shared internals in `src/__internal__/`, `src/__spec_helper__/`, `src/hooks/`, `src/locales/`, `src/style/`; Playwright helpers in `playwright/components/<name>/`.
- Validation: `npx prettier --check './src/**/*.{js,jsx,ts,tsx}'`, `npm run lint`, `npm run type-check`, `npm test`, `npm run build:skills -- --check`.
- Keep file-scope guidance in `.github/instructions/*.instructions.md`; keep this file only for cross-repo rules.
