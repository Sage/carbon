# Carbon deterministic migration tooling implementation plan

Implementation progress is tracked in
[`IMPLEMENTATION_STATUS.md`](./IMPLEMENTATION_STATUS.md). Every phase transition
must pass the formal review defined in
[`PHASE_GATES.md`](./PHASE_GATES.md). Do not begin a later phase or generate its
detailed prompt before the preceding gate permits it.

## Controlled plan evolution

Implementation evidence may require this plan to change. Plan evolution is
allowed, but it must be explicit, evidence-backed, and reviewed. `PLAN.md`
remains the single authoritative plan.

No implementation agent may silently change phase scope, exit criteria,
architecture, supported customer behavior, safety guarantees, ownership,
sequence, or estimates.

### Change triggers

Propose a plan change when:

- repository or customer evidence contradicts a plan assumption;
- a required deliverable or exit criterion is infeasible or insufficient;
- implementation exposes a correctness, destructive-edit, security, licensing,
  compliance, accessibility, or support risk;
- a new dependency or public interface is required;
- work affects multiple later phases;
- a required task does not have an appropriate owning phase;
- phase ordering or prerequisites are incorrect;
- effort differs materially from the estimate;
- or the supported MVP boundary must expand or contract.

Do not change the plan merely to make incomplete implementation appear complete.

### Change classifications

#### Clarification

A clarification improves wording without changing required behavior, scope,
deliverables, exit criteria, ownership, phase order, or estimates.

It may be applied during the current phase, but the current phase status must
describe its effect.

#### Minor adjustment

A minor adjustment changes implementation detail within the existing goal and
phase boundary, does not change a public interface or safety guarantee, affects
only one phase, and is expected to require no more than two working days.

It may be proposed and applied in the current phase after documenting evidence,
impact, and verification. The formal phase gate must review it.

#### Material revision

A material revision includes any change that:

- changes the goal, MVP boundary, supported migration behavior, or product
  promise;
- changes architecture or a public interface;
- weakens or replaces an exit criterion or safety guarantee;
- affects multiple phases or their ordering;
- adds a new production dependency with meaningful maintenance, security, or
  licensing impact;
- changes required ownership or approval;
- adds more than two working days;
- or creates, removes, merges, or substantially changes a phase.

A material revision requires `plan-revision-required` or
`remediation-phase-required`. Do not continue affected implementation until the
revision is reviewed and the plan, status ledger, and relevant prompt are
updated.

### Change proposal

While a change is under review, document its classification, trigger, evidence,
affected phases, customer and safety effects, ownership, estimate impact, and
required verification in the current phase's `### Decisions` or
`### Deviations from plan` section in `IMPLEMENTATION_STATUS.md`.

After approval, incorporate the result into this plan, update every affected
status, handoff, prompt, estimate, and leftover, and remove obsolete comparison
wording. Git history retains the review history; committed documentation
describes one current plan.

### Change procedure

1. Stop work that depends on the disputed assumption when continuing could
   create rework or safety risk.
2. Document the trigger, evidence, classification, affected phases, risks,
   owners, and estimate impact while the proposal is reviewed.
3. Decide whether unaffected work can continue safely.
4. For a clarification or minor adjustment, update this plan and the status
   ledger, then verify the change during the current phase gate.
5. For a material revision, set the gate outcome to
   `plan-revision-required` or `remediation-phase-required`.
6. Obtain required human or organizational decisions. An AI agent may recommend
   a change but cannot invent product, API, design, accessibility, security,
   legal/compliance, support, or release approval.
7. Apply the approved change to this single current plan.
8. Update affected phase references, prerequisites, tasks, deliverables, exit
   criteria, estimates, leftovers, and prompts.
9. Re-run the formal gate for any phase whose completion claim was affected.
10. Generate later phase prompts only from the current plan.

### Additional and remediation phases

Name an inserted phase using the nearest parent phase, for example `Phase 2A`.
Define its objective, prerequisites, tasks, out-of-scope work, deliverable, exit
criteria, estimate, ownership, and effect on later phases.

Creating an additional phase must not silently defer an existing exit criterion.
The proposal must explain whether affected work is moved, split, added, or
removed and why.

### Approval boundary

AI may independently apply clarifications and propose minor or material changes.
AI may apply a minor adjustment only when repository evidence is sufficient and
no accountable approval listed above is required.

