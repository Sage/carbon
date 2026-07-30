# Migration catalogue record reference

Use this reference when converting a reviewed discovery candidate or a known
public API change into a record in
`packages/carbon-react-migrate/src/catalogue.ts`.

The catalogue is authoritative customer-facing data. Do not add a record until
its public semantics, version evidence, guidance, risks, and automation status
have been reviewed. Discovery candidates and generated drafts are evidence,
not approval.

## Complete record shape

```ts
{
  id: "stable-lowercase-kebab-case-id",
  scope: "upgrade" | "deprecation",
  requiredBy: "1.2.3",   // required for upgrade; optional for deprecation
  deprecatedIn: "1.2.3", // required for deprecation; optional for upgrade
  removedIn: "1.2.3",    // optional
  kind: "prop" | "component" | "import" | "manual",
  subject: {
    package: "carbon-react",
    component?: "ComponentName",
    importPath?: "carbon-react/lib/components/example",
    prop?: "propName",
  },
  guidance: {
    summary: "What the customer must do.",
    documentation: {
      file: "repository-relative-file.md",
      anchor: "existing-anchor",
    },
    changelog?: {
      file: "CHANGELOG.md",
      anchor?: "existing-anchor",
    },
    migrationSkill?: {
      file: "skills/carbon-react/SKILL.md",
      anchor?: "existing-anchor",
    },
    replacement?: "Use the replacement API.",
    removal?: "Remove the obsolete usage.",
    manualChecks: ["A concrete check after migration."],
    risks: ["behaviour" | "accessibility" | "visual" | "types"],
  },
  automation:
    | { status: "safe", rule: "registered-rule-name" }
    | {
        status: "partial",
        rule?: "registered-detection-or-transform-rule",
        limitations: ["What the tool cannot safely handle"],
      }
    | {
        status: "manual",
        reason: "Why deterministic source editing is unsafe",
      },
  apiReferences: [
    {
      path: "repository-relative-source-file",
      symbol?: "PublicSymbol",
      historicalExemption?: "reviewed-exemption-id",
      historicalVersion?: "1.2.3",
    },
  ],
}
```

Do not copy the union syntax literally into the catalogue. Select exactly one
value or object variant for each field.

## Choose the scope

| Scope | Use it when | Required version |
| --- | --- | --- |
| `upgrade` | The customer must handle the change to reach a target version | `requiredBy` |
| `deprecation` | The old API still works and cleanup is optional | `deprecatedIn` |

`requiredBy` and `deprecatedIn` are independent facts. A record may contain
both when reliable evidence supports both. `removedIn` is optional and must not
be inferred merely because an API is deprecated.

## Choose the kind and subject

| Kind | Typical subject fields | Use it for |
| --- | --- | --- |
| `prop` | `package`, `component`, `prop` | A component prop was renamed, deprecated, removed, or replaced |
| `component` | `package`, `component`, optionally `importPath` | A component was replaced, deprecated, or removed |
| `import` | `package`, `importPath`, optionally `component` | An exported symbol or supported import path changed |
| `manual` | `package`, plus any useful component/import context | CSS, package requirements, configuration, runtime, or architectural work |

Examples:

```ts
// Prop
kind: "prop",
subject: {
  package: "carbon-react",
  component: "StepSequenceItem",
  prop: "ariaLabel",
}

// Component
kind: "component",
subject: {
  package: "carbon-react",
  component: "DialogFullScreen",
  importPath: "carbon-react/lib/components/dialog-full-screen",
}

// Import
kind: "import",
subject: {
  package: "carbon-react",
  component: "Example",
  importPath: "carbon-react/lib/components/old-example",
}

// Manual package or environment change
kind: "manual",
subject: {
  package: "carbon-react",
}
```

Choose the kind that describes the customer action, not merely the file where
the evidence was found.

## Write the guidance

- `summary` states the customer action in one direct sentence.
- `documentation` points to an existing repository file and anchor containing
  the full reviewed guidance.
- `changelog` and `migrationSkill` are optional and must refer to real files.
- `replacement` names what to use instead.
- `removal` explains what to delete when there is no replacement.
- Use `replacement`, `removal`, or both only when the reviewed semantics
  justify them.
- `manualChecks` contains observable checks a customer can perform.
- `risks` contains every applicable allowed risk:
  `behaviour`, `accessibility`, `visual`, or `types`.

Do not use vague checks such as “make sure it works.” Name the affected
behaviour, visual state, type contract, or accessibility result.

## Choose the automation status

| Status | Requirement |
| --- | --- |
| `safe` | A registered deterministic rule handles the supported pattern, has positive and negative fixtures, preserves unrelated code, and is idempotent |
| `partial` | A rule can detect or transform a bounded subset, while explicit limitations remain |
| `manual` | Customer intent, runtime state, configuration, styling, or architecture prevents a safe deterministic edit |

Never mark a record `safe` only because a transformation looks simple. The
named rule must exist in the shared rule registry and pass the migration safety
tests.

## API references and evidence

Each `apiReferences` entry points to repository evidence for the public API.
Use `symbol` when it makes the reference precise. Historical exemptions and
versions require an already reviewed exemption; do not invent them to make
validation pass.

Before adding the record, confirm:

- the change affects supported customer-facing API;
- `requiredBy`, `deprecatedIn`, and `removedIn` come from reliable evidence;
- replacement or removal guidance is confirmed by the component/API owner;
- documentation paths and anchors exist;
- risks and manual checks are specific;
- automation safety matches implemented rules and fixtures;
- and the record does not duplicate an existing migration ID or semantic
  migration.

## Authoring workflow

1. Optionally scaffold supplied facts:

   ```sh
   npm run create:migration -- \
     --id <id> \
     --scope <upgrade|deprecation> \
     [--required-by <version>] \
     [--deprecated-in <version>] \
     --evidence <repository-file:line>
   ```

2. Review the evidence and choose the variants described above.
3. Manually add the complete typed record to `catalogue.ts`.
4. Add or update documentation and transformation rules/tests as required.
5. Regenerate and validate:

   ```sh
   npm run generate:migration-register
   npm run validate:migrations
   git diff --check
   ```

6. Review the generated register diff. Never edit the register directly.
