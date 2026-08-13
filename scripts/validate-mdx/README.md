# MDX validator

Validates component MDX as the source consumed by `build_skills` while checking machine-verifiable facts against Storybook and the public component modules.

The validator never creates missing documentation. A missing section fails with an actionable diagnostic; authoring remains the responsibility of a developer or an authoring skill.

## Commands

### Validate every component MDX

```sh
npm run validate:mdx
```

Validates all component documentation matching `src/components/**/*.mdx`. Use this before submitting MDX or Storybook changes to find inconsistencies across the complete documentation set. This global command also checks that every top-level folder in `src/components` contains at least one non-internal MDX.

Explicit exceptions are listed in `MDX_COVERAGE_EXCLUSIONS` because they are intentionally documented elsewhere or do not require their own component MDX.

### Validate one MDX file

```sh
npm run validate:mdx -- src/components/pill/pill.mdx
```

Validates only the provided file.
Use this for quick feedback while editing one component.

### Produce machine-readable output

```sh
npm run validate:mdx -- --json
```

Runs the same validation as `npm run validate:mdx`, but prints a JSON object with the file, error and warning counts plus every diagnostic.
This format is intended for CI and other scripts.

```sh
npm run validate:mdx -- src/components/pill/pill.mdx --json
```

### Test the validator

```sh
npm run test:validate-mdx
```

Runs the validator's unit tests against controlled MDX fixtures. This checks that the validation rules themselves accept valid structures and report invalid ones; it does not validate the project's real MDX files.

### Exit codes

- `0`: validation completed without errors, or all validator tests passed;
- `1`: at least one MDX validation error exists, or a validator test failed;
- `2`: no MDX file matched the supplied paths or patterns.

## Checks

Each diagnostic starts with its rule name, for example `contents/broken-link` or `examples/description`.
The checks are grouped below by the part of the MDX they validate.

### Component folder coverage

The global `npm run validate:mdx` command requires every folder directly under `src/components` to contain at least one MDX file.
The MDX may be located in a subfolder, so a single page can document a component family; files below an `__internal__` folder do not count.

Folders intentionally documented elsewhere or not requiring their own page are listed in `MDX_COVERAGE_EXCLUSIONS`.
This coverage check does not run when a specific file or glob is passed to the validator.

### Component metadata

- The document must contain exactly one H1 component title.
- A non-empty component description must appear after the H1 and before `**Category:**`.
- There is no minimum description length.
- There must be exactly one `**Category:**` declaration.
- The category must appear before `Contents` and use one of the values defined in `CATEGORIES`.

### Sections and heading hierarchy

- `Contents`, `Quick start`, `Examples`, and `Props` are required H2 sections and must appear in that order.
- Other H2 sections are allowed and do not need to be registered in the validator.
- H2 section names use sentence case: `Quick start`, `Validation states`, and `Related components`, not title case.
- Duplicate H2 sections are rejected, including differently capitalized names that normalize to the same section.
- Headings cannot be deeper than H4 and cannot skip a level: an H4 must be below an H3, for example.
- If an H2 between `Examples` and `Props` contains a Canvas and is absent from `Contents`, it is reported as a likely H3 example missing one `#`.

### Contents

- `Contents` must contain Markdown links in the form `- [Section label](#section-anchor)`.
- Every H2 section after `Contents` must be listed once, in the same order as in the document.
- Each anchor must resolve to an existing heading.
- A link label must use the canonical sentence-case form of its section title.
- The error provides the complete replacement entry.

### Storybook blocks

- Every namespace stories import used by the MDX must resolve to a stories file.
- The document must contain exactly one `Meta`, referencing an imported stories namespace.
- Every `Canvas` must be self-closing and use the exact `<Canvas of={Stories.Example} />` form.
- The Canvas namespace must be imported and the referenced story must be exported by that file; the obsolete `name` prop is rejected.
- Every `ArgTypes` must be self-closing, use a valid `of={Stories}` reference, and follow the expected single-line or Prettier-style multiline formatting.
- `ArgTypes` blocks must be inside `Props`, and `Props` must contain at least one block.
- An H3 component name is required before each ArgTypes block only when the page contains multiple blocks.

### Examples

- Every example Canvas must belong to an H3 example or one of that example's H4 subsections.
- An H3 may contain several Canvas blocks; it needs only one explanatory text, placed before its first Canvas or H4.
- If an H3 has no explanatory text, every H4 below it must provide its own text.
- An H3 with no H4 and no text is always an error.
- An example heading must start with `(Deprecated)` when its H3 explicitly names a deprecated prop or its prose presents a deprecated prop as an inline-code identifier, such as `` `color` ``.
- A deprecated prop merely used inside the story implementation does not mark the example as deprecated.

### Quick start imports

- Import statements in fenced code blocks must be valid JavaScript or TypeScript syntax.
- `Quick start` must import the documented component from `carbon-react/lib/components/...`.
- The imported module must exist.
- The first component import must belong to the component family documented by the MDX.
- Every requested default or named export must exist in that public module.

### Deprecation

- If the documented component has an `@deprecated` annotation, or its primary Storybook title starts with `Deprecated/`, the MDX must contain one `DeprecationWarning`.
- The warning must appear after the H1 and before the description and `Contents`.
- The warning must contain meaningful migration guidance and use the standard `deprecation-warning.component` import.
- More than one warning is an error.
- A warning that cannot be confirmed by the component or Storybook metadata is reported as a warning for manual review.
