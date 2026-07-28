#!/usr/bin/env node

/*
 * Phase 0 throwaway prototype. This is evidence, not production migration code.
 *
 * Install the pinned tools outside the repository, then run:
 *   npm install --prefix /tmp/carbon-phase0-prototype jscodeshift@17.4.0 ts-morph@27.0.2
 *   PHASE0_NODE_MODULES=/tmp/carbon-phase0-prototype/node_modules node run-experiments.cjs
 */

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const moduleRoot =
  process.env.PHASE0_NODE_MODULES ||
  "/private/tmp/carbon-phase0-prototype/node_modules";
const jscodeshift = require(path.join(moduleRoot, "jscodeshift"));
const { Project, ScriptKind, SyntaxKind } = require(path.join(
  moduleRoot,
  "ts-morph",
));

const cases = [
  {
    extension: "js",
    parser: "babel",
    expectedMatches: 1,
    source: `// preserve loader guidance
import { Loader as Busy } from "carbon-react";
export const view = <Busy aria-label='Loading customers' />;\n`,
  },
  {
    extension: "jsx",
    parser: "babel",
    expectedMatches: 1,
    source: `import Busy from "carbon-react/lib/components/loader";
// preserve adjacent comment
export const View = () => <Busy aria-label="Loading invoices" />;\n`,
  },
  {
    extension: "ts",
    parser: "tsx",
    expectedMatches: 0,
    source: `import { Loader as Busy } from "carbon-react";
export const label: string = "typed";
// preserve TypeScript parser guidance
export type BusyComponent = typeof Busy;\n`,
  },
  {
    extension: "tsx",
    parser: "tsx",
    expectedMatches: 1,
    source: `import Busy from "carbon-react/lib/components/loader";
type Props = { label: string };
export const View = ({ label }: Props) => (
  <Busy /* preserve inline */ aria-label={label} />
);\n`,
  },
];

function loaderBindings(j, root) {
  const names = new Set();
  root.find(j.ImportDeclaration).forEach(({ node }) => {
    if (node.source.value === "carbon-react") {
      node.specifiers.forEach((specifier) => {
        if (
          specifier.type === "ImportSpecifier" &&
          specifier.imported.name === "Loader"
        ) {
          names.add(specifier.local?.name || "Loader");
        }
      });
    }
    if (node.source.value === "carbon-react/lib/components/loader") {
      node.specifiers.forEach((specifier) => {
        if (specifier.type === "ImportDefaultSpecifier") {
          names.add(specifier.local.name);
        }
      });
    }
  });
  return names;
}

function transformWithJscodeshift(testCase) {
  const j = jscodeshift.withParser(testCase.parser);
  const root = j(testCase.source);
  const bindings = loaderBindings(j, root);
  let matches = 0;
  root.find(j.JSXOpeningElement).forEach(({ node }) => {
    if (node.name.type !== "JSXIdentifier" || !bindings.has(node.name.name)) {
      return;
    }
    node.attributes.forEach((attribute) => {
      if (
        attribute.type === "JSXAttribute" &&
        attribute.name.name === "aria-label"
      ) {
        attribute.name.name = "loaderLabel";
        matches += 1;
      }
    });
  });
  return {
    matches,
    output: root.toSource({ quote: "double", reuseWhitespace: true }),
  };
}

