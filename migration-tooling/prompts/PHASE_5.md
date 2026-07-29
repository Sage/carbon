# Phase 5 prompt: Migration discovery and catalogue backfill

Implement Phase 5 of the Carbon deterministic migration tooling plan. Work only
from durable repository evidence; do not rely on chat history.

## Read first

Read these files completely before changing anything:

1. `migration-tooling/PLAN.md`
2. `migration-tooling/PHASE_GATES.md`
3. `migration-tooling/IMPLEMENTATION_STATUS.md`
4. `migration-tooling/handoffs/PHASE_4.md`
5. `migration-tooling/HANDOFF_TEMPLATE.md`
6. `migration-tooling/prompts/PHASE_PROMPT_TEMPLATE.md`
7. `migration-tooling/MAINTAINER_WORKFLOW.md`
8. `migration-tooling/generated/MIGRATION_REGISTER.md`
9. `packages/carbon-react-migrate/README.md`
10. `packages/carbon-react-migrate/src/catalogue.ts`
11. `packages/carbon-react-migrate/src/types.ts`
12. `packages/carbon-react-migrate/src/validation.ts`
13. `packages/carbon-react-migrate/src/cli.ts`
14. Relevant catalogue, register, maintainer-validation, detector, application,
    schema, and test files.

Inspect Git status and preserve unrelated work.

## Mandatory prerequisite

Check the Phase 4 status and formal handoff gate before implementation.

- Do not implement Phase 5 unless Phase 4 has a completed gate that explicitly
  permits Phase 5 to start.
- If `P4-L1` or another blocking Phase 4 requirement remains open, stop without
  changing implementation files. Report the exact blocker and the smallest
  action needed to resolve it.
- Do not weaken or bypass the gate to make Phase 5 appear started.

## Objective

Provide deterministic, AI-independent tooling that discovers possible migration
work for a requested Carbon version interval, scaffolds draft catalogue records,
supports durable human review, and produces an honest coverage report.

For the initial candidate interval, use:

```text
159.0.0 → 161.7.0
```

The catalogue remains the authoritative machine-readable database. The
generated migration register remains a human-readable view of approved
catalogue records. Discovery output is non-authoritative and must never be
selected by customer `plan`, `check`, or `apply` commands.

## Required deliverables

### 1. Deterministic discovery command

Add:

```sh
npm run discover:migrations -- --from 159.0.0 --to 161.7.0
```

The command must:

- validate versions and interval ordering;
- inspect repository-local changelog sections and release boundaries;
- inspect explicit public `@deprecated` markers;
- inspect production `Logger.deprecate(...)` warnings;
- inspect explicit `migration-breaking-change` markers;
- inspect supported public API additions, changes, and removals where
  repository evidence makes that deterministic;
- inspect package requirement changes relevant to customers;
- discover changelog references to the historical `Sage/carbon-codemod`
  repository and named transforms;
- correlate existing catalogue records without treating them as newly
  discovered work;
- avoid network access, credentials, telemetry, customer-code execution, and AI
  inference;
- produce byte-stable JSON and Markdown candidate inventories;
- clearly label every candidate as non-authoritative and `needs-review`;
- record source evidence, applicable version evidence, confidence, and missing
  required information;
- report mechanisms or release boundaries it cannot inspect;
- never edit the authoritative catalogue or generated migration register.

Define deterministic ordering, output paths, schema/versioning, duplicate
handling, and exit codes. Do not include dates or timestamps.

### 2. Historical codemod inventory and reuse review

For every discovered or existing migration that references
`Sage/carbon-codemod`:

- record the named transform, repository path, referenced Carbon release,
  available fixtures/tests, language support, parser/tool versions, and license;
- determine whether its semantics match the current migration exactly,
  partially, or not at all;
- classify it as reusable as-is, safe to port with attribution, useful only as
  evidence, or unsuitable;
- prefer a reviewed port over an equivalent reimplementation;
- do not add the archived package as a runtime dependency;
- do not copy or adapt source without recording Apache-2.0 provenance and notice
  requirements;
- test any port against current JS, JSX, TS, and TSX expectations and the
  migration package's safety guarantees;
- preserve the current version-aware catalogue, shared detection, dry-run,
  rollback, conflict, and reporting contracts.

The archived project is historical migration evidence, not the authoritative
current catalogue and not a customer-facing second orchestration system.

### 3. Migration record scaffolding command

Add:

```sh
npm run create:migration -- --id <id> [supported metadata]
```

The command must:

- scaffold a typed, schema-valid draft for maintainer review;
- use explicit supplied evidence only;
- never invent replacement guidance, removal guidance, applicability, risk,
  verification steps, automation safety, or version semantics;
- distinguish `requiredBy` from `deprecatedIn`;
- list every field that still requires human review;
- refuse duplicate IDs and invalid input;
- produce deterministic output;
- avoid directly approving or publishing the draft;
- preserve the rule that developers update the catalogue, not the generated
  register.

