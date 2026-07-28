# Phase 3 handoff: Safe application

- Phase: 3
- Status: complete
- Formal gate outcome: `complete-with-deferred-work`
- Completed: yes
- Implementation owner: current project implementor
- Reviewers and approvals: current implementor with AI evidence review;
  implementation/pilot approval retained; publication, support, dependency,
  richer-link, and pilot approvals remain assigned to later phases
- Plan reference: [Phase 3](../PLAN.md#phase-3-safe-application)
- Status reference: [Phase 3 status](../IMPLEMENTATION_STATUS.md#phase-3-safe-application)

## Outcome

The provisional CLI now provides safe `apply` and `apply-deprecations` commands
with `--dry-run`. The two selected safe deprecation codemods consume the exact
shared detector matches used by `check`, while required-upgrade records remain
manual or partial and are reported without edits. Application prepares and
reparses every output before writing, rejects dirty Git worktrees unless
explicitly overridden, and uses same-directory atomic replacement with
transaction rollback for reported write failures. When multiple eligible
`DialogFullScreen` JSX elements share one supported import, application rewrites
that import declaration exactly once and updates every matched JSX opening
element. Application refuses source-file symbolic links before parsing or
writing so atomic replacement cannot destroy a link or unexpectedly update its
target.

## Delivered artifacts

| Artifact                                                                                | Purpose                                                              | Stability | Owner                         |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------- | ----------------------------- |
| [Phase 3 prompt](../prompts/PHASE_3.md)                                                 | Generated implementation contract                                    | internal  | current implementor           |
| [Application engine](../../packages/carbon-react-migrate/src/application.ts)            | Named codemods, planning, Git guard, atomic transaction              | internal  | implementor, codemod reviewer |
| [Shared detector](../../packages/carbon-react-migrate/src/detector.ts)                  | Findings and exact safe-edit evidence                                | internal  | implementor, API owner        |
| [CLI](../../packages/carbon-react-migrate/src/cli.ts)                                   | Application commands, options, reports, exits                        | internal  | current implementor           |
| [Report contract](../../packages/carbon-react-migrate/src/report.ts)                    | Application report types                                             | internal  | current implementor           |
| [JSON schema v1](../../packages/carbon-react-migrate/schema/report-v1.schema.json)      | Backward-compatible application fields and commands                  | internal  | current implementor           |
| [Application safety tests](../../packages/carbon-react-migrate/src/application.test.ts) | Equivalence, idempotency, conflicts, Git, and write-failure coverage | internal  | current implementor           |
| [Schema tests](../../packages/carbon-react-migrate/src/report-schema.test.ts)           | Actual application-report validation                                 | internal  | current implementor           |
| [Guide](../../packages/carbon-react-migrate/README.md)                                  | Commands, protection, limitations, and verification workflow         | internal  | current implementor           |

## Interfaces and contracts

- `apply --from <version> --to <version> [path]` selects only safe required
  upgrade records. The current required-upgrade slice contains manual and
  partial records, so it reports them and makes no automatic edit.
- `apply-deprecations [path]` selects only safe optional cleanup records and can
  replace supported conflict-free `StepSequenceItem ariaLabel` and documented
  component-path `DialogFullScreen` usages.
- `--dry-run` is accepted only by application commands. It performs the same
  complete planning and transformed-output validation and emits the same
  `changes` array without writing.
- `--allow-dirty` is the explicit application-only override for dirty Git
  worktrees. Without it, any tracked or untracked worktree change prevents
  writes. Dry runs do not require the override.
- When Git is unavailable or the target is outside a Git worktree, validated
  atomic application proceeds without Git protection.
- JSON remains `schemaVersion: 1`. Application reports add required `dryRun`
  and `changes`, plus `summary.changeCount`; existing read-only reports remain
  valid.
- `changes` order by normalized file and contain ordered migration IDs plus
  deterministic before/after SHA-256 hashes.
- Existing exit codes remain: 0 no findings/edits, 1 findings or
  proposed/applied work, 2 invalid input/path or dirty-worktree refusal, 3
  malformed source, 4 internal/transformation/write failure.
- A directly supplied or directory-discovered source-file symbolic link is
  invalid application input. Exit 2 is returned and both link and target remain
  unchanged. Planned targets are checked again immediately before the write
  transaction.
- A file containing an ambiguous or unsupported selected finding is quarantined
  from all automatic edits and remains byte-for-byte unchanged.
- All source is parsed before the first write. Every transformed output is
  reparsed and checked for the applied-rule postcondition. Source drift between
  planning and writing aborts before replacement.
- Replacement files are created in the target directory, modes are preserved,
  and already replaced files are restored if a reported later replacement
  fails.
- Named and default aliased `DialogFullScreen` imports may serve multiple
  eligible JSX elements. The local alias is preserved, the shared import is
  rewritten once, and every detector-backed JSX occurrence receives
  `size="fullscreen"`.

## Decisions

- `P3-D1`: detector matches now include an internal safe-edit descriptor.
  Read-only findings and transformations therefore use one import/scope/JSX
  matcher rather than independent check and codemod matchers.
- `P3-D2`: quarantine an entire file when the selected track contains an
  unsupported or ambiguous finding in that file.
- `P3-D3`: refuse a dirty Git worktree by default, expose only the explicit
  `--allow-dirty` override, and permit read-only dry runs regardless of Git
  state.
- `P3-D4`: extend schema v1 backward-compatibly with application commands and
  optional application properties rather than changing existing read-only
  report fields or semantics.
- `P3-D5`: group DialogFullScreen import rewrites by shared AST import
  declaration identity while retaining one JSX edit per shared-detector match.
  This resolves the P1 stale-specifier failure without broadening detection.
- `P3-D6`: refuse application through source-file symbolic links instead of
  following them or atomically replacing the link itself.

## Controlled plan changes

- `PLAN-001` remains preserved.
- No Phase 3 plan change was required.

## Verification evidence

| Requirement or exit criterion            | Result | Command, review, or evidence                                                                  |
| ---------------------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| Full build and automated suite           | pass   | `npm run test --prefix packages/carbon-react-migrate` (42/42)                                 |
| Catalogue and registered-rule validation | pass   | `npm run validate:catalogue --prefix packages/carbon-react-migrate` (5 records, 4 boundaries) |
| TypeScript lint                          | pass   | `npx eslint packages/carbon-react-migrate/src --max-warnings=0`                               |
| Formatting                               | pass   | Phase 3 Prettier check                                                                        |
| Handoff integrity                        | pass   | handoff-link validator (12 links)                                                             |
| Diff integrity                           | pass   | `git diff --check`                                                                            |
| Formal gate                              | pass   | [Phase 3 gate](../IMPLEMENTATION_STATUS.md#phase-3-safe-application)                          |

## Supported scope

The Phase 2 language, import, alias, JSX, location, ordering, and track scope is
retained. Safe application covers the direct conflict-free
`StepSequenceItem.ariaLabel` rename and documented component-path
`DialogFullScreen` replacement. Both preserve local aliases and use Recast
printing. Supported named/default aliased DialogFullScreen imports can be
shared by multiple eligible JSX elements; one import rewrite serves every
matched use. Clean/dirty Git, explicit override, non-Git, dry-run, schema-valid
JSON, repeated application, malformed source, source drift, and reported
replacement failure have deterministic behavior. Source-file symbolic links
are refused unchanged.

## Unsupported scope and limitations

Manual CSS/npm work and partial Button ref/type migration remain unchanged.
Wrappers, arbitrary re-exports, dynamic/computed imports or JSX,
runtime-generated props, spread/conflicting props, type-only or
multi-specifier DialogFullScreen imports, and malformed source are not
automatically edited. Source-file symbolic links are refused rather than
followed. Unsupported findings quarantine their file. Some
unsupported architecture cannot be identified statically. No run proves an
upgrade complete. The CLI does not run customer formatters, builds, tests, or
dependency installation. Atomic replacement prevents partial file contents and
reported failures roll back the transaction; abrupt process or operating-system
termination between separate file replacements can still leave a valid
file-level subset applied. The package remains private and provisional.

## Open leftovers

| ID      | Classification     | Risk                                          | Target phase | Owner or ownership area            |
| ------- | ------------------ | --------------------------------------------- | ------------ | ---------------------------------- |
| `P0-L3` | required-follow-up | dependency evidence can stale                 | Phase 4      | security/release owner             |
| `P0-L6` | required-follow-up | no pilot/public-support decision              | Phase 5      | product/support/release reviewers  |
| `P0-L7` | required-follow-up | publication ownership absent                  | Phase 4      | tooling/security/release owners    |
| `P2-L3` | required-follow-up | richer links require authoritative extraction | Phase 4      | Carbon API/docs owner, implementor |

`P2-L1` is resolved by the shared safe-edit evidence, CLI check/dry-apply
equivalence, registry, ambiguity/conflict, and idempotency tests.

## Prerequisites for the next phase

- The Phase 3 formal gate must permit proceeding.
- Phase 4 must accept `P0-L3`, `P0-L7`, and `P2-L3`.
- Phase 4 must preserve application/report compatibility and must not imply
  publication approval before its ownership, dependency, security, and
  provenance work is complete.

## Recommended next action

Phase 4 may begin from the current plan and this handoff, but its detailed
prompt must be generated in a separate task; no Phase 4 prompt was generated
here.

## Files to read first

- `packages/carbon-react-migrate/src/application.ts` — safe planning and write
  contract.
- `packages/carbon-react-migrate/src/detector.ts` — shared match/edit evidence.
- `packages/carbon-react-migrate/src/application.test.ts` — safety guarantees.
- `packages/carbon-react-migrate/schema/report-v1.schema.json` — machine
  contract.

## Handoff integrity

- [x] All links resolve.
- [x] Delivered artifacts exist.
- [x] Status and gate outcome match `IMPLEMENTATION_STATUS.md`.
- [x] Decisions, plan changes, and leftovers use stable IDs.
- [x] Verification evidence is reproducible.
- [x] Unsupported scope and risks are explicit.
- [x] Required approvals are recorded and not inferred.
- [x] The next phase can proceed without relying on chat history.
