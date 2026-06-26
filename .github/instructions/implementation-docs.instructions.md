---
applyTo: "docs/**/*.{md,mdx}"
excludeAgent: "code-review"
description: "Use for implementation or edits in docs. Covers validation order and repo conventions relevant to docs changes."
---

# carbon-react — Implementation Instructions

- Setup: `nvm use && npm run setup`.
- API, props, behavior, or docs changes require `npm run build:skills` and committing generated skills output.
- Validate in order when relevant: `npm run format` -> `npm run lint` -> `npm run type-check` -> `npm test -- <spec>` -> `npm test` -> `npm run build:skills -- --check` -> `npm run build` -> `npm run test:ct -- <pw>`.
- Docs use `*.mdx`.
- Keep edits minimal and local.