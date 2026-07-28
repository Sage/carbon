# carbon-react-migrate (provisional)

This private package contains Carbon's deterministic migration catalogue and
read-only Phase 2 CLI. It is locally executable for implementation and pilot
work; it is not published, and `159.0.0` is not a public support baseline.

## Maintainer commands

Run these from the repository root after the normal root installation:

```sh
npm run migrate --prefix packages/carbon-react-migrate -- plan --from 159.0.0 --to 160.0.0
npm run migrate --prefix packages/carbon-react-migrate -- check --from 160.0.0 --to 161.0.0 <path>
npm run migrate --prefix packages/carbon-react-migrate -- check-deprecations <path>
```

Add `--format json` for the version 1 report defined by
[`schema/report-v1.schema.json`](./schema/report-v1.schema.json). `plan` and
`check` select required upgrade work only. `check-deprecations` independently
selects optional proactive cleanup.

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

Exit code 1 indicates findings and still emits a complete, schema-valid JSON
report. Consumers must parse stdout even when the process exits with 1.

`--from` may be omitted for `plan` and `check` when an installed
`node_modules/carbon-react/package.json` can be found from the scan path or an
ancestor. `--to` is always required for those commands. Only one exact Phase 1
tested boundary is accepted; unsupported direct jumps report the exact
reachable intermediate path.

`plan` accepts no positional path. `check` and `check-deprecations` accept zero
or one positional path and default to `.`. Deprecation checks reject `--from`
and `--to`; duplicate options, missing option values, unknown options, and
excess positional arguments are invalid input.

Schema v1 exposes the repository-owned stable migration-guidance link. Public
component/prop documentation, changelog, Migration Skill, replacement/removal,
and release-date metadata are not invented in Phase 2. Phase 4 will add
reviewed extracted links through backward-compatible optional fields or a new
schema version. `deprecatedIn` remains authoritative; any date must be derived
from release or Git metadata rather than manually maintained.

## Exit codes

| Code | Meaning                                             |
| ---: | --------------------------------------------------- |
|    0 | Successful read-only run with no supported findings |
|    1 | Successful read-only run with one or more findings  |
|    2 | Invalid input or unsupported upgrade path           |
|    3 | Malformed supported source file                     |
|    4 | Internal failure                                    |

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
completeness. These Phase 2 commands never write customer source.
