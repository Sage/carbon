---
applyTo: "src/**/*.{js,jsx,ts,tsx,mdx}"
excludeAgent: "code-review"
description: "Use for implementation or edits in src. Covers component conventions and edit preferences."
---

# carbon-react — Implementation Instructions

- Selectors: `data-role` queries, `data-component` roots, `data-element` sub-elements. No `data-testid` except Storybook interaction stories.
- Public component entry points export their components and public `Props` types. Do not add new re-exports from `__internal__/`; move public definitions to non-internal modules before exporting them. Treat existing re-exports from `__internal__/` as public API.
- `__next__/` keeps the same file layout as current implementation. Public-ready `__next__` exports from `src/index.ts` with `Next` prefix. Legacy wrappers delegate to `__next__` and map legacy props there.
- Public deprecations use `/** @deprecated ... */` with replacement or migration guidance, not runtime logging; update MDX, stories, and generated skills when relevant.
- Never import `color` from `styled-system`; use `src/style/utils/color`.
- No `console.*` in source.
- Stories: `*.stories.tsx`. Docs: `*.mdx`.
- Tests: focused jsdom in `<name>.test.tsx`; browser behavior in `<name>.pw.tsx`; preserve 100% coverage for new behavior; prefer RTL `getByRole` / `getByLabelText`; avoid broad snapshots.
- Prefer small focused components/helpers. Avoid `:has()` in jsdom-tested styles.
