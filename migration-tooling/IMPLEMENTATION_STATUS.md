# Carbon migration tooling implementation status

This document is the persistent source of truth for implementation progress,
verification, decisions, deviations, and remaining work.

The implementation requirements, tasks, deliverables, exit criteria, and
estimates remain in [PLAN.md](./PLAN.md). Every phase transition must follow
[PHASE_GATES.md](./PHASE_GATES.md).

## Status values

- `not-started`
- `in-progress`
- `review`
- `complete`
- `blocked`

## Rules for leftovers

A leftover is any discovered, incomplete, unsupported, unverified, or
intentionally postponed item that remains when reporting phase status.

Record each item under the applicable phase's `### Leftovers` section. Use
`## Cross-phase leftovers` only when an item genuinely affects multiple phases.

### Required record

```md
#### <Stable ID>: <Description>

- Classification:
- Discovered in:
- Reason:
- Risk if unresolved:
- Effect on current exit criteria:
- Target phase:
- Owner or required ownership area:
- Dependencies or unblock condition:
- Planned verification:
- Status: open | resolved | rejected
- Resolution evidence:
```

Use stable IDs such as `P1-L1`. Do not leave required fields blank; use
`not-applicable` with a reason where necessary.

### Classifications

- `blocker`: prevents a current deliverable, exit criterion, required approval,
  safety property, or next-phase prerequisite from passing.
- `required-follow-up`: required by a named later phase but does not prevent the
  current phase from passing.
- `optional`: useful but not required for correctness, safety, supported scope,
  or the next phase.
- `deferred`: explicitly outside the MVP or assigned to an approved later
  milestone.
- `rejected`: considered and intentionally not implemented.

### Lifecycle and completion

- Record leftovers as soon as they are discovered.
- One record describes one independently resolvable outcome.
- Do not duplicate records across phases; reference their stable IDs.
- Required items need an accepted target phase or become blockers.
- Keep resolved and rejected records with their resolution evidence.
- Reassess all open leftovers during every formal gate.
- A phase cannot complete with an open blocker.
- `complete-and-proceed` requires no blocker and accepted targets for every
  required follow-up.
- `complete-with-deferred-work` permits only accepted required follow-ups,
  optional work, deferred work, and rejected work that do not affect current
  exit criteria.
- Propose a remediation phase when discovered work affects several phases,
  changes architecture or a public interface, is required for safety, needs
  separate ownership/review, or exceeds two working days.

## Phase-gate outcomes

- `complete-and-proceed`
- `complete-with-deferred-work`
- `remain-in-phase`
- `remediation-phase-required`
- `blocked`
- `plan-revision-required`

Do not begin the next phase before the formal gate permits it.

## Plan evolution

