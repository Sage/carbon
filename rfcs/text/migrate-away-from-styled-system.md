- Start Date: 2026-10-23

# Summary

Carbon should replace its internal use of `styled-system` with locally owned
style utilities while preserving the established public styling-prop contract.
The replacement will remove Carbon's direct runtime and type dependencies on
`styled-system`, retain compatibility for existing components during a
transition period, and introduce a preview token-first `BoxNext` API.

This proposal is based on the `migrate-from-styled-system-poc` branch. The POC
also contains unrelated public API removals; those removals are not part of
this RFC and must be removed from, or delivered separately from, the migration.

# Basic example

Existing components retain their current meaning for numeric spacing values:

```tsx
// A numeric value remains an index into theme.space on legacy APIs.
<Box p={8} />
```

`BoxNext` is an opt-in preview API with token-first spacing semantics:

```tsx
import { BoxNext } from "carbon-react";

// Prefer a token alias when the layout should follow Carbon tokens.
<BoxNext p="2xl" />

// Numeric values intentionally mean literal CSS pixels on BoxNext.
<BoxNext p={24} />
```

# Motivation

Carbon currently relies on `styled-system` for component styling props. That
dependency constrains Carbon's styling implementation and leaves its spacing,
responsive, layout, and color behaviour partly defined by an external library.
It also makes a move toward Carbon's token system harder to explain: legacy
numeric values represent entries in a theme scale rather than explicit CSS
lengths.

The goal is to retire the dependency without unexpectedly changing existing
consumer layouts. Consumers need a gradual path from legacy numeric spacing to
approved global-space tokens, including a way to identify safe mechanical
conversions and cases that require design review.

# Detailed design

## Internal implementation

Carbon will replace direct `styled-system` imports with local utilities for the
currently supported spacing, layout, flexbox, grid, colour, and responsive
prop behaviour. The compatibility utilities will continue to support existing
prop names and responsive shapes used by legacy components.

Legacy spacing keeps its established semantics. A numeric value is resolved as
an index into `theme.space`; with the base theme, `p={8}` therefore resolves to
the value at index 8. Strings, including CSS variables and explicit lengths,
continue to pass through to CSS. This compatibility contract applies to
existing Carbon components, including `Box`.

The local spacing implementation also exposes token aliases:

| Alias              | Global-space CSS variable                                 |
| ------------------ | --------------------------------------------------------- |
| `none`             | `var(--global-space-none)`                                |
| `3xs`              | `var(--global-space-layout-3-xs)`                         |
| `2xs`              | `var(--global-space-layout-2-xs)`                         |
| `xs` through `4xl` | The corresponding `var(--global-space-layout-*)` variable |

`BoxNext` / `BoxNextProps` will be exported as preview APIs. It accepts the
same spacing shorthand, longhand, and axis prop names, but gives numeric values
an explicit-pixel meaning. Token aliases and CSS strings are preferred for
token-backed layouts. `BoxNext` is additive and is not a replacement for the
existing `Box` API in this release.

## Consumer migration

Carbon will package the `carbon-migrate-spacing` executable and provide the
equivalent repository command, `npm run migrate:spacing`. The codemod defaults
to dry-run output. With `--write`, it rewrites static non-negative integer
spacing values from 0 through 10 on components imported from `carbon-react`.

The conversion requires `--assume-base-theme`, because only the base legacy
theme has a known index-to-global-space mapping:

```sh
npx carbon-migrate-spacing --assume-base-theme src/Card.tsx
npx carbon-migrate-spacing --assume-base-theme --write src/Card.tsx
```

For example, under the base theme, `p={8}` becomes
`p="var(--global-space-layout-2-xl)"`. The codemod must report, rather than
rewrite, dynamic expressions, responsive values, unsupported indexes, values
outside 0–10, and props on components it cannot identify as Carbon imports.
Consumers with a custom `theme.space` scale must not use
`--assume-base-theme`; they must map each value to an approved token manually, however I feel that not many of our consumers will have their own `theme.space` values and the default 8 value will cater to 99% of use-cases.

