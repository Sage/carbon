# Phase 2 implementation prompt: Read-only CLI and deprecation diagnosis

You are implementing **Phase 2: Read-only CLI and deprecation diagnosis** of
Carbon's deterministic migration tooling.

Work in the Carbon repository. Treat repository files—not previous chat
messages—as the source of truth.

## Required context and prerequisites

Before changing code:

1. Read `migration-tooling/PLAN.md`, `IMPLEMENTATION_STATUS.md`,
   `PHASE_GATES.md`, and `HANDOFF_TEMPLATE.md` completely.
2. Re-read the complete Phase 2 plan section, including tasks, deliverable, exit
   criteria, estimate, dependencies, and ownership.
3. Read `migration-tooling/handoffs/PHASE_1.md`,
   `migration-tooling/CATALOGUE_GUIDANCE.md`, and the Phase 1 package API,
   catalogue, validation, types, and tests.
4. Confirm Phase 1 is `complete`, its formal outcome permits proceeding, and
   its handoff integrity checks and Phase 2 prerequisites pass.
5. Inspect the current Git state and preserve unrelated changes.
6. Review every decision, limitation, deviation, and open leftover. Reassess
   `P0-L3`, `P0-L6`, and `P0-L7` without implementing their later-phase work.
7. Check `npm --version` before installation or lockfile work. The repository
   requires npm `>=11.18.0`.

Phase 1 permits Phase 2 with `complete-with-deferred-work`. The candidate
`159.0.0 → 161.7.0` interval is approved only for implementation and pilot.
It is not a public support promise.

## Objective

Deliver a locally executable, deterministic, read-only CLI with `plan`, `check`,
and `check-deprecations`. It must consume the Phase 1 catalogue, detect only
explicitly supported customer-source patterns, report ambiguity and manual
work, and emit stable human-readable and JSON output without AI, credentials,
network access, or source-file modification.

## In scope

- Implement `plan`, `check`, and `check-deprecations`.
- Consume the Phase 1 upgrade and deprecation selectors without weakening their
  track-specific types, ordering, applicability, or unsupported-path behavior.
- Label every finding and summary as required upgrade work or optional
  proactive deprecation cleanup.
- Detect installed `carbon-react` version when possible and validate explicit
  `--from` and `--to` overrides.
- Parse JavaScript, JSX, TypeScript, and TSX without executing customer code.
- Use the Phase 0 decision: jscodeshift/Recast for shared customer-source
  matching, source locations, and future-compatible edits; keep ts-morph
  focused on Carbon API extraction/validation where actually needed.
- Resolve supported Carbon imports, local aliases, JSX elements, prop usage, and
  explicitly supported call/type patterns.
- Implement read-only detection for supported subsets of the five catalogue
  records. Manual records must still produce useful plan/check guidance where
  source detection is meaningful.
- Leave shadowed, ambiguous, dynamic, wrapper, re-exported, spread-only,
  malformed, or otherwise unsupported patterns unchanged and report them when
  they can be identified safely.
- Define JSON schema version 1 and deterministic human-readable output.
- Define stable, documented exit codes for success/no findings, findings,
  invalid input or unsupported path, malformed source, and internal failure.
- Every finding must include:
  - migration ID and applicable version;
  - selection track and whether action is required for the requested upgrade;
  - file and source location;
  - matched Carbon API and import origin;
  - evidence or match kind;
  - automation status;
  - documentation reference;
  - manual checks, risks, limitations, and applicable runtime-warning checks.
- When no findings occur, report exactly:

  > No known matches found in supported patterns. This does not prove the
  > migration is complete.

- Add positive, negative, alias, shadowing, ambiguity, malformed-source,
  deterministic-ordering, JSON snapshot/schema, exit-code, and no-write
  fixtures for JS, JSX, TS, and TSX.
- Reuse shared parser/import/JSX utilities rather than creating a separate
  parser stack for each rule.
- Keep the CLI usable through a local maintainer command in the provisional
  package. Do not claim the package is published.

## Out of scope

- `apply`, `apply-deprecations`, `--dry-run` writes, codemod application,
  backups, dirty-worktree handling, conflict writes, or rollback; these belong
  to Phase 3.
- Phase 4 CI integration, workspace/publication strategy, dependency refresh,
  final package ownership, or maintainer enforcement.
- Phase 6 customer pilot, public baseline, support promise, or release.
- Complete historical migration backfill.
- Executing customer code, configuration files, build scripts, or application
  tests as part of detection.