Human or accountable organizational approval is required before changing:

- the customer-facing product promise;
- supported migration or version boundaries;
- automatic-safety classification;
- accessibility or design intent;
- licensing or compliance decisions;
- package publication, ownership, or support commitments;
- security posture;
- or release criteria.

## Phase handoff artifacts

Every phase must produce a durable handoff before it can use a complete gate
outcome. Use [`HANDOFF_TEMPLATE.md`](./HANDOFF_TEMPLATE.md) and save the result
as:

```text
migration-tooling/handoffs/PHASE_<number>.md
```

For inserted phases, preserve the suffix, for example
`migration-tooling/handoffs/PHASE_2A.md`.

The handoff is a navigation and contract document, not a replacement for source
code, tests, decision records, verification logs, or the implementation ledger.
It must link to those durable artifacts.

### Required handoff content

Each handoff must record:

- phase status, owner, reviewers, and formal gate outcome;
- the concrete result the next phase may rely on;
- delivered artifacts and their stability;
- interfaces, schemas, commands, formats, and failure behavior exposed to later
  phases;
- decisions and any current-plan deviations;
- every exit criterion and its verification evidence;
- supported scope, unsupported scope, and limitations;
- every open leftover by stable ID, classification, risk, target phase, and
  owner or ownership area;
- prerequisites for the next phase;
- one recommended next action;
- and the smallest set of files the next task should read first.

### Handoff rules

- Create the handoff near the end of the phase, after implementation evidence is
  available and before the formal gate concludes.
- Do not record calendar dates or timestamps in plan, status, prompt, handoff,
  or committed generated-evidence files. Use phase status, Git history, source
  revisions, dependency versions, and reproducible commands for chronology and
  provenance.
- Keep detailed evidence in its authoritative artifact and link to it rather
  than copying large content.
- Use repository-relative links so handoffs work across environments.
- Do not rely on chat transcripts or ephemeral summaries.
- Do not claim an artifact, interface, verification, approval, or supported
  behavior that cannot be confirmed.
- A handoff with unresolved required fields is incomplete.
- Update a handoff when a later plan change, remediation, or resolved leftover
  changes what another phase may rely on.
- Preserve prior decisions and limitations; mark superseded information rather
  than silently deleting its history.
- The handoff, status ledger, plan, and formal gate must agree.
- Generate the next phase prompt from the current plan, status ledger, and
  handoff—not from chat history.

### Completion boundary

A phase cannot use `complete-and-proceed` or
`complete-with-deferred-work` unless:

- its handoff exists and passes the integrity checklist;
- all linked required artifacts exist;
- its formal gate validates the handoff;
- and the next phase's prerequisites and open leftovers are accurately stated.

## Goal

Deliver a small, dependable migration workflow that helps customers upgrade
`carbon-react` without requiring AI.

Given a customer project, current Carbon version, and target Carbon version, the
workflow must:

1. List known migrations that fall within the requested version interval.
2. Detect supported usages of affected Carbon APIs.
3. Apply only deterministic, tested transforms.
4. Report manual work, risks, unsupported patterns, and verification steps.
5. Produce stable machine-readable output that optional AI tools can explain
   without participating in detection or transformation.

The workflow must never claim that an upgrade is complete solely because a scan
or codemod returned no findings.

## Product decision

Build a public, deterministic Node CLI backed by a reviewed, versioned migration
catalogue.

The initial CLI commands should be:

```shell
npx carbon-react-migrate plan --from <version> --to <version>
npx carbon-react-migrate check --from <version> --to <version> <path>
npx carbon-react-migrate apply --from <version> --to <version> <path>
npx carbon-react-migrate check-deprecations <path>
npx carbon-react-migrate apply-deprecations <path>
```

- `plan` lists catalogue entries applicable to the version interval without
  inspecting source files.
- `check` detects supported source patterns and never edits files.
- `apply` runs only migrations classified as automatically safe.
- `check-deprecations` reports all supported, currently deprecated API usages
  regardless of a particular target upgrade.
- `apply-deprecations` runs the safe subset of current deprecation migrations
  and reports everything that remains manual.
- `--dry-run` prints the proposed changes without writing them.
- `--format json` emits a versioned JSON report.

