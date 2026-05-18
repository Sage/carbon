# carbon-react — VS Code Agent Instructions

Coding/implementation only. Shared conventions: [.github/copilot-instructions.md](.github/copilot-instructions.md).

## Workflow

1. Setup: `nvm use && npm run setup`
2. Edit `src/`. API/props/behaviour/docs change → `npm run build:skills` + commit result
3. Tests: `<name>.test.tsx` (jsdom, 100% coverage new code). Browser behaviour → `<name>.pw.tsx`
4. Validate (in order): `npm run format` → `npm run lint` → `npm run type-check` → `npm test -- <spec>` → `npm test` → `npm run build:skills -- --check` → `npm run build` (if needed) → `npm run test:ct -- <pw>` (if needed)
5. Commit: Conventional Commits. Husky runs lint-staged + commitlint

## Testing

- Fast loop: `npm test -- path/to/file.test.tsx`
- Full: `npm test`
- PW: `npm run test:ct -- path/to/file.pw.tsx`
- 100% coverage for new code

## Preferences

- Minimal focused edits, not broad rewrites
- RTL: `getByRole`/`getByLabelText` over `getByTestId`
- Render functions <50 lines
- No broad snapshots; prefer assertions

## Do NOT

- `npm install`/`yarn`/edit lockfile
- Unused `eslint-disable`
- Raise `--max-warnings`
- `:has()` in jsdom-tested styles
- Commit generated dirs
- `--no-verify`

## Notes

- Direct `jest`/`tsc`/`eslint` → run `npm run generate-tokens:dev` first
- Skills stale → `npm run build:skills` + commit
- Full build check → `npm run build`