Follow [Controlled plan evolution](./PLAN.md#controlled-plan-evolution).

- Document proposed changes while they are reviewed, then update this ledger
  and the single current plan with the accepted result.
- Remove obsolete comparison wording; Git history retains prior revisions.
- Do not weaken exit criteria or move required work merely to complete a phase.
- Re-run gates whose evidence or completion claim changes.
- Generate later prompts only from the current plan and handoff.

## Overall status

- Current phase: Phase 4
- Overall status: in-progress
- Last completed phase: Phase 3
- Latest completed gate: complete-with-deferred-work
- Updated by: current project implementor with AI assistance

## Phase 0: Select the vertical slice

- Plan reference: [Phase 0](./PLAN.md#phase-0-select-the-vertical-slice)
- Status: complete
- Phase-gate outcome: complete-with-deferred-work
- Owner: current project implementor
- AI assistance: Codex — evidence preparation, prototype support, and gate
  review

### Implemented

- Selected `159.0.0 → 161.7.0` as the candidate implementation and pilot path.
- Defined separate required-upgrade and optional-deprecation-cleanup tracks.
- Identified required records for CSS compatibility, Button DOM refs, and the
  npm engine.
- Selected deterministic conflict-free cleanup subsets for StepSequenceItem and
  DialogFullScreen.
- Preserved strict `requiredBy` and `deprecatedIn` semantics.
- Chose jscodeshift/Recast for customer-code rules and ts-morph for Carbon API
  extraction and validation.
- Chose independent Carbon rules without copied upstream source.
- Selected `packages/carbon-react-migrate` as the provisional implementation
  location.

### Handoff artifacts

- [Phase 0 handoff](./handoffs/PHASE_0.md)
- [Phase 0 decision record](./PHASE_0_DECISIONS.md)
- [General transformation prototype](./prototypes/phase-0/run-experiments.cjs)
- [General prototype results](./prototypes/phase-0/results.json)
- [Candidate-path audit](./prototypes/phase-0/current-interval-audit.json)
- [Selected-cleanup prototype](./prototypes/phase-0/run-revised-slice-experiments.cjs)
- [Selected-cleanup results](./prototypes/phase-0/revised-slice-results.json)

### Verification

- Tagged source, changelog, package configuration, blame, and tag-containment
  audits established the required boundaries.
- Prototype suites passed for JS, JSX, TS, TSX, direct imports, aliases,
  locations, comments, idempotency, and unchanged conflicts.
- Prototype JSON artifacts parse successfully.
- Handoff links and integrity checks pass.
- `git diff --check` passes.

#### Formal phase gate

- Reviewer: current project implementor with AI evidence review
- Outcome: `complete-with-deferred-work`

| Check                        | Result | Evidence or reason                                                                                                                 |
| ---------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Scope                        | pass   | Candidate path, two tracks, tools, provenance, ownership boundaries, and limitations are defined.                                  |
| Deliverable                  | pass   | Decision record, prototypes, results, status, and handoff are durable and linked.                                                  |
| Exit criteria                | pass   | Required boundaries, optional applicability, deterministic subsets, guidance scope, parser coverage, and provenance are evidenced. |
| Correctness and safety       | pass   | Optional cleanup is limited to tested conflict-free subsets; ambiguity remains unchanged and is reported.                          |
| Documentation and provenance | pass   | Guidance, limitations, upstream references, licenses, and no-copy decisions are recorded.                                          |
| Ownership and approvals      | pass   | Implementation and pilot scope is approved; publication, support, and release remain assigned to later phases.                     |
| Leftovers and plan health    | pass   | No blocker remains; all required follow-ups have accepted target phases.                                                           |
| Repository state             | pass   | Relevant prototype, JSON, link, and diff validations pass.                                                                         |

##### Exit-criterion evidence

- Required records have unambiguous `requiredBy`: CSS `160.0.0`, Button ref
  `161.0.0`, and npm engine `161.3.0`.
- Optional cleanup records have reliable `deprecatedIn` and no invented
  `requiredBy`.
- The candidate path records the known breaking and compatibility boundaries,
  including the npm release-note gap.
- StepSequenceItem and DialogFullScreen have useful deterministic,
  conflict-free subsets.
- Required manual work has evidence-backed reporting guidance.
- JS, JSX, TS, and TSX experiments pass.
- No copied or adapted upstream source is proposed.

### Decisions

#### P0-D2: Transformation responsibilities

- Decision: use jscodeshift/Recast for shared customer detection and edits, and
  ts-morph for Carbon API extraction and validation.
- Status: approved for implementation and pilot.

#### P0-D3: Open-source reuse

- Decision: use maintained packages and independently implement small
  Carbon-specific rules; do not copy reviewed upstream helper source.
- Status: approved for implementation and pilot.

#### P0-D4: Package location

- Decision: use `packages/carbon-react-migrate` as the provisional
  implementation location.
- Status: approved for implementation; publication ownership is Phase 4 work.

#### P0-D6: Preserve applicability semantics

- Decision: do not treat `deprecatedIn` as `requiredBy` while the deprecated API
  remains supported and no mandatory-action release is established.
- Status: approved.

#### P0-D7: Two-track slice

- Decision: use three required candidate-path records and two optional
  cleanup records.
- Status: approved for implementation and pilot; public support and release
  approval remain deferred.

### Leftovers

#### P0-L2: Canonical DialogFullScreen guidance

- Classification: required-follow-up
- Discovered in: Phase 0 source and warning audit
- Reason: the retained warning recommends the deprecated `fullscreen` prop,
  while current Dialog guidance recommends `size="fullscreen"`.
- Risk if unresolved: catalogue or runtime guidance could produce immediately
  deprecated code.
- Effect on current exit criteria: none; Phase 1 accepts this as required work.
- Target phase: Phase 1
- Owner or required ownership area: current implementor, Carbon API/docs owner
- Dependencies or unblock condition: catalogue and documentation implementation
  exists.
- Planned verification: catalogue/document link test and source/warning review.
- Status: resolved
- Resolution evidence: resolved for migration-tooling output in Phase 1 by the
  catalogue record, stable guidance anchor, and validation regression that make
  `Dialog size="fullscreen"` canonical. The existing component and warning were
  reviewed but intentionally left unchanged as out-of-scope product source.

#### P0-L3: Refresh dependency and performance evidence

- Classification: required-follow-up
- Discovered in: Phase 0 tooling evaluation
- Reason: maintenance, vulnerabilities, Node support, licenses, package size,
  and prototype performance evidence can become stale.
- Risk if unresolved: publication could use unsupported or unsuitable
  dependencies.
- Effect on current exit criteria: none.
- Target phase: Phase 4
- Owner or required ownership area: current implementor, security/release owner
- Dependencies or unblock condition: production dependency versions and package
  layout exist.
- Planned verification: locked dependency audit, Node matrix, representative
  benchmark, license/notice review, and package-size measurement.
- Status: resolved
- Resolution evidence: `migration-tooling/PHASE_4_EVIDENCE.md` records locked
  production dependency versions, offline audit limitations, licenses, Node
  compatibility, installed size, and measured repository validation runtime;
  provenance and notice files are enforced by `validate:migrations`.

#### P0-L6: Pilot validation and public support decision

- Classification: required-follow-up
- Discovered in: implementation and pilot approval boundary
- Reason: `159.0.0` is approved for implementation and pilot, not public
  support.
- Risk if unresolved: customers could receive an unvalidated support promise.
- Effect on current exit criteria: none.
- Target phase: Phase 6
- Owner or required ownership area: current implementor, product/support/release
  and pilot reviewers
- Dependencies or unblock condition: implementation, CI, reviewed candidate
  interval coverage, documentation, and a representative pilot are complete.
- Planned verification: complete pilot and release gate.
- Status: open
- Resolution evidence: not-applicable; unresolved.

#### P0-L7: Package publication ownership and support

- Classification: required-follow-up
- Discovered in: implementation approval boundary
- Reason: provisional implementation location does not establish publication
  ownership or support commitments.
- Risk if unresolved: an unowned package could be published.
- Effect on current exit criteria: none.
- Target phase: Phase 6
- Owner or required ownership area: current implementor, tooling/security/release
  owner
- Dependencies or unblock condition: production package structure and
  dependency evidence exist.
- Planned verification: ownership, security, provenance, publication, and
  support review.
- Status: open (Phase 4 implementation/provenance evidence complete;
  accountable publication and support assignment remains)
- Resolution evidence: `migration-tooling/PHASE_4_EVIDENCE.md` and the Phase 4
  handoff record the missing accountable ownership without inventing approval.

### Deviations from plan

- Prototype dependencies were kept outside production package configuration.

### Estimate changes

None recorded.

### Next action

Generate the Phase 1 prompt from the current plan, this status, the Phase 0
handoff, and the shared prompt template. Do not begin Phase 1 until that prompt
is reviewed.

## Phase 1: Catalogue and validation

- Plan reference: [Phase 1](./PLAN.md#phase-1-catalogue-and-validation)
- Status: complete
- Phase-gate outcome: complete-with-deferred-work
- Owner: current project implementor

### Implemented

- Created the provisional private `packages/carbon-react-migrate` package.
- Added runtime schema validation and distinct upgrade/deprecation record types.
- Added the three required-upgrade and two optional-deprecation records.
- Added deterministic semver interval and track selection.
- Represented four tested boundaries and rejected direct multi-boundary jumps
  with the required intermediate path.
- Validated the complete runtime record unions and fields, IDs, versions, rules,
  documentation/anchors, current APIs, narrowly tuple-bound historical
  exemptions, and one deterministic contiguous boundary topology.
- Resolved `P0-L2` with canonical `Dialog size="fullscreen"` guidance and
  validation while preserving the component rollback.
- Added the local `npm run validate:catalogue` command and comprehensive tests.
- Applied the validated Phase 1 review fixes for historical-reference binding,
  unsupported-path suggestions, complete runtime validation, deterministic
  topology, regression coverage, source-change claims, and phase metadata.

### Handoff artifacts

- [Phase 1 handoff](./handoffs/PHASE_1.md)
- [Phase 1 prompt](./prompts/PHASE_1.md)
- [Catalogue guidance](./CATALOGUE_GUIDANCE.md)
- [Package catalogue](../packages/carbon-react-migrate/src/catalogue.ts)
- [Catalogue API](../packages/carbon-react-migrate/src/index.ts)
- [Runtime validation](../packages/carbon-react-migrate/src/validation.ts)

### Verification

- `cd packages/carbon-react-migrate && npm run test` — pass: TypeScript build
  and 15/15 Node tests, including the Phase 1 review regressions.
- `cd packages/carbon-react-migrate && npm run validate:catalogue` — pass:
  validated five records and four boundaries.
- `test -z "$(git diff -- src/components/dialog-full-screen)"` — pass: the
  component rollback is preserved.
- `git diff --check` — pass.
- `node migration-tooling/scripts/validate-handoff-links.cjs
migration-tooling/handoffs/PHASE_1.md` — pass: all 13 Phase 1 handoff links
  resolve.
- `npx prettier --check packages/carbon-react-migrate/src
packages/carbon-react-migrate/package.json
packages/carbon-react-migrate/tsconfig.json` — pass.

#### Phase 1 completion cleanup verification

- `npm --version` — `11.16.0`, below the repository requirement of
  `>=11.18.0`. No installation, npm update, or lockfile operation was performed.
  The required package scripts remained executable.
- `npm run test --prefix packages/carbon-react-migrate` — pass: TypeScript
  compilation and 15/15 tests. Compile-time assignments and runtime assertions
  verify `UpgradeMigration[]` and `DeprecationMigration[]` selector results;
  selection, ordering, and the exact
  `159.0.0 → 160.0.0 → 161.0.0 → 161.3.0 → 161.7.0` path are unchanged.
- `npm run validate:catalogue --prefix packages/carbon-react-migrate` — pass:
  validated five records and four boundaries.
- `node migration-tooling/scripts/validate-handoff-links.cjs
migration-tooling/handoffs/PHASE_1.md` — pass: all 13 links resolve.
- `npx prettier --check packages/carbon-react-migrate/src
packages/carbon-react-migrate/package.json
packages/carbon-react-migrate/tsconfig.json` — initial run failed on the two
  edited TypeScript files; they were formatted and the exact check was rerun
  successfully.
- `git diff --check` — pass.
- Repository review — pass: Phase 2 remains `not-started` with no implementation
  artifacts; the working-tree changes are limited to Phase 1 artifacts; and
  `package-lock.json` is unchanged.

#### Formal phase gate

- Reviewer: current project implementor with AI evidence review; gate re-run
  after the validated Phase 1 review fixes and completion cleanup
- Outcome: `complete-with-deferred-work`

| Check                        | Result | Evidence or reason                                                                                                                                                                  |
| ---------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope                        | pass   | All Phase 1 tasks, review fixes, and completion cleanup are implemented; Phase 2 remains not-started and no Phase 2 code was added.                                                 |
| Deliverable                  | pass   | Tested catalogue API, validation command, guidance, prompt, and complete handoff exist and link durably.                                                                            |
| Exit criteria                | pass   | All five criteria have passing automated evidence below.                                                                                                                            |
| Correctness and safety       | pass   | Track-specific selector return types compile without casts; runtime behavior, ordering, exact intermediate path, schema validation, topology, and historical binding remain tested. |
| Documentation and provenance | pass   | Stable anchors validate; the provisional ancestor-installation model and npm prerequisite are documented as maintainer-only; no upstream source was copied.                         |
| Ownership and approvals      | pass   | Implementation/pilot scope is approved; publication, support, dependency/security refresh, and pilot approval remain accepted later-phase work.                                     |
| Leftovers and plan health    | pass   | P0-L2 is resolved; P0-L3/P0-L7 remain accepted in Phase 4 and P0-L6 in Phase 6; no blocker or plan change exists.                                                                   |
| Repository state             | pass   | Required package tests, validation, final formatting check, handoff links, and `git diff --check` pass; package-lock is unchanged and no Phase 2 implementation exists.             |

##### Exit-criterion evidence

- Criterion: Boundary tests cover versions below, equal to, inside, and above
  the interval.
  - Result: pass
  - Evidence: `npm run test`; interval selection fixture.
- Criterion: Deprecation-only records are absent from version-aware selection
  and present in deprecation selection.
  - Result: pass
  - Evidence: `npm run test`; independent track-selection fixture.
- Criterion: Unsupported direct jumps return the required intermediate path.
  - Result: pass
  - Evidence: `npm run test`; exact
    `159.0.0 → 160.0.0 → 161.0.0 → 161.3.0 → 161.7.0` assertion.
- Criterion: Invalid catalogue records fail with actionable errors.
  - Result: pass
  - Evidence: `npm run test`; complete runtime union/field, duplicate, scope,
    semver, rule, documentation, anchor, API, automation, boundary-topology,
    and exemption failures.
- Criterion: Historical removed APIs can be represented without weakening
  validation for current APIs.
  - Result: pass
  - Evidence: `npm run test`; P1-H1 is bound to the exact record, path, symbol,
    historical version, and removal version; tagged source is checked with
    `git show`; mismatches, missing current APIs, and unknown exemptions fail.

##### Blocking or follow-up actions

- Action: refresh dependency/security/license/performance evidence.
  - Owner or ownership area: security/release owner
  - Target phase: Phase 4 (`P0-L3`)
- Action: establish publication ownership and support.
  - Owner or ownership area: tooling/security/release owners
  - Target phase: Phase 4 (`P0-L7`)
- Action: pilot and decide public support.
  - Owner or ownership area: product/support/release and pilot reviewers
  - Target phase: Phase 6 (`P0-L6`)

### Decisions

- `P1-D1`: represent the audited path as four individually tested boundaries;
  enforce one contiguous topology, reject direct multi-boundary jumps, and
  suggest only steps actually reachable from the requested source.
- `P1-D2`: use explicit repository-owned HTML anchors as stable documentation
  references.
- `P1-D3`: make `Dialog size="fullscreen"` canonical in migration catalogue
  guidance and validation. Product component/warning source remains unchanged.
- `P1-D4`: while the package is provisional, maintainers install at the
  repository root and run package scripts with `--prefix`; standalone
  installation, workspace integration, lockfile strategy, publication,
  ownership, and final dependency strategy remain Phase 4 work.

### Leftovers

- `P0-L2` was accepted and resolved. No new Phase 1 leftover remains.

### Deviations from plan

- None.

### Estimate changes

- None; implementation evidence does not change later estimates.

### Next action

Generate the Phase 2 prompt from the current repository and Phase 1 handoff in a
separate task. Phase 2 may begin, but was not implemented here.

## Phase 2: Read-only CLI and deprecation diagnosis

- Plan reference: [Phase 2](./PLAN.md#phase-2-read-only-cli-and-deprecation-diagnosis)
- Status: complete
- Phase-gate outcome: complete-with-deferred-work
- Owner: current project implementor

### Implemented

- Added locally executable `plan`, `check`, and `check-deprecations`.
- Added shared jscodeshift/Recast detection, deterministic traversal, installed
  version discovery, stable human/JSON v1 reports, and exit codes 0–4.
- Added direct supported detection for StepSequenceItem `ariaLabel`,
  DialogFullScreen JSX, and ButtonHandle type references.
- Added JS/JSX/TS/TSX, alias, negative, shadowing, ambiguity, malformed,
  deterministic snapshot, exit-code, and no-write coverage.
- Completed schema v1 for migration summaries, findings, report summaries, and
  command-specific version fields; actual reports are validated with Ajv.
- Added clean JSON-only npm/direct invocation documentation and integration
  tests, including valid JSON with findings exit code 1.
- Tightened command-specific positional and option validation.

### Handoff artifacts

- [Phase 2 handoff](./handoffs/PHASE_2.md)
- [CLI](../packages/carbon-react-migrate/src/cli.ts)
- [JSON schema v1](../packages/carbon-react-migrate/schema/report-v1.schema.json)
- [Fixtures](../packages/carbon-react-migrate/test/fixtures)

### Verification

- Initial completion gate was insufficient: it checked `schemaVersion` and
  selected fields but did not validate complete emitted reports; the documented
  non-silent npm command also mixed build banners into JSON stdout. Phase 2 was
  returned to `in-progress` / `remain-in-phase` for repair.
- `npm run test --prefix packages/carbon-react-migrate` — repair run passes:
  build and 27/27 tests, including Ajv validation of all three commands,
  malformed-schema negatives, clean stdout, findings exit 1, command arguments,
  and exit codes 0–4.
- `npm run validate:catalogue --prefix packages/carbon-react-migrate` — pass.
- `npm ls ajv --depth=0` — pass: Ajv `8.18.0` is declared directly instead of
  being consumed from a transitive hoisted dependency.
- `npx eslint packages/carbon-react-migrate/src --max-warnings=0` — pass.
- Package formatting (excluding the intentionally malformed fixture), handoff
  links, and `git diff --check` — pass.

#### Superseded initial formal phase gate

- Reviewer: current project implementor with AI evidence review
- Outcome: `remain-in-phase`

| Check                        | Result | Evidence or reason                                                                                                     |
| ---------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| Scope                        | fail   | Superseded initial review missed complete schema validation, clean machine stdout, and strict command arguments.       |
| Deliverable                  | fail   | Superseded schema v1 left migration and summary objects effectively unvalidated.                                       |
| Exit criteria                | fail   | Superseded evidence checked only schema version/selected fields, not the complete emitted contract.                    |
| Correctness and safety       | fail   | Superseded documented npm JSON command emitted banners before JSON and argument parsing accepted invalid combinations. |
| Documentation and provenance | pass   | Existing scope and provisional boundaries were recorded, but machine-readable command documentation required repair.   |
| Ownership and approvals      | pass   | Implementation/pilot approval was retained; later publication/support/pilot approvals remained deferred.               |
| Leftovers and plan health    | fail   | Required repair remained in Phase 2, so proceeding to Phase 3 was not permitted.                                       |
| Repository state             | fail   | Existing tests passed but were insufficient to substantiate the completion claim.                                      |

##### Exit-criterion evidence

- Criterion: all supported fixtures are detected.
  - Result: pass
  - Evidence: package suite covers JS, JSX, TS, TSX, and aliases.
- Criterion: negative and shadowed identifiers produce no false positives.
  - Result: pass
  - Evidence: dedicated negative/shadowing test.
- Criterion: output ordering and JSON snapshots are stable.
  - Result: pass
  - Evidence: repeated scans/CLI runs and report-v1 snapshot.
- Criterion: no AI, credentials, or network are required after installation.
  - Result: pass
  - Evidence: local implementation and offline test execution.
- Criterion: repeated `check-deprecations` is safe and stable.
  - Result: pass
  - Evidence: byte-identical JSON and unchanged fixture hashes.
- Criterion: `plan`/`check` never label deprecations as required.
  - Result: pass
  - Evidence: selector and CLI track-separation assertions.

#### Formal phase gate

- Reviewer: current project implementor with AI evidence review after Phase 2
  correctness repair
- Outcome: `complete-with-deferred-work`

| Check                        | Result | Evidence or reason                                                                                                                                                                                   |
| ---------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope                        | pass   | Phase 2 read-only scope and repairs are complete; no apply command, Phase 3 implementation, or Phase 3 prompt exists.                                                                                |
| Deliverable                  | pass   | CLI, complete schema v1, shared detectors, tests, fixtures, README, and repaired handoff exist and are independently usable.                                                                         |
| Exit criteria                | pass   | Every Phase 2 exit criterion is listed below with reproducible evidence; actual reports from all three commands validate.                                                                            |
| Correctness and safety       | pass   | Strict arguments, exits 0–4, exact paths, ambiguity, malformed input, byte stability, no-write hashes, JSON exit 1, and negative schemas are tested.                                                 |
| Documentation and provenance | pass   | Clean JSON commands, schema boundary, link-metadata decision, limitations, dependencies, and initial insufficient gate are recorded; no source was copied.                                           |
| Ownership and approvals      | pass   | Implementation/pilot scope remains approved; documentation-link extraction remains assigned to Phase 4, while publication/security/support and pilot approval remain assigned to Phase 6.            |
| Leftovers and plan health    | pass   | P2-L2 is resolved; P2-L1 and P2-L3 have accepted later targets; P0-L3/P0-L7 remain Phase 4 and P0-L6 Phase 6; no blocker or plan revision remains.                                                   |
| Repository state             | pass   | Required tests, catalogue validation, direct Ajv dependency check, lint, formatting, 11 handoff links, and diff check pass; lock changes cover the reviewed jscodeshift tooling and Ajv declaration. |

##### Exit-criterion evidence

- Criterion: all supported fixtures are detected.
  - Result: pass
  - Evidence: `npm run test --prefix packages/carbon-react-migrate`; JS, JSX,
    TS, TSX, alias, direct JSX, prop, and ButtonHandle fixtures.
- Criterion: negative and shadowed identifiers produce no false positives.
  - Result: pass
  - Evidence: dedicated negative and shadowing fixtures in the 27-test suite.
- Criterion: output ordering and JSON snapshots are stable.
  - Result: pass
  - Evidence: repeated scans and CLI runs are byte-identical; snapshot passes;
    schema-valid reports are exercised for all three commands.
- Criterion: the CLI requires no AI, credentials, or network after installation.
  - Result: pass
  - Evidence: all final verification ran locally after installation using only
    package and repository artifacts.
- Criterion: rerunning `check-deprecations` is safe and stable.
  - Result: pass
  - Evidence: repeated JSON is byte-identical and before/after customer fixture
    hashes are unchanged.
- Criterion: `plan` and `check` never present deprecation-only findings as
  required upgrade work.
  - Result: pass
  - Evidence: selector tests, schema-valid command reports, and required-only
    CLI assertions pass.

##### Blocking or follow-up actions

- Action: preserve detector/report equivalence for safe application.
  - Owner or ownership area: current implementor, codemod reviewer
  - Target phase: Phase 3 (`P2-L1`)
- Action: add reviewed extracted documentation/changelog/skill metadata without
  manually maintained dates.
  - Owner or ownership area: Carbon API/docs owner, current implementor
  - Target phase: Phase 4 (`P2-L3`)
- Action: retain dependency/publication and pilot follow-ups.
  - Owner or ownership area: security/release/product/support owners
  - Target phase: Phases 4 and 5 (`P0-L3`, `P0-L7`, `P0-L6`)

### Decisions

- `P2-D1`: add jscodeshift `17.4.0` and `@types/jscodeshift` `17.3.0`
  to implement the approved Phase 0 architecture.
- `P2-D2`: report direct conflicts/spreads as unsupported; shadowed and
  unrelated identifiers are non-matches.
- `P2-D3`: support direct imported `ButtonHandle` type references without broad
  call inference that could create false positives.
- `P2-D4`: schema v1 exposes only the current stable migration-guidance link.
  Phase 4 will add reviewed component/prop documentation, changelog, Migration
  Skill, and replacement/removal metadata through backward-compatible optional
  fields or a new schema version. `deprecatedIn` remains authoritative; any
  release date must be derived from release or Git metadata, never maintained
  manually.
- `P2-D5`: machine consumers use the documented silent npm invocation or the
  built CLI directly; exit code 1 still carries a complete JSON report.
- `P2-D6`: declare Ajv `8.18.0` directly in the root provisional-install
  contract and the migration package's development dependencies because Phase
  2 schema tests import it directly; do not rely on a transitive hoisted copy.

### Leftovers

#### P2-L2: Complete and validate the Phase 2 machine-readable contract

- Classification: blocker
- Discovered in: Phase 2 completion correctness review
- Reason: schema v1 did not validate migration summaries or the report summary;
  npm banners polluted documented JSON stdout; argument parsing was permissive.
- Risk if unresolved: machine consumers could accept malformed reports, fail
  JSON parsing, or run a different command than intended.
- Effect on current exit criteria: invalidated schema/output correctness and
  the initial completion gate.
- Target phase: Phase 2
- Owner or required ownership area: current implementor
- Dependencies or unblock condition: complete schema, real-report validation,
  clean-output integration tests, and strict argument tests.
- Planned verification: required Phase 2 repair commands and formal gate.
- Status: resolved
- Resolution evidence: schema v1 now fully validates emitted nested objects;
  Ajv validates all commands and rejects required malformed cases; documented
  silent/direct commands produce parseable JSON; argument and exit-code tests
  pass.

#### P2-L1: Preserve detector/report equivalence during safe application

- Classification: required-follow-up
- Discovered in: Phase 2 shared detector implementation
- Reason: Phase 3 transforms must consume the same match evidence.
- Risk if unresolved: apply and check could disagree or transform unsupported
  patterns.
- Effect on current exit criteria: none; Phase 2 has one shared detector.
- Target phase: Phase 3
- Owner or required ownership area: current implementor, codemod reviewer
- Dependencies or unblock condition: Phase 2 gate permits Phase 3.
- Planned verification: check/apply equivalence, ambiguity, conflict, and
  idempotency fixtures.
- Status: resolved
- Resolution evidence: Phase 3 attaches safe-edit descriptors to the exact
  shared detector matches consumed by `check`; check/dry-apply equivalence,
  named-registry, ambiguity, conflict, file-quarantine, and idempotency tests
  pass in the complete package suite.

#### P2-L3: Add reviewed deprecation-link metadata

- Classification: required-follow-up
- Discovered in: Phase 2 correctness review of future documentation fields
- Reason: public component/prop docs, changelog, Migration Skill, and
  replacement/removal links require authoritative extraction and ownership.
- Risk if unresolved: future reports remain limited to stable migration
  guidance and cannot provide richer verified navigation.
- Effect on current exit criteria: none; schema v1 completely validates its
  current stable contract without invented metadata.
- Target phase: Phase 4
- Owner or required ownership area: Carbon API/docs owner, current implementor
- Dependencies or unblock condition: authoritative link sources and the Phase 4
  generated-documentation workflow.
- Planned verification: extracted link/anchor validation and schema
  compatibility tests; derive any date from release or Git metadata.
- Status: resolved
- Resolution evidence: catalogue records now carry authoritative local
  changelog and Migration Skill references; validation checks files and
  anchors, schema v1 accepts the optional fields backward-compatibly, actual
  report fixtures pass, and unavailable link types remain absent.

### Deviations from plan

- Added direct dependencies required by the already-approved Phase 0
  jscodeshift/Recast architecture. Final dependency/security/license/performance
  review remains `P0-L3` in Phase 4.

### Estimate changes

None; later estimates remain credible.

### Next action

Generate the Phase 3 prompt from the current plan, ledger, and Phase 2 handoff
in a separate task. It is ready to receive a prompt but none was generated here.

## Phase 3: Safe application

- Plan reference: [Phase 3](./PLAN.md#phase-3-safe-application)
- Status: complete
- Phase-gate outcome: complete-with-deferred-work
- Owner: current project implementor

### Implemented

- Generated and reviewed the Phase 3 prompt from the current shared template,
  plan, ledger, and Phase 2 handoff.
- Added `apply`, `apply-deprecations`, `--dry-run`, and the explicit
  `--allow-dirty` override while preserving Phase 2 selection tracks and exit
  codes.
- Refactored the shared detector to attach exact internal safe-edit evidence to
  supported findings; read-only checks and application use the same matcher.
- Added named StepSequenceItem and DialogFullScreen codemods in one registry.
- Limited edits to `safe` catalogue records and quarantined any file containing
  an ambiguous or unsupported selected finding.
- Added complete pre-write parsing, transformation, reparse/postcondition
  validation, deterministic edit planning, source-drift checks, same-directory
  atomic replacement, and rollback after reported replacement failures.
- Added default dirty-Git-worktree refusal, clean worktree, explicit override,
  dry-run, and non-Git behavior.
- Extended JSON schema v1 backward-compatibly with application commands,
  deterministic change hashes, dry-run state, and change counts.
- Documented opt-in project formatting/verification and retained the rule that
  the CLI never executes customer scripts.
- Added shared-evidence, registry, non-match, ambiguity, conflict,
  file-quarantine, dry-run equivalence, idempotency, dirty-tree, non-Git,
  malformed-source, and failing/interrupted replacement tests.
- Corrected the Phase 3 P1 shared-import failure by grouping DialogFullScreen
  import rewrites by import-declaration identity while still applying one JSX
  edit for every eligible shared-detector match.
- Added named-aliased and default-aliased shared-import regressions covering two
  JSX uses, one import rewrite, alias/comment preservation, dry-run/application
  equivalence, valid transformed source, and repeated-apply idempotency.
- Corrected the Phase 3 P1 symlink-replacement finding by refusing application
  through source-file symbolic links before parsing or writing.
- Added directory-discovered and directly supplied symlink regressions proving
  both the link and its target remain unchanged and the CLI exits with invalid
  input.
- Resolved `P2-L1`.

### Handoff artifacts

- [Phase 3 handoff](./handoffs/PHASE_3.md)
- [Phase 3 prompt](./prompts/PHASE_3.md)
- [Application engine](../packages/carbon-react-migrate/src/application.ts)
- [Application safety tests](../packages/carbon-react-migrate/src/application.test.ts)
- [Shared detector](../packages/carbon-react-migrate/src/detector.ts)
- [CLI](../packages/carbon-react-migrate/src/cli.ts)
- [JSON schema v1](../packages/carbon-react-migrate/schema/report-v1.schema.json)
- [Package guide](../packages/carbon-react-migrate/README.md)

### Verification

#### Phase 3 P1 review finding

- Result: `remain-in-phase`
- Evidence: a supported named aliased `DialogFullScreen` import used by two JSX
  elements produces two detector matches that reference one import specifier.
  The first codemod invocation replaces that specifier; the second invocation
  attempts to replace the stale node and throws
  `TransformationError: Unable to locate DialogFullScreen import`.
- Impact: the supported-safe classification and completion claim are invalid
  until the import is rewritten exactly once, every eligible JSX occurrence is
  updated, regressions pass, and the formal gate is reevaluated.
- Required correction: Phase 3; no deferral or additional phase.
- Reproduction: the first package run after adding the exact regression built
  successfully, ran 39 tests, passed 38, and failed only the named-aliased
  shared-import case with exit 4 and
  `Internal failure: Unable to locate DialogFullScreen import`. The source
  remained unchanged because failure occurred during in-memory planning.
- Correction evidence: a per-file `WeakSet` keyed by shared import declaration
  now gates the import rewrite, while every eligible detector match still adds
  `size="fullscreen"` to its JSX opening element. The exact reproduction and
  default-alias counterpart now complete without `TransformationError`, produce
  parser-valid source, preserve `Full` and the leading comment, contain one
  rewritten import and two fullscreen attributes, and produce no second change.

- `npm run test --prefix packages/carbon-react-migrate` — pass: TypeScript
  build and 39/39 tests. Coverage includes both named codemods, exact
  check/apply evidence equivalence, schema-valid application reports, dry-run
  versus actual proposed changes, repeated apply with zero second change,
  supported named/default shared imports, unsupported-file quarantine,
  multi-specifier conflicts, manual/partial no-edit behavior, Git guards,
  malformed preflight, and rollback after a simulated interruption.
- `npm run validate:catalogue --prefix packages/carbon-react-migrate` — pass:
  validated five records and four boundaries, including registered rule names.
- `npx eslint packages/carbon-react-migrate/src --max-warnings=0` — the first
  full verification run found two style-only errors
  (`prefer-destructuring` and `no-use-before-define`); both were corrected and
  the command reran successfully. The P1 correction verification then found one
  unused registry-context parameter; it was explicitly consumed without
  changing behavior and the full required sequence was rerun successfully.
- `npx prettier --check migration-tooling/prompts/PHASE_3.md
migration-tooling/handoffs/PHASE_3.md
migration-tooling/IMPLEMENTATION_STATUS.md
packages/carbon-react-migrate/README.md
packages/carbon-react-migrate/schema/report-v1.schema.json
packages/carbon-react-migrate/src` — pass.
- `node migration-tooling/scripts/validate-handoff-links.cjs
migration-tooling/handoffs/PHASE_3.md` — pass.
- `git diff --check` — pass.

#### Superseded formal phase gate

- Original outcome: `complete-with-deferred-work`
- Re-evaluation after P1 review: `remain-in-phase`
- Reason: the original 37-test evidence omitted a supported named-aliased
  shared-import case, which failed during planning and invalidated the
  correctness/safety and exit-criterion completion claims below until repaired.

- Reviewer: current project implementor with AI evidence review
- Outcome: `complete-with-deferred-work`

| Check                        | Result | Evidence or reason                                                                                                                                                                                                                  |
| ---------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope                        | pass   | All Phase 3 tasks and `P2-L1` are implemented; no Phase 4 implementation or prompt was added.                                                                                                                                       |
| Deliverable                  | pass   | Safe application, shared detector/edit contract, schema, tests, guide, generated Phase 3 prompt, and complete handoff exist and link durably.                                                                                       |
| Exit criteria                | pass   | Every Phase 3 exit criterion has passing automated evidence below.                                                                                                                                                                  |
| Correctness and safety       | pass   | Only registered safe rules edit; unsupported files are quarantined; all outputs validate before writing; source drift aborts; atomic replacement, rollback, dirty-tree refusal, equivalence, conflicts, and idempotency are tested. |
| Documentation and provenance | pass   | README, schema, prompt, handoff, limitations, decisions, and opt-in verification guidance agree; no upstream source was copied.                                                                                                     |
| Ownership and approvals      | pass   | Implementation/pilot scope remains approved; codemod/API review areas are named; publication, dependency/security, richer-link, support, and pilot approvals remain accepted later-phase work.                                      |
| Leftovers and plan health    | pass   | `P2-L1` is resolved; `P0-L3`, `P0-L7`, and `P2-L3` remain accepted in Phase 4 and `P0-L6` in Phase 6; no blocker or plan revision remains.                                                                                          |
| Repository state             | pass   | Final 37-test suite, catalogue validation, lint, formatting, handoff links, and diff integrity pass; unrelated repository files remain untouched.                                                                                   |

##### Exit-criterion evidence

- Criterion: every transform has non-match and ambiguous fixtures.
  - Result: pass
  - Evidence: `npm run test --prefix packages/carbon-react-migrate`; negative,
    shadowing, prop spread/conflict, Dialog prop/import conflict, and
    unsupported-file tests.
- Criterion: applying a transform twice produces no second diff.
  - Result: pass
  - Evidence: application idempotency test; the second apply returns exit 0
    with an empty `changes` array.
- Criterion: a dry run and actual run report the same proposed file changes.
  - Result: pass
  - Evidence: dry-run/actual test compares the complete deterministic `changes`
    arrays and confirms the dry-run source is unchanged.
- Criterion: a failed transform does not leave partially written files.
  - Result: pass
  - Evidence: all-source preflight test leaves the valid file unchanged after a
    malformed later file; the injected second-file replacement failure restores
    both originals and removes temporary/backup artifacts.
- Criterion: manual migrations remain unchanged and are reported.
  - Result: pass
  - Evidence: Button partial finding produces zero edits; upgrade `apply`
    schema test reports the manual upgrade slice without changes.
- Criterion: version-aware application and the deprecation preset invoke the
  same registered codemods and produce equivalent edits for the same findings.
  - Result: pass
  - Evidence: both commands use `planApplication` and the single exported named
    codemod registry; registry/catalogue equality and check/dry-apply exact
    finding equality pass. The current version-aware slice has no safe record,
    so it correctly invokes no codemod and reports manual/partial work.

##### Blocking or follow-up actions

- Action: refresh production dependency, security, license, Node, size, and
  performance evidence.
  - Owner or ownership area: security/release owner
  - Target phase: Phase 4 (`P0-L3`)
- Action: establish publication ownership and support commitments.
  - Owner or ownership area: tooling/security/release owners
  - Target phase: Phase 4 (`P0-L7`)
- Action: add authoritative extracted deprecation-link metadata.
  - Owner or ownership area: Carbon API/docs owner, current implementor
  - Target phase: Phase 4 (`P2-L3`)
- Action: pilot and decide the public support boundary.
  - Owner or ownership area: product/support/release and pilot reviewers
  - Target phase: Phase 6 (`P0-L6`)

#### Phase 3 P1 symlink review finding

- Result: `remain-in-phase`
- Evidence: a supported source-file symlink discovered during a directory scan
  was treated as a source file. Atomic replacement renamed a temporary regular
  file over the symlink, destroying the link while leaving its target
  unchanged.
- Impact: customer filesystem structure could be changed even though the source
  transformation itself was valid.
- Required correction: Phase 3; no deferral or additional phase.
- Correction evidence: application now rejects both directly supplied and
  directory-discovered source-file symbolic links before parsing or writing,
  rechecks every planned target before replacement, returns exit 2 with an
  actionable message, and leaves the link and target byte-for-byte unchanged.

#### Formal phase gate after P1 corrections

- Reviewer: current project implementor with AI evidence review
- Outcome: `complete-with-deferred-work`

| Check                        | Result | Evidence or reason                                                                                                                                                                                                                                                                                     |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Scope                        | pass   | The P1 defect was corrected in Phase 3 without broadening detection; no Phase 4 implementation or prompt was added.                                                                                                                                                                                    |
| Deliverable                  | pass   | Safe application, corrected shared-import planning, explicit symlink refusal, shared detector/edit contract, schema, 42-test suite, guide, prompt, and updated handoff exist and link durably.                                                                                                         |
| Exit criteria                | pass   | Every Phase 3 exit criterion was reevaluated with the exact P1 reproduction and passing automated evidence below.                                                                                                                                                                                      |
| Correctness and safety       | pass   | Each supported shared import rewrites once, source-file symlinks are rejected unchanged, genuine duplicate/conflict checks remain, unsupported files remain quarantined, and preflight, postconditions, drift checks, atomic replacement, rollback, Git protection, equivalence, and idempotency pass. |
| Documentation and provenance | pass   | Status and handoff record the P1 failure, correction, limitations, exact commands, and corrected counts; README/schema remain compatible; no upstream source was copied.                                                                                                                               |
| Ownership and approvals      | pass   | Implementation/pilot scope remains approved; codemod/API review areas are named; publication, dependency/security, richer-link, support, and pilot approvals remain accepted later-phase work.                                                                                                         |
| Leftovers and plan health    | pass   | Both P1 findings are resolved in Phase 3; `P2-L1` remains resolved; accepted Phase 4/5 leftovers are unchanged; no blocker, new phase, deferral, or plan revision is required.                                                                                                                         |
| Repository state             | pass   | Final 42-test suite, catalogue validation, lint, exact formatting check, 12 handoff links, and `git diff --check` pass; unrelated repository files remain untouched.                                                                                                                                   |

##### Exit-criterion evidence

- Criterion: every transform has non-match and ambiguous fixtures.
  - Result: pass
  - Evidence: the 42-test suite covers negative/shadowed inputs, prop conflicts,
    multi-specifier imports, unsupported-file quarantine, and both supported
    shared-import forms.
- Criterion: applying a transform twice produces no second diff.
  - Result: pass
  - Evidence: StepSequenceItem and both named/default shared Dialog imports
    return exit 0 with empty `changes` arrays on repeated application.
- Criterion: a dry run and actual run report the same proposed file changes.
  - Result: pass
  - Evidence: existing and both P1 regression paths compare complete
    deterministic `changes` arrays.
- Criterion: a failed transform does not leave partially written files.
  - Result: pass
  - Evidence: malformed planning leaves valid source unchanged; source drift
    aborts; injected replacement failure restores both originals and removes
    temporary/backup artifacts.
- Criterion: manual migrations remain unchanged and are reported.
  - Result: pass
  - Evidence: Button partial findings and manual upgrade records continue to
    report with zero edits.
- Criterion: version-aware application and the deprecation preset invoke the
  same registered codemods and produce equivalent edits for the same findings.
  - Result: pass
  - Evidence: both commands still use `planApplication` and one registry;
    registry/catalogue equality and check/dry-apply finding equality pass. The
    required-upgrade slice still contains no safe record.

##### Blocking or follow-up actions

- The accepted `P0-L3`, `P0-L7`, and `P2-L3` Phase 4 follow-ups and `P0-L6`
  Phase 6 follow-up are unchanged. None blocks the corrected Phase 3
  deliverable or Phase 4 prerequisites.

### Decisions

- `P3-D1`: attach internal safe-edit descriptors to exact shared detector
  matches and dispatch them through one named codemod registry.
- `P3-D2`: quarantine an entire file from edits when that selected track has an
  unsupported or ambiguous finding.
- `P3-D3`: refuse all writes in a dirty Git worktree by default; expose only
  `--allow-dirty` as the explicit override; keep dry-run read-only.
- `P3-D4`: extend JSON schema v1 backward-compatibly for application commands
  and fields while retaining all existing read-only contracts.
- `P3-D5`: rewrite a supported DialogFullScreen import once per shared AST
  declaration identity while applying the JSX attribute edit once per exact
  detector match. This preserves aliasing and supported scope and prevents
  stale-specifier reuse.
- `P3-D6`: refuse application through source-file symbolic links with exit 2
  rather than following or replacing them. Read-only Phase 2 behavior is not
  broadened, and customer links and targets remain unchanged.

### Leftovers

- `P2-L1` is resolved. No new Phase 3 leftover remains.

### Deviations from plan

- None. Implementation evidence did not require Controlled plan evolution.

### Estimate changes

- None; later-phase estimates remain credible.

### Next action

- Generate the Phase 4 prompt from the current repository and Phase 3 handoff in
  a separate task. Phase 4 may begin, but was not generated or implemented here.

## Phase 4: Maintainer workflow and CI

- Plan reference: [Phase 4](./PLAN.md#phase-4-maintainer-workflow-and-ci)
- Status: complete
- Phase-gate outcome: `complete-with-deferred-work`
- Owner: current project implementor

### Implemented

- Added root `generate:migration-register` and read-only
  `validate:migrations` contracts and prepared a commented pull-request CI entry
  point for later activation by repository CI owners.
- Added deterministic catalogue-derived register generation, stale-output
  validation, documentation/changelog/skill anchor checks, bidirectional rule
  registration checks, schema and transform-fixture presence checks, provenance
  checks, and locked-production-dependency checks.
- Added hash-bound reviewed exemptions and enforcement for public
  `@deprecated` annotations, production `Logger.deprecate(...)` calls, and
  explicit `migration-breaking-change` markers. New markers use
  `migration-id: <catalogue-id>`; ordinary wording, `__internal__`
  implementation source, and test/story/Playwright files are excluded.
- Added safe/manual authoring documentation, ownership and dependency/license
  review rules, provenance/notices, richer backward-compatible schema v1
  metadata, and adversarial tests.
- Corrected the Phase 4 P1 review findings by validating exemptions
  unconditionally, rejecting stale/unused or non-exact scopes, narrowing marker
  extraction to explicit conventions, and binding provenance/notices to
  declared and root-lock-resolved dependency evidence.

### Handoff artifacts

- [Phase 4 handoff](./handoffs/PHASE_4.md)
- [Generated migration register](./generated/MIGRATION_REGISTER.md)
- [Maintainer workflow](./MAINTAINER_WORKFLOW.md)
- [Phase 4 evidence](./PHASE_4_EVIDENCE.md)

### Verification

Commands run:

- `node migration-tooling/scripts/validate-handoff-links.cjs migration-tooling/handoffs/PHASE_3.md`
  passed (12 links), confirming the Phase 3 prerequisite.
- `npm run generate:migration-register` passed (5 records); a second generation
  produced no diff.
- `npm run validate:migrations` passed: maintainer validation scanned 320
  explicit markers across 1,637 source files and the package suite passed
  51/51.
- `.github/workflows/ci.yml` contains the reviewed CI-ready invocation of the
  same root `npm run validate:migrations` contract; it remains commented because
  the current implementor cannot change CI.
- Local validation changed no tracked migration artifacts.
- `npm audit --omit=dev --offline --json` reported zero known production
  vulnerabilities, subject to the offline-data limitation.
- `npm ls jscodeshift semver recast --all --prefix packages/carbon-react-migrate`
  and package metadata/license/engine review passed.
- Relevant ESLint, Prettier, handoff links, read-only state comparison,
  generated-output determinism, and `git diff --check` passed.

Failures encountered and corrected: initial generation failed because the
generated directory did not exist; generation now creates it. Review then
exposed ordinary-word false positives, malformed exemptions bypassing
validation when no unreferenced markers remained, and stale provenance passing
existence-only checks. Explicit marker conventions, unconditional exact-scope
exemption validation, and machine-bound dependency evidence resolve those
findings with regressions.

#### Phase 4 P1 review findings

- Result: `remain-in-phase`
- Findings: ordinary deprecation wording was treated as a public marker;
  malformed exemptions could pass when no unreferenced marker existed; and
  provenance validation checked file existence without binding recorded
  dependency versions or licenses to package metadata and the root lockfile.
- Correction evidence: targeted reproductions now pass, invalid/stale/unused
  exemptions fail independently, explicit annotation/runtime/breaking markers
  remain enforced, and stale provenance or empty notices fail automated tests.

#### Formal phase gate after CI ownership clarification

- Reviewer: current implementor with AI evidence review
- Outcome: `complete-with-deferred-work`

| Check                        | Result                                      | Evidence or reason                                                                                                                                                                       |
| ---------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope                        | pass                                        | Phase 4 maintainer workflow only; no later-phase prompt or implementation.                                                                                                               |
| Deliverable                  | pass                                        | The read-only local command is active and a reviewed CI-ready entry point invokes the same root contract without regeneration.                                                           |
| Exit criteria                | pass                                        | Adversarial tests prove stale records, broken anchors, and unregistered public changes fail deterministic local validation; the guide covers safe and manual migrations.                 |
| Correctness and safety       | pass                                        | Validation is deterministic and read-only; ordinary wording/test files avoid false positives; exemptions always validate; Phase 1–3 interfaces and application safeguards remain intact. |
| Documentation and provenance | pass                                        | Generated register, maintainer guide, authoritative local links, machine-bound dependency evidence, notice disposition, and honest limitations are present.                              |
| Ownership and approvals      | pass with deferred publication prerequisite | Implementation ownership is recorded; accountable organizational owners remain unconfirmed and no publication approval is claimed.                                                       |
| Leftovers and plan health    | pass with deferred work                     | `P4-L1` is accepted Phase 6 CI-owner work; P0-L3/P2-L3 are resolved, while P0-L7 and P0-L6 remain assigned to the Phase 6 release decision.                                              |
| Repository state             | pass                                        | Relevant tests/lint/format, generated checks, links, read-only comparison, and diff check pass; unrelated prompt artifact preserved and included.                                        |

##### Exit-criterion evidence

- Criterion: stale record or broken anchor fails local validation.
  - Result: pass
  - Evidence: catalogue/reference validation and adversarial tests pass
    locally; the CI-ready invocation uses the identical command.
- Criterion: new deprecation without record or exemption fails local
  validation.
  - Result: pass
  - Evidence: marker enforcement adversarial tests pass locally, including
    intentional breaking-change markers.
- Criterion: guide covers one safe and one manual migration.
  - Result: pass
  - Evidence: `migration-tooling/MAINTAINER_WORKFLOW.md`.

##### Blocking or follow-up actions

- Action: obtain CI-owner approval, activate the prepared
  `npm run validate:migrations` step, and record a passing PR result before
  release.
  - Owner or ownership area: CI/review and release owners
  - Target phase: Phase 6 (`P4-L1`)
- Action: assign accountable security/license, release publication, and support owners and obtain required approvals before publication.
  - Owner or ownership area: tooling/security/release/support
  - Target phase: Phase 6 (`P0-L7`)
- Action: conduct the pilot and make the public baseline/support decision.
  - Owner or ownership area: product/support/release and pilot reviewers
  - Target phase: Phase 6 (`P0-L6`)

### Decisions

- `P4-D1`: keep schema v1 and add only backward-compatible optional changelog
  and Migration Skill links sourced from repository files.
- `P4-D2`: bind the legacy marker exemption to a normalized inventory digest;
  require exact digest-bound scope, reject stale/unused exemptions, and have
  new explicit markers reference catalogue IDs directly.
- `P4-D3`: keep register generation explicit while validation compares expected
  content in memory and never rewrites it.
- `P4-D4`: recognize only public `@deprecated`, production
  `Logger.deprecate(...)`, and explicit `migration-breaking-change` markers;
  machine-bind dependency provenance to package declarations and root-lock
  versions/licenses.

### Leftovers

- `P4-L1`: activate migration validation in pull-request CI.
  - Classification: required-follow-up
  - Reason: the current implementor cannot change repository CI; the exact
    entry point is prepared and reviewed but remains commented.
  - Risk: migration maintenance remains dependent on developers running local
    validation until CI owners activate enforcement.
  - Effect on exit criteria: none for the Phase 4 POC; blocks release readiness
    if still unresolved.
  - Target phase: Phase 6
  - Owner or ownership area: CI/review and release owners
  - Dependencies or unblock condition: CI-owner authorization.
  - Planned verification: activate the step and record the passing PR check for
    `Validate deterministic migration tooling`.
  - Status: open
  - Resolution evidence: not applicable; unresolved.
- `P0-L3` resolved by `PHASE_4_EVIDENCE.md`, with explicit limitations and no
  invented security approval.
- `P2-L3` resolved by authoritative local changelog/skill metadata and
  backward-compatible schema fixtures.
- `P0-L7` implementation/provenance evidence is complete; accountable
  publication/support ownership remains open for Phase 6 because repository
  evidence cannot name it.
- `P0-L6` remains open for Phase 6. Phase 4 confirms that `159.0.0 → 161.7.0`
  is still implementation/pilot scope only.

### Deviations from plan

None recorded.

### Estimate changes

None recorded.

### Next action

Start Phase 5 from the current plan and prompt. Keep `P4-L1` visible as required
Phase 6 release-readiness work.

## Phase 5: Migration discovery and catalogue backfill

- Plan reference:
  [Phase 5](./PLAN.md#phase-5-migration-discovery-and-catalogue-backfill)
- Status: not-started
- Phase-gate outcome: not evaluated
- Owner: current project implementor with Carbon API and release reviewers

### Implemented

None recorded.

### Handoff artifacts

None recorded.

### Verification

None recorded.

### Decisions

None recorded.

### Leftovers

None recorded.

### Deviations from plan

None recorded.

### Estimate changes

None recorded.

### Next action

Wait for the Phase 4 gate to pass. Use the Phase 5 prompt only after `P4-L1` is
resolved.

## Phase 6: Pilot and release decision

- Plan reference: [Phase 6](./PLAN.md#phase-6-pilot-and-release-decision)
- Status: not-started
- Phase-gate outcome: not evaluated
- Owner: current project implementor with product/support/release and pilot
  reviewers

### Implemented

None recorded.

### Handoff artifacts

None recorded.

### Verification

None recorded.

### Decisions

None recorded.

### Leftovers

- Accept `P0-L6` and the narrowed `P0-L7` as required Phase 6 work.

### Deviations from plan

None recorded.

### Estimate changes

None recorded.

### Next action

Wait for Phase 5 to complete its formal gate and provide reviewed catalogue and
coverage evidence.

## Additional or remediation phases

None recorded.

## Cross-phase requirements

- Keep required-upgrade and optional-deprecation tracks separate.
- Complete deterministic discovery and reviewed catalogue backfill in Phase 5
  before the Phase 6 pilot and release decision.

## Cross-phase leftovers

- `P0-L2` → resolved in Phase 1.
- `P0-L3` → resolved in Phase 4.
- `P0-L6` and the narrowed `P0-L7` → Phase 6.
- `P2-L1` → resolved in Phase 3.
- `P2-L2` → resolved in Phase 2.
- `P2-L3` → resolved in Phase 4.
