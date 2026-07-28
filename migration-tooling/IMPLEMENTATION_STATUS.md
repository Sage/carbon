# Carbon migration tooling implementation status

This document is the persistent source of truth for implementation progress,
verification, decisions, deviations, and remaining work.

The implementation requirements, tasks, deliverables, exit criteria, and
estimates remain in [PLAN.md](./PLAN.md). This ledger references those phases
instead of duplicating their contents.

Every phase transition must follow
[PHASE_GATES.md](./PHASE_GATES.md). Record the completed formal gate under the
applicable phase's `### Verification` section.

Update this file at the end of every implementation session and before moving to
another phase. Do not mark a phase complete merely because code exists; all
required exit criteria in `PLAN.md` must be verified.

## Status values

- `not-started`: implementation has not begun.
- `in-progress`: implementation or investigation is active.
- `review`: implementation is ready for phase-gate review.
- `complete`: every required exit criterion has passed.
- `blocked`: progress requires an external decision, evidence, owner, approval,
  or compliance review.

## Rules for leftovers

A leftover is any discovered, incomplete, unsupported, unverified, or intentionally
postponed item that remains when reporting phase status.

Do not hide leftovers in prose, verification logs, code comments, or chat
history. Record each item under the applicable phase's `### Leftovers` section.
Use `## Cross-phase leftovers` only when an item genuinely affects more than one
phase.

### Required fields

Record every leftover using this structure:

```md
#### <Stable short ID>: <Description>

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

Use a stable ID such as `P0-L1`. Refer to that ID from decisions, deviations,
gate records, later phases, issues, and pull requests.

Do not leave required fields blank. Use `not-applicable` with a reason when a
field does not apply.

### Classifications

#### `blocker`

Use when the item:

- prevents a current task, deliverable, or exit criterion from passing;
- creates a correctness, destructive-edit, security, licensing, or compliance
  risk;
- leaves a required decision or approval unresolved;
- or prevents the next phase from safely consuming the current deliverable.

A phase with an open blocker cannot be `complete`. Its gate outcome must be
`remain-in-phase`, `remediation-phase-required`, `blocked`, or
`plan-revision-required`.

#### `required-follow-up`

Use when the current phase can satisfy all of its exit criteria, but the item is
required by an explicitly named later phase.

The target phase, owner or ownership area, acceptance condition, and planned
verification are mandatory. A vague future target such as "later" is not valid.

At the beginning of the target phase, move or reference the item in that phase's
status and make it part of the phase's required work. If it is not accepted by a
specific phase, reclassify it as a blocker or create a remediation phase.

#### `optional`

Use when omitting the item does not affect correctness, safety, supported scope,
exit criteria, or the next phase.

Optional work must not silently become required implementation. Promote it to
`required-follow-up` or `blocker` with a recorded reason when new evidence
changes its importance.

#### `deferred`

Use only when the item is explicitly outside the MVP or has an approved later
milestone.

Record the plan section or decision that permits deferral. A required exit
criterion cannot be classified as deferred without first revising the plan.

#### `rejected`

Use when the team intentionally decides not to implement the item.

Record the decision, alternatives considered, reason, and any resulting
limitation. Set the leftover status to `rejected`; do not delete its history.

### Recording and lifecycle rules

- Record a leftover as soon as it is discovered.
- One leftover should describe one independently resolvable outcome.
- Do not combine blockers with optional improvements.
- Do not duplicate an item across phases; reference its stable ID.
- A required item must have a target phase or become a blocker.
- A leftover cannot be closed merely because code changed. Record verification
  and durable resolution evidence.
- When resolving an item, keep the original record, set status to `resolved`,
  add resolution evidence, and update affected gate records.
- Reassess all open leftovers at every phase gate.
- Reassess cross-phase leftovers whenever the plan, architecture, supported
  scope, or estimates change.
- Promote a leftover when new evidence increases its risk; record the reason as
  a decision or deviation.
- If a leftover affects multiple later phases, changes architecture or a public
  interface, is required for safety, needs separate ownership/review, or exceeds
  two working days, propose a remediation phase.

### Completion rules

A phase may use:

- `complete-and-proceed` only when no open blocker remains and all required
  follow-ups have an accepted target phase and owner or ownership area;
- `complete-with-deferred-work` only when all open items are valid `optional`,
  `deferred`, `rejected`, or accepted `required-follow-up` items that do not
  affect current exit criteria;
- no complete outcome when a leftover invalidates a deliverable, exit criterion,
  required approval, safety property, or next-phase prerequisite.

## Phase-gate outcomes

At the end of each phase, record exactly one outcome:

- `complete-and-proceed`
- `complete-with-deferred-work`
- `remain-in-phase`
- `remediation-phase-required`
- `blocked`
- `plan-revision-required`

Do not begin the next phase automatically. Review the repository evidence and
complete the formal gate first.

## Plan evolution rules

Follow the canonical
[Controlled plan evolution](./PLAN.md#controlled-plan-evolution) protocol.

- Record every change with a stable `PLAN-<number>` ID.
- Keep rejected and superseded change records.
- Do not weaken exit criteria or move required work merely to complete a phase.
- Re-run gates whose evidence or completion claim is affected.
- Do not generate later prompts until material revisions are approved and all
  affected files are updated.

## Overall status

- Current phase: Phase 0
- Overall status: not-started
- Current phase-gate outcome: not evaluated
- Last updated: not started
- Updated by: not assigned

## Phase 0: Select the vertical slice

- Plan reference: [Phase 0: Select the vertical slice](./PLAN.md#phase-0-select-the-vertical-slice)
- Status: not-started
- Phase-gate outcome: not evaluated
- Started:
- Completed:
- Owner:

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

## Phase 1: Catalogue and validation

- Plan reference: [Phase 1: Catalogue and validation](./PLAN.md#phase-1-catalogue-and-validation)
- Status: not-started
- Phase-gate outcome: not evaluated
- Started:
- Completed:
- Owner:

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

## Phase 2: Read-only CLI and deprecation diagnosis

- Plan reference: [Phase 2: Read-only CLI and deprecation diagnosis](./PLAN.md#phase-2-read-only-cli-and-deprecation-diagnosis)
- Status: not-started
- Phase-gate outcome: not evaluated
- Started:
- Completed:
- Owner:

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

- Plan reference: [Phase 3: Safe application](./PLAN.md#phase-3-safe-application)
- Status: not-started
- Phase-gate outcome: not evaluated
- Started:
- Completed:
- Owner:

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

- Plan reference: [Phase 4: Maintainer workflow and CI](./PLAN.md#phase-4-maintainer-workflow-and-ci)
- Status: not-started
- Phase-gate outcome: not evaluated
- Started:
- Completed:
- Owner:

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

## Phase 5: Pilot and release decision

- Plan reference: [Phase 5: Pilot and release decision](./PLAN.md#phase-5-pilot-and-release-decision)
- Status: not-started
- Phase-gate outcome: not evaluated
- Started:
- Completed:
- Owner:

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

## Additional or remediation phases

Add new phases here only after recording why the existing phase structure is
insufficient.

None recorded.

## Cross-phase decisions

None recorded.

## Cross-phase leftovers

None recorded.
