# Phase 4 handoff: Maintainer workflow and CI

- Phase: 4
- Status: complete
- Formal gate outcome: `complete-with-deferred-work`
- Completed: yes
- Implementation owner: current project implementor
- Reviewers and approvals: current implementor with AI evidence review;
  organizational security/license, publication, support, and pilot approval not
  inferred
- Plan reference: [Phase 4](../PLAN.md#phase-4-maintainer-workflow-and-ci)
- Status reference: [Phase 4 status](../IMPLEMENTATION_STATUS.md#phase-4-maintainer-workflow-and-ci)

## Outcome

Maintainers have one deterministic generation command and one read-only
validation command. A pull-request CI invocation is prepared but remains
commented because the current implementor cannot change repository CI. The
committed register is derived from the typed catalogue, and public marker
changes require a catalogue-linked migration ID or a reviewed, digest-bound
exemption when validation is run.

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
| [CI](../../.github/workflows/ci.yml)                                           | Commented CI-ready validation entry point           | internal  | CI area                |

## Interfaces and contracts

- `npm run generate:migration-register` writes only the deterministic register.
- `npm run validate:migrations` is read-only, validates all maintainer
  contracts, and runs the complete migration package suite.
- The CI-ready step invokes `npm run validate:migrations` without regenerating
  stale output, but activation requires CI-owner authorization.
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

None. This handoff follows the current `PLAN.md`.

## Verification evidence

| Requirement or exit criterion                            | Result                        | Command, review, or evidence                                                  |
| -------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------- |
| Phase 3 prerequisite                                     | pass                          | Phase 3 handoff validator (12 links)                                          |
| Deterministic generation                                 | pass                          | `npm run generate:migration-register` twice                                   |
| Complete local validation contract                       | pass                          | `npm run validate:migrations` (51/51 tests)                                   |
| Deterministic local validation                           | pass                          | `npm run validate:migrations` (51/51 tests)                                   |
| CI-ready pull-request entry point                        | pass with deferred activation | Commented exact root invocation; current implementor lacks CI authority       |
| Marker/exemption enforcement                             | pass                          | maintainer adversarial tests                                                  |
| Register/reference/rule/schema/fixture/provenance checks | pass                          | maintainer validation                                                         |
| Performance                                              | pass                          | 320 explicit markers across 1,637 files                                       |
| Dependency/license/security                              | pass with limitations         | [evidence](../PHASE_4_EVIDENCE.md)                                            |
| Formal gate                                              | complete-with-deferred-work   | [status gate](../IMPLEMENTATION_STATUS.md#phase-4-maintainer-workflow-and-ci) |

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

| ID      | Classification                | Risk                                              | Target phase | Owner or ownership area           |
| ------- | ----------------------------- | ------------------------------------------------- | ------------ | --------------------------------- |
| `P0-L6` | required-follow-up            | no pilot/public-support decision                  | Phase 6      | product/support/release reviewers |
| `P0-L7` | required-follow-up (narrowed) | accountable publication/support ownership absent  | Phase 6      | tooling/security/release/support  |
| `P4-L1` | required-follow-up (deferred) | CI activation requires repository-owner authority | Phase 6      | CI/review/release owners          |

`P0-L3` and `P2-L3` are resolved with durable evidence.

## Prerequisites for the next phase

- Phase 5 must discover and review candidate changes, backfill the authoritative
  catalogue, and report coverage without claiming completeness.
- Phase 6 must use the reviewed Phase 5 catalogue and run against approved
  representative customer-style evidence.
- Publication requires accountable ownership and security/license, release, and
  support approvals that Phase 4 did not invent.

## Recommended next action

Start Phase 5 from the current plan and prompt. Keep `P4-L1` visible as a Phase
6 release-readiness prerequisite.

## Files to read first

- `migration-tooling/MAINTAINER_WORKFLOW.md` — authoring and review contract.
- `migration-tooling/PHASE_4_EVIDENCE.md` — evidence and approval limitations.
- `packages/carbon-react-migrate/src/maintainer-validation.ts` — CI enforcement.
- `migration-tooling/generated/MIGRATION_REGISTER.md` — generated current
  five-record inventory.

## Handoff integrity

- [x] All links resolve.
- [x] Delivered artifacts exist.
- [x] Status and gate outcome match `IMPLEMENTATION_STATUS.md`.
- [x] Decisions and leftovers use stable IDs.
- [x] Verification evidence is reproducible.
- [x] Unsupported scope and risks are explicit.
- [x] Required approvals are recorded and not inferred.
- [x] The next phase can proceed without relying on chat history.
