---
applyTo: "playwright/**/*.{js,jsx,ts,tsx}"
excludeAgent: "code-review"
description: "Use for implementation or edits in Playwright files. Covers validation order and test preferences."
---

# carbon-react — Implementation Instructions

- Setup: `nvm use && npm run setup`.
- API, props, behavior, or docs changes require `npm run build:skills` and committing generated skills output.
- Validate in order when relevant: `npm run format` -> `npm run lint` -> `npm run type-check` -> `npm test -- <spec>` -> `npm test` -> `npm run build:skills -- --check` -> `npm run build` -> `npm run test:ct -- <pw>`.
- Browser behavior belongs in `<name>.pw.tsx`.
- Keep edits minimal and local.