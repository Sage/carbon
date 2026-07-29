# Phase 4 implementation prompt: Maintainer workflow and CI

You are implementing **Phase 4: Maintainer workflow and CI** of Carbon's
deterministic migration tooling.

Work in the Carbon repository. Treat repository files—not previous chat
messages—as the source of truth.

## Required context and prerequisites

Before changing code:

1. Read `migration-tooling/PLAN.md`,
   `migration-tooling/IMPLEMENTATION_STATUS.md`,
   `migration-tooling/PHASE_GATES.md`, and
   `migration-tooling/HANDOFF_TEMPLATE.md` completely.
2. Re-read the complete Phase 4 plan section, including tasks, deliverable, exit
   criteria, estimate, dependencies, and ownership.
3. Read `migration-tooling/handoffs/PHASE_3.md` and validate its links and
   prerequisites.
4. Read the migration package catalogue, validation, rules, report schema,
   CLI, application engine, tests, README, root scripts, lint-staged
   configuration, and relevant CI workflows.
5. Confirm Phase 3 is complete, its formal gate permits proceeding, and its
   committed handoff agrees with the status ledger.
6. Inspect Git state and preserve unrelated changes. Do not include an
   accidental nested
   `packages/carbon-react-migrate/package-lock.json`; dependency state is
   managed by the repository root unless the repository explicitly proves
   otherwise.
7. Accept `P0-L3`, `P0-L7`, and `P2-L3` as required Phase 4 work. Reassess
   `P0-L6` but leave its pilot/public-support decision in Phase 5.
8. Preserve all Phase 1–3 interfaces, including catalogue semantics, selection
   tracks, schema compatibility, exit codes, shared detector evidence,
   application safeguards, and `PLAN-001`.

The candidate `159.0.0 → 161.7.0` interval remains implementation and pilot
scope, not a public support promise.

## Objective

Deliver a deterministic maintainer workflow with one local validation command
and one pull-request CI entry point. Generate and validate a readable migration
register from authoritative repository data, enforce migration records or
reviewed exemptions for new public deprecations and intentional breaking
changes, validate provenance and tooling dependencies, and document how
maintainers author and review safe and manual migrations.

## In scope

- Add a root-level `npm run validate:migrations` command.
- Add one pull-request CI entry point that invokes the same validation contract.
- Add a deterministic generated migration register, preferably
  `migration-tooling/generated/MIGRATION_REGISTER.md`.
- Add an explicit developer generation command, preferably
  `npm run generate:migration-register`.
- Generate the register from the typed catalogue and reviewed extracted
  metadata; do not maintain duplicate migration facts manually.
- Include, when authoritative data exists:
  - migration ID;
  - required or deprecated version;
  - package, component, prop, or subject;
  - replacement guidance or explicit removal instruction;
  - automation status;
  - documentation link;
  - changelog link;
  - Migration Skill link;
  - manual checks, limitations, and risks.
- Keep `requiredBy` and `deprecatedIn` independent.
- Use `deprecatedIn` as the authoritative deprecation version. Do not add
  manually maintained calendar dates; derive dates only from release or Git
  evidence when necessary.
- Implement a stale-register check: generation followed by validation must be
  deterministic, and CI must fail when committed generated output differs.
- Validate the catalogue, rule registration, documentation references,
  generated register, JSON-schema fixtures, and transform fixtures.
- Validate that required third-party notices and recorded open-source
  provenance remain present.
- Refresh `P0-L3` evidence for production dependencies, security, license, Node
  compatibility, package size, and relevant performance. Record exact evidence
  and limitations; do not claim organizational approval that was not obtained.
- Resolve `P2-L3` using authoritative extracted metadata. Where a requested
  documentation, changelog, or Migration Skill link does not exist, record that
  accurately rather than inventing a URL. Decide and test whether schema v1 can
  receive backward-compatible optional fields or whether a new schema version
  is required.
- Require a migration catalogue record or a reviewed exemption when a public
  API gains a deprecation annotation, runtime deprecation warning, or
  intentional breaking-change marker.
- Define a durable exemption format with stable ID, reason, scope, owner or
  ownership area, and review evidence. Exemptions must not silently hide real
  migration work.
- Document how source annotations and runtime warnings reference stable
  migration IDs.
- Document the complete maintainer workflow for adding and reviewing one safe
  migration and one manual migration.
- Document when developers must regenerate the migration register:
  deprecation, removal, replacement guidance, automation status, documentation
  links, supported boundaries, or exemptions change.
- Name ownership areas for catalogue review, codemod review, documentation,
  security/license review, and release publication. If accountable people or
  teams cannot be confirmed from repository evidence, record the missing
  ownership as a blocker or required follow-up; do not invent names.
- Require dependency and license review when transformation tooling or copied
  open-source code changes.
- Add adversarial fixtures proving stale records, broken anchors, missing
  records, invalid exemptions, missing provenance, unregistered rules, stale
  generated output, and valid safe/manual authoring cases.

The intended maintainer workflow is:

```sh
npm run generate:migration-register
npm run validate:migrations
git diff --check
```

Developers commit the API change, catalogue/exemption change, and regenerated
register together. CI runs `npm run validate:migrations`; CI must not silently
regenerate and accept stale output.

## Out of scope

- Phase 5 customer-style pilot, public baseline decision, publication, or
  support promise.
- Adding new customer transformations solely to demonstrate the authoring
  workflow.
- Historical backfill beyond the approved catalogue and evidence needed for
  Phase 4 validation.
- Automatically running customer formatters, builds, tests, dependency
  installation, or arbitrary scripts.
