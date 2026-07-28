# Phase 0 handoff: Select the vertical slice

- Phase: 0
- Status: complete
- Formal gate outcome: `complete-with-deferred-work`
- Completed: yes
- Implementation owner: current project implementor
- AI assistance: Codex — evidence preparation and prototype support
- Reviewers and approvals: accountable user approval for the candidate
  implementation/pilot baseline and safety/reporting boundary;
  public support/package publication/release approval deferred
- Plan reference: [Phase 0](../PLAN.md#phase-0-select-the-vertical-slice)
- Status reference: [Phase 0 status](../IMPLEMENTATION_STATUS.md#phase-0-select-the-vertical-slice)

## Outcome

PLAN-001 is approved and applied. The candidate `159.0.0 → 161.7.0` path has
three required upgrade/compatibility records, while two deterministic examples
are optional deprecation cleanup. `deprecatedIn` is never `requiredBy`.
`159.0.0` is approved for implementation and pilot, not as a public support
promise. Phase 1 may consume the revised slice and explicit follow-ups.

## Delivered artifacts

| Artifact | Purpose | Stability | Owner |
| --- | --- | --- | --- |
| [Decision record](../PHASE_0_DECISIONS.md) | Candidate evidence, selected path, tooling, provenance, risks | approved for implementation and pilot; public release pending | current project implementor |
| [Prototype](../prototypes/phase-0/run-experiments.cjs) | Reproducible parser/transform experiment | internal prototype | `@Sage/carbon-dev` |
| [Prototype results](../prototypes/phase-0/results.json) | Captured versions, cases, idempotency, and timing | generated evidence | `@Sage/carbon-dev` |
| [Candidate-path audit](../prototypes/phase-0/current-interval-audit.json) | Tagged boundaries and compatibility evidence for `159.0.0 → 161.7.0` | generated evidence | `@Sage/carbon-dev` |
| [Revised-slice prototype](../prototypes/phase-0/run-revised-slice-experiments.cjs) | Optional prop/component cleanup experiments | internal prototype | `@Sage/carbon-dev` |
| [Revised-slice results](../prototypes/phase-0/revised-slice-results.json) | Stable summary of the prototype assertions | generated evidence | `@Sage/carbon-dev` |
| [Status ledger](../IMPLEMENTATION_STATUS.md) | Formal gate and leftovers | durable | `@Sage/carbon` |

## Interfaces and contracts

No public interface was implemented. The proposed catalogue contract has
separate `upgrade` and `deprecation` tracks. Upgrade records require
`requiredBy`; deprecation records require `deprecatedIn`; no field substitutes
for the other. The candidate baseline is not public support approval.

## Decisions

- `P0-D2`: use jscodeshift/Recast for customer rules and ts-morph for Carbon API
  extraction.
- `P0-D3`: reference upstream patterns without copying source.
- `P0-D4`: recommend an in-repository `packages/carbon-react-migrate` location.
- `P0-D6`: do not substitute `deprecatedIn` for unknown `requiredBy`.
- `P0-D7`: approved two-track revised slice.

## Controlled plan changes

- `PLAN-001`: approved and applied material revision. It retains `159.0.0` as
  the candidate baseline, separates required work from optional cleanup, and
  preserves `requiredBy` semantics.

## Verification evidence

| Requirement or exit criterion | Result | Command, review, or evidence |
| --- | --- | --- |
| Required path boundaries | pass | CSS `160.0.0`, Button ref `161.0.0`, npm engine `161.3.0` |
| Optional cleanup applicability | pass | Dialog `deprecatedIn: 156.2.0`; StepSequenceItem `deprecatedIn: 161.7.0`; neither has inferred `requiredBy` |
| Deterministic cleanup subsets | pass | Revised prototype covers prop and component/import examples |
| Manual guidance scope | pass | Accountable approval covers required reporting; Phase 5 validates it in a representative pilot |
| JS/JSX/TS/TSX experiments | pass | Prototype `results.json` |
| License/compliance path | pass | Reuse inventory; no copied/adapted source proposed |
| Formal gate | pass | [Final Phase 0 gate](../IMPLEMENTATION_STATUS.md#formal-phase-gate) |

## Supported scope

Phase 0 supplies an approved implementation/pilot candidate slice and prototype
evidence. No CLI, catalogue, production migration behavior, public baseline,
package publication, or release is implemented or publicly supported.

## Unsupported scope and limitations

Cleanup safety is proven only for exercised direct imports/JSX and remains
unapproved by accountable reviewers. Wrappers, re-exports, spreads, conflicts,
and ambiguous Button ref types remain manual or unsupported. Parser results are
tooling fixtures, not proof of whole-project coverage.

## Open leftovers

| ID | Classification | Risk | Target phase | Owner or ownership area |
| --- | --- | --- | --- | --- |
| `P0-L2` | required-follow-up | contradictory Dialog cleanup guidance | Phase 1 | Carbon API/docs owner |
| `P0-L3` | required-follow-up | dependency evidence can become stale | Phase 4 | security/release owner |
| `P0-L6` | required-follow-up | candidate baseline/guidance needs pilot and release decision | Phase 5 | product/support/release and pilot reviewers |
| `P0-L7` | required-follow-up | package publication owner/support commitment absent | Phase 4 | tooling/security/release owners |

These required follow-ups have accepted owning phases and do not invalidate
Phase 0 completion.

## Prerequisites for the next phase

- Phase 1 must accept P0-L2 as required work and preserve the strict
  upgrade-versus-deprecation selection invariant.
- Phase 1 must consume the candidate baseline without describing it as public
  support.

## Recommended next action

Generate the Phase 1 prompt in a separate requested task from the approved plan,
status ledger, and this handoff.

## Files to read first

- `migration-tooling/PHASE_0_DECISIONS.md` — selected evidence and proposals.
- `migration-tooling/prototypes/phase-0/current-interval-audit.json` — requested
  interval failure evidence.
- `migration-tooling/prototypes/phase-0/revised-slice-results.json` — selected
  cleanup experiment evidence.
- `migration-tooling/prototypes/phase-0/results.json` — exercised tooling claims.

## Handoff integrity

- [x] All links resolve.
- [x] Delivered artifacts exist.
- [x] Status and gate outcome match `IMPLEMENTATION_STATUS.md`.
- [x] Decisions, plan changes, and leftovers use stable IDs.
- [x] Verification evidence is reproducible.
- [x] Unsupported scope and risks are explicit.
- [x] Required approvals are recorded and not inferred.
- [x] The next phase can proceed without relying on chat history.
