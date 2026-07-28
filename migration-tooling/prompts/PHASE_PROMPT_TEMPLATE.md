# Carbon migration tooling phase prompt template

Copy this prompt into a new implementation task and replace every value in
`<angle brackets>`.

Do not prepare detailed prompts for later phases until the preceding phase gate
has been reviewed. The repository, plan, estimates, and prerequisites may change
during implementation.

---

You are implementing **<phase number and name>** of Carbon's deterministic
migration tooling.

Work in the Carbon repository. Treat the repository files—not previous chat
messages—as the source of truth.

## Required context

Before changing code:

1. Read `migration-tooling/PLAN.md` completely.
2. Read `migration-tooling/IMPLEMENTATION_STATUS.md` completely.
3. Read `migration-tooling/PHASE_GATES.md` completely.
4. Read the plan section for **<phase number and name>** again, including its
   tasks, deliverable, exit criteria, estimate, dependencies, and ownership
   requirements.
5. Inspect the current repository state and relevant implementation from earlier
   phases.
6. Review all decisions, leftovers, deviations, and next actions recorded for
   this and preceding phases.
7. Do not assume a preceding phase is complete merely because code exists or its
   status says `complete`; confirm the required artifacts and verification
   evidence needed by this phase.
8. Review every open phase and cross-phase leftover. Follow the complete
   leftover rules and record format in `IMPLEMENTATION_STATUS.md`.
9. Read the preceding phase handoff under `migration-tooling/handoffs/` and
   verify its links, prerequisites, limitations, and open leftovers. For Phase 0,
   this is not applicable.

## Objective

<State the concrete outcome for this phase. Copy it from the current plan and
adapt it only when a recorded decision requires that.>

## In scope

<List the phase tasks from the current plan.>

Also fix a defect from an earlier phase when it blocks this phase or invalidates
an earlier exit criterion. Record that work as a deviation or leftover in
`IMPLEMENTATION_STATUS.md`.

## Out of scope

- Work assigned to later phases unless it is strictly necessary to satisfy this
  phase's exit criteria.
- Deferred work listed in the plan.
- Unreviewed expansion of supported migration patterns.
- AI-dependent detection or source transformation.
- Claims that a scan, codemod, or passing fixture proves an entire customer
  upgrade is complete.
- <Add phase-specific exclusions.>

## Implementation rules

- Make reasonable, evidence-backed assumptions only within the phase scope.
- Preserve unrelated user changes.
- Use deterministic behavior for catalogue selection, detection, ordering,
  transformation, and output.
- Use the same detector for read-only findings and transformations when both
  exist.
- Leave unsupported or ambiguous customer code unchanged.
- Add or update tests in proportion to the risk of every change.
- Keep open-source reuse provenance and required notices current.
- Do not silently change `PLAN.md`. If implementation invalidates a plan
  assumption, follow the complete Controlled plan evolution protocol in
  `PLAN.md`, create a stable change record, and determine whether a plan revision
  or an additional phase is required.
- Do not start the next phase.

## Required deliverable

<Copy the phase deliverable from the current plan.>

Create or update
`migration-tooling/handoffs/PHASE_<number>.md` from
`migration-tooling/HANDOFF_TEMPLATE.md`. The handoff must link to durable
artifacts, verification, decisions, plan changes, leftovers, limitations, and
next-phase prerequisites.

## Required verification

Run the smallest relevant checks while iterating, followed by all checks needed
to prove the phase exit criteria.

At minimum, verify:

- <Copy every exit criterion from the current plan.>
- New and modified automated tests.
- Relevant formatting, type checking, and linting.
- Determinism and reproducibility where applicable.
- `git diff --check`.

Record exact commands, results, failures, and relevant evidence. Do not describe
a check as passing if it was not run successfully.

## Status update

Before finishing, update the matching phase in
`migration-tooling/IMPLEMENTATION_STATUS.md`.

Perform the formal phase gate defined in
`migration-tooling/PHASE_GATES.md`. Answer every mandatory gate check, list every
exit criterion individually with evidence, select exactly one permitted outcome,
and place the complete gate record under the phase's `### Verification` section.
Validate the phase handoff as part of that gate.

Record:

- Status.
- Phase-gate outcome.
- Start and completion dates when applicable.
- Owner or required ownership area.
- What was actually implemented, with file references.
- The phase handoff and delivered artifacts.
- Verification commands, results, and evidence.
- Decisions and their reasons.
- Every leftover with classification, reason, risk, target phase, and owner or
  required ownership area, using the complete required record in
  `IMPLEMENTATION_STATUS.md`.
- Deviations from the plan.
- Controlled plan-evolution records and approvals when applicable.
- Estimate changes.
- The next action.

Use exactly one phase-gate outcome:

- `complete-and-proceed`
- `complete-with-deferred-work`
- `remain-in-phase`
- `remediation-phase-required`
- `blocked`
- `plan-revision-required`

Mark the phase `complete` only when every required exit criterion is verified.
Optional or explicitly deferred work may remain, but required work may not be
silently moved forward.

Do not mark a phase complete while an open leftover invalidates an exit
criterion, required approval, safety property, deliverable, or next-phase
prerequisite.

Create an intermediate remediation phase when newly discovered work:

- affects multiple later phases,
- changes architecture or a public interface,
- is necessary for safety,
- requires separate ownership or review,
- or is expected to exceed two working days.

## Final response

Report:

1. The implemented outcome.
2. Verification performed and any checks not run.
3. Phase status and gate outcome.
4. Required leftovers and risks.
5. Whether the next phase is ready to receive a newly generated prompt.

Do not implement the next phase in this task.