- AI-dependent extraction, validation, generation, or enforcement.
- Invented documentation, changelog, Migration Skill, ownership, approval,
  provenance, security, or release evidence.
- Publishing the package or making it public.
- Weakening Phase 1–3 detection or application safety.
- Generating or implementing Phase 5.

## Implementation and safety rules

- Preserve unrelated user changes.
- Use deterministic ordering and byte-stable generation.
- Make generated-file headers identify the authoritative source and exact
  regeneration command, without dates or timestamps.
- Keep a single source of truth for migration facts. Generated Markdown must
  not become an independently edited database.
- Ensure validation is read-only. It may generate into memory or a temporary
  location for comparison but must not rewrite committed files.
- Make failure messages identify the migration ID, source location, missing
  record/exemption, broken link/anchor, stale artifact, or provenance problem
  and tell the maintainer how to correct it.
- Avoid scanning generated outputs, dependencies, build artifacts, and
  irrelevant repository paths. Measure and record validation runtime.
- Test false-positive controls for deprecation enforcement.
- Use repository-local schemas and metadata; do not fetch arbitrary remote
  content during normal validation or CI.
- Preserve JSON consumer compatibility. Treat any schema-contract change as a
  reviewed interface decision with fixtures.
- Do not silently change `PLAN.md`. If evidence contradicts the plan, follow
  Controlled plan evolution with a stable change record and appropriate gate
  outcome.
- Do not start Phase 5.

## Required deliverable

One local command and one pull-request CI entry point, backed by:

- a deterministic generated migration register;
- a developer generation command;
- catalogue, rule, documentation, schema, transform, exemption, and provenance
  validation;
- deprecation/breaking-change enforcement;
- maintainer authoring and review documentation;
- recorded ownership and dependency/license requirements;
- a complete Phase 4 handoff.

Create `migration-tooling/handoffs/PHASE_4.md` from
`migration-tooling/HANDOFF_TEMPLATE.md`. Link to durable commands, scripts,
generated artifacts, fixtures, CI configuration, decisions, exact
verification, ownership status, limitations, leftovers, and Phase 5
prerequisites.

## Required verification

Run the smallest relevant checks while iterating, then the complete Phase 4
verification. At minimum prove:

- `npm run generate:migration-register` produces deterministic output.
- Running generation twice produces no second diff.
- `npm run validate:migrations` passes on the committed repository state.
- Validation is read-only and does not change tracked or untracked files.
- A deliberately stale catalogue record or generated register fails.
- A broken local documentation file or anchor fails.
- A new public deprecation without a record or reviewed exemption fails.
- A new intentional breaking-change marker without a record or exemption fails.
- A valid, narrowly scoped reviewed exemption passes.
- A malformed, broad, stale, or missing-evidence exemption fails.
- An unregistered safe rule fails.
- Missing schema or transform fixture coverage fails.
- Missing required provenance or notice evidence fails.
- Rich deprecation metadata uses authoritative links and missing link types are
  represented honestly.
- Maintainer documentation walks through adding one safe and one manual
  migration, including register regeneration and review.
- The CI entry point calls the same local validation contract rather than a
  divergent implementation.
- Phase 1–3 package tests and catalogue validation still pass.
- Relevant type checking, linting, formatting, generated-output checks,
  handoff-link validation, and `git diff --check` pass.
- Validation performance is measured on the repository and does not silently
  scan irrelevant large trees.

Record exact commands, counts, results, failures encountered during
implementation, and final evidence. Do not describe an unrun or failing check
as passing.

## Estimate, prerequisites, and ownership

- Developer: 3–4 days.
- AI assistance: 1 day equivalent for documentation and validation-test
  scaffolding.
- Elapsed with collaboration: 3–4 days.
- Prerequisite: Phase 3 complete gate and intact handoff.
- Required carryover: `P0-L3`, `P0-L7`, and `P2-L3`.
- Implementation owner: current project implementor.
- Required ownership areas: Carbon API/catalogue, codemod review,
  documentation, security/license, CI, release publication, and support.
- Missing accountable ownership or required organizational approval must be
  reported honestly and may require a blocked or complete-with-deferred-work
  gate depending on whether it invalidates the Phase 4 deliverable or Phase 5
  prerequisite.

## Status and formal gate

Before finishing:

1. Create and validate `migration-tooling/handoffs/PHASE_4.md`.
2. Update Phase 4 and overall progress in
   `migration-tooling/IMPLEMENTATION_STATUS.md`.
3. Resolve `P0-L3`, `P0-L7`, and `P2-L3` only with durable evidence; otherwise
   carry or block them accurately according to the leftover rules.
4. Reassess `P0-L6` for Phase 5 without making the public support decision.
5. Record implementation, artifacts, commands, verification, decisions,
   deviations, plan changes, estimate changes, risks, ownership, and next
   action.
6. Perform the complete Phase 4 gate from `PHASE_GATES.md`, answer every
   mandatory check, list each exit criterion individually with evidence, and
   select exactly one permitted outcome.
7. Mark Phase 4 complete only if all required work and exit criteria pass and
   no blocker remains.
8. Do not generate or implement Phase 5.

## Final response

Report:

1. The maintainer workflow, migration register, validation command, and CI
   entry point implemented.
2. When and how developers update the register.
3. Verification performed and checks not run.
4. Phase 4 status and gate outcome.
5. Ownership, dependency/security/provenance evidence, unresolved approvals,
   leftovers, and risks.
6. Exact commands maintainers and CI run.
7. Whether Phase 5 may receive a newly generated prompt.

Do not implement or generate Phase 5 in this task.
