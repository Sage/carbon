# Migration discovery team review

The files in this directory are non-authoritative review artifacts. They help
the team find and assess possible migration work; they do not define supported
customer migrations.

Phase 5 semantic and codemod review is shared team work. The tooling implementor
and AI may prepare evidence, group duplicates, identify likely false positives,
and suggest classifications. They are not expected or authorized to approve
every component migration, replacement, version boundary, or codemod alone.

## Sources of truth

- `packages/carbon-react-migrate/src/catalogue.ts` is the authoritative
  machine-readable migration catalogue.
- `migration-tooling/generated/MIGRATION_REGISTER.md` is generated from approved
  catalogue records and must not be edited directly.
- `candidates.json` and `candidates.md` separate interval-qualified
  suggestions from `current-snapshot-unbounded` leads that still need reliable
  version evidence.
- `coverage.md` reports reviewed, unresolved, internal-only, ambiguous, and
  unsupported areas without claiming historical completeness.

Only an approved, complete catalogue record can affect customer `plan`,
`check`, or `apply` behavior.

## Shared responsibilities

| Responsibility                                                             | Reviewer                                |
| -------------------------------------------------------------------------- | --------------------------------------- |
| Confirm the affected public API and replacement or removal guidance        | Component or Carbon API owner           |
| Confirm `requiredBy` or `deprecatedIn` evidence and release applicability  | Carbon API and release reviewer         |
| Confirm whether automation is safe, partial, or manual                     | Codemod reviewer                        |
| Confirm customer checks, risks, documentation, and links                   | Documentation and component reviewer    |
| Maintain discovery, schemas, deterministic output, validation, and reports | Migration tooling implementor           |
| Confirm dependency, copied-source, license, and notice obligations         | Security/license reviewer               |
| Decide publication, support boundary, and customer pilot readiness         | Release, product, and support reviewers |

A reviewer may cover more than one area when they have the necessary knowledge,
but a passing automated check does not imply semantic or organizational
approval.

## Review in manageable batches

Do not assign the entire candidate inventory to one person. Review batches by a
stable boundary such as:

- component or public API area;
- release boundary;
- migration mechanism;
- named historical codemod;
- package or runtime requirement;
- or another deterministic ownership group.

Each batch should be small enough for its accountable reviewers to verify the
source evidence, customer action, version applicability, risks, and automation
safety.

## Candidate review

The generated inventory is a POC input for team review, not a database of
review decisions. Record only approved, complete migrations in `catalogue.ts`.
Do not edit generated candidate files or approve entries merely to reduce the
unresolved count.

## From candidate to catalogue

1. Run discovery for the selected interval:

   ```sh
   npm run discover:migrations -- --from 159.0.0 --to 161.7.0
   ```

2. Select a deterministic review batch and inspect its source, changelog,
   version, API, documentation, and historical-codemod evidence.
3. For an approved candidate, optionally scaffold a draft:

   ```sh
   npm run create:migration -- --id <id> --evidence <repository-file:line>
   ```

4. A developer completes and manually adds the reviewed typed record to
   `catalogue.ts`, using the
   [catalogue record reference](../CATALOGUE_RECORD_REFERENCE.md), with rules
   and tests when automation is approved.
5. Regenerate and validate:

   ```sh
   npm run generate:migration-register
   npm run validate:migrations
   git diff --check
   ```

6. Commit the API change, reviewed catalogue change, tests,
   documentation, and generated register together.

No Git hook or AI process automatically inserts or approves catalogue records.

## AI boundary

AI may:

- explain why candidates were produced;
- correlate repository-local evidence;
- propose deterministic grouping and disposition;
- identify likely duplicates, internal-only evidence, and missing information;
- prepare review summaries and tests;
- and suggest questions for accountable reviewers.

AI must not independently:

- approve replacement or removal guidance;
- decide public version applicability without reliable evidence;
- declare a codemod safe for customers;
- invent customer risks or verification steps;
- approve copied-source or license obligations;
- or make publication and support commitments.

Unreviewed work is Phase 6 pilot/release backlog. It does not invalidate the
completed Phase 5 discovery POC, but it must not be mistaken for supported
customer migration coverage.