AI is outside the correctness boundary. An agent may consume the JSON report and
linked guidance, but it must not decide whether a rule matches or generate an
unreviewed source change.

## Adopted open-source migration practices

The implementation should deliberately reuse established migration-system
patterns:

- **Angular:** version-aware migration collections, ordered execution, bounded
  upgrade paths, dependency compatibility checks where relevant, dirty-worktree
  protection, and an explicit migrate-only workflow.
- **Next.js:** one approachable upgrade command that selects applicable
  codemods, with dry-run output and version-specific manual guidance.
- **Material UI:** component-library-specific codemods plus rerunnable
  deprecation presets that customers can use before a breaking release.
- **Storybook:** diagnosis that explains why a migration applies and clearly
  separates automigrations from required manual work.
- **React:** runtime deprecation warnings as an additional verification channel
  before APIs are removed.
- **Cargo/Rust:** apply only machine-proven fixes, protect version-controlled
  work, and state which conditional or unsupported code was not inspected.

These are design precedents, not dependencies. Carbon should implement only the
smallest subset needed for its customers.

Codemods are the transformation engine. The catalogue and CLI are the migration
system around them: they select, order, run, and report codemods while also
covering manual migrations for which no codemod is safe.

## MVP boundary

The MVP is a vertical slice, not a complete reconstruction of Carbon's migration
history.

Use `carbon-react@159.0.0` as the candidate initial customer baseline and
`161.7.0` as the candidate target. This is an implementation and pilot
candidate, not a public support promise. Phase 6 customer evidence and the
release decision determine whether it becomes the published baseline.

The MVP slice has two deliberately separate tracks:

1. **Required upgrade work:** every record selected by `plan`, `check`, or
   `apply` for a version interval has a reliable `requiredBy`. For the candidate
   `159.0.0 → 161.7.0` path, report:
   - the `160.0.0` version-prefixed CSS-class compatibility change;
   - the `161.0.0` `__next__` Button DOM-ref/`ButtonHandle.focusButton()`
     change; and
   - the `161.3.0` npm `>=11.18.0` engine requirement, including that it was
     absent from the generated release notes.
2. **Optional proactive deprecation cleanup:** exercise one deterministic prop
   replacement and one deterministic import/component replacement through
   `check-deprecations` and `apply-deprecations`. These records may have
   `deprecatedIn` without a known `requiredBy`; they must never be selected as
   required version-applicable upgrade work until reliable `requiredBy`
   evidence is added.

The selected cleanup examples are:

- `StepSequenceItem.ariaLabel` to native `aria-label`, deprecated in `161.7.0`,
  for the supported direct-import/direct-JSX subset; and
- documented component-path `DialogFullScreen` to
  `Dialog size="fullscreen"`, deprecated in `156.2.0`, for the supported
  conflict-free subset.

The selection must have enough source, release-note, package-configuration,
documentation, and Git-history evidence to define its track, applicability,
expected outcomes, and limitations.

Initially, support only explicitly tested upgrade intervals. If an upgrade
crosses an unsupported boundary, the CLI must stop and recommend the supported
intermediate steps rather than composing an unverified old-to-latest migration.
Longer upgrade paths may be enabled later by chaining individually tested
intervals.

The MVP supports:

- `carbon-react` root-package named imports.
- Documented `carbon-react` component-path imports.
- Local aliases of those imports.
- JSX identifiers traceable directly to those imports.
- JavaScript, JSX, TypeScript, and TSX parsing.
- Repeated runs without additional changes.

The MVP does not promise support for:

- Customer wrappers or higher-order components.
- Arbitrary re-export or barrel chains.
- Dynamic imports or computed module paths.
- Computed JSX component selection.
- Runtime-generated prop objects.
- Proof that behavioural, accessibility, or visual verification has passed.
- Every historical Carbon release.

Unsupported or ambiguous patterns must be left unchanged and reported when they
can be identified safely.

## Architecture

### 1. Versioned migration catalogue

Use reviewed TypeScript records validated at runtime. TypeScript is the default
for the MVP because the catalogue, detectors, and transforms can share types and
the repository already uses a Node and TypeScript toolchain.

A minimal record should contain:

