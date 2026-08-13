import test from "node:test";
import assert from "node:assert/strict";
import validateMdx from "./validator.mjs";

class FakeInspector {
  constructor({
    storyDeprecated = false,
    componentDeprecated = false,
    missingExports = [],
    sourcePath = "/virtual/widget/index.ts",
    deprecatedProps = [],
  } = {}) {
    this.storyDeprecated = storyDeprecated;
    this.componentDeprecated = componentDeprecated;
    this.missingExports = missingExports;
    this.sourcePath = sourcePath;
    this.deprecatedProps = deprecatedProps;
  }

  resolveStory() {
    return "/virtual/widget.stories.tsx";
  }

  exportedNames() {
    return new Set(["Default", "Compact"]);
  }

  isDeprecatedStory() {
    return this.storyDeprecated;
  }

  deprecatedPropsForStory() {
    return new Set(this.deprecatedProps);
  }

  inspectComponentImport() {
    return {
      sourcePath: this.sourcePath,
      missingExports: this.missingExports,
      deprecated: this.componentDeprecated,
    };
  }
}

const validMdx = `import { Meta, ArgTypes, Canvas } from "@storybook/addon-docs/blocks";
import * as WidgetStories from "./widget.stories";

<Meta of={WidgetStories} />

# Widget

A Widget presents useful information and supports a compact presentation.

**Category:** UI presentation

## Contents

- [Quick start](#quick-start)
- [Examples](#examples)
- [Props](#props)

## Quick start

\`\`\`javascript
import Widget from "carbon-react/lib/components/widget";
\`\`\`

## Examples

### Default

Use this example for the standard presentation.

<Canvas of={WidgetStories.Default} />

### Sizes

Use these examples when the available space determines the size.

<Canvas of={WidgetStories.Default} />

#### Compact

<Canvas of={WidgetStories.Compact} />

## Props

### Widget

<ArgTypes of={WidgetStories} />
`;

test("accepts one H3 description for multiple Canvas and H4 subsections", () => {
  const diagnostics = validateMdx(
    validMdx,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  );
  assert.deepEqual(diagnostics, []);
});

test("reports one missing description per H3 rather than per Canvas", () => {
  const content = validMdx
    .replace("Use this example for the standard presentation.\n\n", "")
    .replace(
      "<Canvas of={WidgetStories.Default} />",
      "<Canvas of={WidgetStories.Default} />\n\n<Canvas of={WidgetStories.Compact} />",
    );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  ).filter(({ rule }) => rule === "examples/description");

  assert.equal(diagnostics.length, 1);
  assert.match(diagnostics[0].message, /### Default/);
});

test("accepts an H3 without text when every H4 has its own text", () => {
  const content = validMdx
    .replace(
      "Use these examples when the available space determines the size.\n\n<Canvas of={WidgetStories.Default} />\n\n",
      "",
    )
    .replace(
      "#### Compact\n\n<Canvas",
      "#### Compact\n\nUse this compact example in dense layouts.\n\n<Canvas",
    );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  );

  assert.equal(
    diagnostics.some(({ rule }) => rule === "examples/description"),
    false,
  );
});

test("reports an H4 without text when its H3 also has no text", () => {
  const content = validMdx.replace(
    "Use these examples when the available space determines the size.\n\n<Canvas of={WidgetStories.Default} />\n\n",
    "",
  );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  ).filter(({ rule }) => rule === "examples/description");

  assert.equal(diagnostics.length, 1);
  assert.match(diagnostics[0].message, /#### Compact/);
});

test("lets an H3 description cover an H4 without text", () => {
  const diagnostics = validateMdx(
    validMdx,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  );

  assert.equal(
    diagnostics.some(({ rule }) => rule === "examples/description"),
    false,
  );
});

test("requires Deprecated when an example explicitly presents a deprecated prop", () => {
  const content = validMdx.replace(
    "### Default\n\nUse this example for the standard presentation.",
    "### Widget with oldProp\n\nUse this example for legacy layouts.",
  );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector({ deprecatedProps: ["oldProp"] }),
  );
  const deprecatedDiagnostic = diagnostics.find(
    ({ rule }) => rule === "examples/deprecated-prop",
  );

  assert.match(deprecatedDiagnostic?.message ?? "", /“oldProp”/);
  assert.match(
    deprecatedDiagnostic?.message ?? "",
    /### \(Deprecated\) Widget with oldProp/,
  );
});

