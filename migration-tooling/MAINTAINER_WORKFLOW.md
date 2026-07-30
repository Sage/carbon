# Migration tooling maintainer workflow

The migration catalogue is the source of truth. The generated register is a
review aid, never an independently edited database.

Use
[`CATALOGUE_RECORD_REFERENCE.md`](./CATALOGUE_RECORD_REFERENCE.md)
for every allowed scope, kind, subject, guidance, risk, automation, and API
reference variant, with selection rules and copyable examples.

## Discover and review possible work

Run `npm run discover:migrations -- --from <version> --to <version>` while
preparing a release or auditing an interval. It reads local changelog sections,
explicit public markers, current package requirements, and catalogue
correlations. It does not use the network, customer code, telemetry, or AI.
Outputs under `migration-tooling/discovery/` are non-authoritative and
byte-stable. Confidence describes evidence correlation, not correctness.
Missing evidence and unsupported mechanisms remain explicit.

Review discovery work using the shared ownership, batching, decision, and AI
boundaries in
[`discovery/README.md`](./discovery/README.md). The complete inventory is not
assigned to the tooling implementor alone.

The generated candidate inventory is a POC review input, not a decision store.
Reviewers add only approved, complete migrations to the authoritative
catalogue. AI may correlate evidence but cannot approve semantics.

Current-tree markers without reliable changelog, tag/diff, catalogue, or other
version evidence are reported as `current-snapshot-unbounded`; they are useful
inventory leads but are not qualified for the requested interval. Explicit
internal-only wording and styled/private implementation subjects cannot
independently create customer migration candidates.

Use `npm run create:migration -- --id <id> [--scope upgrade|deprecation]
[--required-by <version>] [--deprecated-in <version>] [--evidence <value>]`
to create a reviewable draft. `requiredBy` and `deprecatedIn` are independent.
The scaffold never invents missing semantics or edits `catalogue.ts`.

After accountable review, a developer manually adds only an approved and
complete typed record to `catalogue.ts`, adds rule/tests when applicable, and
regenerates the register. No Git hook inserts or approves migrations because
approval requires human semantic responsibility. `npm run
validate:migrations` detects stale discovery artifacts as well as the
existing catalogue, register, marker, provenance, and fixture failures.

## Add a safe migration

1. Add one typed catalogue record with a stable lowercase migration ID,
   authoritative `deprecatedIn` and/or independent `requiredBy`, guidance,
   API references, risks, and `automation.status: "safe"`.
2. Register the named rule and implement detection and transformation through
   the shared detector evidence. Add positive, negative, ambiguous, and
   idempotency fixtures.
3. Put `migration-id: <id>` in the public `@deprecated` annotation and runtime
   warning. This lets enforcement connect both source channels to the record.
4. Run `npm run generate:migration-register`, then
   `npm run validate:migrations`, then `git diff --check`.
5. Review catalogue semantics, codemod safety, documentation, schema
   compatibility, generated output, and customer verification steps.

## Add a manual migration

Follow the same workflow, but set `automation.status: "manual"` with an exact
reason and do not register a transform. Document replacement or explicit
removal guidance, limitations, manual checks, and risks. A manual record must
still be linked from source annotations or runtime warnings by migration ID.

## Enforced marker conventions

Validation intentionally recognizes only explicit public migration signals:

- a public `@deprecated` annotation;
- a production `Logger.deprecate(...)` call, including its multiline message;
- an intentional `migration-breaking-change` marker.

Put `migration-id: <catalogue-id>` in the recognized annotation, warning call,
or breaking-change marker. Ordinary prose containing words such as
“deprecation” or “breaking change”, `__internal__` implementation source, and
test/story/Playwright source is not a public marker. This avoids requiring
exemptions for internal implementation, discussion, and test descriptions.

## Reviewed exemptions

An exemption requires a stable ID, reason, exact scope, ownership area, review
evidence, and a digest bound to the reviewed marker inventory. It is for
pre-existing or intentionally non-public migration work, not a shortcut around
catalogue authoring. Its scope must be exactly
`unreferenced-marker-inventory:<inventoryDigest>`. Invalid, broad, stale,
unused, or missing-evidence exemptions fail validation.

Regenerate the register whenever deprecation, removal, replacement guidance,
automation status, documentation links, supported boundaries, or exemptions
change. Commit the API change, catalogue or exemption, and generated register
together. Validation is read-only and fails on stale output.

The register's byte layout is owned by its deterministic generator. Do not run
Prettier or edit it independently; regenerate it with
`npm run generate:migration-register`.

## Ownership and review

The current implementor owns implementation. Repository evidence does not name
accountable people or teams for Carbon API/catalogue, codemod, documentation,
security/license, CI, release publication, or support review. Those ownership
areas must be assigned before publication; do not infer approval from a passing
check. Changes to transformation dependencies or copied open-source code
require security and license/provenance review.
