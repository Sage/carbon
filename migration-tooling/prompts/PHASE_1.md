# Phase 1 implementation prompt: Catalogue and validation

You are implementing **Phase 1: Catalogue and validation** of Carbon's
deterministic migration tooling.

Work in the Carbon repository. Treat the repository files—not previous chat
messages—as the source of truth.

## Required context and prerequisites

Before changing code:

1. Read `migration-tooling/PLAN.md`, `IMPLEMENTATION_STATUS.md`,
   `PHASE_GATES.md`, and `HANDOFF_TEMPLATE.md` completely.
2. Re-read the complete Phase 1 plan section, including tasks, deliverable, exit
   criteria, estimate, dependencies, and ownership.
3. Read `migration-tooling/handoffs/PHASE_0.md`,
   `PHASE_0_DECISIONS.md`, and the Phase 0 prototype evidence relevant to the
   selected records.
4. Confirm Phase 0 is `complete`, its formal outcome permits proceeding, its
   handoff integrity checks pass, and its prerequisites are accepted.
5. Inspect the current repository and preserve unrelated changes.
6. Review all decisions, deviations, limitations, and open leftovers. Accept
   `P0-L2` as required Phase 1 work; reassess `P0-L3`, `P0-L6`, and `P0-L7`
   without implementing their later-phase work.

Phase 0 permits Phase 1 with `complete-with-deferred-work`. The candidate
`159.0.0 → 161.7.0` interval is approved for implementation and pilot only, not
as a public support promise. `PLAN-001` and `P0-D6` require independent
upgrade and deprecation tracks.

## Objective

Create the provisional `packages/carbon-react-migrate` package and deliver a
tested, runtime-validated catalogue API that returns deterministically ordered
required migrations for supported version intervals, independently returns
optional deprecation migrations, and rejects unsupported path gaps.

## In scope

- Define the runtime-validated catalogue schema.
- Add the five selected records:
  - required upgrade: `css-package-version-prefix`,
    `requiredBy: 160.0.0`;
  - required upgrade: `button-next-dom-ref`, `requiredBy: 161.0.0`;
  - required compatibility: `npm-engine-11-18`,
    `requiredBy: 161.3.0`;
  - optional cleanup: `step-sequence-item-aria-label`,
    `deprecatedIn: 161.7.0`, with no invented `requiredBy`;
  - optional cleanup: `dialog-full-screen-component`,
    `deprecatedIn: 156.2.0`, with no invented `requiredBy`.
- Enforce that upgrade records require `requiredBy`, deprecation records
  require `deprecatedIn`, and neither field is inferred from the other.
- Keep `plan`/version-aware catalogue selection limited to required upgrade
  records; keep deprecation selection independent.
- Implement interval calculation with the repository's existing `semver`
  dependency and deterministic ordering.
- Represent explicitly tested upgrade boundaries and reject gaps with the
  required supported intermediate path.
- Validate unique IDs, valid versions, version ordering, registered rule
  references, documentation files, and stable anchors.
- Define narrow, reviewed historical-API exemptions without weakening current
  API validation.
- Add one local catalogue validation command.
- Keep provenance current. Phase 0 selected maintained packages plus
  independently implemented Carbon-specific code, so do not copy upstream
  implementation source.
- Resolve `P0-L2`: catalogue and documentation must make
  `Dialog size="fullscreen"` canonical. Review the retained contradictory
  runtime warning and record any source-alignment work in its proper phase;
  Phase 1 must not emit deprecated `fullscreen`-prop guidance.
- Add comprehensive boundary, invalid-record, deterministic-ordering,
  supported-gap, historical-exemption, documentation, rule-reference, and
  track-selection tests.

## Out of scope and limitations

- Phase 2 CLI commands, customer-source scanning, JSON reports, parsers, and
  diagnosis.
- Phase 3 transformations, writes, dry runs, dirty-worktree behavior, or
  conflict handling.
