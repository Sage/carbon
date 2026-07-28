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

- Record every change with a stable `PLAN-<number>` ID.
- Keep rejected and superseded change records only when they remain relevant to
  the active implementation; detailed obsolete comparison material belongs in
  Git history.
- Do not weaken exit criteria or move required work merely to complete a phase.
- Re-run gates whose evidence or completion claim changes.
- Generate later prompts only from the approved current plan and handoff.

## Overall status

- Current phase: Phase 1
- Overall status: in-progress
- Last completed phase: Phase 0
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

| Check | Result | Evidence or reason |
| --- | --- | --- |
| Scope | pass | Candidate path, two tracks, tools, provenance, ownership boundaries, and limitations are defined. |
| Deliverable | pass | Decision record, prototypes, results, status, and handoff are durable and linked. |
| Exit criteria | pass | Required boundaries, optional applicability, deterministic subsets, guidance scope, parser coverage, and provenance are evidenced. |
| Correctness and safety | pass | Optional cleanup is limited to tested conflict-free subsets; ambiguity remains unchanged and is reported. |
| Documentation and provenance | pass | Guidance, limitations, upstream references, licenses, and no-copy decisions are recorded. |
| Ownership and approvals | pass | Implementation and pilot scope is approved; publication, support, and release remain assigned to later phases. |
| Leftovers and plan health | pass | No blocker remains; all required follow-ups have accepted target phases. |
| Repository state | pass | Relevant prototype, JSON, link, and diff validations pass. |

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
- Status: open
- Resolution evidence: not-applicable; unresolved.

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
- Status: open
- Resolution evidence: not-applicable; unresolved.

#### P0-L6: Pilot validation and public support decision

- Classification: required-follow-up
- Discovered in: implementation and pilot approval boundary
- Reason: `159.0.0` is approved for implementation and pilot, not public
  support.
- Risk if unresolved: customers could receive an unvalidated support promise.
- Effect on current exit criteria: none.
- Target phase: Phase 5
- Owner or required ownership area: current implementor, product/support/release
  and pilot reviewers
- Dependencies or unblock condition: implementation, CI, documentation, and a
  representative pilot are complete.
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
- Target phase: Phase 4
- Owner or required ownership area: current implementor, tooling/security/release
  owner
- Dependencies or unblock condition: production package structure and
  dependency evidence exist.
- Planned verification: ownership, security, provenance, publication, and
  support review.
- Status: open
- Resolution evidence: not-applicable; unresolved.

### Deviations from plan

- Prototype dependencies were kept outside production package configuration.

#### PLAN-001: Candidate baseline and two-track catalogue

- Classification: material-revision
- Status: approved
- Trigger and evidence: the candidate path contains required manual work and
  useful deterministic deprecation cleanup with different applicability
  semantics.
- Existing plan assumption: one migration set represented both upgrade work and
  deterministic examples.
- Approved change: retain `159.0.0` as the implementation/pilot baseline;
  require reliable `requiredBy` for upgrade records; use a separate optional
  cleanup track with `deprecatedIn`; never substitute the fields.
- Affected phases: all phases.
- Customer effect: upgrade commands list required work; deprecation commands
  list optional cleanup.
- Safety impact: prevents optional cleanup from being misrepresented as
  mandatory work.
- Ownership boundary: implementation and pilot approved; publication, public
  support, and release remain later decisions.
- Estimate impact: Phase 0 and Phase 1 include additional two-track work.
- Required verification: plan, decisions, handoff, catalogue schema, CLI output,
  fixtures, and pilot preserve track separation.
- Decision: approved.

### Estimate changes

- Phase 1 includes additional work for two catalogue tracks and reporting
  semantics.

### Next action

Generate the Phase 1 prompt from the current plan, this status, the Phase 0
handoff, and the shared prompt template. Do not begin Phase 1 until that prompt
is reviewed.

## Phase 1: Catalogue and validation

- Plan reference: [Phase 1](./PLAN.md#phase-1-catalogue-and-validation)
- Status: not-started
- Phase-gate outcome: not evaluated
- Owner: current project implementor

### Implemented

None recorded.

### Handoff artifacts

None recorded.

### Verification

None recorded.

### Decisions

None recorded.

### Leftovers

- Accept `P0-L2` as required Phase 1 work.

### Deviations from plan

None recorded.

### Estimate changes

None recorded.

### Next action

Generate and review the Phase 1 prompt.

## Phase 2: Read-only CLI and deprecation diagnosis

- Plan reference: [Phase 2](./PLAN.md#phase-2-read-only-cli-and-deprecation-diagnosis)
- Status: not-started
- Phase-gate outcome: not evaluated
- Owner: current project implementor

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

None recorded.

## Phase 3: Safe application

- Plan reference: [Phase 3](./PLAN.md#phase-3-safe-application)
- Status: not-started
- Phase-gate outcome: not evaluated
- Owner: current project implementor

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

None recorded.

## Phase 4: Maintainer workflow and CI

- Plan reference: [Phase 4](./PLAN.md#phase-4-maintainer-workflow-and-ci)
- Status: not-started
- Phase-gate outcome: not evaluated
- Owner: current project implementor

### Implemented

None recorded.

### Handoff artifacts

None recorded.

### Verification

None recorded.

### Decisions

None recorded.

### Leftovers

- Accept `P0-L3` and `P0-L7` as required Phase 4 work.

### Deviations from plan

None recorded.

### Estimate changes

None recorded.

### Next action

None recorded.

## Phase 5: Pilot and release decision

- Plan reference: [Phase 5](./PLAN.md#phase-5-pilot-and-release-decision)
- Status: not-started
- Phase-gate outcome: not evaluated
- Owner: current project implementor

### Implemented

None recorded.

### Handoff artifacts

None recorded.

### Verification

None recorded.

### Decisions

None recorded.

### Leftovers

- Accept `P0-L6` as required Phase 5 work.

### Deviations from plan

None recorded.

### Estimate changes

None recorded.

### Next action

None recorded.

## Additional or remediation phases

None recorded.

## Cross-phase decisions

- `PLAN-001` applies to all phases: preserve separate required-upgrade and
  optional-deprecation tracks.

## Cross-phase leftovers

- `P0-L2` → Phase 1.
- `P0-L3` and `P0-L7` → Phase 4.
- `P0-L6` → Phase 5.
