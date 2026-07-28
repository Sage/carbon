#!/usr/bin/env node

/*
 * Phase 0 prototype for the revised optional deprecation-cleanup slice.
 * Evidence only; not production rule code.
 */

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const moduleRoot =
  process.env.PHASE0_NODE_MODULES ||
  "/private/tmp/carbon-phase0-prototype/node_modules";
const jscodeshift = require(path.join(moduleRoot, "jscodeshift"));

function stepSequenceProp(source, parser) {
  const j = jscodeshift.withParser(parser);
  const root = j(source);
  const bindings = new Set();
  root.find(j.ImportDeclaration, { source: { value: "carbon-react" } }).forEach(
    ({ node }) => {
      node.specifiers.forEach((specifier) => {
        if (
          specifier.type === "ImportSpecifier" &&
          specifier.imported.name === "StepSequenceItem"
        ) {
          bindings.add(specifier.local?.name || "StepSequenceItem");
        }
      });
    },
  );
  let matches = 0;
  root.find(j.JSXOpeningElement).forEach(({ node }) => {
    if (node.name.type !== "JSXIdentifier" || !bindings.has(node.name.name)) {
      return;
    }
    const oldProp = node.attributes.find(
      (attribute) =>
        attribute.type === "JSXAttribute" &&
        attribute.name.name === "ariaLabel",
    );
    const replacementExists = node.attributes.some(
      (attribute) =>
        attribute.type === "JSXAttribute" &&
        attribute.name.name === "aria-label",
    );
    if (oldProp && !replacementExists) {
      oldProp.name.name = "aria-label";
      matches += 1;
    }
  });
  return { matches, output: root.toSource({ reuseWhitespace: true }) };
}

function dialogFullScreenComponent(source, parser) {
  const j = jscodeshift.withParser(parser);
  const root = j(source);
  const bindings = new Set();
  root
    .find(j.ImportDeclaration, {
      source: { value: "carbon-react/lib/components/dialog-full-screen" },
    })
    .forEach(({ node }) => {
      node.specifiers.forEach((specifier) => {
        if (specifier.type === "ImportDefaultSpecifier") {
          bindings.add(specifier.local.name);
        }
      });
    });

  let matches = 0;
  let conflicts = 0;
  root.find(j.JSXOpeningElement).forEach(({ node }) => {
    if (node.name.type !== "JSXIdentifier" || !bindings.has(node.name.name)) {
      return;
    }
    const hasConflict = node.attributes.some(
      (attribute) =>
        attribute.type === "JSXSpreadAttribute" ||
        (attribute.type === "JSXAttribute" &&
          (attribute.name.name === "size" ||
            attribute.name.name === "fullscreen")),
    );
    if (hasConflict) {
      conflicts += 1;
      return;
    }
    node.attributes.unshift(
      j.jsxAttribute(j.jsxIdentifier("size"), j.stringLiteral("fullscreen")),
    );
    matches += 1;
  });
  if (matches > 0 && conflicts === 0) {
    root
      .find(j.ImportDeclaration, {
        source: { value: "carbon-react/lib/components/dialog-full-screen" },
      })
      .forEach(({ node }) => {
        node.source.value = "carbon-react/lib/components/dialog";
      });
  }
  return {
    matches,
    conflicts,
    output: root.toSource({ quote: "double", reuseWhitespace: true }),
  };
}

const propCases = [
  {
    extension: "jsx",
    parser: "babel",
    source: `// keep prop comment
import { StepSequenceItem as Step } from "carbon-react";
export const item = <Step indicator="1" ariaLabel="Account" />;\n`,
  },
  {
    extension: "tsx",
    parser: "tsx",
    source: `import { StepSequenceItem as Step } from "carbon-react";
const label: string = "Account";
export const item = <Step indicator="1" ariaLabel={label} />;\n`,
  },
];

const componentCases = [
  {
    extension: "js",
    parser: "babel",
    source: `import Full from "carbon-react/lib/components/dialog-full-screen";
export const dialog = <Full open />;\n`,
  },
  {
    extension: "tsx",
    parser: "tsx",
    source: `import Full from "carbon-react/lib/components/dialog-full-screen";
export const dialog = <Full open={true}>Content</Full>;\n`,
  },
];

const report = { propCases: [], componentCases: [], conflicts: [] };
for (const testCase of propCases) {
  const first = stepSequenceProp(testCase.source, testCase.parser);
  const second = stepSequenceProp(first.output, testCase.parser);
  assert.equal(first.matches, 1);
  assert.match(first.output, /aria-label=/);
  assert.equal(second.matches, 0);
  report.propCases.push({
    extension: testCase.extension,
    matches: first.matches,
    secondRunMatches: second.matches,
  });
}

for (const testCase of componentCases) {
  const first = dialogFullScreenComponent(testCase.source, testCase.parser);
  const second = dialogFullScreenComponent(first.output, testCase.parser);
  assert.equal(first.matches, 1);
  assert.equal(first.conflicts, 0);
  assert.match(first.output, /carbon-react\/lib\/components\/dialog"/);
  assert.match(first.output, /size="fullscreen"/);
  assert.equal(second.matches, 0);
  report.componentCases.push({
    extension: testCase.extension,
    matches: first.matches,
    secondRunMatches: second.matches,
  });
}

const conflictSource = `import Full from "carbon-react/lib/components/dialog-full-screen";
const props = { open: true };
export const dialog = <Full {...props} />;\n`;
const conflict = dialogFullScreenComponent(conflictSource, "tsx");
assert.equal(conflict.matches, 0);
assert.equal(conflict.conflicts, 1);
assert.equal(conflict.output, conflictSource);
report.conflicts.push({
  pattern: "DialogFullScreen prop spread",
  changed: false,
  reported: true,
});

report.node = process.version;
report.jscodeshift = require(path.join(
  moduleRoot,
  "jscodeshift/package.json",
)).version;
fs.writeFileSync(
  path.join(__dirname, "revised-slice-results.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
