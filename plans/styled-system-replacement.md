# Styled-system replacement delivery plan

This is an execution plan for replacing Carbon's internal use of
`styled-system`. It is deliberately not an RFC: it records agreed delivery
work rather than proposing a new public feature.

Source: [PR #8242](https://github.com/Sage/carbon/pull/8242).

## Delivery phases

1. **Plan** — land this document so the work, scope and follow-up ownership
   are visible in the repository.
2. **Compatibility utilities** — add Carbon-owned, styling-engine-neutral
   style-prop types and rule generators. They preserve the supported
   `styled-system` behaviour for spacing, layout, flexbox, grid, position,
   background and colour props. Spacing also accepts Carbon global-space
   aliases.
3. **Box adoption** — make `Box` the first consumer, with a small
   styled-components adapter at its boundary. Its public API and legacy numeric
   spacing behaviour remain unchanged.

Each phase is a separately reviewable and releasable pull request.

## Compatibility rules

- Existing component APIs keep legacy numeric spacing semantics: numbers index
  `theme.space`, with the established fallback when no theme is supplied.
- Token aliases (`none`, `3xs` through `4xl`) are additive and resolve to the
  corresponding global-space CSS variables.
- Responsive arrays, responsive objects, custom scales, zero and negative
  spacing remain supported where `styled-system` supported them.
- The compatibility utilities return Carbon-owned plain style objects and must
  not import `styled-components`.

## Out of scope for these phases

- Removing `styled-system` or its type packages. Other Carbon components still
  use them, so the dependency remains installed.
- `BoxNext`, codemods, ESLint migration rules, or consumer migration guidance.
- Migrating components other than `Box`.

## Review and verification

The utilities need direct compatibility coverage against the supported
`styled-system` behaviour and focused token-alias tests. The Box change must
retain its unit, TypeScript and component/Playwright coverage. Future component
migrations should reuse these utilities before dependency removal is proposed.