```ts
type MigrationRecord = {
  id: string;
  scope: "upgrade" | "deprecation";
  requiredBy?: string;
  deprecatedIn?: string;
  removedIn?: string;
  kind: "prop" | "import" | "component" | "manual";
  subject: {
    package: "carbon-react";
    component?: string;
    importPath?: string;
    prop?: string;
  };
  guidance: {
    summary: string;
    documentation: string;
    manualChecks: string[];
    risks: Array<"behaviour" | "accessibility" | "visual" | "types">;
  };
  automation:
    | { status: "safe"; rule: string }
    | { status: "partial"; rule?: string; limitations: string[] }
    | { status: "manual"; reason: string };
};
```

`requiredBy` is the version in which customer action becomes necessary. A
version-applicable upgrade migration applies when:

```text
currentVersion < requiredBy <= targetVersion
```

Every `scope: "upgrade"` record requires `requiredBy`. A
`scope: "deprecation"` record requires `deprecatedIn` and may omit
`requiredBy`. `deprecatedIn` is never a fallback, alias, or inferred value for
`requiredBy`. When a deprecation later gains a reliable mandatory boundary, the
record may carry both values and participate in both tracks after validation.

`plan`, `check`, and `apply` select only required upgrade work for the requested
interval. `check-deprecations` and `apply-deprecations` select current
deprecation records independently of the requested upgrade interval. Human and
JSON output must label the track and must distinguish “required for this
upgrade” from “optional proactive cleanup.”

Catalogue records preserve historical API identity. Validation against the
current source tree is required only when the referenced API is expected to
exist in the current source. Removed historical APIs must not fail validation
merely because they are absent from the current tree.

### 2. Shared migration rules

Each automatic or partial rule owns:

- Detection of the supported pattern.
- Transformation, when available.
- A postcondition or verification result.
- Explicit limitations.
- Positive, negative, ambiguous, and idempotency fixtures.

`check` and `apply` must use the same detection implementation. There must not be
independent scanner and codemod matchers for the same migration.

Rules execute in deterministic catalogue order. The CLI must detect duplicate
or conflicting edits before writing files.

Each safe transformation is implemented as a named codemod registered by its
catalogue record. Customers normally use the version-aware or deprecation
commands; invoking an individual codemod directly is an advanced debugging and
maintainer workflow.

### 3. Upgrade-path orchestration

The CLI must:

- Detect the installed Carbon version when possible while allowing an explicit
  `--from` override.
- Validate that the target version is newer and belongs to a supported path.
- Select all catalogue records whose applicability falls within that path.
- Keep optional deprecation-only records out of version-applicable selection
  when they have no reliable `requiredBy`.
- Order migrations deterministically and expose that order in `plan`.
- Stop on unsupported path gaps rather than silently skipping them.
- Keep dependency installation separate in the MVP unless package and
  peer-dependency updates can be performed and rolled back safely.

This orchestration is what distinguishes the migration product from a collection
of standalone codemods.

### 4. Transformation tooling and open-source reuse

Evaluate `jscodeshift` with Recast as the default customer-code transformation
engine. It is widely used for JavaScript and TypeScript codemods and is a closer
fit for JSX source rewriting than building a new transformation engine.

Keep `ts-morph` focused on extracting and validating Carbon's own public
TypeScript API unless the Phase 0 comparison demonstrates that it preserves
customer formatting and handles the required JSX transforms better.

Phase 0 must compare at least:

- JS, JSX, TS, and TSX parser coverage.
- Preservation of comments, quoting, and acceptable formatting.
- Import, alias, JSX, and prop-query ergonomics.
- Source locations and read-only detection support.
- Idempotent transformation and fixture-test support.
- Performance on a representative project.
- Dependency size, maintenance activity, security, and supported Node versions.

Inspect Material UI's codemod package first for reusable import/JSX helpers,
fixture conventions, aggregate presets, and component-name overrides. Inspect
Next.js, Storybook, and React codemods for runner, applicability, recipe, and
reporting patterns.

Do not add Angular DevKit, the Next.js CLI, the Storybook CLI, or Cargo as Carbon
runtime dependencies. Their architectures are useful precedents, but their
application-specific implementation and dependency weight are outside the
smallest Carbon solution.

Prefer an existing maintained library over copied source. If copying or adapting
open-source code is justified, record:

