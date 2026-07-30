# Phase 5 handoff: Migration discovery and catalogue backfill

- Phase: 5
- Status: complete
- Formal gate outcome: `advance`
- Completed: yes
- Implementation owner: current project implementor
- Reviewers and approvals: implementation evidence reviewed; Carbon API/release
  semantic approval not supplied
- Plan reference: [Phase 5](../PLAN.md#phase-5-migration-discovery-and-catalogue-backfill)
- Status reference: [Phase 5 status](../IMPLEMENTATION_STATUS.md#phase-5-migration-discovery-and-catalogue-backfill)

## Technical POC review

Discovery associates deprecation markers only with the containing or
immediately following declaration, separates interval-qualified evidence from
current-snapshot-unbounded leads, prevents internal/styled-only markers from
qualifying, validates Phase 5 artifacts and drafts at runtime, and applies
strict maintainer CLI argument handling.

## Outcome

Deterministic local discovery, draft scaffolding, and honest interval coverage
are implemented. The catalogue/register remain unchanged. Discovery reports 1
interval-qualified candidate and 264 current-snapshot leads while retaining
other evidence by disposition. Phase 5 is complete at the technical POC
boundary; semantic review and catalogue expansion are Phase 6 work.

## Delivered artifacts

| Artifact                                                                        | Purpose                                                | Stability | Owner                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------ | --------- | ----------------------------- |
| [Discovery](../../packages/carbon-react-migrate/src/discovery.ts)               | Evidence collection/rendering                          | internal  | implementor                   |
| [Discovery CLI](../../packages/carbon-react-migrate/src/discover-cli.ts)        | Discovery command                                      | internal  | implementor                   |
| [Scaffold CLI](../../packages/carbon-react-migrate/src/create-migration-cli.ts) | Safe draft creation                                    | internal  | implementor                   |
| [Candidates](../discovery/candidates.json)                                      | Machine candidate evidence                             | generated | API/release reviewers         |
| [Candidate view](../discovery/candidates.md)                                    | Human inventory                                        | generated | API/release reviewers         |
| [Coverage](../discovery/coverage.md)                                            | Interval coverage/gaps                                 | generated | API/release reviewers         |
| [Team review guide](../discovery/README.md)                                     | Shared ownership, batching, decisions, and AI boundary | durable   | API/release/codemod reviewers |
| [Record reference](../CATALOGUE_RECORD_REFERENCE.md)                            | Allowed catalogue variants and authoring rules         | durable   | catalogue authors             |

## Interfaces and contracts

- `discover:migrations` returns 0 on success and 2 for invalid input, writing
  only stable schema-v1 discovery artifacts.
- `create:migration` returns 0 on success and 2 for invalid/duplicate input,
  exclusively creating one non-authoritative draft.
- Candidates are `non-authoritative` and `needs-review`; only complete,
  approved catalogue records affect customer behavior.
- Customer selection remains exclusively catalogue-backed.

## Decisions

- `P5-D1`, `P5-D2`, and `P5-D3` are recorded in the status ledger.

## Controlled plan changes

- Phase 5 closes at the deterministic discovery POC boundary. Accountable
  semantic review, catalogue expansion, and pilot-gap acceptance move to Phase
  6, where a representative pilot scope and reviewers can be selected.

## Verification evidence

| Requirement           | Result          | Evidence                                                                                      |
| --------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| Build/tests           | pass            | package build; 62/62 tests                                                                    |
| Maintainer validation | pass            | catalogue plus root validation                                                                |
| Determinism/isolation | pass            | repeated hashes; catalogue/register unchanged                                                 |
| Candidate review      | deferred        | The npm 11.15 candidate needs a Phase 6 release/tooling decision                               |
| Evidence disposition  | pass            | 3 catalogue groups; 81 boundary; 720 internal; 7 rejected; 141 ambiguous                      |
| Pilot-gap closure     | deferred        | `P5-L1`, `P5-L2` move to Phase 6                                                               |
| Formal gate           | advance         | [status gate](../IMPLEMENTATION_STATUS.md#phase-5-migration-discovery-and-catalogue-backfill) |

## Supported scope

Actionable local changelog entries, contextual public markers, tagged package
requirement changes, catalogue correlations, release-boundary/internal/
ambiguous dispositions, interval codemod references, deterministic artifacts,
stable old-to-new mappings, and isolated draft scaffolding.

## Unsupported scope and limitations

No network evidence, customer execution, AI runtime, automatic approval,
catalogue insertion, or Phase 6 pilot. Local scanning cannot prove historical
completeness or inspect absent archived codemod source/tag/API diffs.

## Open leftovers

| ID      | Classification     | Risk                            | Target phase | Owner                             |
| ------- | ------------------ | ------------------------------- | ------------ | --------------------------------- |
| `P5-L1` | required follow-up | unreviewed semantics            | Phase 6      | API/release reviewers             |
| `P5-L2` | required follow-up | ambiguous API/codemod semantics | Phase 6      | implementor/API/codemod reviewers |
| `P4-L1` | deferred follow-up | CI activation                   | Phase 6      | CI/release owners                 |
| `P0-L6` | required follow-up | pilot/support decision          | Phase 6      | product/support/release           |
| `P0-L7` | required follow-up | publication ownership           | Phase 6      | tooling/security/release/support  |

## Prerequisites for the next phase

- Select a representative pilot scope and accountable reviewers.

## Recommended next action

Start Phase 6 with a bounded pilot. Review only candidates and historical
evidence relevant to that scope before deciding whether publication is viable.

## Files to read first

- `migration-tooling/discovery/candidates.json`
- `migration-tooling/discovery/coverage.md`
- `migration-tooling/discovery/README.md`
- `packages/carbon-react-migrate/src/discovery.ts`

## Handoff integrity

- [x] All links resolve.
- [x] Delivered artifacts exist.
- [x] Status and gate outcome match `IMPLEMENTATION_STATUS.md`.
- [x] Decisions and leftovers use stable IDs.
- [x] Verification evidence is reproducible.
- [x] Unsupported scope and risks are explicit.
- [x] Required approvals are recorded and not inferred.
- [x] The next phase can proceed without relying on chat history.
