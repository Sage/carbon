# Phase 1 handoff: Catalogue and validation

- Phase: 1
- Status: complete
- Formal gate outcome: `complete-with-deferred-work`
- Completed: yes
- Implementation owner: current project implementor
- Reviewers and approvals: current implementor with AI evidence review; Phase 0
  implementation/pilot approval retained; publication and public support remain
  deferred
- Plan reference: [Phase 1](../PLAN.md#phase-1-catalogue-and-validation)
- Status reference: [Phase 1 status](../IMPLEMENTATION_STATUS.md#phase-1-catalogue-and-validation)

## Outcome

The provisional package exposes a runtime-validated five-record catalogue,
deterministic upgrade and deprecation selectors, four explicitly tested upgrade
boundaries, actionable unsupported-path errors, and a local validation command.
Phase 2 may consume these APIs without treating the candidate interval as a
public support promise.

## Delivered artifacts

| Artifact | Purpose | Stability | Owner |
| --- | --- | --- | --- |
| [Package](../../packages/carbon-react-migrate/package.json) | Provisional package commands and dependencies | internal | current implementor |
| [Catalogue](../../packages/carbon-react-migrate/src/catalogue.ts) | Five reviewed records and supported boundaries | internal | current implementor, Carbon API/docs owner |
| [Catalogue API](../../packages/carbon-react-migrate/src/index.ts) | Ordered track selection and unsupported-path behavior | internal | current implementor |
| [Runtime validation](../../packages/carbon-react-migrate/src/validation.ts) | Record, rule, documentation, API, exemption, and boundary validation | internal | current implementor |
| [Schema types](../../packages/carbon-react-migrate/src/types.ts) | Upgrade/deprecation discriminated catalogue contract | internal | current implementor |
| [Tests](../../packages/carbon-react-migrate/src/catalogue.test.ts) | Boundaries, tracks, ordering, and gaps | internal | current implementor |
| [Validation tests](../../packages/carbon-react-migrate/src/validation.test.ts) | Production and invalid-record validation | internal | current implementor |
| [Catalogue guidance](../CATALOGUE_GUIDANCE.md) | Stable customer-guidance anchors | internal | Carbon API/docs owner |
| [Phase 1 prompt](../prompts/PHASE_1.md) | Reviewed phase scope and verification contract | durable | current implementor |
| [Handoff link validator](../scripts/validate-handoff-links.cjs) | Reproducible handoff integrity check | internal | current implementor |

## Interfaces and contracts

- `selectUpgradeMigrations(from, to)` uses
  `from < requiredBy <= to`, selects only `scope: "upgrade"`, and orders by
  `requiredBy` then ID. Its return type is `UpgradeMigration[]`.
- `selectDeprecationMigrations()` selects only `scope: "deprecation"` and orders
  by `deprecatedIn` then ID. Its return type is `DeprecationMigration[]`.
- `findSupportedPath()` returns a tested chain. Upgrade selection accepts only
  one explicitly tested boundary at a time; a longer direct jump throws
  `UnsupportedUpgradePathError` with only reachable tested steps in
  `intermediatePath`; it never fabricates a path across a gap.
- `validateCatalogue(records, boundaries, repositoryRoot)` throws one
  actionable aggregate error for invalid records.
- `npm run validate:catalogue` builds and validates the local catalogue.
- Upgrade records require `requiredBy`; deprecation records require
  `deprecatedIn`. The values remain independent.
- Historical exemption `P1-H1` is bound to record `button-next-dom-ref`, path
  `src/components/button/__next__/button.component.tsx`, symbol `ButtonHandle`,
  historical version `160.0.0`, and removal version `161.0.0`.
- No CLI command, JSON schema, exit-code contract, or customer-file detection is
  implemented yet.

### Provisional maintainer installation model

This package is internal and provisional. It is not an npm workspace and has no
independent lockfile.

1. Check `npm --version` before installation or lockfile operations. The
   repository requires npm `>=11.18.0`.
2. Run the repository's normal root installation first.
3. Run package commands from the repository root with:
   `npm run <command> --prefix packages/carbon-react-migrate`.

`npm ls --prefix packages/carbon-react-migrate` may report dependencies as
unmet because this provisional package resolves them from the ancestor
repository installation. Do not generate or commit a separate package lockfile
without an approved plan decision. Standalone installation, workspace
integration, publication, package ownership, and the final dependency strategy
remain Phase 4 work. This is a maintainer workflow, not customer guidance.

## Decisions

- `P1-D1`: represent the audited candidate path as one deterministic,
  contiguous chain of four individually tested boundaries; reject
  multi-boundary jumps and suggest only reachable intermediate steps.
- `P1-D2`: use explicit stable HTML anchors in the repository-owned catalogue
  guidance.
- `P1-D3`: resolve P0-L2 for migration-tooling output by making `Dialog
  size="fullscreen"` canonical in the catalogue, guide, and validation. The
  component and retained warning are unchanged.
- `P1-D4`: use the repository-root installation and `--prefix` commands for the
  provisional maintainer workflow; leave workspace integration, standalone
  installation, lockfile strategy, publication, ownership, and final dependency
  strategy to Phase 4.

## Controlled plan changes

- `PLAN-001`: approved and preserved; upgrade and deprecation tracks remain
  independent.
- No Phase 1 plan change was required.

## Verification evidence

| Requirement or exit criterion | Result | Command, review, or evidence |
| --- | --- | --- |
| Boundary coverage, complete runtime schema, topology, and deterministic ordering | pass | `cd packages/carbon-react-migrate && npm run test` (15/15) |
| Track separation | pass | same command; deprecation-only selection test |
| Unsupported direct jump returns intermediate path | pass | same command; `159.0.0 → 161.7.0` assertion |
| Invalid records fail actionably | pass | same command; invalid schema/reference tests |
| Historical removed API support remains narrow | pass | same command; exact tuple binding and `v160.0.0` tagged-source test |
| Local catalogue validation | pass | `cd packages/carbon-react-migrate && npm run validate:catalogue` |
| Track-specific selector types | pass | `npm run test --prefix packages/carbon-react-migrate`; compile-time assignments plus runtime track assertions |
| Provisional installation model | pass | maintainer-only contract in this handoff; `npm --version` reported `11.16.0`, so no installation or lockfile operation was performed |
| Canonical Dialog migration guidance with component rollback preserved | pass | package regression plus empty `git diff -- src/components/dialog-full-screen` |
| Diff integrity | pass | `git diff --check` |
| Handoff integrity | pass | `node migration-tooling/scripts/validate-handoff-links.cjs migration-tooling/handoffs/PHASE_1.md` and status review |
| Formal gate | pass | [Phase 1 gate](../IMPLEMENTATION_STATUS.md#formal-phase-gate-1) |

## Supported scope

The internal API supports the five Phase 0 records, independent catalogue
tracks, exact tested boundaries `159.0.0 → 160.0.0 → 161.0.0 → 161.3.0 →
161.7.0`, deterministic ordering, runtime catalogue validation, stable
documentation references, narrow historical exemptions, and track-specific
`UpgradeMigration[]` and `DeprecationMigration[]` selector results.

## Unsupported scope and limitations

Only one tested boundary may be selected per call; automatic interval chaining
is not supported. The package is provisional and private. There is no CLI,
source detection, transformation, report format, public baseline, publication,
standalone installation contract, workspace integration, independent lockfile,
or proof of complete customer coverage. Registered rule names are validation
contracts for later shared rules, not Phase 2/3 implementations.

## Open leftovers

| ID | Classification | Risk | Target phase | Owner or ownership area |
| --- | --- | --- | --- | --- |
| `P0-L3` | required-follow-up | dependency evidence can become stale | Phase 4 | security/release owner |
| `P0-L6` | required-follow-up | candidate baseline still lacks pilot/public-support decision | Phase 5 | product/support/release and pilot reviewers |
| `P0-L7` | required-follow-up | publication ownership/support remains absent | Phase 4 | tooling/security/release owners |

## Prerequisites for the next phase

- Phase 1 formal gate must permit proceeding.
- Phase 2 must consume the separate selectors and preserve their labels.
- Phase 2 must accept exact supported boundaries and surface
  `UnsupportedUpgradePathError` without silently composing gaps.
- Phase 2 must not describe `159.0.0` as a public support baseline.

## Recommended next action

Generate the Phase 2 prompt from the current plan, status ledger, and this
handoff in a separate task.

## Files to read first

- `packages/carbon-react-migrate/src/index.ts` — selection and path contracts.
- `packages/carbon-react-migrate/src/catalogue.ts` — records and boundaries.
- `packages/carbon-react-migrate/src/validation.ts` — failure behavior.
- `migration-tooling/CATALOGUE_GUIDANCE.md` — stable guidance anchors.

## Handoff integrity

- [x] All links resolve.
- [x] Delivered artifacts exist.
- [x] Status and gate outcome match `IMPLEMENTATION_STATUS.md`.
- [x] Decisions, plan changes, and leftovers use stable IDs.
- [x] Verification evidence is reproducible.
- [x] Unsupported scope and risks are explicit.
- [x] Required approvals are recorded and not inferred.
- [x] The next phase can proceed without relying on chat history.