- Repository and exact source file.
- Commit or released version.
- Applicable license.
- Whether the code was copied unchanged, modified, or only used as a reference.
- Required copyright, license notice, and attribution.
- Why using the upstream package or writing a Carbon-specific equivalent was
  unsuitable.

Legal or open-source compliance review must be completed before publishing code
derived from another project. Architectural ideas and independently implemented
interfaces should still cite their design precedents in the decision record.

### 5. Customer documentation

The public migration guide is the customer-facing source of truth. Catalogue
records are the structured source used by the CLI and validation.

Generate a version-indexed migration page or index from the catalogue. Longer
examples and judgement-heavy guidance may remain in MDX, referenced by stable
anchors from catalogue records.

Generated documentation must clearly label migrations as:

- Automatically safe for the documented subset.
- Partially automated with stated limitations.
- Manual.

### 6. Runtime-warning verification

Static analysis cannot reliably see every wrapper, re-export, dynamic component,
or runtime prop construction. Carbon's existing deprecation warnings should
therefore be treated as a complementary verification channel.

For applicable migrations, the report should:

- Name the related runtime warning when one exists.
- Recommend exercising relevant application flows in development.
- Explain that an absence of warnings is not proof of complete coverage.
- Link warning text and migration records through a stable migration ID where
  practical.

Future Carbon deprecations should use the same migration ID in the source
annotation, runtime warning, catalogue record, and customer documentation when
the existing APIs allow it without harming developer ergonomics.

### 7. Optional AI integration

After the deterministic workflow is stable, generated Carbon skills may include
a compact migration index and the CLI JSON schema.

AI may:

- Summarize findings.
- Explain linked manual guidance.
- Help a developer investigate unsupported application architecture.

AI must not:

- Change match status.
- Upgrade a partial or manual rule to automatically safe.
- silently generate or apply source edits as part of the migration CLI.

## Work plan

### Phase 0: Select the vertical slice

Tasks:

- Audit the required candidate upgrade path and the two optional deprecation
  cleanup examples using source, tests, release notes, package configuration,
  changelog, documentation, and Git history.
- Locate historical codemods and record their maintenance and test status.
- Select the candidate MVP version interval without representing it as an
  approved public baseline.
- Define whether the interval must be traversed directly or through tested
  intermediate steps.
- Record why each selected migration is safe, partial, manual, or compatibility
  work and whether it is required upgrade work or optional cleanup.
- Prototype the selected migrations with `jscodeshift`/Recast and `ts-morph`
  where necessary, then record the chosen responsibilities of each tool.
- Inspect Material UI codemod helpers and fixtures before creating equivalent
  Carbon utilities.
- Review Next.js, Storybook, and React implementations for orchestration,
  applicability checks, grouped recipes, and reporting.
- Produce an open-source reuse inventory containing source locations, versions,
  licenses, intended reuse, attribution requirements, and the reuse-versus-
  reimplementation decision.
- Choose the package location: this repository/workspace or a separately
  published package with named owners.

Deliverable:

- A short decision record naming the candidate baseline/target, required
  upgrade and compatibility records, optional prop/component cleanup examples,
  evidence, transformation tools, open-source reuse decisions, proposed package
  location, and required ownership areas.

Exit criteria:

- Every required upgrade record has an unambiguous `requiredBy`.
- Every optional cleanup record has a reliable `deprecatedIn`, is explicitly
  excluded from version-applicable upgrade selection without `requiredBy`, and
  is never represented as required work.
- The candidate path records every known breaking or compatibility boundary,
  including documented and discovered release-note gaps.
- At least one prop cleanup and one import/component cleanup have useful,
  deterministic, conflict-free subsets.
- Required manual/compatibility migrations have evidence-backed customer
  guidance or an explicit review blocker.
- The transformation engine has passed representative JS, JSX, TS, and TSX
  fixture experiments, plus selected cleanup fixtures and idempotency/conflict
  experiments.
- Every proposed copied or adapted source has a recorded license and compliance
  path.

Estimate:

- Developer: 3-5 days.
- AI assistance: 1-2 days equivalent for repository/history searches,
  evidence tables, and draft documentation.
- Elapsed with collaboration: 3-5 days.

### Phase 1: Catalogue and validation

Tasks:

- Define the runtime-validated catalogue schema.
- Add records for the selected migrations.
- Enforce the upgrade-versus-deprecation scope invariant: upgrade records
  require `requiredBy`; deprecation records require `deprecatedIn`; never infer
  one from the other.
