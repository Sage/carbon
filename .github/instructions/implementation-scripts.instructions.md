---
applyTo: "scripts/**/*.{js,mjs,cjs}"
excludeAgent: "code-review"
description: "Use for implementation or edits in scripts. Covers validation order and repo conventions relevant to build scripts."
---

# carbon-react — Implementation Instructions

- Setup: `nvm use && npm run setup`.
- Validate in order when relevant: `npm run format` -> `npm run lint` -> `npm run type-check` -> `npm test -- <spec>` -> `npm test` -> `npm run build:skills -- --check` -> `npm run build` -> `npm run test:ct -- <pw>`.
- Keep edits minimal and local.
- No `console.*` in source unless the script explicitly requires CLI output.