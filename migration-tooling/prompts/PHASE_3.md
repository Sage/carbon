# Phase 3 implementation prompt: Safe application

You are implementing **Phase 3: Safe application** of Carbon's deterministic
migration tooling.

Work in the Carbon repository. Treat repository files—not previous chat
messages—as the source of truth.

## Required context and prerequisites

Before changing code:

1. Read `migration-tooling/PLAN.md`, `IMPLEMENTATION_STATUS.md`,
   `PHASE_GATES.md`, and `HANDOFF_TEMPLATE.md` completely.
2. Re-read the complete Phase 3 plan section, including tasks, deliverable, exit
   criteria, estimate, dependencies, and ownership.
3. Read `migration-tooling/handoffs/PHASE_2.md`, the package README, detector,
   scanner, report, CLI, schema, catalogue, types, and tests.
4. Confirm Phase 2 is `complete`, its formal outcome permits proceeding, its
   handoff is intact, and the Phase 3 prerequisites pass.
5. Inspect the current Git state and preserve unrelated changes.
6. Review every decision, limitation, deviation, and open leftover.
7. Accept `P2-L1` as required Phase 3 work: safe transformations must consume
   the same detector evidence used by read-only checks, with check/apply
   equivalence, ambiguity, conflict, and idempotency verification.
8. Reassess `P0-L3`, `P0-L6`, `P0-L7`, and `P2-L3` without implementing their
   later-phase work.

Phase 2 permits Phase 3 with `complete-with-deferred-work`. The candidate
`159.0.0 → 161.7.0` interval remains approved only for implementation and
pilot, not as a public support promise.

## Objective

Deliver safe application for the selected automatic migrations through
`apply`, `apply-deprecations`, and `--dry-run`. Reuse Phase 2 detection and
report semantics, calculate and validate all proposed edits before writing,
apply only safe catalogue rules, and leave every manual, partial, ambiguous, or
unsupported case unchanged with deterministic reporting.

## In scope

- Implement one or two named deterministic codemods using the shared rules.
- Implement `apply` for safe required-upgrade records only.
- Implement `apply-deprecations` for safe optional cleanup records only.
- Implement `--dry-run` for application commands; report proposed changes
  without writing them.
- Reuse the Phase 2 parser, detector evidence, scanner ordering, report fields,
  track labels, JSON schema/versioning approach, and exit-code semantics.
- Preserve the distinction between required upgrade work and optional
  proactive cleanup before and after edits.
- Apply only catalogue records whose automation status is `safe`.
- Never automatically apply `manual`, `partial`, `ambiguous`, `unsupported`,
  shadowed, malformed, dynamic, wrapper, re-exported, computed, spread-conflict,
  or otherwise unproved cases.
- Preserve unsupported and ambiguous files unchanged and report why they were
  not changed.
- Preserve comments and acceptable formatting where possible.
- Detect duplicate, overlapping, ambiguous, or conflicting edits before any
  write.
- Parse, transform, reparse, and validate every proposed change before writing.
- Refuse to write when any parsing or transformation step fails.
- Avoid partial customer-file writes when preparation or validation fails.
- Use atomic same-directory file replacement for committed changes.
- Define dirty-Git-working-tree behavior: refuse application writes by default
  when Git is available and the target worktree is dirty, and require an
  explicit documented override. Dry runs remain read-only.
- Define deterministic behavior when Git is unavailable or the target is not
  in a Git worktree.
- Clearly report proposed/applied changes, unchanged unsupported findings,
  partial completion, and remaining manual migrations.
- Keep JSON output and exit codes deterministic for check, dry-run, successful
  application, remaining findings, invalid input, malformed source,
  transformation failure, dirty-tree refusal, and internal/write failure.
- Offer documented opt-in formatting and verification commands; do not execute
  arbitrary project scripts.
- Add check/apply equivalence tests.
- Add non-match, ambiguous, conflict, and unsupported fixtures for every
  transform.
- Add idempotency tests and verify repeated apply produces no additional
  changes.
- Add dry-run/actual-run proposed-change equivalence tests.
- Add interrupted and failing-write safety tests proving customer files are not
  left partially written.
- Verify version-aware and deprecation commands invoke the same registered
  codemods and make equivalent edits for the same detector evidence.

## Out of scope

- Phase 4 maintainer validation, CI entry points, generated migration indexes,
  deprecation enforcement, authoring documentation, final dependency review,
  publication ownership, or release workflow.
- Phase 6 pilot, public baseline, customer support promise, or release.
- Automatic application of manual or partial upgrade records, including CSS
  compatibility, Button ref/type migration, and npm engine changes.
- Expansion to wrappers, higher-order components, arbitrary re-export graphs,
  dynamic/computed imports or JSX, or runtime-generated props.
- Dependency installation, package/lockfile upgrades, or automatic execution of
  customer formatting, lint, build, test, or verification scripts.
- Backups or recovery promises that are not explicitly implemented and tested.
- Complete historical migration backfill.
- AI-dependent detection or source transformation.
- Claims that applying safe findings proves the customer upgrade is complete.
- Generating or implementing Phase 4.

