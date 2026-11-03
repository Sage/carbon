---
name: curate-carbon-component
description: Curate or review one Carbon React component's authored skill metadata and agent-facing Storybook examples. Use when extending component skill coverage or changing docs/component-metadata; do not use for ordinary component implementation alone.
---

# Curate a Carbon component

Read `docs/component-metadata/README.md` before making changes. It defines the
source-of-truth split, metadata fields, example criteria, and completion checks.
This skill defines the workflow and the decisions to make along the way. A task 
prompt only needs to add what is specific to the component.

Keep the task to one active component unless the user requests a wider scope.
Avoid unrelated formatting, refactoring, or cleanup.

## Preflight

- Run `git status` and review commits on the branch that are not on the default
  branch. Preserve unrelated changes: do not stash, revert, reformat, or commit
  them.
- If existing changes overlap the task (the component, its exports, stories,
  MDX, metadata, or the skills generator), establish whether they belong to the
  task and how they should be committed. Follow the task's commit policy. If it
  does not cover overlapping work, stop and ask rather than guessing.
- Use the Node version in `.nvmrc` and an npm version satisfying
  `package.json#engines`. Do not change `.nvmrc`, `engines`, or the lockfile to
  suit a local toolchain. If the declared versions are unavailable, report the
  mismatch under Outstanding; if checks cannot run, report it as a blocker.
- Run `npm run skills:status` and confirm the component is listed for active
  review. If no component was chosen, select one from that list; skip
  deprecated components unless migration guidance is needed. If the target is
  absent, establish whether it is internal, deprecated, or exported only from a
  secondary entry point, and report the reason before continuing. Do not expand
  the public API solely for skill coverage.

## Review sources

Inspect the component source, public props, defaults, and deprecations; its
Storybook MDX and stories; and its current generated file in
`skills/carbon-react/`. Carbon source and Storybook are the primary sources.

Fusion is optional. Consult it when available and relevant. If it is
unavailable, the fetch fails, or it adds nothing, continue with Carbon sources
alone and say so in the report.

Do not infer guidance from prop names, contradict public component behaviour, or 
present a design recommendation as an enforced technical constraint.

## Author metadata

Add only guidance that changes an agent's decisions, grounded in reviewed
sources rather than prop names. Omit optional fields instead of repeating the
summary or filling a template.

Keep capability and design decisions separate. Explain what props and visual
variants enable, plus any technical constraints, without prescribing when a
designer should choose them. Preserve whether reviewed guidance describes a
recommendation or a requirement. Prescriptive guidance belongs here only when it
is needed for component selection, accessibility, implementation correctness, or
an explicit requirement.

When the task raises a wording concern, inspect consumer-facing
occurrences: MDX, prop JSDoc (which feeds the generated props table), story names
and descriptions, and metadata. Correct only wording that is inaccurate or
overly prescriptive, and keep the occurrences consistent.

## Select examples

- Choose the smallest set of stories that adds useful coverage beyond the props
  table, normally no more than three. Prioritise capabilities the task names,
  then common consumer tasks. Do not curate every story.
- Each selected story must meet the README example criteria. Check the
  generated example for unresolved module-level helpers, constants, or assets;
  it must stand alone outside Storybook.
- If a capability the task requires has no suitable standalone story, improve
  the existing story or add a focused, consumer-ready one. For other useful
  capabilities, omit them and report the gap unless the fix is small and limited
  to the component's own stories.
- Change a source story or MDX only when it is inaccurate, inaccessible,
  incomplete, or unsuitable as a consumer example. Preserve valid CSF3 patterns.
  Ensure that any edits are accurate, accessible, and suitable as consumer examples.
- Do not clean up unselected sibling stories unless they affect the curated
  output or the task includes them. Note similar issues under Outstanding.

## Handle generator issues

A selected example or generated document that is incorrect, incomplete, or
misleading must not ship. Resolve it in one of these ways:

- If the generator misreads valid source or a supported Storybook pattern, fix
  the generator instead of changing the story or component to suit it. Add
  a focused regression test, regenerate and review every affected output, and
  commit the fix separately before the curation commit.
- If the story itself is the problem, improve the source story.
- Otherwise, omit the example and report why.

Report limitations that affect only unselected stories or other components as
follow-up work; do not fix them in the same task unless asked.

## Generate and validate

Never edit `skills/carbon-react/` directly. Run `npm run build:skills`, then
inspect the generated component document, every linked example, and any other
generated file changed as a side effect. Then run:

```shell
npm run test:skills
npm run build:skills -- --check
npm run type-check
npm run lint
```

- All tests, and checks must pass.
- Lint must report zero errors; pre-existing warnings within the configured
  ceiling are acceptable.

## Commit and report

Follow the task's commit policy. If none is given, leave changes uncommitted.
When committing, keep any generator fix in its own earlier commit, and commit the
metadata, source documentation changes, and regenerated `skills/` together, for
example `docs(skills): curate <component>`.

Finish only when the README completion checklist is satisfied. Report under
these headings:

- **Metadata**: file added or changed and the guidance it adds.
- **Source changes**: stories, MDX, or JSDoc changed, and why.
- **Selected examples**: each story and why it was chosen; gaps omitted.
- **Generator findings**: fixes made, with tests, and limitations reported.
- **Validation**: each check and its result, including toolchain versions.
- **Outstanding**: follow-up work, sibling-story issues, blockers, or skipped
  sources such as Fusion.