- Implement version interval calculation using the existing `semver`
  dependency.
- Represent supported upgrade-path boundaries and reject gaps.
- Validate unique IDs, valid versions, version ordering, rule references,
  documentation files, and stable anchors.
- Define reviewed exemptions for migrations that cannot reference current APIs.
- Add a single local validation command.
- Add provenance metadata or a repository-level attribution record for any
  copied or adapted open-source implementation.

Deliverable:

- A tested catalogue API returning ordered migrations for a version interval.

Exit criteria:

- Boundary tests cover versions below, equal to, inside, and above the interval.
- Tests prove deprecation-only records are absent from `plan`/version-aware
  selection and present in deprecation selection.
- Unsupported direct jumps return the required intermediate path.
- Invalid catalogue records fail with actionable errors.
- Historical removed APIs can be represented without weakening validation for
  current APIs.

Estimate:

- Developer: 4-5 days.
- AI assistance: 1.5-2 days equivalent for schema/test scaffolding and edge-case
  enumeration.
- Elapsed with collaboration: 4-5 days.

### Phase 2: Read-only CLI and deprecation diagnosis

Tasks:

- Implement `plan`, `check`, and `check-deprecations`.
- Label every finding and summary as required upgrade work or optional
  proactive deprecation cleanup.
- Detect the installed Carbon version when possible and validate explicit
  overrides.
- Parse JS, JSX, TS, and TSX without executing customer code.
- Resolve supported imports, aliases, JSX usage, and prop usage.
- Report ambiguous and unsupported cases without editing.
- Define JSON schema version 1 and human-readable console output.
- Define stable exit codes for invalid input, findings, and internal failure.
- Include related runtime-warning verification steps in applicable findings.
- Add positive, negative, alias, shadowing, ambiguity, and malformed-source
  fixtures.
- Reuse the selected parser and import/JSX utilities consistently rather than
  introducing transform-specific parser stacks.

Every finding must include:

- Migration ID and applicable version.
- Selection track and whether customer action is required for the requested
  upgrade.
- File and source location.
- Matched Carbon API and import origin.
- Evidence or match kind.
- Automation status.
- Documentation reference.
- Manual checks, risks, and limitations.

When no findings occur, report:

> No known matches found in supported patterns. This does not prove the
> migration is complete.

Deliverable:

- A locally executable read-only CLI and versioned JSON schema.

Exit criteria:

- All supported fixtures are detected.
- Negative and shadowed-identifier fixtures produce no false positive.
- Output ordering and JSON snapshots are stable.
- The CLI requires no AI, credentials, or network after installation.
- Rerunning `check-deprecations` is safe and produces stable results.
- `plan` and `check` never present deprecation-only findings as required
  upgrade work.

Estimate:

- Developer: 5-7 days.
- AI assistance: 1.5-2.5 days equivalent for fixture generation, parser API
  research from installed dependencies, test scaffolding, and documentation.
- Elapsed with collaboration: 5-7 days.

### Phase 3: Safe application

Tasks:

- Implement one or two named deterministic codemods using the shared rules.
- Add `apply`, `apply-deprecations`, and `--dry-run`.
- Preserve comments and acceptable formatting.
- Detect conflicting edits before writing.
- Refuse to write when parsing or transformation fails.
- Refuse a dirty Git worktree by default when Git is available, with an explicit
  override.
- Clearly report partial completion and remaining manual migrations.
- Keep `apply` limited to safe required upgrade rules and
  `apply-deprecations` limited to safe optional cleanup rules; report the
  distinction before and after edits.
- Offer documented, opt-in formatting and verification commands; do not
  silently execute arbitrary project scripts.

Deliverable:

- Safe application for the selected automatic migrations.

Exit criteria:

- Every transform has non-match and ambiguous fixtures.
- Applying a transform twice produces no second diff.
- A dry run and actual run report the same proposed file changes.
- A failed transform does not leave partially written files.
- Manual migrations remain unchanged and are reported.
- Version-aware application and the deprecation preset invoke the same
  registered codemods and produce equivalent edits for the same findings.

Estimate:

- Developer: 4-6 days.
- AI assistance: 1-2 days equivalent for transform/test scaffolding and
  adversarial cases.
