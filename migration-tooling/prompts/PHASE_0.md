# Phase 0 implementation prompt

Copy the content below into a new implementation task.

---

You are implementing **Phase 0: Select the vertical slice** of Carbon's
deterministic migration tooling.

Work in the Carbon repository. Treat the repository files—not previous chat
messages—as the source of truth. This phase is an evidence-gathering and
decision phase. Do not implement the public migration CLI or production
codemods.

## Required context

Before making changes:

1. Read `migration-tooling/PLAN.md` completely.
2. Read `migration-tooling/IMPLEMENTATION_STATUS.md` completely.
3. Read `migration-tooling/PHASE_GATES.md` completely.
4. Read the Phase 0 section of the plan again.
5. Inspect the current repository, Git history, package configuration,
   deprecation annotations, runtime warnings, migration documentation, release
   notes, generated skills, and existing tests.
6. Inspect all Phase 0 status entries, decisions, leftovers, deviations, and
   next actions.
7. Verify repository evidence directly; do not rely on claims from previous
   discussions.
8. Review every open phase and cross-phase leftover. Follow the complete
   leftover rules and record format in `IMPLEMENTATION_STATUS.md`.

## Objective

Select a small, evidence-backed migration vertical slice and make the technical,
package, ownership, and open-source reuse decisions needed to begin catalogue
implementation.

## In scope

1. Audit at least three candidate Carbon migrations:
   - a deterministic prop rename or direct prop replacement,
   - a deterministic import or component replacement,
   - a composition, behaviour, design, or accessibility migration that should
     remain manual.
2. For every candidate, record:
   - affected API and supported import forms,
   - source deprecation annotation,
   - runtime warning and tests,
   - documentation,
   - changelog and release-note evidence,
   - reliable version applicability,
   - historical codemod and its maintenance/test status,
   - behavioural, accessibility, visual, and type risks,
   - missing or contradictory evidence.
3. Select the three migrations used by the MVP and the first supported version
   interval.
4. Decide whether the interval is supported directly or through tested
   intermediate steps.
5. Classify each migration as safe, partial, or manual and justify the
   classification.
6. Locate and assess historical Carbon codemods.
7. Prototype representative detection and transformation cases with
   `jscodeshift`/Recast and `ts-morph` where necessary.
8. Compare:
   - JS, JSX, TS, and TSX parser coverage,
   - comment and formatting preservation,
   - import, alias, JSX, and prop-query ergonomics,
   - source locations and read-only detection,
   - fixture testing and idempotency,
   - representative performance,
   - dependency size, maintenance, security, and supported Node versions.
9. Inspect Material UI codemod helpers and fixtures before designing equivalent
   Carbon utilities.
10. Inspect Next.js, Storybook, and React implementations for orchestration,
    applicability checks, recipes, and reporting.
11. Produce an open-source reuse inventory that records repository, exact file,
    commit or release, license, intended reuse, required attribution, and the
    reuse-versus-reimplementation decision.
12. Choose the migration package location and identify required ownership areas.

Use current upstream sources when assessing external projects. Prefer official
repositories, packages, and documentation. Clearly separate verified facts from
recommendations.

## Out of scope

- Production catalogue implementation.
- Public CLI implementation.
- Production codemods.
- CI enforcement.
- Complete historical migration backfill.
- Adding Angular DevKit, Next.js CLI, Storybook CLI, or Cargo as runtime
  dependencies.
- Copying third-party source before provenance, license, attribution, and
  compliance requirements are recorded.
- AI-based detection or transformation.

Small throwaway or test-only prototypes are allowed when needed to compare
transformation tools. Clearly label them as prototypes and either retain them as
reviewable evidence or remove them safely after recording reproducible results.

## Required deliverable

Create a Phase 0 decision record under `migration-tooling/` that names:

- the selected three migrations,
- the supported version interval and path,
- evidence for applicability,
- automation classifications,
- transformation-tool responsibilities,
- open-source reuse decisions and inventory,
- package location,
- required owners or ownership areas,
- unresolved risks and required follow-ups.

Use a descriptive name such as:

```text
migration-tooling/PHASE_0_DECISIONS.md
```

Also create:

```text
migration-tooling/handoffs/PHASE_0.md
```

Use `migration-tooling/HANDOFF_TEMPLATE.md`. Link the decision record,
prototype evidence, reuse inventory, verification, decisions, leftovers,
limitations, and Phase 1 prerequisites. Do not duplicate large evidence already
recorded elsewhere.

Do not change later-phase architecture silently. If the evidence invalidates the
plan, follow the complete Controlled plan evolution protocol in `PLAN.md`,
create a stable change record, update the status ledger with
`plan-revision-required`, and explain the specific necessary revision.

## Required verification

Verify every Phase 0 exit criterion in `migration-tooling/PLAN.md`.

At minimum:

- Confirm an unambiguous `requiredBy` version for every selected migration.
- Confirm at least one useful deterministic transform candidate.
- Confirm reviewed customer guidance exists for the manual migration, or record
  the missing guidance as a blocker.
- Run representative JS, JSX, TS, and TSX fixture experiments for the proposed
  transformation engine.
- Verify licenses and compliance paths for every proposed copied or adapted
  source.
- Make the evidence reproducible with commands, file references, commit
  references, or authoritative links.
- Run `git diff --check`.

Do not claim parser, formatting, alias, or transform support that was not
exercised.

## Status update

Before finishing, update Phase 0 in
`migration-tooling/IMPLEMENTATION_STATUS.md`.

Perform the formal Phase 0 gate defined in
`migration-tooling/PHASE_GATES.md`. Answer every mandatory gate check, list every
Phase 0 exit criterion individually with evidence, select exactly one permitted
outcome, and place the complete gate record under Phase 0's `### Verification`
section. Validate `migration-tooling/handoffs/PHASE_0.md` as part of that gate.

Record:

- Status and one phase-gate outcome.
- Start and completion dates when applicable.
- Owner or required ownership areas.
- The decision record and any prototype files.
- The Phase 0 handoff and delivered artifacts.
- Exact verification commands, results, and evidence.
- Decisions and reasons.
- Every leftover with classification, reason, risk, target phase, and owner or
  required ownership area, using the complete required record in
  `IMPLEMENTATION_STATUS.md`.
- Deviations and estimate changes.
- Controlled plan-evolution records and approvals when applicable.
- The next action.

Use exactly one phase-gate outcome:

- `complete-and-proceed`
- `complete-with-deferred-work`
- `remain-in-phase`
- `remediation-phase-required`
- `blocked`
- `plan-revision-required`

Mark Phase 0 complete only when every required exit criterion has been verified.
Do not start Phase 1.

## Final response

Report:

1. The selected vertical slice and supported interval.
2. Transformation tooling and open-source reuse decisions.
3. Evidence and verification performed.
4. Phase status and phase-gate outcome.
5. Blockers, leftovers, risks, and estimate changes.
6. Whether Phase 1 is ready for a newly generated prompt.

Do not implement Phase 1 in this task.