- Phase 4 CI integration, publication ownership, dependency refresh, or final
  maintainer workflow.
- Phase 5 pilot evidence, public baseline, support promise, publication, or
  release approval.
- Historical catalogue backfill, untested interval chaining, wrappers,
  re-export graphs, dynamic imports, computed JSX, or runtime-generated props.
- Changing runtime component behavior merely to align a warning unless
  Controlled plan evolution and the owning phase explicitly permit it.
- AI-dependent selection or claims that catalogue results prove a customer
  upgrade complete.

## Implementation rules

- Preserve unrelated user changes.
- Use deterministic catalogue selection and ordering with explicit tie-breaks.
- Stable selection condition is `currentVersion < requiredBy <= targetVersion`.
- Never use `deprecatedIn` as a fallback, alias, or inferred `requiredBy`.
- Unsupported paths fail actionably and identify supported intermediate steps.
- Current API references are validated against the repository. Historical
  removed APIs require explicit reviewed exemptions with reasons.
- Documentation references use repository-relative files and stable anchors.
- Invalid records fail with actionable record/field-specific errors.
- Add tests proportional to each invariant and failure mode.
- Keep open-source provenance and required notices current.
- Do not silently change `PLAN.md`; use Controlled plan evolution when evidence
  contradicts it.
- Do not implement or generate the Phase 2 prompt.

## Required deliverable

A tested catalogue API returning ordered migrations for a version interval,
plus independent deprecation selection, runtime validation, supported-boundary
validation, documentation, and a single local validation command.

Create `migration-tooling/handoffs/PHASE_1.md` from
`migration-tooling/HANDOFF_TEMPLATE.md`. It must link to durable artifacts,
interfaces, verification, decisions, plan changes, leftovers, limitations, and
Phase 2 prerequisites.

## Required verification

Run the smallest relevant checks while iterating, then all checks needed to
prove:

- Boundary tests cover versions below, equal to, inside, and above the
  interval.
- Deprecation-only records are absent from version-aware selection and present
  in deprecation selection.
- Unsupported direct jumps return the required intermediate path.
- Invalid records fail with actionable errors.
- Historical removed APIs can be represented without weakening validation for
  current APIs.
- Unique IDs, versions, ordering, rules, documentation files, anchors, and
  exemptions are validated.
- Canonical Dialog guidance uses `size="fullscreen"`.
- New tests, package type checking/building, and the local catalogue validation
  command pass.
- Results and ordering are deterministic and reproducible.
- `git diff --check` passes.

Record exact commands and actual results. Do not claim an unrun check passed.

## Estimate and ownership

- Developer: 4–5 days.
- AI assistance: 1.5–2 days equivalent for schema/test scaffolding and
  edge-case enumeration.
- Elapsed with collaboration: 4–5 days.
- Implementation owner: current project implementor.
- Carbon API/docs ownership is required for guidance correctness. Publication,
  support, security/release, and pilot approvals remain in Phases 4 and 5.

## Status and formal gate

Before finishing:

1. Create and validate `migration-tooling/handoffs/PHASE_1.md`.
2. Update Phase 1 in `migration-tooling/IMPLEMENTATION_STATUS.md`.
3. Resolve `P0-L2` with evidence and reassess every other open leftover.
4. Record implementation, artifacts, exact verification, decisions,
   deviations, plan changes, estimate changes, risks, and next action.
5. Perform the complete formal Phase 1 gate from `PHASE_GATES.md`, answer every
   mandatory check, list every exit criterion individually, and select exactly
   one permitted outcome.
6. Mark Phase 1 complete only if all required work and exit criteria pass and no
   blocker remains.
7. Do not implement Phase 2 or generate its prompt.

## Final response

Report the implemented outcome, verification and unrun checks, Phase 1 status
and gate outcome, remaining leftovers and risks, and whether Phase 2 may begin.
