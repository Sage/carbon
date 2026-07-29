# Phase 4 evidence

## Dependency, security, license, size, and compatibility review

The migration package declares `jscodeshift` `^17.4.0` and `semver` `^7.5.4`.
The repository root lockfile resolves them as jscodeshift 17.4.0 (MIT) and
semver 7.7.4 (ISC), with Recast 0.23.11 (MIT) as the transform engine.
Maintainer validation binds these declared ranges, resolved versions, and
licenses to `OPEN_SOURCE_PROVENANCE.md`, and requires a non-empty notice
disposition naming the migration dependencies. Stale provenance and empty
notices fail. The jscodeshift engine floor is Node 16, below the repository CI
Node 22/24 matrix.

`npm audit --omit=dev --offline --json` reported zero known production
vulnerabilities. This is an offline audit against locally available advisory
data, not a fresh registry or organizational security approval.

Installed directory measurements from `du -sk` were 884 KiB for jscodeshift,
392 KiB for Recast, 264 KiB for semver, and 244 KiB for compiled migration
output. These are filesystem measurements, not compressed publication size or
a customer installation promise.

`npm run validate:migrations` scanned 320 explicit marker occurrences across
1,637 source files. Marker extraction is restricted to public `@deprecated`
annotations, production `Logger.deprecate(...)` calls, and explicit
`migration-breaking-change` markers; ordinary wording and test/story/Playwright
files are excluded, as is `__internal__` implementation source. The scanner
also excludes dependencies, generated outputs, build artifacts, coverage, and
Storybook output. This is a repository performance observation, not a customer
SLA.

No accountable security/license reviewer or publication/support owner is named
by repository evidence. The package remains private. The implementation owner
completed the evidence review, but organizational approval is still required
before publication.

## Rich metadata decision

Schema v1 gained only optional `changelog` and `migrationSkill` strings in
migration summaries. Existing required properties and exit semantics are
unchanged, and actual reports still validate. Catalogue entries link to
authoritative `CHANGELOG.md` release headings and the repository Carbon skill.
No separate public component/prop URL or release date was invented. The
generated register states honestly when optional metadata is absent.

## Ownership status

Implementation and CI configuration are owned by the current implementor.
Accountable Carbon API/catalogue, codemod, documentation, security/license,
release publication, and support owners are not confirmed in repository
evidence. Their assignment is a Phase 5 publication prerequisite; it does not
invalidate the private Phase 4 maintainer workflow.
