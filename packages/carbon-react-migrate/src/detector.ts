import { readFileSync } from "node:fs";
import { extname, relative } from "node:path";
import jscodeshift from "jscodeshift";
import type {
  ASTPath,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportSpecifier,
  JSXAttribute,
  JSXOpeningElement,
  JSXSpreadAttribute,
  Node,
} from "jscodeshift";
import type { MigrationRecord } from "./types.js";
import {
  documentationUrl,
  type Finding,
  type SelectionTrack,
} from "./report.js";

export class MalformedSourceError extends Error {
  constructor(
    readonly file: string,
    cause: unknown,
  ) {
    super(`Unable to parse ${file}: ${String(cause)}`);
    this.name = "MalformedSourceError";
  }
}

export const parserFor = (file: string) =>
  [".ts", ".tsx"].includes(extname(file))
    ? jscodeshift.withParser("tsx")
    : jscodeshift.withParser("babel");

const location = (node: Node) => ({
  line: node.loc?.start.line ?? 1,
  column: (node.loc?.start.column ?? 0) + 1,
});

// The arguments mirror the mandatory report evidence fields at each match site.
// eslint-disable-next-line max-params
function baseFinding(
  record: MigrationRecord,
  track: SelectionTrack,
  file: string,
  node: Node,
  matchedApi: string,
  importOrigin: string,
  matchKind: string,
  automationStatus: Finding["automationStatus"] = record.automation.status,
  extraLimitations: string[] = [],
): Finding {
  const limitations =
    record.automation.status === "partial"
      ? [...record.automation.limitations]
      : record.automation.status === "manual"
        ? [record.automation.reason]
        : [];
  return {
    migrationId: record.id,
    applicableVersion:
      record.scope === "upgrade" ? record.requiredBy : record.deprecatedIn,
    selectionTrack: track,
    requiredForRequestedUpgrade: track === "required-upgrade",
    file,
    location: location(node),
    matchedApi,
    importOrigin,
    matchKind,
    automationStatus,
    documentation: documentationUrl(record),
    manualChecks: [...record.guidance.manualChecks],
    risks: [...record.guidance.risks],
    limitations: [...limitations, ...extraLimitations],
    runtimeWarningChecks:
      record.scope === "deprecation"
        ? [
            `Exercise relevant application flows and check Carbon deprecation warnings for ${record.id}.`,
            "Absence of runtime warnings does not prove complete coverage.",
          ]
        : [],
  };
}

type Binding = {
  local: string;
  origin: string;
  importPath: ASTPath<ImportDeclaration>;
};

export type SafeEdit =
  | {
      rule: "replace-step-sequence-item-aria-label";
      attribute: JSXAttribute;
    }
  | {
      rule: "replace-dialog-full-screen-component";
      openingElement: JSXOpeningElement;
      importDeclaration: ImportDeclaration;
      importSpecifier: ImportSpecifier | ImportDefaultSpecifier;
    };

export interface DetectedMatch {
  finding: Finding;
  safeEdit?: SafeEdit;
}

export interface SourceAnalysis {
  source: string;
  root: ReturnType<ReturnType<typeof jscodeshift.withParser>>;
  matches: DetectedMatch[];
}

type BindingWithSpecifier = Binding & {
  importSpecifier: ImportSpecifier | ImportDefaultSpecifier;
};

function imports(
  root: ReturnType<ReturnType<typeof jscodeshift.withParser>>,
  imported: string,
  allowedOrigins: string[],
  allowDefault = false,
): BindingWithSpecifier[] {
  const result: BindingWithSpecifier[] = [];
  root.find(jscodeshift.ImportDeclaration).forEach((path) => {
    const origin = String(path.node.source.value);
    if (!allowedOrigins.includes(origin)) return;
    for (const specifier of path.node.specifiers ?? []) {
      if (
        specifier.type === "ImportSpecifier" &&
        specifier.imported.type === "Identifier" &&
        specifier.imported.name === imported
      ) {
        result.push({
          local: String(specifier.local?.name ?? imported),
          origin,
          importPath: path as ASTPath<ImportDeclaration>,
          importSpecifier: specifier,
        });
      }
      if (
        allowDefault &&
        specifier.type === "ImportDefaultSpecifier" &&
        specifier.local
      ) {
        result.push({
          local: String(specifier.local.name),
          origin,
          importPath: path as ASTPath<ImportDeclaration>,
          importSpecifier: specifier,
        });
      }
    }
  });
  return result;
}

function isUnshadowed(path: ASTPath<Node>, binding: Binding): boolean {
  const useScope = path.scope.lookup(binding.local);
  const importScope = binding.importPath.scope.lookup(binding.local);
  return Boolean(useScope && importScope && useScope === importScope);
}

function jsxAttributes(node: {
  attributes?: Array<JSXAttribute | Node> | null;
}): Array<JSXAttribute | JSXSpreadAttribute> {
  return (node.attributes ?? []) as Array<JSXAttribute | JSXSpreadAttribute>;
}

