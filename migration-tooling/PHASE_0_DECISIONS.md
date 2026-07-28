# Phase 0 decision record

- Scope: implementation and pilot planning only; no production CLI or codemod
- Repository baseline: `carbon-react@161.7.0`

## Active decision

Use `159.0.0` as the candidate initial customer baseline and `161.7.0` as the
audited target. Separate mandatory version-applicable work from optional
proactive deprecation cleanup.

This is approval for implementation and pilot work. It is not approval of a
public support baseline, package publication, support commitment, accessibility
assurance, or release.

### Selected slice

| ID | Track | Boundary | Migration | Automation |
| --- | --- | --- | --- | --- |
| `css-package-version-prefix` | required upgrade | `requiredBy: 160.0.0` | Review selectors, snapshots, overrides, and visual differences for version-prefixed generated CSS classes | manual |
| `button-next-dom-ref` | required upgrade | `requiredBy: 161.0.0` | Replace `ButtonHandle`/`focusButton()` use with the forwarded DOM ref and `.focus()` after choosing the correct element/ref type | partial detection, manual edit |
| `npm-engine-11-18` | required compatibility | `requiredBy: 161.3.0` | Use npm `>=11.18.0` before installing the target path | manual environment prerequisite |
| `step-sequence-item-aria-label` | optional deprecation cleanup | `deprecatedIn: 161.7.0`; no `requiredBy` | Rename direct `StepSequenceItem.ariaLabel` JSX attributes to native `aria-label` | safe for direct imported JSX without a conflicting replacement |
| `dialog-full-screen-component` | optional deprecation cleanup | `deprecatedIn: 156.2.0`; no reliable component-path `requiredBy` | Change the documented default component-path import to Dialog and add `size="fullscreen"` | safe only for the exercised default-import/direct-JSX subset without spreads or `size`/`fullscreen` conflicts |

`plan`, `check`, and `apply` may select only the first three records for the
candidate version path. `check-deprecations` and `apply-deprecations` select the
last two as optional cleanup. Human and JSON output must identify the track and
must never imply that optional cleanup is required to reach `161.7.0`.

`deprecatedIn` must never substitute for `requiredBy`.

## Required-path evidence and guidance

### CSS package-version prefix

Version `160.0.0` prefixes generated styled-component class names with the
Carbon package version. Customers must review CSS, tests, scripts, snapshots,
and overrides that depend on generated class names, then run visual regression
tests—especially when multiple Carbon versions coexist.

No general source codemod is safe because generated names and customer selector
intent are runtime/build concerns.

### Button DOM ref

Version `161.0.0` removes the exported `ButtonHandle` type and
`focusButton()` method from the `__next__` Button component path. Customers must
use the forwarded `HTMLButtonElement | HTMLAnchorElement` ref shape and call
`.focus()`.

Detection may identify imports and calls, but element choice, callback/object
refs, nullability, downstream type annotations, focus behaviour, and link/button
variants make general automatic editing unsafe.

### npm engine

Version `161.3.0` raises `package.json#engines.npm` to `>=11.18.0`. Customers
must update pinned package-manager metadata, local and CI environments, and
container images as applicable, then rerun their normal lockfile and install
workflow.

The requirement is established by package configuration and Git history. It was
absent from the generated release notes and must be reported as a compatibility
gap.

## Optional-cleanup evidence

### StepSequenceItem

`StepSequenceItem.ariaLabel` is deprecated in `161.7.0` in favour of native
`aria-label`. The supported transform is limited to direct JSX attributes on
identifiers traced to supported Carbon imports. Existing `aria-label`,
ambiguous imports, shadowed identifiers, wrappers, re-exports, and spread-only
usage remain unchanged and are reported.

### DialogFullScreen

The documented component-path `DialogFullScreen` import is deprecated. The
canonical replacement is `Dialog size="fullscreen"`.

The supported transform is limited to the exercised default-import/direct-JSX
subset. Existing `Dialog` bindings, `size` or `fullscreen` props, spreads,
wrappers, re-exports, and ambiguous imports remain unchanged and are reported.
Focus, responsive layout, header/footer behaviour, visual output, and accessible
naming require customer verification.

The retained runtime warning recommends the deprecated `fullscreen` prop rather
than `size="fullscreen"`. Phase 1 must make the current form canonical and
decide how to align the warning.

## Transformation-tool decision

Use `jscodeshift` with Recast for customer-source parsing, read-only matching,
locations, and deterministic edits. Use one shared rule for `check` and `apply`.
Use the Babel parser for JS/JSX and the TSX parser for TS/TSX.

Keep `ts-morph` for extracting and validating Carbon's TypeScript API and
documentation metadata, where this repository already uses it.

The retained prototypes and results exercise:

- JS, JSX, TS, and TSX parsing;
- root and component-path imports;
- local aliases;
- JSX prop lookup and source locations;
- comment preservation;
- direct prop and import replacement;
- unchanged ambiguous/conflicting cases;
- and idempotency.

The prototype includes a coarse performance smoke check, not a customer
performance promise. Dependency versions, security, Node support, licenses,
package size, and representative performance must be rechecked before
publication.

## Open-source reuse decision

Use maintained packages and independently implement the small Carbon-specific
rules. Do not copy or adapt reviewed upstream helper source.

The implementation may use architectural patterns from:

- Material UI codemods for import/JSX helpers, fixtures, presets, and component
  overrides;
- Next.js for version-aware orchestration and recipes;
- Storybook for applicability checks and reporting;
- React codemods for grouped transformations;
- Angular for versioned migration registries and ordering;
- Cargo for safety and partial-result principles.

Do not add Angular DevKit, Next.js CLI, Storybook CLI, or Cargo as runtime
dependencies.

Reviewed upstream source locations, revisions, licenses, and intended use remain
recorded in the Phase 0 prototype evidence. No copied-source notice is currently
required.

## Package and ownership decision

Use `packages/carbon-react-migrate` as the provisional implementation location.
Keep catalogue, documentation, history validation, and CLI source in this
repository.

The current project implementor owns implementation through the pilot, with AI
assistance for evidence, scaffolding, tests, and review. Package publication
ownership, public support, and release commitments remain later decisions.

## Phase 1 prerequisites

- Implement separate `upgrade` and `deprecation` catalogue tracks.
- Keep `requiredBy` and `deprecatedIn` independent.
- Add the three required records and two optional-cleanup records above.
- Resolve the canonical Dialog guidance follow-up before catalogue output can
  present customer guidance.
- Preserve manual and unsupported classifications.
- Leave ambiguous code unchanged.
- Keep the candidate baseline clearly distinct from public support.

## Deferred decisions

- Refresh dependencies, security, performance, Node support, licenses, and
  package size before publication.
- Name the final package publication and support owner.
- Pilot the candidate baseline on a representative project.
- Decide the public baseline, support scope, and release readiness only after
  the pilot.