Carbon will provide an optional `carbon/no-numeric-token-spacing` ESLint rule.
The rule warns when bare numeric spacing props are supplied to `BoxNext` or
`NextBox`, helping consumers avoid carrying the legacy scale interpretation
into a token-first API.

## Bundle-size impact

The primary consumer-bundle comparison imports `Box` directly and bundles it
for the browser with production esbuild settings. React, React DOM, and
styled-components are externalised because consumers provide them in both
cases. The pre-migration build includes `styled-system`; the POC build uses
Carbon's local compatibility utilities instead.

| Representative `Box` bundle | With `styled-system` | Without `styled-system` |                Change |
| --------------------------- | -------------------: | ----------------------: | --------------------: |
| Minified JavaScript         |         42,379 bytes |            32,802 bytes | -9,577 bytes (-22.6%) |
| Gzip-compressed JavaScript  |         10,618 bytes |             7,808 bytes | -2,810 bytes (-26.5%) |

This is the expected saving for a consumer bundle that needs the legacy Box
style-prop implementation. Actual application savings depend on imported
Carbon components, other dependencies already present in the bundle, and the
consumer bundler's tree-shaking configuration.

Using the same local toolchain, the comparison below builds the pre-migration
merge base (`5328da1b45`) and the POC (`8e99592927`) with
`npm run generate-tokens`, `npm run clean-lib`, and `npm run build:compile`.
The raw measure is the sum of generated JavaScript and CSS in `lib` and `esm`;
the compressed measure is a gzip-compressed tarball of those build outputs.

| Measure                 |          Before |             POC |                Change |
| ----------------------- | --------------: | --------------: | --------------------: |
| Generated JS/CSS        | 2,798,439 bytes | 2,828,880 bytes | +30,441 bytes (+1.1%) |
| Compressed build output | 1,293,550 bytes | 1,304,474 bytes | +10,924 bytes (+0.8%) |

These figures include the additive `BoxNext` preview and other POC changes, so
they are a baseline for future regression checks rather than a causal estimate
of the dependency removal.

# Drawbacks

- Carbon assumes ownership of a substantial compatibility surface that was
  previously implemented by `styled-system`; it must maintain behavioural and
  responsive regression coverage.
- Supporting both legacy scale-index semantics and token-first pixel semantics
  is potentially confusing, especially when moving from `Box` to `BoxNext`.
- The codemod intentionally leaves many real-world cases for manual review,
  particularly custom themes and dynamic spacing values.

# Alternatives

## Retain `styled-system`

Keeping the dependency avoids the immediate implementation and compatibility
cost, but retains the external dependency and does not create a clear
token-first migration path.

## Replace every consumer API at once

A major-version-only replacement could give all components one spacing model,
but would create a broad breaking change and force consumers to migrate before
Carbon can validate compatibility behaviour.

## Make numeric values token indexes on `BoxNext`

This would reduce one semantic difference but would perpetuate the ambiguous
legacy model. Explicit pixels plus token aliases make `BoxNext` behaviour
predictable and visible in code.

# Adoption strategy

1. Land the local compatibility utilities and remove direct `styled-system`
   dependencies while retaining legacy component contracts.
2. Ship `BoxNext` as a documented preview API and publish the spacing codemod
   and ESLint advisory.
3. Encourage consumers to run the codemod in dry-run mode, review its output,
   and migrate base-theme static values to global-space variables or aliases.
4. Keep legacy APIs stable through the compatibility period; evaluate any
   deprecation only after adoption evidence and a separate breaking-change
   proposal.

# How we teach this

The consumer migration guide should explain the two numeric-value meanings in
one prominent table: existing components interpret numbers through
`theme.space`. `BoxNext` interprets them as pixels. It should show token aliases
and the base-theme index mapping, document dry-run-first codemod usage, and
call out custom themes as a manual migration case.

Component documentation should label `BoxNext` as preview and never suggest
that a legacy `Box` numeric value can be copied directly without conversion.
The optional ESLint rule should be presented as a guardrail, not as a required
consumer configuration change.

# Unresolved questions

- Should `BoxNext` remain a separate preview export, or graduate to a future
  replacement name after the compatibility period?
- Are additional codemods needed for non-spacing style props once consumer
  migration data is available?