function inspectWithTsMorph(testCase) {
  const project = new Project({ useInMemoryFileSystem: true });
  const scriptKind =
    testCase.extension === "js"
      ? ScriptKind.JS
      : testCase.extension === "jsx"
        ? ScriptKind.JSX
        : testCase.extension === "ts"
          ? ScriptKind.TS
          : ScriptKind.TSX;
  const sourceFile = project.createSourceFile(
    `fixture.${testCase.extension}`,
    testCase.source,
    { scriptKind },
  );
  const bindings = new Set();
  sourceFile.getImportDeclarations().forEach((declaration) => {
    const moduleName = declaration.getModuleSpecifierValue();
    if (moduleName === "carbon-react") {
      declaration.getNamedImports().forEach((namedImport) => {
        if (namedImport.getName() === "Loader") {
          bindings.add(namedImport.getAliasNode()?.getText() || "Loader");
        }
      });
    }
    if (moduleName === "carbon-react/lib/components/loader") {
      const defaultImport = declaration.getDefaultImport();
      if (defaultImport) bindings.add(defaultImport.getText());
    }
  });
  const matches = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
    .concat(sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement))
    .filter(
      (element) =>
        bindings.has(element.getTagNameNode().getText()) &&
        element.getAttribute("aria-label"),
    );
  return {
    matches: matches.length,
    locations: matches.map((node) => node.getStartLineNumber()),
    printed: sourceFile.getFullText(),
  };
}

const results = [];
for (const testCase of cases) {
  const transformed = transformWithJscodeshift(testCase);
  const secondRun = transformWithJscodeshift({
    ...testCase,
    source: transformed.output,
  });
  const inspected = inspectWithTsMorph(testCase);
  assert.equal(
    transformed.matches,
    testCase.expectedMatches,
    `${testCase.extension}: transform`,
  );
  if (testCase.expectedMatches) {
    assert.match(transformed.output, /loaderLabel=/);
    assert.doesNotMatch(transformed.output, /aria-label=/);
  }
  assert.match(transformed.output, /preserve/);
  assert.equal(secondRun.matches, 0, `${testCase.extension}: idempotency`);
  assert.equal(
    inspected.matches,
    testCase.expectedMatches,
    `${testCase.extension}: detection`,
  );
  assert.equal(inspected.printed, testCase.source, `${testCase.extension}: read`);
  results.push({
    extension: testCase.extension,
    parser: testCase.parser,
    transformMatches: transformed.matches,
    secondRunMatches: secondRun.matches,
    detectionMatches: inspected.matches,
    locations: inspected.locations,
    commentsPreserved: transformed.output.includes("preserve"),
  });
}

const ambiguous = {
  extension: "tsx",
  parser: "tsx",
  source: `import { Loader as CarbonLoader } from "carbon-react";
const props = { "aria-label": "unknown at compile time" };
export const View = () => <CarbonLoader {...props} />;\n`,
};
const ambiguousResult = transformWithJscodeshift(ambiguous);
assert.equal(ambiguousResult.matches, 0);
assert.equal(ambiguousResult.output, ambiguous.source);

const representative = Array.from({ length: 500 }, (_, index) => ({
  ...cases[index % cases.length],
}));
const jStart = performance.now();
representative.forEach(transformWithJscodeshift);
const jMilliseconds = performance.now() - jStart;
const tsStart = performance.now();
representative.forEach(inspectWithTsMorph);
const tsMorphMilliseconds = performance.now() - tsStart;
const performanceThresholdMilliseconds = 30_000;
assert.ok(jMilliseconds < performanceThresholdMilliseconds);
assert.ok(tsMorphMilliseconds < performanceThresholdMilliseconds);

const report = {
  node: process.version,
  jscodeshift: require(path.join(moduleRoot, "jscodeshift/package.json"))
    .version,
  recast: require(path.join(moduleRoot, "recast/package.json")).version,
  tsMorph: require(path.join(moduleRoot, "ts-morph/package.json")).version,
  cases: results,
  ambiguousSpread: {
    changed: ambiguousResult.output !== ambiguous.source,
    reason: "runtime-generated prop objects are intentionally left unchanged",
  },
  performance: {
    fixtureCount: representative.length,
    thresholdMillisecondsPerTool: performanceThresholdMilliseconds,
    smokeCheckPassed: true,
    note: "Coarse development guard only; not a customer performance promise.",
  },
};

const reportPath = path.join(__dirname, "results.json");
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
