#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { Project, SyntaxKind } from "ts-morph";

const spacingProps = new Set([
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginX",
  "marginY",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingX",
  "paddingY",
]);
const tokenFirstComponents = new Set(["BoxNext", "NextBox"]);
const legacyIndexToGlobalSpace = [
  "var(--global-space-none)",
  "var(--global-space-layout-3-xs)",
  "var(--global-space-layout-2-xs)",
  "var(--global-space-layout-xs)",
  "var(--global-space-layout-s)",
  "var(--global-space-layout-m)",
  "var(--global-space-layout-l)",
  "var(--global-space-layout-xl)",
  "var(--global-space-layout-2-xl)",
  "var(--global-space-layout-3-xl)",
  "var(--global-space-layout-4-xl)",
];

const usage = `Usage: carbon-migrate-spacing [--assume-base-theme] [--write] <file...>

Convert static legacy Carbon spacing indexes to global-space CSS variables.

Options:
  --assume-base-theme  Confirm that the files use Carbon's base theme.
  --write              Update files in place. The default is a dry run.
  --help               Show this help message.

Examples:
  carbon-migrate-spacing --assume-base-theme src/Card.tsx
  carbon-migrate-spacing --assume-base-theme --write src/Card.tsx
`;

const args = process.argv.slice(2);
if (args.includes("--help")) {
  process.stdout.write(usage);
  process.exit(0);
}

const write = args.includes("--write");
const assumeBaseTheme = args.includes("--assume-base-theme");
const files = args.filter(
  (arg) => !["--write", "--assume-base-theme"].includes(arg),
);
const unknownOption = files.find((arg) => arg.startsWith("--"));

if (unknownOption)
  throw new Error(`Unknown option: ${unknownOption}\n\n${usage}`);
if (files.length === 0)
  throw new Error(
    `Pass one or more TSX/JSX source files to migrate.\n\n${usage}`,
  );

const isCarbonImport = (moduleSpecifier) =>
  moduleSpecifier === "carbon-react" ||
  moduleSpecifier.startsWith("carbon-react/");

const getCarbonComponents = (source) => {
  const namedComponents = new Map();
  const namespaces = new Set();

  source.getImportDeclarations().forEach((declaration) => {
    if (!isCarbonImport(declaration.getModuleSpecifierValue())) return;
    const defaultImport = declaration.getDefaultImport();
    if (defaultImport)
      namedComponents.set(defaultImport.getText(), defaultImport.getText());
    declaration.getNamedImports().forEach((imported) => {
      namedComponents.set(
        imported.getAliasNode()?.getText() || imported.getName(),
        imported.getName(),
      );
    });
    const namespaceImport = declaration.getNamespaceImport();
    if (namespaceImport) namespaces.add(namespaceImport.getText());
  });

  return { namedComponents, namespaces };
};

const getComponentName = (attribute, components) => {
  const openingElement = attribute.getFirstAncestor(
    (node) =>
      node.getKind() === SyntaxKind.JsxOpeningElement ||
      node.getKind() === SyntaxKind.JsxSelfClosingElement,
  );
  const tagName = openingElement?.getTagNameNode();
  if (!tagName) return undefined;
  if (tagName.getKind() === SyntaxKind.Identifier)
    return components.namedComponents.get(tagName.getText());
  if (tagName.getKind() === SyntaxKind.PropertyAccessExpression) {
    const expression = tagName.getExpression().getText();
    if (components.namespaces.has(expression)) return tagName.getName();
  }
  return undefined;
};

const reviewMessage = (fileName, attribute, reason) =>
  `${fileName}:${attribute.getStartLineNumber()} ${attribute.getNameNode().getText()} requires manual review (${reason})\n`;

const project = new Project({ useInMemoryFileSystem: false });
let changed = 0;
let review = 0;

files.forEach((fileName) => {
  const absolutePath = path.resolve(fileName);
  if (!fs.existsSync(absolutePath))
    throw new Error(`File not found: ${fileName}`);
  const source = project.addSourceFileAtPath(absolutePath);
  const components = getCarbonComponents(source);

  source.getDescendantsOfKind(SyntaxKind.JsxAttribute).forEach((attribute) => {
    const propName = attribute.getNameNode().getText();
    if (!spacingProps.has(propName)) return;
    const initializer = attribute.getInitializer();
    if (!initializer) return;
    const componentName = getComponentName(attribute, components);
    if (!componentName) {
      review += 1;
      process.stderr.write(
        reviewMessage(
          fileName,
          attribute,
          "component is not imported from carbon-react",
        ),
      );
      return;
    }
    if (tokenFirstComponents.has(componentName)) return;

    const expression = initializer
      .asKind(SyntaxKind.JsxExpression)
      ?.getExpression();
    if (expression?.getKind() !== SyntaxKind.NumericLiteral) {
      review += 1;
      process.stderr.write(
        reviewMessage(
          fileName,
          attribute,
          "value is not a static non-negative integer",
        ),
      );
      return;
    }

    const value = Number(expression.getText());
    if (
      !Number.isInteger(value) ||
      value < 0 ||
      value >= legacyIndexToGlobalSpace.length
    ) {
      review += 1;
      process.stderr.write(
        reviewMessage(
          fileName,
          attribute,
          "value is outside the supported legacy index range (0-10)",
        ),
      );
      return;
    }
    if (!assumeBaseTheme) {
      review += 1;
      process.stderr.write(
        reviewMessage(
          fileName,
          attribute,
          "pass --assume-base-theme after confirming the legacy theme.space scale",
        ),
      );
      return;
    }

    attribute.setInitializer(`"${legacyIndexToGlobalSpace[value]}"`);
    changed += 1;
  });

  if (write) source.saveSync();
  else if (source.isSaved() === false)
    process.stdout.write(source.getFullText());
});

process.stderr.write(
  `${write ? "Updated" : "Would update"} ${changed} static spacing prop(s); ${review} require manual review.\n`,
);
