# Component skill metadata

This directory contains the human-authored part of the Carbon React skill. One
JSON file represents one component that has been reviewed for agent use. The
absence of a file means that the component still uses source-generated API data
and uncurated Storybook examples; it does not mean that placeholder guidance
should be added.

## Sources of truth

| Information                                                                   | Source                                                 |
| ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| Public exports, imports, props, types, defaults and deprecations              | Component source, read by the generator                |
| What the component is for, selection guidance, pitfalls and example selection | `docs/component-metadata/<component>.json`             |
| Runnable example implementation                                               | The selected Storybook story                           |
| Agent-facing Markdown                                                         | `skills/carbon-react/`, generated; never edit directly |

This split keeps facts that can silently drift tied to code while allowing
maintainers to author product guidance that cannot be inferred reliably.

## Add or review a component

1. Create a kebab-case JSON file matching the generated component name. Use
   `pill.json` as the structural example, but assess the component independently.
2. Write a concise `summary` that distinguishes the component. Add optional
   sections only when they change an agent's decision; do not repeat the summary
   in `useWhen` or add text merely to fill a section.
3. Select only stories that demonstrate useful consumer behaviour. Playground
   stories are interactive documentation and should not be curated by default.
   A selected story must resolve to public consumer imports after generation,
   avoid deprecated APIs, and produce a focused example that makes sense outside
   Storybook.
4. Improve the source story when the example itself is incomplete, inaccessible,
   or uses an obsolete pattern. Do not compensate by hand-editing generated
   Markdown.
5. Run `npm run build:skills`, then review the component entry and every generated
   example as an agent-facing consumer would.

Supported fields:

| Field          | Required | Purpose                                                               |
| -------------- | -------- | --------------------------------------------------------------------- |
| `component`    | Yes      | Exact generated component name, such as `Pill` or `ButtonNext`.       |
| `summary`      | Yes      | One sentence explaining the component's distinct purpose.             |
| `useWhen`      | No       | Situations not already obvious from the summary.                      |
| `avoidWhen`    | No       | Important boundaries that are clearer without naming one alternative. |
| `alternatives` | No       | A non-deprecated Carbon component and when to choose it instead.      |
| `pitfalls`     | No       | Non-obvious accessibility, composition or implementation risks.       |
| `examples`     | No       | Story export names and descriptions explaining why each is useful.    |

Omit an optional field when there is no useful content. If supplied, list fields
must be non-empty. The generator rejects unknown fields, invalid component or
story references, deprecated alternatives, deprecated APIs in curated examples,
and curated examples that retain source-relative imports.

## Completion checklist

- The metadata adds decision-making value and contains no duplicated filler.
- Alternatives and selected stories use current, public APIs.
- Curated examples are focused, accessible, syntactically valid, and readable
  without interpreting Storybook composition.
- The generated component file has accurate imports, props, defaults and
  deprecation details.
- `npm run test:skills`, `npm run build:skills -- --check`, and
  `npm run type-check` pass.

Run `npm run skills:status` to list reviewed components and those still awaiting
authored metadata. Deprecated components are reported separately and do not need
authored metadata unless useful migration guidance is missing. Coverage is
intentionally incremental; CI checks correctness and generated-file drift rather
than requiring filler for every component.