- Network calls, credentials, telemetry, or AI-dependent matching.
- Inferring that zero findings means an upgrade is complete.
- Silently composing unsupported upgrade gaps or presenting deprecation-only
  records as required upgrade work.

## Implementation rules

- Preserve unrelated user changes.
- All commands in this phase are read-only with respect to customer source.
- Use one shared detector contract that Phase 3 can later reuse for safe
  transformations.
- Detection must be deterministic, with stable file traversal, finding
  ordering, serialization, and exit codes.
- Parse source; never import or execute it.
- Leave unsupported or ambiguous patterns unchanged.
- Treat `requiredBy` and `deprecatedIn` as independent.
- Surface `UnsupportedUpgradePathError` and its exact tested intermediate path;
  do not silently execute or invent a multi-boundary migration.
- Keep documentation references and stable anchors validated.
- Add tests proportional to every supported claim and failure mode.
- Avoid adding or updating dependencies or `package-lock.json` unless required
  by the approved Phase 2 design. If a new dependency is necessary, record and
  review it under Controlled plan evolution before proceeding.
- Do not silently change `PLAN.md`. Follow Controlled plan evolution if
  repository evidence contradicts scope, architecture, safety guarantees,
  public interfaces, sequencing, or estimates.
- Do not implement Phase 3 or generate its prompt.

## Required deliverable

A locally executable read-only CLI and versioned JSON schema implementing
`plan`, `check`, and `check-deprecations`, with stable exit codes, deterministic
reports, shared detectors, comprehensive fixtures, and no customer-source
writes.

Create `migration-tooling/handoffs/PHASE_2.md` from
`migration-tooling/HANDOFF_TEMPLATE.md`. Link to durable implementation,
schemas, fixtures, snapshots, commands, decisions, verification, limitations,
leftovers, and Phase 3 prerequisites.

## Required verification

Run the smallest relevant checks while iterating, then all checks needed to
prove every Phase 2 exit criterion:

- All supported fixtures are detected.
- Negative and shadowed-identifier fixtures produce no false positives.
- JS, JSX, TS, and TSX parsing is covered.
- Ambiguous and unsupported cases are not represented as safe matches.
- Output ordering and JSON snapshots are stable across repeated runs.
- The JSON report declares schema version 1 and contains every required field.
- Exit codes are stable and tested.
- The CLI requires no AI, credentials, or network after installation.
- Repeated `check-deprecations` runs are safe and stable.
- `plan` and `check` never present deprecation-only findings as required work.
- No command writes to customer source.
- Unsupported direct jumps retain the exact Phase 1 intermediate-path behavior.
- The required zero-findings disclaimer is present.
- Package build, tests, catalogue validation, linting, formatting, handoff-link
  validation, and `git diff --check` pass.

Use the repository-root installation and package `--prefix` workflow documented
in the Phase 1 handoff. Record exact commands and results. Do not describe an
unrun or failing check as passing.

## Estimate and ownership

- Developer: 5–7 days.
- AI assistance: 1.5–2.5 days equivalent for fixtures, parser API research,
  test scaffolding, schema work, and documentation.
- Elapsed with collaboration: 5–7 days.
- Implementation owner: current project implementor.
- Customer guidance and stable-link correctness require the appropriate Carbon
  API/docs ownership. Publication, security/release, support, and pilot
  approvals remain in Phases 4 and 5.

## Status and formal gate

Before finishing:

1. Create and validate `migration-tooling/handoffs/PHASE_2.md`.
2. Update Phase 2 and overall progress in
   `migration-tooling/IMPLEMENTATION_STATUS.md`.
3. Reassess every open leftover and record any new leftover using the complete
   stable-ID format.
4. Record implementation, artifacts, exact verification, decisions,
   deviations, plan changes, estimate changes, risks, and next action.
5. Perform the complete Phase 2 gate from `PHASE_GATES.md`, answer every
   mandatory check, list every exit criterion individually with evidence, and
   select exactly one permitted outcome.
6. Mark Phase 2 complete only if all required work and exit criteria pass and no
   blocker remains.
7. Do not implement Phase 3 or generate its prompt.

## Final response

Report:

1. The implemented read-only outcome and supported commands.
2. Verification performed and checks not run.
3. Phase 2 status and gate outcome.
4. Remaining leftovers, unsupported patterns, and risks.
5. Exact local commands maintainers can run.
6. Whether Phase 3 is ready to receive a newly generated prompt.
