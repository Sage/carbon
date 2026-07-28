# Carbon deterministic migration tooling implementation plan

Implementation progress is tracked in
[`IMPLEMENTATION_STATUS.md`](./IMPLEMENTATION_STATUS.md). Every phase transition
must pass the formal review defined in
[`PHASE_GATES.md`](./PHASE_GATES.md). Do not begin a later phase or generate its
detailed prompt before the preceding gate permits it.

## Controlled plan evolution

Implementation evidence may require this plan to change. Plan evolution is
allowed, but it must be explicit, evidence-backed, reviewed, and recorded.

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

It may be applied during the current phase, but it must still be recorded under
the phase's decisions or deviations.

#### Minor adjustment

A minor adjustment changes implementation detail within the existing goal and
phase boundary, does not change a public interface or safety guarantee, affects
only one phase, and is expected to require no more than two working days.

It may be proposed and applied in the current phase after recording evidence,
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

### Required change record

Record every proposed plan change in the applicable phase's `### Decisions` or
`### Deviations from plan` section in `IMPLEMENTATION_STATUS.md`:

```md
#### PLAN-<number>: <Change title>

- Classification: clarification | minor-adjustment | material-revision
- Status: proposed | approved | rejected | superseded
- Trigger and evidence:
- Existing plan text or assumption:
- Proposed change:
- Reason:
- Affected phases:
- Effect on customer behavior or public interfaces:
- Safety, security, accessibility, licensing, and compliance impact:
- Ownership or approval required:
- Estimate impact:
- Required verification:
- Decision and date:
```

Use a stable ID and retain rejected or superseded records. Do not erase the
history of why the plan changed.

### Change procedure

1. Stop work that depends on the disputed assumption when continuing could
   create rework or safety risk.
2. Record the trigger, evidence, classification, affected phases, risks, owners,
   and estimate impact.
3. Decide whether unaffected work can continue safely.
4. For a clarification or minor adjustment, update this plan and the status
   ledger, then verify the change during the current phase gate.
5. For a material revision, set the gate outcome to
   `plan-revision-required` or `remediation-phase-required`.
6. Obtain required human or organizational decisions. An AI agent may recommend
   a change but cannot invent product, API, design, accessibility, security,
   legal/compliance, support, or release approval.
7. Apply the approved plan change.
8. Update affected phase references, prerequisites, tasks, deliverables, exit
   criteria, estimates, leftovers, and prompts.
9. Re-run the formal gate for any phase whose completion claim was affected.
10. Generate later phase prompts only from the approved current plan.

### Additional and remediation phases

Name an inserted phase using the nearest parent phase, for example `Phase 2A`.
Define its objective, prerequisites, tasks, out-of-scope work, deliverable, exit
criteria, estimate, ownership, and effect on later phases.

Creating an additional phase must not silently defer an existing exit criterion.
The change record must explain whether affected work was moved, split, added, or
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

- phase status, completion date, owner, reviewers, and formal gate outcome;
- the concrete result the next phase may rely on;
- delivered artifacts and their stability;
- interfaces, schemas, commands, formats, and failure behavior exposed to later
  phases;
- decisions and controlled plan changes by stable ID;
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
- Generate the next phase prompt from the approved plan, status ledger, and
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

Select one supported version interval and three real migrations within or
adjacent to it:

1. A deterministic prop rename or direct prop replacement.
2. A deterministic import or component replacement.
3. A composition, behaviour, design, or accessibility change that is manual.

The exact interval and migrations are selected during the initial audit. The
selection must have enough source, release-note, and documentation evidence to
define correct applicability and expected outcomes.

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
  requiredBy: string;
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
migration applies when:

```text
currentVersion < requiredBy <= targetVersion
```

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

- Audit three candidate migrations using source, tests, release notes,
  changelog, documentation, and Git history.
- Locate historical codemods and record their maintenance and test status.
- Select the supported MVP version interval.
- Define whether the interval must be traversed directly or through tested
  intermediate steps.
- Record why each selected migration is safe, partial, or manual.
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

- A short decision record naming the three migrations, version interval,
  evidence, transformation tools, open-source reuse decisions, package location,
  and owners.

Exit criteria:

- Each migration has an unambiguous `requiredBy` version.
- At least one migration is suitable for a deterministic transform.
- The manual migration has reviewed customer guidance.
- The transformation engine has passed representative JS, JSX, TS, and TSX
  fixture experiments.
- Every proposed copied or adapted source has a recorded license and compliance
  path.

Estimate:

- Developer: 2-3 days.
- AI assistance: 0.5-1 day equivalent for repository/history searches,
  evidence tables, and draft documentation.
- Elapsed with collaboration: 2-3 days.

### Phase 1: Catalogue and validation

Tasks:

- Define the runtime-validated catalogue schema.
- Add records for the selected migrations.
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
- Unsupported direct jumps return the required intermediate path.
- Invalid catalogue records fail with actionable errors.
- Historical removed APIs can be represented without weakening validation for
  current APIs.

Estimate:

- Developer: 3-4 days.
- AI assistance: 1-1.5 days equivalent for schema/test scaffolding and edge-case
  enumeration.
- Elapsed with collaboration: 3-4 days.

### Phase 2: Read-only CLI and deprecation diagnosis

Tasks:

- Implement `plan`, `check`, and `check-deprecations`.
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
- Name owners for catalogue review, codemod review, documentation, and release
  publication.
- Require dependency and license review when transformation tooling or copied
  open-source code changes.

Deliverable:

- One local command and one pull-request CI entry point.

Exit criteria:

- A deliberately stale record or broken anchor fails CI.
- A new deprecation without a record or exemption fails CI.
- Maintainer documentation walks through adding one safe and one manual
  migration.

Estimate:

- Developer: 3-4 days.
- AI assistance: 1 day equivalent for documentation and validation-test
  scaffolding.
- Elapsed with collaboration: 3-4 days.

### Phase 5: Pilot and release decision

Tasks:

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

| Scope | Developer effort | AI-assisted work equivalent | Expected elapsed time |
| --- | ---: | ---: | ---: |
| Read-only vertical slice through Phase 2 | 10-14 days | 3-5 days | 2-3 weeks |
| Practical MVP through safe application and CI | 17-24 days | 5-8 days | 3.5-5 weeks |
| Pilot and release readiness | 20-29 days | 6-9 days | 4.5-6.5 weeks |

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

- Complete historical catalogue backfill.
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
