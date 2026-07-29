# Phase 2 handoff: Read-only CLI and deprecation diagnosis

- Phase: 2
- Status: complete
- Formal gate outcome: `complete-with-deferred-work`
- Completed: yes, after correctness repair and formal gate re-evaluation
- Implementation owner: current project implementor
- Reviewers and approvals: current implementor with AI evidence review;
  implementation/pilot approval retained; later publication, support, and pilot
  approvals remain deferred
- Plan reference: [Phase 2](../PLAN.md#phase-2-read-only-cli-and-deprecation-diagnosis)
- Status reference: [Phase 2 status](../IMPLEMENTATION_STATUS.md#phase-2-read-only-cli-and-deprecation-diagnosis)

## Outcome

The provisional package provides deterministic, read-only `plan`, `check`, and
`check-deprecations` commands. They preserve Phase 1 track and tested-boundary
behavior, parse supported source without executing it, share one detector, and
emit stable human or JSON schema-version-1 reports.

## Delivered artifacts

| Artifact                                                                           | Purpose                                 | Stability | Owner                  |
| ---------------------------------------------------------------------------------- | --------------------------------------- | --------- | ---------------------- |
| [CLI](../../packages/carbon-react-migrate/src/cli.ts)                              | Commands, versions, reports, exits      | internal  | current implementor    |
| [Shared detector](../../packages/carbon-react-migrate/src/detector.ts)             | jscodeshift/Recast match contract       | internal  | implementor, API owner |
| [Scanner](../../packages/carbon-react-migrate/src/scanner.ts)                      | Stable traversal and ordering           | internal  | current implementor    |
| [Report contract](../../packages/carbon-react-migrate/src/report.ts)               | Output fields and track labels          | internal  | current implementor    |
| [JSON schema v1](../../packages/carbon-react-migrate/schema/report-v1.schema.json) | Machine-readable contract               | internal  | current implementor    |
| [Tests](../../packages/carbon-react-migrate/src/cli.test.ts)                       | Detection, determinism, no-write, exits | internal  | current implementor    |
| [Fixtures](../../packages/carbon-react-migrate/test/fixtures)                      | Language and failure coverage           | internal  | current implementor    |
| [Guide](../../packages/carbon-react-migrate/README.md)                             | Commands and limitations                | internal  | current implementor    |

## Interfaces and contracts

- Run `npm run migrate --prefix packages/carbon-react-migrate -- <command>`.
- `plan` and `check` require `--to`; `--from` may be detected from an installed
  `carbon-react` or supplied explicitly.
- `check-deprecations` independently selects optional proactive cleanup.
- `--format json` declares `schemaVersion: 1`; human output is the default.
- Machine consumers use
  `npm run --silent migrate --prefix packages/carbon-react-migrate -- ... --format json`
  or invoke the built `dist/cli.js` directly. Stdout is JSON only, including
  when findings produce exit code 1.
- Exit codes: 0 no findings, 1 findings, 2 invalid/unsupported path, 3 malformed
  source, 4 internal failure.
- `plan` rejects positional paths; `check` and `check-deprecations` accept zero
  or one path and default to `.`. Deprecation checks reject version options.
  Missing/option-like values, duplicates, unknown options, and excess paths are
  invalid input.
- Findings order by normalized file, line, column, and migration ID.
- Unsupported direct jumps preserve the exact Phase 1 intermediate path.
- Every Phase 2 command is read-only.

## Decisions

- `P2-D1`: add jscodeshift `17.4.0` and its type declarations to implement the
  approved Phase 0 jscodeshift/Recast architecture.
- `P2-D2`: conflicts/spreads are unsupported findings; shadowed and unrelated
  identifiers are non-matches.
- `P2-D3`: Button detection supports directly imported `ButtonHandle` type
  references, avoiding unsafe broad call inference.
- `P2-D4`: schema v1 retains only stable migration-guidance links. Phase 4 owns
  reviewed component/prop docs, changelog, Migration Skill, and
  replacement/removal metadata via optional v1 fields or a new version. Dates
  must be derived; `deprecatedIn` remains authoritative.
- `P2-D5`: use silent npm or direct built invocation for clean JSON; findings
  exit 1 still emits a complete report.
- `P2-D6`: declare Ajv directly in both provisional dependency contracts
  because schema tests import it; never depend on a transitive hoisted copy.

## Controlled plan changes

None. This handoff follows the current `PLAN.md`.

## Verification evidence

| Requirement or exit criterion                                                                                  | Result | Command, review, or evidence                                        |
| -------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------- |
| Fixtures, schema validation, arguments, clean JSON, malformed source, deterministic snapshots, exits, no-write | pass   | `npm run test --prefix packages/carbon-react-migrate` (27/27)       |
| Catalogue/path contract                                                                                        | pass   | `npm run validate:catalogue --prefix packages/carbon-react-migrate` |
| Schema-validator dependency                                                                                    | pass   | `npm ls ajv --depth=0` reports declared Ajv `8.18.0`                |
| Lint                                                                                                           | pass   | `npx eslint packages/carbon-react-migrate/src --max-warnings=0`     |
| Formatting                                                                                                     | pass   | package Prettier check; intentionally malformed fixture excluded    |
| Handoff integrity                                                                                              | pass   | handoff-link validator                                              |
| Diff integrity                                                                                                 | pass   | `git diff --check`                                                  |
| Formal gate                                                                                                    | pass   | [Phase 2 gate](../IMPLEMENTATION_STATUS.md#formal-phase-gate)       |

## Supported scope

Exact tested boundaries; independent tracks; JS/JSX/TS/TSX; supported root
named and documented component-path imports; aliases; direct JSX props and
components; direct `ButtonHandle` type references; stable reports and repeated
read-only runs.

## Unsupported scope and limitations

Wrappers, arbitrary re-exports, dynamic/computed imports or JSX,
runtime-generated props, spread-only targets, and broader ref flow are
unsupported. Some unsupported architecture cannot be safely identified.
Manual CSS/npm records remain plan guidance without invented source matches.
Zero findings never proves completion. No apply, writes, backups, dirty-tree
handling, or dry-run writes exist. The package remains private and provisional.
Schema v1 intentionally does not invent public component/prop, changelog,
Migration Skill, replacement/removal, or release-date metadata.

## Open leftovers

| ID      | Classification     | Risk                                          | Target phase | Owner or ownership area            |
| ------- | ------------------ | --------------------------------------------- | ------------ | ---------------------------------- |
| `P0-L3` | required-follow-up | dependency evidence can stale                 | Phase 4      | security/release owner             |
| `P0-L6` | required-follow-up | no pilot/public-support decision              | Phase 6      | product/support/release reviewers  |
| `P0-L7` | required-follow-up | publication ownership absent                  | Phase 4      | tooling/security/release owners    |
| `P2-L1` | required-follow-up | check/apply could diverge                     | Phase 3      | implementor, codemod reviewer      |
| `P2-L3` | required-follow-up | richer links require authoritative extraction | Phase 4      | Carbon API/docs owner, implementor |

## Prerequisites for the next phase

- The Phase 2 gate must permit proceeding.
- Phase 3 must reuse the detector and report/track semantics.
- Phase 3 must satisfy its conflict, atomicity, dirty-tree, idempotency, and
  dry-run requirements without implying publication approval.

## Recommended next action

Generate a Phase 3 prompt in a separate task from the current plan, ledger, and
this handoff. No Phase 3 prompt was generated here.

## Files to read first

- `packages/carbon-react-migrate/src/detector.ts` — match contract.
- `packages/carbon-react-migrate/src/report.ts` — output contract.
- `packages/carbon-react-migrate/src/cli.ts` — command behavior.
- `packages/carbon-react-migrate/src/cli.test.ts` — supported boundaries.

## Handoff integrity

- [x] All links resolve.
- [x] Delivered artifacts exist.
- [x] Status and gate outcome match `IMPLEMENTATION_STATUS.md`.
- [x] Decisions and leftovers use stable IDs.
- [x] Verification evidence is reproducible.
- [x] Unsupported scope and risks are explicit.
- [x] Required approvals are recorded and not inferred.
- [x] The next phase can proceed without relying on chat history.
