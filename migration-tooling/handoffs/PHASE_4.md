# Phase 4 handoff: Maintainer workflow and CI

- Phase: 4
- Status: in-progress
- Formal gate outcome: `remain-in-phase`
- Completed: no
- Implementation owner: current project implementor
- Reviewers and approvals: current implementor with AI evidence review;
  organizational security/license, publication, support, and pilot approval not
  inferred
- Plan reference: [Phase 4](../PLAN.md#phase-4-maintainer-workflow-and-ci)
- Status reference: [Phase 4 status](../IMPLEMENTATION_STATUS.md#phase-4-maintainer-workflow-and-ci)

## Outcome

Maintainers have one deterministic generation command and one read-only
validation command. The pull-request CI step is prepared but intentionally
commented out pending team review of the POC. The committed register is derived
from the typed catalogue, and public marker changes require a catalogue-linked
migration ID or a reviewed, digest-bound exemption when validation is run.

## Delivered artifacts

| Artifact                                                                       | Purpose                                             | Stability | Owner                  |
| ------------------------------------------------------------------------------ | --------------------------------------------------- | --------- | ---------------------- |
| [Phase 4 prompt](../prompts/PHASE_4.md)                                        | Generated implementation contract                   | internal  | implementor            |
| [Register](../generated/MIGRATION_REGISTER.md)                                 | Readable generated migration inventory              | generated | catalogue owner        |
| [Maintainer workflow](../MAINTAINER_WORKFLOW.md)                               | Safe/manual authoring and review                    | internal  | API/docs/codemod areas |
| [Validation](../../packages/carbon-react-migrate/src/maintainer-validation.ts) | Read-only enforcement contract                      | internal  | implementor            |
| [Generator](../../packages/carbon-react-migrate/src/register.ts)               | Byte-stable register rendering                      | internal  | implementor            |
| [Exemptions](../exemptions.json)                                               | Reviewed legacy marker baseline                     | internal  | API/catalogue area     |
| [Provenance](../OPEN_SOURCE_PROVENANCE.md)                                     | Dependency and source provenance                    | internal  | security/license area  |
| [Notices](../THIRD_PARTY_NOTICES.md)                                           | Notice obligations                                  | internal  | security/license area  |
| [Evidence](../PHASE_4_EVIDENCE.md)                                             | Dependency, performance, schema, ownership evidence | internal  | implementor            |
| [CI](../../.github/workflows/ci.yml)                                           | Disabled pull-request placeholder                   | internal  | CI area                |

## Interfaces and contracts

- `npm run generate:migration-register` writes only the deterministic register.
- `npm run validate:migrations` is read-only, validates all maintainer
  contracts, and runs the complete migration package suite.
- The prepared CI step invokes `npm run validate:migrations` without
  regenerating stale output, but it is commented out pending team review.
- Schema remains version 1. Optional `changelog` and `migrationSkill` summary
  fields are backward-compatible; existing fields, commands, and exit codes are
  unchanged.
- `requiredBy` and `deprecatedIn` remain independent. No calendar date is
  maintained in the register.
- Generated output sorts by migration ID and contains no timestamp.
- Marker references use `migration-id: <catalogue-id>`. Reviewed exemptions
  require stable ID, reason, exact scope, owner area, evidence, and inventory
  digest.
- Enforcement recognizes public `@deprecated` annotations, production
  `Logger.deprecate(...)` calls, and explicit `migration-breaking-change`
  markers. Ordinary wording, `__internal__` implementation source, and
  test/story/Playwright files are excluded.
- Exemption structure is validated even when none is needed; stale and unused
  exemptions fail.
- Provenance is machine-bound to declared ranges, root-lock-resolved versions,
  and licenses; notice disposition must name the migration dependencies.

## Decisions

- `P4-D1`: backward-compatible optional rich links in schema v1.
- `P4-D2`: digest-bound legacy marker inventory plus direct migration IDs for
  new explicit markers; scopes bind the exact digest and stale/unused
  exemptions fail.
- `P4-D3`: explicit generation and read-only stale comparison.
- `P4-D4`: explicit public marker conventions and dependency provenance bound
  to package declarations and root-lock-resolved versions/licenses.

## Controlled plan changes

- `PLAN-001` remains preserved.
- No Phase 4 plan change was required.

## Verification evidence

| Requirement or exit criterion                            | Result                | Command, review, or evidence                                                  |
| -------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------- |
| Phase 3 prerequisite                                     | pass                  | Phase 3 handoff validator (12 links)                                          |
| Deterministic generation                                 | pass                  | `npm run generate:migration-register` twice                                   |
| Complete local validation contract                       | pass                  | `npm run validate:migrations` (51/51 tests)                                   |
| Active pull-request CI entry point                       | fail                  | Prepared workflow step is intentionally commented out                         |
| Marker/exemption enforcement                             | pass                  | maintainer adversarial tests                                                  |
| Register/reference/rule/schema/fixture/provenance checks | pass                  | maintainer validation                                                         |
| Performance                                              | pass                  | 320 explicit markers across 1,637 files                                       |
| Dependency/license/security                              | pass with limitations | [evidence](../PHASE_4_EVIDENCE.md)                                            |
| Formal gate                                              | remain-in-phase       | [status gate](../IMPLEMENTATION_STATUS.md#phase-4-maintainer-workflow-and-ci) |

## Supported scope

The Phase 1–3 catalogue, selection, reporting, detector, and application
contracts remain supported. Phase 4 adds deterministic local repository
maintenance for the approved five-record catalogue, local documentation links,
fixtures, provenance, public marker references, reviewed exemptions, and CI.

## Unsupported scope and limitations

The package remains private. The register is not historical backfill and does
not promise complete migration coverage. Legacy marker exemptions preserve an
exact reviewed baseline but do not claim every legacy marker has a catalogue
record. Offline audit evidence is not fresh registry or organizational
approval. No customer pilot, public baseline decision, publication, or support
promise occurred. Accountable organizational owners remain unconfirmed.

## Open leftovers

| ID      | Classification                | Risk                                             | Target phase | Owner or ownership area           |
| ------- | ----------------------------- | ------------------------------------------------ | ------------ | --------------------------------- |
| `P0-L6` | required-follow-up            | no pilot/public-support decision                 | Phase 5      | product/support/release reviewers |
| `P0-L7` | required-follow-up (narrowed) | accountable publication/support ownership absent | Phase 5      | tooling/security/release/support  |
| `P4-L1` | required-follow-up            | migration validation is not active in PR CI      | Phase 4      | implementor/CI/review owners      |

`P0-L3` and `P2-L3` are resolved with durable evidence.

## Prerequisites for the next phase

- Enable the prepared pull-request CI step and obtain passing CI evidence.
- Reevaluate Phase 4 and complete its formal gate.
- Phase 5 must use this private implementation and preserve the candidate
  interval as pilot scope until its release decision.
- The pilot must run against approved representative customer-style evidence.
- Publication requires accountable ownership and security/license, release, and
  support approvals that Phase 4 did not invent.

## Recommended next action

Complete team review, enable the prepared CI step, and reevaluate Phase 4. Do
not start Phase 5 while `P4-L1` remains open.

## Files to read first

- `migration-tooling/MAINTAINER_WORKFLOW.md` — authoring and review contract.
- `migration-tooling/PHASE_4_EVIDENCE.md` — evidence and approval limitations.
- `packages/carbon-react-migrate/src/maintainer-validation.ts` — CI enforcement.
- `migration-tooling/generated/MIGRATION_REGISTER.md` — generated pilot inventory.

## Handoff integrity

- [x] All links resolve.
- [x] Delivered artifacts exist.
- [x] Status and gate outcome match `IMPLEMENTATION_STATUS.md`.
- [x] Decisions, plan changes, and leftovers use stable IDs.
- [x] Verification evidence is reproducible.
- [x] Unsupported scope and risks are explicit.
- [x] Required approvals are recorded and not inferred.
- [ ] The next phase can proceed without relying on chat history; `P4-L1`
      blocks proceeding.