test("requires Deprecated when example text presents a deprecated inline-code prop", () => {
  const content = validMdx.replace(
    "### Default\n\nUse this example for the standard presentation.",
    "### Legacy layout\n\nUse the `oldProp` prop for legacy layouts.",
  );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector({ deprecatedProps: ["oldProp"] }),
  );

  assert.ok(
    diagnostics.some(({ rule }) => rule === "examples/deprecated-prop"),
  );
});

test("does not interpret ordinary prose as a prop reference", () => {
  const content = validMdx.replace(
    "### Default\n\nUse this example for the standard presentation.",
    "### Legacy layout\n\nUse the oldProp value for legacy layouts.",
  );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector({ deprecatedProps: ["oldProp"] }),
  );

  assert.equal(
    diagnostics.some(({ rule }) => rule === "examples/deprecated-prop"),
    false,
  );
});

test("does not deprecate an example for an unmentioned deprecated prop", () => {
  const diagnostics = validateMdx(
    validMdx,
    "/virtual/widget/widget.mdx",
    new FakeInspector({ deprecatedProps: ["implementationOnly"] }),
  );

  assert.equal(
    diagnostics.some(({ rule }) => rule === "examples/deprecated-prop"),
    false,
  );
});

test("accepts Deprecated when the text presents a deprecated inline-code prop", () => {
  const content = validMdx.replace(
    "### Default\n\nUse this example for the standard presentation.",
    "### (Deprecated) Legacy layout\n\nUse the `oldProp` prop for legacy layouts.",
  );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector({ deprecatedProps: ["oldProp"] }),
  );

  assert.equal(
    diagnostics.some(({ rule }) => rule === "examples/deprecated-prop"),
    false,
  );
});

test("suggests a missing # for an example accidentally changed from H3 to H2", () => {
  const content = validMdx.replace("### Default", "## Default");
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  );

  const headingDiagnostic = diagnostics.find(
    ({ rule }) => rule === "structure/example-heading-level",
  );
  assert.match(headingDiagnostic?.message ?? "", /Use “### Default”/);
  assert.equal(
    diagnostics.some(
      ({ rule, message }) =>
        rule === "contents/missing-entry" && message.includes("Default"),
    ),
    false,
  );
});

test("explains how to fix a Contents label capitalization mismatch", () => {
  const content = validMdx.replace(
    "[Quick start](#quick-start)",
    "[Quick Start](#quick-start)",
  );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  );
  const labelDiagnostic = diagnostics.find(
    ({ rule }) => rule === "contents/label",
  );

  assert.match(
    labelDiagnostic?.message ?? "",
    /canonical capitalization “Quick start”/,
  );
  assert.match(
    labelDiagnostic?.message ?? "",
    /- \[Quick start\]\(#quick-start\)/,
  );
});

test("uses sentence case for the Validation states Contents suggestion", () => {
  const content = validMdx
    .replace(
      "- [Props](#props)",
      "- [Validation States](#validation-states)\n- [Props](#props)",
    )
    .replace(
      "## Props",
      "## Validation States\n\nShows validation feedback.\n\n## Props",
    );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  );
  const labelDiagnostic = diagnostics.find(
    ({ rule }) => rule === "contents/label",
  );

  assert.match(
    labelDiagnostic?.message ?? "",
    /- \[Validation states\]\(#validation-states\)/,
  );
});

test("uses sentence case for every multi-word section", () => {
  const sections = new Map([
    ["Related Components", "Related components"],
    ["Designer Notes", "Designer notes"],
    ["Interactive Demo", "Interactive demo"],
    ["Basic Usage", "Basic usage"],
  ]);

  for (const [titleCase, sentenceCase] of sections) {
    const anchor = titleCase.toLowerCase().replaceAll(" ", "-");
    const content = validMdx
      .replace(
        "- [Props](#props)",
        `- [${titleCase}](#${anchor})\n- [Props](#props)`,
      )
      .replace(
        "## Props",
        `## ${titleCase}\n\nAdditional guidance.\n\n## Props`,
      );
    const diagnostics = validateMdx(
      content,
      "/virtual/widget/widget.mdx",
      new FakeInspector(),
    );
    const labelDiagnostic = diagnostics.find(
      ({ rule }) => rule === "contents/label",
    );

    assert.match(
      labelDiagnostic?.message ?? "",
      new RegExp(`- \\[${sentenceCase}\\]\\(#${anchor}\\)`),
    );
  }
});