- Elapsed with collaboration: 4-6 days.

### Phase 4: Maintainer workflow and CI

Tasks:

- Add `npm run validate:migrations`.
- Validate the catalogue, rule registration, documentation references,
  generated migration index, JSON schema fixtures, and transform fixtures.
- Validate that required third-party notices and recorded open-source
  provenance remain present.
- Require a migration record or reviewed exemption when a public API gains a
  deprecation annotation or an intentional breaking-change marker.
- Document how to author and review a migration.
- Document how source annotations and runtime warnings reference migration IDs.
- Prepare a pull-request CI entry point for the same validation command, but do
  not activate it without repository CI-owner authorization.
- Name owners for catalogue review, codemod review, documentation, and release
  publication.
- Require dependency and license review when transformation tooling or copied
  open-source code changes.

Deliverable:

- One deterministic local validation command and a documented CI-ready entry
  point for later activation by repository CI owners.

Exit criteria:

- A deliberately stale record or broken anchor fails local validation.
- A new deprecation without a record or exemption fails local validation.
- Maintainer documentation walks through adding one safe and one manual
  migration.

Estimate:

- Developer: 3-4 days.
- AI assistance: 1 day equivalent for documentation and validation-test
  scaffolding.
- Elapsed with collaboration: 3-4 days.

### Phase 5: Migration discovery and catalogue backfill

Tasks:

- Add `npm run discover:migrations -- --from <version> --to <version>`.
- Inspect changelog sections, release tags, public API changes, explicit
  deprecation/runtime-warning markers, removals, package requirements, and
  intentional breaking-change markers for the requested interval.
- Generate deterministic JSON and Markdown candidate inventories that are
  clearly labelled `needs-review` and are never consumed as approved customer
  migrations.
- Record source, changelog, tag/diff, documentation, and version evidence for
  every candidate, plus confidence and missing required information.
- Add `npm run create:migration` to scaffold a draft typed catalogue record for
  a new public change without inventing replacement guidance, risk, or
  automation safety.
- Leave candidate semantic review and catalogue expansion for the pilot/release
  decision when accountable reviewers are available.
- Produce a coverage report for the candidate `159.0.0 → 161.7.0` interval,
  separating approved catalogue correlations, qualified and unbounded
  candidates, internal or rejected evidence, unresolved gaps, and areas the
  discovery mechanisms cannot inspect.
- Preserve the rule that developers update the catalogue, while the register is
  generated output.
- Keep discovery and scaffolding deterministic and independent of AI. AI may
  assist reviewers but cannot approve customer migration semantics.

Deliverable:

- A deterministic discovery POC, non-authoritative candidate inventory,
  coverage report, and record scaffolding for the candidate
  `159.0.0 → 161.7.0` interval.

Exit criteria:

- Every release boundary in the candidate interval has recorded changelog,
  tag/diff, public API, and marker discovery evidence or a documented reason it
  could not be inspected.
- Running discovery twice produces byte-identical candidate output.
- Candidate output is visibly non-authoritative and is never selected by
  `plan`, `check`, or `apply`.
- The generated candidate inventory is reproducible and clearly
  non-authoritative; only reviewed, complete records enter the catalogue.
- `create:migration` produces a schema-valid draft and clearly reports every
  field that still requires human review.
- The official generated register contains only approved catalogue records.
- The coverage report lists unresolved and unsupported areas without claiming
  completeness.

Estimate:

- Developer: 5-9 days.
- AI assistance: 1.5-3 days equivalent for evidence correlation, candidate
  grouping, and review scaffolding.
- Carbon API/release reviewer participation: 2-5 days distributed.
- Elapsed: 1.5-3 weeks depending on candidate volume and reviewer availability.

### Phase 6: Pilot and release decision

Tasks:

- Review the Phase 5 candidates in accountable, manageable batches and decide
  which records should enter the authoritative catalogue.
- Review ambiguous public API and historical codemod evidence; add only
  complete, approved records and regenerate the migration register.
- Run the CLI against at least one representative customer-style project or
  approved realistic fixture application.
- Exercise relevant application flows and compare runtime deprecation warnings
  with static findings.
- Record false positives, missed supported patterns, performance, and confusing
  output.
- Perform a maintainer authoring trial with one additional migration.
- Decide supported baseline version and publication channel.
- Publish only after ownership, support expectations, and package provenance
  are documented.

