# carbon-react-migrate (provisional)

This private package contains Carbon's deterministic migration catalogue,
read-only diagnosis, safe application, and maintainer validation. It is locally executable for
implementation and pilot work; it is not published, and `159.0.0` is not a
public support baseline.

## Maintainer commands

For catalogue or public API changes, use the repository-level workflow:

```sh
npm run generate:migration-register
npm run validate:migrations
git diff --check
```

Commit the API change, catalogue record or reviewed exemption, and
`migration-tooling/generated/MIGRATION_REGISTER.md` together. The same
read-only validation command is prepared for CI but remains commented out
pending team review of the POC. See
[`migration-tooling/MAINTAINER_WORKFLOW.md`](../../migration-tooling/MAINTAINER_WORKFLOW.md)
for safe/manual authoring, stable migration IDs, review, and ownership.

Run these from the repository root after the normal root installation:

```sh
npm run migrate --prefix packages/carbon-react-migrate -- plan --from 159.0.0 --to 160.0.0
npm run migrate --prefix packages/carbon-react-migrate -- check --from 160.0.0 --to 161.0.0 <path>
npm run migrate --prefix packages/carbon-react-migrate -- check-deprecations <path>
npm run migrate --prefix packages/carbon-react-migrate -- apply --from 160.0.0 --to 161.0.0 <path>
npm run migrate --prefix packages/carbon-react-migrate -- apply-deprecations <path>
```

Add `--format json` for the version 1 report defined by
[`schema/report-v1.schema.json`](./schema/report-v1.schema.json). `plan` and
`check`/`apply` select required upgrade work only.
`check-deprecations`/`apply-deprecations` independently select optional
proactive cleanup. Application commands run only catalogue rules marked
`safe`; manual, partial, ambiguous, and unsupported findings are unchanged and
remain in the report. If a file contains any unsupported or ambiguous finding
for the selected track, the entire file is left unchanged so a safe edit cannot
obscure the unresolved conflict.

Use `--dry-run` with either application command to calculate, validate, and
report the same proposed changes without writing them:

```sh
npm run migrate --prefix packages/carbon-react-migrate -- \
  apply-deprecations <path> --dry-run
```

When the target is inside a Git worktree, application refuses all writes if
that worktree has tracked or untracked changes. Commit or stash them first.
`--allow-dirty` is the explicit override when the maintainer has independently
protected those changes. Dry runs are read-only and do not require the
override. If Git is unavailable or the target is outside a worktree,
application proceeds without Git protection and reports no stronger recovery
guarantee.

Application refuses source-file symbolic links, whether supplied directly or
found during a directory scan. This prevents atomic replacement from replacing
a link itself instead of safely updating its target. The link and target remain
unchanged. Planned targets are checked again immediately before replacement.

All files are parsed and all proposed outputs are reparsed before the first
write. Writes use same-directory atomic replacements with rollback of already
replaced files after a reported write failure. Formatting and comments are
preserved through Recast where possible. Run project-specific formatting and
verification explicitly after review; the CLI never executes customer scripts.

For machine-readable output, use the silent maintainer form so stdout contains
only JSON:

```sh
npm run --silent migrate --prefix packages/carbon-react-migrate -- \
  plan --from 159.0.0 --to 160.0.0 --format json
```

Alternatively, build once and invoke the local CLI directly:

```sh
npm run build --prefix packages/carbon-react-migrate
node packages/carbon-react-migrate/dist/cli.js \
  plan --from 159.0.0 --to 160.0.0 --format json
```

Exit code 1 indicates findings or proposed/applied work and still emits a
complete, schema-valid JSON report. Consumers must parse stdout even when the
process exits with 1.

`--from` may be omitted for `plan` and `check` when an installed
`node_modules/carbon-react/package.json` can be found from the scan path or an
ancestor. `--to` is always required for those commands. Only one exact Phase 1
tested boundary is accepted; unsupported direct jumps report the exact
reachable intermediate path.

`plan` accepts no positional path. All check/apply commands accept zero or one
positional path and default to `.`. Deprecation commands reject `--from` and
`--to`; `--dry-run` and `--allow-dirty` are application-only. Duplicate
options, missing option values, unknown options, and excess positional
arguments are invalid input.

Schema v1 now exposes optional, backward-compatible `changelog` and
`migrationSkill` links where authoritative repository files exist. Missing
link types remain absent rather than receiving invented URLs. `deprecatedIn`
remains authoritative and independent from `requiredBy`; the register does not
maintain calendar dates.

## Exit codes

| Code | Meaning                                               |
| ---: | ----------------------------------------------------- |
|    0 | Successful run with no supported findings or edits    |
|    1 | Successful run with findings or proposed/applied work |
|    2 | Invalid input or unsupported upgrade path             |
|    3 | Malformed supported source file                       |
|    4 | Internal failure                                      |

## Supported detection

- JavaScript, JSX, TypeScript, and TSX are parsed without executing code.
- Root-package named imports and the documented component paths used by the
  catalogue are resolved with local aliases.
- Direct JSX prop/component uses and imported `ButtonHandle` type references
  are detected.
- Conflicting props and spreads in the selected deprecation rules are reported
  as unsupported rather than safe.

Wrappers, arbitrary re-exports, dynamic or computed imports/components,
runtime-generated props, spread-only target props, and malformed or shadowed
patterns are not safe matches. Some unsupported architectures cannot be
identified statically. No finding or warning-free run proves migration
completeness. Read-only commands never write customer source; application
changes only the conflict-free StepSequenceItem and DialogFullScreen subsets.
