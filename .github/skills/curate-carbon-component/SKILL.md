---
name: curate-carbon-component
description: Curate or review one Carbon React component's authored skill metadata and agent-facing Storybook examples. Use when extending component skill coverage or changing docs/component-metadata; do not use for ordinary component implementation alone.
---

# Curate a Carbon component

Read `docs/component-metadata/README.md` before making changes. It defines the
source-of-truth split, metadata fields, example criteria, and completion checks.

Keep the task to one active component unless the user requests a wider scope. If
a component has not been chosen, run `npm run skills:status` and select from the
active components awaiting review; do not spend coverage effort on deprecated
components unless migration guidance is specifically needed.

Inspect the component source, its Storybook stories and MDX, and its current
generated component file before authoring metadata. Add only guidance that
changes an agent's decisions. Omit optional fields instead of repeating the
summary or filling a template.

Curate a small set of focused, consumer-useful stories. Do not curate playground
stories or examples using deprecated APIs. Preserve the Storybook patterns the
project wants to use; improve the extractor or source story when necessary
rather than rewriting stories merely for extraction. If a selected example is
incomplete or inaccessible, correct the source story so Storybook and the skill
remain aligned.

Never edit `skills/carbon-react/` directly. Run `npm run build:skills`, inspect
the generated component and every linked example, then run:

```shell
npm run test:skills
npm run build:skills -- --check
npm run type-check
```

Finish only when the generated guidance is concise, imports and props are
current, deprecations are represented accurately, examples are understandable
without Storybook context, and the checks pass.