export function analyzeSource(
  source: string,
  absoluteFile: string,
  displayRoot: string,
  records: readonly MigrationRecord[],
  track: SelectionTrack,
): SourceAnalysis {
  const j = parserFor(absoluteFile);
  let root: ReturnType<typeof j>;
  try {
    root = j(source);
  } catch (error) {
    throw new MalformedSourceError(absoluteFile, error);
  }
  const file = relative(displayRoot, absoluteFile).split("\\").join("/");
  const matches: DetectedMatch[] = [];

  for (const record of records) {
    if (record.id === "step-sequence-item-aria-label") {
      const bindings = imports(root, "StepSequenceItem", [
        "carbon-react",
        "carbon-react/lib/components/step-sequence/step-sequence-item",
      ]);
      for (const binding of bindings) {
        root.find(j.JSXOpeningElement).forEach((path) => {
          if (
            path.node.name.type !== "JSXIdentifier" ||
            path.node.name.name !== binding.local ||
            !isUnshadowed(path as ASTPath<Node>, binding)
          )
            return;
          const attrs = jsxAttributes(path.node);
          const target = attrs.find(
            (attr): attr is JSXAttribute =>
              attr.type === "JSXAttribute" &&
              attr.name.type === "JSXIdentifier" &&
              attr.name.name === "ariaLabel",
          );
          if (!target) return;
          const conflict = attrs.some(
            (attr) =>
              attr.type === "JSXSpreadAttribute" ||
              (attr.type === "JSXAttribute" &&
                attr.name.type === "JSXIdentifier" &&
                attr.name.name === "aria-label"),
          );
          const finding = baseFinding(
            record,
            track,
            file,
            target,
            `${binding.local}.ariaLabel`,
            binding.origin,
            conflict ? "ambiguous-prop" : "jsx-prop",
            conflict ? "unsupported" : undefined,
            conflict
              ? ["Spread or conflicting aria-label prevents a safe match."]
              : [],
          );
          matches.push({
            finding,
            ...(conflict
              ? {}
              : {
                  safeEdit: {
                    rule: "replace-step-sequence-item-aria-label" as const,
                    attribute: target,
                  },
                }),
          });
        });
      }
    }

    if (record.id === "dialog-full-screen-component") {
      const bindings = imports(
        root,
        "DialogFullScreen",
        ["carbon-react/lib/components/dialog-full-screen"],
        true,
      );
      for (const binding of bindings) {
        root.find(j.JSXOpeningElement).forEach((path) => {
          if (
            path.node.name.type !== "JSXIdentifier" ||
            path.node.name.name !== binding.local ||
            !isUnshadowed(path as ASTPath<Node>, binding)
          )
            return;
          const attrs = jsxAttributes(path.node);
          const propConflict = attrs.some(
            (attr) =>
              attr.type === "JSXSpreadAttribute" ||
              (attr.type === "JSXAttribute" &&
                attr.name.type === "JSXIdentifier" &&
                ["size", "fullscreen"].includes(attr.name.name)),
          );
          const importConflict =
            binding.importPath.node.importKind === "type" ||
            ("importKind" in binding.importSpecifier &&
              binding.importSpecifier.importKind === "type") ||
            binding.importPath.node.specifiers?.length !== 1;
          const conflict = propConflict || importConflict;
          const finding = baseFinding(
            record,
            track,
            file,
            path.node,
            binding.local,
            binding.origin,
            conflict ? "ambiguous-component" : "jsx-component",
            conflict ? "unsupported" : undefined,
            conflict
              ? [
                  propConflict
                    ? "Spread, size, or fullscreen props prevent a safe match."
                    : "A type-only or multi-specifier import prevents a safe replacement.",
                ]
              : [],
          );
          matches.push({
            finding,
            ...(conflict
              ? {}
              : {
                  safeEdit: {
                    rule: "replace-dialog-full-screen-component" as const,
                    openingElement: path.node,
                    importDeclaration: binding.importPath
                      .node as ImportDeclaration,
                    importSpecifier: binding.importSpecifier,
                  },
                }),
          });
        });
      }
    }

    if (record.id === "button-next-dom-ref") {
      const origins = ["carbon-react/lib/components/button/__next__"];
      for (const binding of imports(root, "ButtonHandle", origins)) {
        root.find(j.Identifier, { name: binding.local }).forEach((path) => {
          if (
            path.parentPath?.node.type === "ImportSpecifier" ||
            !isUnshadowed(path as ASTPath<Node>, binding)
          )
            return;
          const parent = path.parentPath?.node;
          if (
            parent?.type === "TSTypeReference" ||
            parent?.type === "TypeReference"
          ) {
            matches.push({
              finding: baseFinding(
                record,
                track,
                file,
                path.node,
                binding.local,
                binding.origin,
                "type-reference",
              ),
            });
          }
        });
      }
    }
  }
  return { source, root, matches };
}

export function analyzeFile(
  absoluteFile: string,
  displayRoot: string,
  records: readonly MigrationRecord[],
  track: SelectionTrack,
): SourceAnalysis {
  const source = readFileSync(absoluteFile, "utf8");
  return analyzeSource(source, absoluteFile, displayRoot, records, track);
}

export function detectFile(
  absoluteFile: string,
  displayRoot: string,
  records: readonly MigrationRecord[],
  track: SelectionTrack,
): Finding[] {
  return analyzeFile(absoluteFile, displayRoot, records, track).matches.map(
    ({ finding }) => finding,
  );
}
