# Phase <number> handoff: <phase name>

- Phase:
- Status:
- Formal gate outcome:
- Completed:
- Implementation owner:
- Reviewers and approvals:
- Plan reference:
- Status reference:

## Outcome

State the usable result of the phase in concrete terms. Describe what the next
phase can rely on.

## Delivered artifacts

| Artifact | Purpose | Stability | Owner |
| --- | --- | --- | --- |
|  |  | draft \| internal \| public \| generated |  |

Use repository-relative links. Include implementation, schemas, decision
records, generated output, fixtures, documentation, and provenance records
required by the phase.

## Interfaces and contracts

Document interfaces the next phase may consume:

- Exported APIs and types.
- Commands and exit codes.
- Schemas and their versions.
- File formats and generated artifacts.
- Ordering and applicability rules.
- Error and failure behavior.

Use `not-applicable` with a reason when the phase produces no interface.

## Decisions

Reference stable decision IDs from `IMPLEMENTATION_STATUS.md`.

- None, or:
  - Decision ID:
  - Outcome:
  - Consequence for later phases:

## Controlled plan changes

Reference stable `PLAN-<number>` records.

- None, or:
  - Change ID:
  - Status:
  - Affected phases:

## Verification evidence

| Requirement or exit criterion | Result | Command, review, or evidence |
| --- | --- | --- |
|  | pass \| fail \| blocked \| not-applicable |  |

Include the formal phase-gate record by reference. Do not replace exact
verification evidence with a summary.

## Supported scope

State exactly what is supported after this phase.

## Unsupported scope and limitations

State what is unsupported, ambiguous, manual, deferred, or intentionally
unverified. Avoid claims of complete migration coverage.

## Open leftovers

Reference every open leftover by its stable ID.

| ID | Classification | Risk | Target phase | Owner or ownership area |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

Write `None` only when the status ledger has no applicable open leftovers.

## Prerequisites for the next phase

List everything that must be true before the next phase begins.

- None, or:
  - Prerequisite:
  - Evidence:

## Recommended next action

State one concrete next action. If the next phase is not ready, state the
blocking or remediation action instead.

## Files to read first

List the smallest set of repository files the next implementation task must read
after the plan, phase gates, and status ledger.

- `<path>` — <reason>

## Handoff integrity

- [ ] All links resolve.
- [ ] Delivered artifacts exist.
- [ ] Status and gate outcome match `IMPLEMENTATION_STATUS.md`.
- [ ] Decisions, plan changes, and leftovers use stable IDs.
- [ ] Verification evidence is reproducible.
- [ ] Unsupported scope and risks are explicit.
- [ ] Required approvals are recorded and not inferred.
- [ ] The next phase can proceed without relying on chat history.

