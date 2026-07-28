# Carbon migration tooling formal phase gates

This document defines the mandatory review between implementation phases.

The gate is performed after phase work and verification are finished, but before
the next phase begins or its detailed prompt is generated.

An AI implementation agent may prepare and execute the evidence-based gate
review. It may mark a gate complete only from repository evidence and successful
verification. It must not invent product approval, ownership, compliance
approval, customer evidence, or test results.

When a gate requires an accountable human or organizational decision, the agent
must record the missing approval and use the `blocked`,
`remediation-phase-required`, or `plan-revision-required` outcome as
appropriate.

## Gate inputs

Every phase gate must review:

1. The complete `migration-tooling/PLAN.md`.
2. The applicable phase tasks, deliverable, exit criteria, estimates, and
   ownership requirements.
3. `migration-tooling/IMPLEMENTATION_STATUS.md`.
4. All files changed or created by the phase.
5. Verification commands and their actual results.
6. Decisions, leftovers, deviations, risks, and estimate changes.
7. Relevant requirements and artifacts from preceding phases.
8. The current Git diff and working-tree state.

Chat summaries and claims without durable repository or command evidence are not
sufficient gate evidence.

## Mandatory gate checks

The reviewer must answer every check with `pass`, `fail`, `blocked`, or
`not-applicable`, with evidence or a reason.

### Scope

- Were all required phase tasks completed?
- Was out-of-scope work avoided or recorded as a deviation?
- Were earlier-phase defects fixed or recorded when they affected this phase?

### Deliverable

- Does the required phase deliverable exist?
- Is it complete enough for the next phase to consume without relying on chat
  history?
- Are public interfaces and generated artifacts documented?
- Does the phase handoff exist under `migration-tooling/handoffs/` and follow
  `HANDOFF_TEMPLATE.md`?
- Do all handoff links and delivered artifacts resolve?
- Does the handoff agree with the plan, status ledger, verification evidence,
  leftovers, approvals, and proposed gate outcome?

### Exit criteria

- Is every exit criterion from `PLAN.md` listed individually?
- Does every criterion have reproducible evidence?
- Did every required check actually run successfully?

### Correctness and safety

- Are deterministic behavior and stable ordering tested where applicable?
- Are unsupported or ambiguous cases left unchanged and reported?
- Are negative, failure, and idempotency cases covered where applicable?
- Could a failure leave customer or repository files partially modified?
- Were unverified claims of migration completeness avoided?

### Documentation and provenance

- Are customer and maintainer documents aligned with the implementation?
- Are open-source provenance, licenses, notices, and attribution current?
- Are decisions and limitations recorded durably?

### Ownership and approvals

- Are required ownership areas identified?
- Were required product, API, design, accessibility, release, security, or
  compliance reviews obtained?
- If an approval cannot be supplied by the implementation agent, is it recorded
  as an explicit blocker or required follow-up?

### Leftovers and plan health

- Does every leftover follow the complete rules and record format in
  `IMPLEMENTATION_STATUS.md`?
- Is every leftover classified with a stable ID, reason, risk, effect on exit
  criteria, target phase, owner or ownership area, unblock condition, planned
  verification, and status?
- Does any leftover invalidate the current phase's exit criteria?
- Were all existing open leftovers reassessed and correctly promoted, resolved,
  rejected, or carried into an accepted target phase?
- Did implementation invalidate an assumption in the plan?
- Does every plan change follow the Controlled plan evolution protocol, use a
  stable change ID, and have the required evidence and approval?
- Did any clarification, minor adjustment, or material revision affect an
  earlier gate or completion claim that must be reviewed again?
- Is a remediation or additional phase required?
- Are estimates for later phases still credible?

### Repository state

- Does `git diff --check` pass?
- Were relevant tests, type checks, lint checks, and generated-output checks
  completed?
- Are unrelated user changes preserved?
- Is the phase status ledger accurate?

## Gate outcomes

Select exactly one:

### `complete-and-proceed`

Use only when:

- every required task, deliverable, and exit criterion passes;
- no blocker remains;
- required approvals are present;
- leftovers do not alter required scope or correctness;
- the phase handoff exists and passes its integrity checklist;
- the next phase's prerequisites are satisfied.

The current phase status becomes `complete`. A prompt for the next phase may now
be generated from the current repository state.

### `complete-with-deferred-work`

Use only when:

- every required task, deliverable, and exit criterion passes;
- remaining work is optional or explicitly deferred;
- the phase handoff exists and passes its integrity checklist;
- each deferred item is recorded and does not affect correctness or the next
  phase's prerequisites.

The current phase status becomes `complete`. The next phase may proceed.

### `remain-in-phase`

Use when required work or verification remains and still belongs naturally to
the current phase.

The current phase status remains `in-progress`. Do not generate or start the next
phase.

### `remediation-phase-required`

Use when newly discovered work:

- affects multiple later phases,
- changes architecture or a public interface,
- is necessary for safety,
- requires separate ownership or review,
- or is expected to exceed two working days.

Record the proposed intermediate phase, dependencies, exit criteria, ownership,
and estimate. Do not start it until `PLAN.md` and the status ledger describe it.

### `blocked`

Use when work cannot proceed without external evidence, access, approval,
ownership, or a product/design/compliance decision.

Record the exact blocking condition, required decision-maker or ownership area,
and the action that would unblock work. Do not mark the phase complete.

### `plan-revision-required`

Use when implementation evidence invalidates assumptions, architecture, scope,
sequencing, or estimates in `PLAN.md`.

Record the conflicting evidence and proposed changes. Revise and review the plan
using the Controlled plan evolution protocol before continuing implementation.

## Gate record

Record the gate under the applicable phase's `### Verification` section in
`IMPLEMENTATION_STATUS.md` using this structure:

```md
#### Formal phase gate

- Reviewer:
- Outcome:

| Check | Result | Evidence or reason |
| --- | --- | --- |
| Scope |  |  |
| Deliverable |  |  |
| Exit criteria |  |  |
| Correctness and safety |  |  |
| Documentation and provenance |  |  |
| Ownership and approvals |  |  |
| Leftovers and plan health |  |  |
| Repository state |  |  |

##### Exit-criterion evidence

- Criterion:
  - Result:
  - Evidence:

##### Blocking or follow-up actions

- None, or:
  - Action:
  - Owner or ownership area:
  - Target phase:
```

The phase's top-level status, gate outcome, leftovers, estimate
changes, and next action must agree with this record.

## Prompt-generation gate

Generate the detailed prompt for the next phase only after:

1. The current gate outcome is `complete-and-proceed` or
   `complete-with-deferred-work`.
2. The status ledger has been updated.
3. The completed phase handoff exists and passes its integrity checklist.
4. Any approved plan changes have been applied.
5. The next phase's prerequisites have been confirmed.

Generate the prompt from the template, current repository state, and completed
handoff. Do not copy stale assumptions from earlier conversations.