## Implementation and safety rules

- Preserve unrelated user changes.
- Use deterministic catalogue order, detection, edit planning, reporting,
  serialization, and file order.
- The detector evidence used by `check` must be the authoritative eligibility
  input for transformations; do not create a second matcher with broader
  behavior.
- Transform only findings whose catalogue record is `safe` and whose match is
  still uniquely valid at transformation time.
- Leave unsupported or ambiguous customer code byte-for-byte unchanged.
- Calculate the complete edit plan and validate all output before the first
  write.
- Use atomic replacement in each file's directory and clean up temporary files
  on success or failure.
- A preparation, parse, transform, validation, conflict, or write failure must
  not knowingly leave an unvalidated or partially replaced target file.
- Dirty-tree override must be explicit, narrow, documented, and tested; never
  silently bypass protection.
- Treat `requiredBy` and `deprecatedIn` as independent, as required by the
  current plan.
- Keep the zero-findings disclaimer and remaining-manual-work guidance.
- Keep open-source provenance current; do not copy unreviewed upstream source.
- Add tests proportional to each safety guarantee and failure mode.
- Do not silently change `PLAN.md`. If evidence contradicts the plan, use the
  Controlled plan evolution process with a documented proposal and gate
  outcome rather than weakening safety.
- Do not implement or generate Phase 4.

## Required deliverable

Safe application for the selected automatic migrations, exposed through
`apply`, `apply-deprecations`, and `--dry-run`, with shared detector/codemod
rules, deterministic reporting, dirty-tree protection, pre-write validation,
atomic replacement, and adversarial safety coverage.

Create `migration-tooling/handoffs/PHASE_3.md` from
`migration-tooling/HANDOFF_TEMPLATE.md`. Link to durable implementation,
schemas, fixtures, commands, decisions, exact verification, limitations,
leftovers, and Phase 4 prerequisites.

## Required verification

Run the smallest relevant checks while iterating, then all checks needed to
prove every Phase 3 exit criterion and safety requirement:

- Every transform has non-match and ambiguous fixtures.
- Applying a transform twice produces no second diff.
- Repeated `apply` produces no additional changes or proposed edits.
- A dry run and actual run report the same proposed file changes.
- A failed transform does not leave partially written files.
- Interrupted/failing atomic replacement behavior preserves valid original
  files and cleans up temporary artifacts.
- Manual and partial migrations remain unchanged and are reported.
- Unsupported, conflicting, and ambiguous cases remain unchanged and explain
  why.
- Version-aware application and the deprecation preset invoke the same
  registered codemods and produce equivalent edits for the same findings.
- `check` and application eligibility use equivalent shared detector evidence.
- Only safe catalogue records are transformed.
- All changes are calculated and validated before writing.
- Dirty-worktree refusal, explicit override, clean-worktree, non-Git, and
  dry-run behavior are tested.
- Comments and acceptable formatting are preserved in representative JS, JSX,
  TS, and TSX fixtures.
- JSON reports validate against their declared schema and remain deterministic.
- Exit codes are stable and tested.
- Package build, complete tests, catalogue validation, linting, formatting,
  handoff-link validation, and `git diff --check` pass.

Record exact commands, results, failures, and relevant evidence. Do not
describe an unrun or failing check as passing.

## Estimate, prerequisites, and ownership

- Developer: 4–6 days.
- AI assistance: 1–2 days equivalent for transform/test scaffolding and
  adversarial cases.
- Elapsed with collaboration: 4–6 days.
- Prerequisite: Phase 2 complete gate and intact handoff.
- Required carryover: `P2-L1`.
- Implementation owner: current project implementor.
- Codemod safety and migration semantics require the appropriate codemod and
  Carbon API reviewers. Publication, security/release, support, richer-link,
  and pilot approvals remain assigned to Phases 4 and 5.

## Status and formal gate

Before finishing:

1. Create and validate `migration-tooling/handoffs/PHASE_3.md`.
2. Update Phase 3 and overall progress in
   `migration-tooling/IMPLEMENTATION_STATUS.md`.
3. Resolve `P2-L1` only with durable equivalence, ambiguity, conflict, and
   idempotency evidence; otherwise carry it accurately without claiming Phase 3
   completion.
4. Reassess every open leftover and record any new leftover using the complete
   stable-ID format.
5. Record implementation, artifacts, exact verification, decisions,
   deviations, plan changes, estimate changes, risks, and next action.
6. Perform the complete Phase 3 gate from `PHASE_GATES.md`, answer every
   mandatory check, list every exit criterion individually with evidence, and
   select exactly one permitted outcome.
7. Mark Phase 3 complete only if all required work and exit criteria pass and no
   blocker remains.
8. Do not generate or implement Phase 4.

## Final response

Report:

1. The implemented safe-application outcome and supported commands.
2. Verification performed and checks not run.
3. Phase 3 status and gate outcome.
4. Remaining leftovers, unsupported patterns, and risks.
5. Exact local commands maintainers can run.
6. Whether Phase 4 may begin.

Do not implement or generate Phase 4 in this task.
