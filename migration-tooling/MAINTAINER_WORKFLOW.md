# Migration tooling maintainer workflow

The migration catalogue is the source of truth. The generated register is a
review aid, never an independently edited database.

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