Deliverable:

- Pilot report, fixed MVP issues, and a go/no-go release decision.

Exit criteria:

- Candidate review needed for the chosen pilot scope is complete, and remaining
  catalogue gaps are explicitly accepted, deferred, or release-blocking.
- No known destructive or incorrect edit remains in the supported subset.
- Limitations are visible before application.
- Differences between static findings and observed runtime warnings are
  documented and either fixed or classified as limitations.
- A maintainer other than the original implementer can add a migration.
- The package has a named maintenance owner.

Estimate:

- Developer: 3-5 days.
- AI assistance: 0.5-1 day equivalent for result analysis and documentation.
- Customer/product/design/accessibility participation: 1-3 days distributed.
- Elapsed: 4-7 days depending on access to a representative project and
  reviewers.

## Overall estimate

For one developer familiar with Carbon, with AI used as an implementation and
review assistant:

| Scope                                                 | Developer effort | AI-assisted work equivalent | Expected elapsed time |
| ----------------------------------------------------- | ---------------: | --------------------------: | --------------------: |
| Read-only vertical slice through Phase 2              |       12-17 days |                    4-6 days |         2.5-3.5 weeks |
| Practical MVP through safe application and CI         |       19-27 days |                    6-9 days |           4-5.5 weeks |
| Reviewed candidate-interval catalogue through Phase 5 |       24-36 days |                 7.5-12 days |         5.5-8.5 weeks |
| Pilot and release readiness through Phase 6           |       27-41 days |                 8.5-13 days |          6.5-10 weeks |

AI work-equivalent estimates are not additional staffing days and must not be
subtracted mechanically from the developer estimate. They describe tasks where
AI can reduce typing, searching, and test scaffolding. A developer remains
accountable for product semantics, AST correctness, safety classification,
review, and release.

Add 1-2 weeks of contingency if the historical codemod package cannot be reused,
the selected migrations lack trustworthy version evidence, packaging requires a
separate release pipeline, or representative customer projects expose important
unsupported import patterns.

## Ownership

At minimum, assign:

- Migration tooling owner: CLI, parser, transforms, JSON schema, releases.
- Carbon API owner: applicability and replacement correctness.
- Documentation owner: customer guidance and stable links.
- Design/accessibility reviewer: manual composition and behaviour migrations.
- Release owner: package provenance, supported baseline, and announcements.
- Open-source compliance owner or reviewer: third-party licenses, notices,
  attribution, and provenance records.

AI cannot own or approve any of these areas.

## Success measures

MVP success:

- A customer can discover applicable migrations and apply the selected safe
  transforms without AI.
- Supported fixtures have complete detection and zero known false positives.
- Automatic transforms are deterministic and idempotent.
- Version-aware upgrades reject unsupported path gaps.
- Customers can repeatedly check and apply safe deprecation migrations before a
  breaking release.
- Manual work and limitations are present in console and JSON output.
- Maintainers cannot introduce an unrecorded deprecation without CI failure or a
  reviewed exemption.

Post-release measures:

- Percentage of new breaking changes with safe, partial, or manual records at
  release time.
- Percentage of applicable findings automatically transformed.
- False-positive and incorrect-edit defect count.
- Time for a maintainer to add and validate a new migration.
- Number of upgrades blocked by unsupported customer patterns.

Do not use the number of files changed or an AI-generated claim of completion as
a success measure.

## Deferred work

Defer until usage evidence justifies it:

- Catalogue backfill outside the selected candidate interval.
- Arbitrary wrapper and higher-order-component analysis.
- General re-export graph resolution.
- Automatic dependency and lockfile updates.
- Automatic chaining across untested upgrade intervals.
- Automatic execution of customer tests.
- IDE integration.
- Hosted migration service.
- AI-generated transforms.
- Direct dependencies on Angular DevKit, Next.js CLI, Storybook CLI, or Cargo.

## Stop or rescope conditions

Stop or narrow the MVP if:

- No selected migration can be made deterministic for a useful customer pattern.
- Version applicability cannot be established from reviewed evidence.
- Package ownership and support cannot be assigned.
- The pilot finds that supported direct imports represent too little real usage.

In those cases, ship the version-aware catalogue and read-only report first,
while keeping complex changes manual.
