---
applyTo: "src/**/*.{js,jsx,ts,tsx,mdx}"
excludeAgent: "code-review"
description: "Use for implementation or edits in src. Covers component conventions, validation order, and edit preferences."
---

# carbon-react — Implementation Instructions

- Setup: `nvm use && npm run setup`.
- API, props, behavior, or docs changes require `npm run build:skills` and committing generated skills output.
- Validate in order when relevant: `npm run format` -> `npm run lint` -> `npm run type-check` -> `npm test -- <spec>` -> `npm test` -> `npm run build:skills -- --check` -> `npm run build` -> `npm run test:ct -- <pw>`.
- Selectors: `data-role` queries, `data-component` roots, `data-element` sub-elements. No `data-testid` except Storybook interaction stories.
- Each component `index.ts` exports component + `Props`. Never re-export from `__internal__/`.
- `__next__/` keeps the same file layout as current implementation. Public-ready `__next__` exports from `src/index.ts` with `Next` prefix. Legacy wrappers delegate to `__next__` and map legacy props there.
- Prefer `/** @deprecated ... */` over runtime deprecation logging.
- Never import `color` from `styled-system`; use `src/style/utils/color`.
- No `console.*` in source.
- Stories: `*.stories.tsx`. Docs: `*.mdx`.
- Tests: focused jsdom in `<name>.test.tsx`; browser behavior in `<name>.pw.tsx`; preserve 100% coverage for new behavior; prefer RTL `getByRole` / `getByLabelText`; avoid broad snapshots.
- Keep edits minimal and local. Prefer small focused components/helpers. Avoid `:has()` in jsdom-tested styles.