test("requires the component description before Category", () => {
  const description =
    "A Widget presents useful information and supports a compact presentation.";
  const content = validMdx.replace(
    `${description}\n\n**Category:** UI presentation`,
    `**Category:** UI presentation\n\n${description}`,
  );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  );
  const orderDiagnostic = diagnostics.find(
    ({ rule }) => rule === "metadata/description-order",
  );

  assert.equal(
    orderDiagnostic?.message,
    "The component description must be placed before “**Category:**”.",
  );
});

test("accepts any non-empty component description", () => {
  const content = validMdx.replace(
    "A Widget presents useful information and supports a compact presentation.",
    "Short.",
  );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  );

  assert.equal(
    diagnostics.some(({ rule }) => rule === "metadata/description"),
    false,
  );
});

test("accepts one ArgTypes block without an H3 heading", () => {
  const content = validMdx.replace("### Widget\n\n", "");
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  );

  assert.equal(
    diagnostics.some(({ rule }) => rule === "storybook/argtypes-heading"),
    false,
  );
});

test("requires an H3 before each block when Props has multiple ArgTypes", () => {
  const content = validMdx.replace(
    "<ArgTypes of={WidgetStories} />",
    "<ArgTypes of={WidgetStories} />\n\n<ArgTypes of={WidgetStories} />",
  );
  const diagnostics = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  ).filter(({ rule }) => rule === "storybook/argtypes-heading");

  assert.equal(diagnostics.length, 1);
  assert.match(diagnostics[0].message, /multiple ArgTypes blocks/);
});

test("reports missing metadata, sections, Contents entries, and malformed blocks", () => {
  const content = `import { Meta, ArgTypes, Canvas } from "@storybook/addon-docs/blocks";
import * as WidgetStories from "./widget.stories";
<Meta of={WidgetStories} />
# Widget
## Contents
- [Quick start](#quick-start)
## Quick Start
\`\`\`javascript
import Widget from "carbon-react/lib/components/widget";
\`\`\`
## Examples
### Default
<Canvas name="default" of={WidgetStories.Default}/>
## Props
<ArgTypes of = {WidgetStories}/>
`;
  const rules = validateMdx(
    content,
    "/virtual/widget/widget.mdx",
    new FakeInspector(),
  ).map(({ rule }) => rule);

  for (const expected of [
    "metadata/description",
    "metadata/category",
    "structure/section-name",
    "contents/missing-entry",
    "storybook/canvas-format",
    "examples/description",
    "storybook/argtypes-of",
  ]) {
    assert.ok(rules.includes(expected), `expected ${expected}`);
  }
});

test("requires a warning when code marks the component as deprecated", () => {
  const diagnostics = validateMdx(
    validMdx,
    "/virtual/widget/widget.mdx",
    new FakeInspector({ componentDeprecated: true }),
  );
  assert.ok(
    diagnostics.some(({ rule }) => rule === "deprecation/missing-warning"),
  );
});

test("accepts a populated DeprecationWarning for deprecated stories", () => {
  const deprecated = validMdx
    .replace(
      'import * as WidgetStories from "./widget.stories";',
      'import * as WidgetStories from "./widget.stories";\nimport DeprecationWarning from "../../../.storybook/utils/deprecation-warning.component";',
    )
    .replace(
      "# Widget\n",
      "# Widget\n\n<DeprecationWarning>Widget is deprecated. Use the NewWidget component for new implementations.</DeprecationWarning>\n",
    );
  const diagnostics = validateMdx(
    deprecated,
    "/virtual/widget/widget.mdx",
    new FakeInspector({ storyDeprecated: true }),
  );
  assert.equal(
    diagnostics.some(({ rule }) => rule.startsWith("deprecation/")),
    false,
  );
});

test("reports public exports missing from the Quick start import", () => {
  const diagnostics = validateMdx(
    validMdx,
    "/virtual/widget/widget.mdx",
    new FakeInspector({ missingExports: ["default"] }),
  );
  assert.ok(diagnostics.some(({ rule }) => rule === "quick-start/export"));
});

test("reports a Quick start import from another component family", () => {
  const diagnostics = validateMdx(
    validMdx,
    "/virtual/widget/widget.mdx",
    new FakeInspector({ sourcePath: "/virtual/button/index.ts" }),
  );
  assert.ok(
    diagnostics.some(({ rule }) => rule === "quick-start/component-module"),
  );
});