Choose the least risky output contract supported by the repository. Prefer a
reviewable draft artifact over unsafe automatic source editing unless
repository evidence and tests justify a narrow edit.

### 4. Durable review workflow

Define and implement a durable review-decision format for every candidate:

- approved;
- rejected;
- merged into another candidate;
- internal-only;
- exempted;
- or needs-more-evidence.

Every decision must retain its reason and evidence. Only approved, complete
records may be added to the authoritative catalogue. AI may help correlate
evidence but cannot approve migration semantics.

Do not automatically mark all discovered candidates approved. If the current
task lacks accountable review for candidate semantics, leave candidates
`needs-review` and record that as a Phase 5 gate blocker rather than fabricating
completion.

### 5. Candidate-interval coverage report

Produce a deterministic coverage report for `159.0.0 → 161.7.0` that separates:

- approved catalogue records;
- reviewed rejections;
- internal-only changes;
- merged candidates;
- exemptions;
- unresolved candidates;
- release boundaries inspected;
- evidence sources used;
- historical codemod references and reuse decisions;
- unsupported or uninspectable areas;
- and high-risk gaps that block a representative customer pilot.

The report must explicitly say that coverage evidence is not proof of complete
historical migration support.

### 6. Catalogue and register integration

- Keep `catalogue.ts` authoritative.
- Keep `MIGRATION_REGISTER.md` generated.
- Add only human-reviewed, complete candidates to the catalogue.
- Regenerate the register only after an approved catalogue change.
- Prove that discovery and draft artifacts are not consumed by customer
  `plan`, `check`, or `apply`.
- Preserve all Phase 1–4 schemas, commands, safety guarantees, marker
  enforcement, exemptions, provenance, and deterministic behavior unless the
  current plan explicitly requires a backward-compatible extension.

### 7. Documentation and tests

Document:

- when developers run discovery;
- when they run record scaffolding;
- how reviewers make and retain decisions;
- how approved records reach the catalogue and generated register;
- how to interpret confidence, missing evidence, and unsupported coverage;
- why no Git hook automatically approves or inserts migrations;
- and how CI detects stale or incomplete maintained artifacts.

Add adversarial tests for at least:

- invalid and reversed intervals;
- byte-stable repeated discovery;
- duplicate candidate correlation;
- historical codemod reference extraction and reuse classification;
- malformed or ambiguous evidence;
- ignored ordinary deprecation wording;
- excluded tests, stories, Playwright, and internal-only sources;
- invalid scaffold arguments and duplicate IDs;
- missing human-review fields;
- candidates never entering customer selection;
- stale coverage/review artifacts;
- no-write behavior for discovery;
- and failures that leave authoritative files unchanged.

## Required verification

At minimum, run:

```sh
npm run build --prefix packages/carbon-react-migrate
npm run test --prefix packages/carbon-react-migrate
npm run validate:catalogue --prefix packages/carbon-react-migrate
npm run validate:migrations
npm run discover:migrations -- --from 159.0.0 --to 161.7.0
git diff --check
```

Run discovery twice and prove its generated outputs are byte-identical. Verify
that read-only discovery does not alter tracked customer or catalogue files.
Run all new targeted tests and validate every changed Markdown link.

## Scope boundaries

Do not:

- implement the Phase 6 customer pilot or publication decision;
- claim public support for `159.0.0`;
- claim the `159.0.0 → 161.7.0` catalogue is complete without reviewed
  evidence;
- use AI as a runtime or required discovery dependency;
- execute customer applications;
- fetch network evidence during normal discovery;
- add automatic Git hooks that modify or approve catalogue records;
- broaden codemods or customer transforms merely to increase record count;
- add dates or timestamps;
- infer organizational, security/license, release, or support approval;
- commit, push, or open a pull request.

## Phase completion and handoff

Near the end:

1. Create `migration-tooling/handoffs/PHASE_5.md` using the handoff template.
2. Update Phase 5 in `migration-tooling/IMPLEMENTATION_STATUS.md`.
3. Record implemented artifacts, interfaces, commands, evidence, decisions,
   limitations, leftovers, ownership, estimates, and next action.
4. Evaluate every Phase 5 exit criterion from `PLAN.md`.
5. Run the complete formal gate from `PHASE_GATES.md`.
6. Do not mark Phase 5 complete if candidates still lack required human review,
   a high-risk interval gap remains, or coverage evidence is unsupported.
7. Do not generate or implement Phase 6.

## Final report

Report:

1. Prerequisite gate result.
2. Files changed.
3. Commands and interfaces added.
4. Discovery mechanisms and exclusions.
5. Candidate/review/coverage counts.
6. Approved catalogue changes, if any, with review evidence.
7. Commands run and results.
8. Limitations and leftovers.
9. Formal Phase 5 gate outcome.
10. Whether Phase 6 may start.
