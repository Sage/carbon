# Carbon React — Copilot instructions

## Project context

- Carbon is Sage's public TypeScript React component library. It supports React 17 and 18 and uses styled-components v5 and Sage design tokens.
- Public exports come from component `index.ts` files and `src/index.ts`. Code under `__internal__/` is private. Components live under `src/components/`; hooks, locales, and shared styles live under `src/hooks/`, `src/locales/`, and `src/style/`.
- Jest and Testing Library cover component behavior with 100% branch, function, line, and statement thresholds. Playwright covers real-browser behavior; Storybook 10 and Chromatic cover documentation and visual states.

## Pull request reviews

- Review the PR description, changed files, relevant exports, adjacent implementation, and tests. Make only evidence-backed, actionable findings on the smallest relevant changed line range. Explain the user or maintainer impact.
- Prioritize correctness, regressions, public API compatibility, accessibility, security, and missing behavioral coverage. Do not repeat Prettier, ESLint, type-check, or other CI output. Do not invent findings when none exist.
- Use Conventional Comments for every review comment: `<label> [decorations]: <subject>`. Use labels `issue:`, `suggestion:`, `question:`, `nitpick:`, `praise:`, `thought:`, `chore:`, or `note:` and decorations `(blocking)`, `(non-blocking)`, or `(if-minor)`. Example: `issue (blocking): this narrows a public prop type without declaring a breaking change`.

### Carbon review checks

- **Public API and deprecations:** Adding a deprecation notice is non-breaking. Removing or renaming a public API remains breaking even when it was previously deprecated, as do newly required props, narrowed types, removed union members, and changed defaults or behavior. Require a `BREAKING CHANGE:` commit footer with clear migration guidance for those breaking changes. Ignore only private `__internal__/` APIs.
- **Next and deprecated APIs:** Public-ready `__next__/` exports use a `Next` prefix. Legacy wrappers must delegate to `__next__` and preserve behavior while mapping legacy props. New deprecations need `/** @deprecated ... */` naming the replacement or migration, plus updated MDX, stories, and generated skills where relevant; do not use runtime logging.
- **React behavior:** Preserve React 17/18 compatibility. Check for unsafe render side effects, Strict Mode regressions, hydration or SSR-unsafe browser globals, controlled/uncontrolled state changes, stale closures, and missing effect cleanup.
- **Accessibility:** Check semantics, accessible names and labels, ARIA relationships, keyboard behavior, focus movement/restoration, escape and dismissal behavior, disabled states, and reduced motion. Browser-dependent interactions need Playwright coverage.
- **Styles and themes:** Check supported themes and dark mode when relevant. Prefer Sage tokens over hard-coded visual values. Import `color` from `src/style/utils/color`, never `styled-system`. Avoid `:has()` in jsdom-tested styles.
- **Selectors and tests:** Roots use `data-component`, sub-elements use `data-element`, and test IDs use `data-role`; `data-testid` is only for Storybook interaction stories. Prefer role, label, or visible-text queries. Put unit behavior in `<name>.test.tsx`, browser behavior in `<name>.pw.tsx`, and visual states in stories. Require coverage for new branches and avoid broad snapshots.
- **Docs, i18n, and skills:** Public behavior or prop changes should update MDX, stories, translations or translation-key tables, and generated `skills/` when relevant. `npm run build:skills -- --check` is the source of truth for skills drift.
- **Dependencies and commits:** Scrutinize runtime dependency and unexpected lockfile changes. User-visible behavior, public API, or runtime dependency changes require `feat:` or `fix:`, not non-user-facing commit types. A deprecation alone does not require a `BREAKING CHANGE:` footer; removal of the deprecated API does.
- **Configuration drift:** Require instruction updates when changing Node/npm versions, major dependencies, npm scripts, lint or coverage settings, test configuration, root config names, commit conventions, or component layout conventions.
- **Generated output:** Do not review generated files line by line. Flag committed build, coverage, Storybook, Playwright result/cache, or static-token output. Check that changelogs and generated skills agree with their source changes.

Follow applicable path-specific instructions under `.github/instructions/`.
