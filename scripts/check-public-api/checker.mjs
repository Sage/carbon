/* eslint-disable no-console -- This command reports compatibility results to the terminal. */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import ts from "typescript";

const ROOT_ENTRY = "src/index.ts";
const SOURCE_FILE_PATTERN = /^src\/.*\.tsx?$/;
const ENTRY_FILE_PATTERN = /(?:^|\/)index\.tsx?$/;
const IGNORED_FILE_PATTERN =
  /(?:^|\/)(?:__spec__|__test__)(?:\/|$)|\.(?:test|spec|stories|pw|test-pw)\.tsx?$|\.d\.ts$/;
const INTERNAL_PATH_PATTERN = /(?:^|\/)__internal__(?:\/|$)/;
const SUPPORTED_NON_COMPONENT_ENTRIES = new Set([
  "src/hooks/useCharacterCount/index.ts",
  "src/hooks/useMediaQuery/index.ts",
  "src/locales/index.ts",
  "src/style/themes/index.ts",
  "src/style/themes/base/index.ts",
  "src/style/themes/none/index.ts",
  "src/style/themes/sage/index.ts",
]);

const runGit = (args) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });

const normalise = (value = "") => value.replace(/\s+/g, " ").trim();
const canonicalType = (value) => {
  if (!value) return value;
  const source = parseSource("type.ts", `type T = ${value};`);
  const declaration = source.statements[0];
  if (
    source.parseDiagnostics.length ||
    !ts.isTypeAliasDeclaration(declaration)
  ) {
    return value;
  }

  const printer = ts.createPrinter({ removeComments: true });
  const transformation = ts.transform(declaration.type, [
    (context) => (root) =>
      ts.visitNode(root, function visit(node) {
        const updated = ts.visitEachChild(node, visit, context);
        if (
          !ts.isUnionTypeNode(updated) &&
          !ts.isIntersectionTypeNode(updated)
        ) {
          return updated;
        }
        const types = [...updated.types].sort((left, right) =>
          printer
            .printNode(ts.EmitHint.Unspecified, left, source)
            .localeCompare(
              printer.printNode(ts.EmitHint.Unspecified, right, source),
            ),
        );
        return ts.isUnionTypeNode(updated)
          ? ts.factory.updateUnionTypeNode(updated, types)
          : ts.factory.updateIntersectionTypeNode(updated, types);
      }),
  ]);
  const result = normalise(
    printer.printNode(
      ts.EmitHint.Unspecified,
      transformation.transformed[0],
      source,
    ),
  );
  transformation.dispose();
  return result;
};
const unionMembers = (value) => {
  const source = parseSource("type.ts", `type T = ${value};`);
  const declaration = source.statements[0];
  if (
    source.parseDiagnostics.length ||
    !ts.isTypeAliasDeclaration(declaration)
  ) {
    return undefined;
  }
  const type = declaration.type;
  return (ts.isUnionTypeNode(type) ? type.types : [type]).map((member) =>
    canonicalType(member.getText(source)),
  );
};
const isUnionWidening = (before, after) => {
  const previous = unionMembers(before);
  const current = unionMembers(after);
  return Boolean(
    previous && current && previous.every((part) => current.includes(part)),
  );
};
const compatibilityCache = new Map();
const acceptsPreviousType = (before, after) => {
  const key = JSON.stringify([before, after]);
  if (compatibilityCache.has(key)) return compatibilityCache.get(key);

  const filePath = path.resolve("__public_api_compatibility__.ts");
  const content = `type Before = ${before};\ntype After = ${after};\n`;
  const options = { noEmit: true, strict: true, skipLibCheck: true, types: [] };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (name, languageVersion, onError, createNewSourceFile) =>
    name === filePath
      ? ts.createSourceFile(name, content, languageVersion, true)
      : getSourceFile(name, languageVersion, onError, createNewSourceFile);
  const program = ts.createProgram([filePath], options, host);
  const source = program.getSourceFile(filePath);
  const valid =
    source &&
    program.getSyntacticDiagnostics(source).length === 0 &&
    program.getSemanticDiagnostics(source).length === 0;
  const checker = valid ? program.getTypeChecker() : undefined;
  const compatible = checker
    ? checker.isTypeAssignableTo(
        checker.getTypeFromTypeNode(source.statements[0].type),
        checker.getTypeFromTypeNode(source.statements[1].type),
      )
    : isUnionWidening(before, after);
  compatibilityCache.set(key, Boolean(compatible));
  return Boolean(compatible);
};
export const hasBreakingChangeFooter = (message) =>
  /^BREAKING CHANGE:\s*\S/m.test(message);
const hasModifier = (node, kind) =>
  node.modifiers?.some((modifier) => modifier.kind === kind) ?? false;

const parseSource = (filePath, content = "") =>
  ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

const declarationName = (node) => {
  if (hasModifier(node, ts.SyntaxKind.DefaultKeyword)) return "default";
  return node.name && ts.isIdentifier(node.name) ? node.name.text : undefined;
};

const memberName = (member) => {
  if (!member.name) return normalise(member.getText());
  if (ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)) {
    return member.name.text;
  }
  return normalise(member.name.getText());
};

const interfaceMember = (member) => {
  if (ts.isPropertySignature(member)) {
    return {
      kind: "property",
      optional: Boolean(member.questionToken),
      readonly: hasModifier(member, ts.SyntaxKind.ReadonlyKeyword),
      type: normalise(member.type?.getText() ?? "unknown"),
    };
  }

  return {
    kind: ts.SyntaxKind[member.kind],
    optional: Boolean(member.questionToken),
    signature: normalise(member.getText()),
  };
};

const classMember = (member) => {
  const base = {
    kind: ts.SyntaxKind[member.kind],
    optional: Boolean(member.questionToken),
    static: hasModifier(member, ts.SyntaxKind.StaticKeyword),
    readonly: hasModifier(member, ts.SyntaxKind.ReadonlyKeyword),
  };

  if (ts.isPropertyDeclaration(member)) {
    return { ...base, type: normalise(member.type?.getText() ?? "inferred") };
  }

  if (
    ts.isMethodDeclaration(member) ||
    ts.isGetAccessorDeclaration(member) ||
    ts.isSetAccessorDeclaration(member) ||
    ts.isConstructorDeclaration(member)
  ) {
    const end = member.body?.pos ?? member.end;
    return {
      ...base,
      signature: normalise(
        member.getSourceFile().text.slice(member.getStart(), end),
      ),
    };
  }

  return { ...base, signature: normalise(member.getText()) };
};

const variableType = (declaration) => {
  if (declaration.type) return normalise(declaration.type.getText());

  const { initializer } = declaration;
  if (!initializer) return "inferred";

  if (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
    const typeParameters =
      initializer.typeParameters?.map((item) => item.getText()).join(",") ?? "";
    const parameters = initializer.parameters
      .map((parameter) => parameter.getText())
      .join(",");
    return normalise(
      `<${typeParameters}>(${parameters}) => ${initializer.type?.getText() ?? "inferred"}`,
    );
  }

  if (ts.isCallExpression(initializer)) {
    const typeArguments =
      initializer.typeArguments?.map((item) => item.getText()).join(",") ?? "";
    return normalise(`${initializer.expression.getText()}<${typeArguments}>`);
  }

  if (
    ts.isAsExpression(initializer) ||
    ts.isTypeAssertionExpression(initializer)
  ) {
    return normalise(`as ${initializer.type.getText()}`);
  }

  return "inferred";
};

export const declarationsFromSource = (filePath, content) => {
  const sourceFile = parseSource(filePath, content);
  const declarations = new Map();

  const add = (name, value) => {
    if (!name) return;
    const existing = declarations.get(name) ?? [];
    existing.push(value);
    declarations.set(name, existing);
  };

  for (const statement of sourceFile.statements) {
    if (ts.isInterfaceDeclaration(statement)) {
      add(declarationName(statement), {
        kind: "interface",
        heritage:
          statement.heritageClauses?.map((clause) =>
            normalise(clause.getText()),
          ) ?? [],
        typeParameters: normalise(
          statement.typeParameters?.map((item) => item.getText()).join(",") ??
            "",
        ),
        members: new Map(
          statement.members.map((member) => [
            memberName(member),
            interfaceMember(member),
          ]),
        ),
      });
      continue;
    }

    if (ts.isTypeAliasDeclaration(statement)) {
      add(declarationName(statement), {
        kind: "type",
        typeParameters: normalise(
          statement.typeParameters?.map((item) => item.getText()).join(",") ??
            "",
        ),
        type: normalise(statement.type.getText()),
      });
      continue;
    }

    if (ts.isFunctionDeclaration(statement)) {
      const end = statement.body?.pos ?? statement.end;
      add(declarationName(statement), {
        kind: "function",
        signature: normalise(
          sourceFile.text.slice(statement.getStart(sourceFile), end),
        ),
      });
      continue;
    }

    if (ts.isClassDeclaration(statement)) {
      add(declarationName(statement), {
        kind: "class",
        heritage:
          statement.heritageClauses?.map((clause) =>
            normalise(clause.getText()),
          ) ?? [],
        members: new Map(
          statement.members
            .filter(
              (member) => !hasModifier(member, ts.SyntaxKind.PrivateKeyword),
            )
            .map((member) => [memberName(member), classMember(member)]),
        ),
      });
      continue;
    }

    if (ts.isEnumDeclaration(statement)) {
      add(declarationName(statement), {
        kind: "enum",
        members: statement.members.map((member) => normalise(member.getText())),
      });
      continue;
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name)) continue;
        add(declaration.name.text, {
          kind: "variable",
          type: variableType(declaration),
        });
      }
    }
  }

  return declarations;
};

const compareMembers = (
  label,
  before,
  after,
  issues,
  { allowOptionalAdditions, compareTypes = true, allowWidening = true },
) => {
  for (const [name, oldMember] of before) {
    const newMember = after.get(name);
    if (!newMember) {
      issues.push(`${label}.${name} was removed.`);
      continue;
    }
    const optionalityNarrowed = oldMember.optional && !newMember.optional;
    if (optionalityNarrowed) {
      issues.push(`${label}.${name} changed from optional to required.`);
    }
    if (oldMember.readonly !== newMember.readonly) {
      issues.push(`${label}.${name} changed its readonly modifier.`);
    }
    const typesDiffer = oldMember.type !== newMember.type;
    const oldType = compareTypes
      ? typesDiffer
        ? canonicalType(oldMember.type)
        : oldMember.type
      : undefined;
    const newType = compareTypes
      ? typesDiffer
        ? canonicalType(newMember.type)
        : newMember.type
      : undefined;
    if (
      !optionalityNarrowed &&
      oldType !== newType &&
      (oldType || newType) &&
      (!allowWidening || !acceptsPreviousType(oldType, newType))
    ) {
      issues.push(
        `${label}.${name} changed type from \`${oldMember.type}\` to \`${newMember.type}\`.`,
      );
    }
    if (
      oldMember.signature !== newMember.signature &&
      (oldMember.signature || newMember.signature)
    ) {
      issues.push(`${label}.${name} changed its signature.`);
    }
    if (oldMember.kind !== newMember.kind) {
      issues.push(`${label}.${name} changed its declaration kind.`);
    }
    if (
      oldMember.static !== newMember.static &&
      (oldMember.static || newMember.static)
    ) {
      issues.push(`${label}.${name} changed its static modifier.`);
    }
  }

  for (const [name, newMember] of after) {
    if (before.has(name)) continue;
    if (!allowOptionalAdditions || !newMember.optional) {
      issues.push(`${label}.${name} was added as a required member.`);
    }
  }
};

export const compareDeclarations = (
  label,
  beforeEntries,
  afterEntries,
  {
    compareAliasTypes = true,
    compareInterfaceTypes = true,
    compareClassTypes = true,
  } = {},
) => {
  const issues = [];
  if (!afterEntries) return [`${label} was removed.`];
  if (beforeEntries.length !== afterEntries.length) {
    return [`${label} changed its number of declarations or overloads.`];
  }

  beforeEntries.forEach((before, index) => {
    const after = afterEntries[index];
    if (before.kind !== after.kind) {
      issues.push(`${label} changed from a ${before.kind} to a ${after.kind}.`);
      return;
    }

    if (before.kind === "type" && !compareAliasTypes) {
      if (before.typeParameters !== after.typeParameters) {
        issues.push(`${label} changed its type parameters.`);
      }
      return;
    }

    if (before.kind === "interface") {
      if (
        JSON.stringify(before.heritage) !== JSON.stringify(after.heritage) ||
        before.typeParameters !== after.typeParameters
      ) {
        issues.push(`${label} changed its inheritance or type parameters.`);
      }
      compareMembers(label, before.members, after.members, issues, {
        allowOptionalAdditions: true,
        compareTypes: compareInterfaceTypes,
      });
      return;
    }

    if (before.kind === "class") {
      if (JSON.stringify(before.heritage) !== JSON.stringify(after.heritage)) {
        issues.push(`${label} changed its class inheritance.`);
      }
      compareMembers(label, before.members, after.members, issues, {
        allowOptionalAdditions: false,
        compareTypes: compareClassTypes,
        allowWidening: false,
      });
      return;
    }

    if (JSON.stringify(before) !== JSON.stringify(after)) {
      issues.push(`${label} changed its ${before.kind} signature.`);
    }
  });

  return issues;
};

const createRevision = (revision, changedPaths, availablePaths) => {
  const contentCache = new Map();
  const astCache = new Map();
  const exportCache = new Map();
  const resolving = new Set();

  const read = (filePath) => {
    if (contentCache.has(filePath)) return contentCache.get(filePath);
    if (!availablePaths.has(filePath)) return undefined;
    let content;
    try {
      content = changedPaths.has(filePath)
        ? runGit(["show", `${revision}:${filePath}`])
        : fs.readFileSync(filePath, "utf8");
    } catch {
      content = undefined;
    }
    contentCache.set(filePath, content);
    return content;
  };

  const source = (filePath) => {
    if (astCache.has(filePath)) return astCache.get(filePath);
    const content = read(filePath);
    const parsed =
      content === undefined ? undefined : parseSource(filePath, content);
    astCache.set(filePath, parsed);
    return parsed;
  };

  const resolveModule = (fromPath, specifier) => {
    if (!specifier.startsWith(".")) return undefined;
    const base = path.posix.normalize(
      path.posix.join(path.posix.dirname(fromPath), specifier),
    );
    return [
      `${base}.ts`,
      `${base}.tsx`,
      path.posix.join(base, "index.ts"),
      path.posix.join(base, "index.tsx"),
    ].find((candidate) => read(candidate) !== undefined);
  };

  const localDeclarations = (filePath, sourceFile) => {
    const output = new Map();
    for (const statement of sourceFile.statements) {
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name))
            output.set(declaration.name.text, {
              path: filePath,
              name: declaration.name.text,
            });
        }
        continue;
      }
      const name = declarationName(statement);
      if (name) output.set(name, { path: filePath, name });
    }
    return output;
  };

  const getExports = (filePath) => {
    if (exportCache.has(filePath)) return exportCache.get(filePath);
    if (resolving.has(filePath)) return new Map();
    resolving.add(filePath);

    const sourceFile = source(filePath);
    const exports = new Map();
    exportCache.set(filePath, exports);
    if (!sourceFile) return exports;
    const locals = localDeclarations(filePath, sourceFile);
    const imports = new Map();
    for (const statement of sourceFile.statements) {
      if (!ts.isImportDeclaration(statement) || !statement.importClause) {
        continue;
      }
      const specifier = statement.moduleSpecifier.text;
      const { name, namedBindings } = statement.importClause;
      if (name) imports.set(name.text, { specifier, importedName: "default" });
      if (namedBindings && ts.isNamedImports(namedBindings)) {
        for (const element of namedBindings.elements) {
          imports.set(element.name.text, {
            specifier,
            importedName: element.propertyName?.text ?? element.name.text,
          });
        }
      } else if (namedBindings && ts.isNamespaceImport(namedBindings)) {
        imports.set(namedBindings.name.text, {
          specifier,
          importedName: "*",
        });
      }
    }
    const resolveLocal = (name) => {
      const declaration = locals.get(name);
      if (declaration) return declaration;
      const binding = imports.get(name);
      if (!binding) return undefined;
      const targetPath = resolveModule(filePath, binding.specifier);
      return (
        (targetPath && getExports(targetPath).get(binding.importedName)) ?? {
          path: filePath,
          name,
        }
      );
    };

    for (const statement of sourceFile.statements) {
      if (ts.isExportAssignment(statement)) {
        const localName = ts.isIdentifier(statement.expression)
          ? statement.expression.text
          : "default";
        exports.set(
          "default",
          resolveLocal(localName) ?? { path: filePath, name: localName },
        );
        continue;
      }

      if (hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
        const name = declarationName(statement);
        if (name) exports.set(name, { path: filePath, name });
        if (ts.isVariableStatement(statement)) {
          for (const declaration of statement.declarationList.declarations) {
            if (ts.isIdentifier(declaration.name)) {
              exports.set(declaration.name.text, {
                path: filePath,
                name: declaration.name.text,
              });
            }
          }
        }
      }

      if (!ts.isExportDeclaration(statement)) continue;
      const targetPath = statement.moduleSpecifier
        ? resolveModule(filePath, statement.moduleSpecifier.text)
        : undefined;
      const targetExports = targetPath ? getExports(targetPath) : new Map();

      if (!statement.exportClause) {
        for (const [name, origin] of targetExports) exports.set(name, origin);
        continue;
      }

      if (!ts.isNamedExports(statement.exportClause)) continue;
      for (const element of statement.exportClause.elements) {
        const exportedName = element.name.text;
        const targetName = element.propertyName?.text ?? exportedName;
        const origin = targetPath
          ? targetExports.get(targetName)
          : resolveLocal(targetName);
        if (origin) exports.set(exportedName, origin);
      }
    }

    resolving.delete(filePath);
    return exports;
  };

  return { read, getExports, availablePaths };
};

const createTypeResolver = (revision, rootPaths) => {
  const options = {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.React,
    target: ts.ScriptTarget.ES2015,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    types: [],
  };
  const host = ts.createCompilerHost(options);
  const originalFileExists = host.fileExists.bind(host);
  const originalDirectoryExists = host.directoryExists?.bind(host);
  const originalReadFile = host.readFile.bind(host);
  const originalGetSourceFile = host.getSourceFile.bind(host);
  const sourcePath = (fileName) => {
    const relativePath = path
      .relative(process.cwd(), fileName)
      .split(path.sep)
      .join("/");
    return relativePath.startsWith("src/") ? relativePath : undefined;
  };

  host.fileExists = (fileName) => {
    const filePath = sourcePath(fileName);
    return filePath
      ? revision.availablePaths.has(filePath)
      : originalFileExists(fileName);
  };
  host.directoryExists = (directoryName) => {
    const filePath = sourcePath(path.join(directoryName, "placeholder"));
    if (!filePath) return originalDirectoryExists?.(directoryName) ?? false;
    const prefix = `${filePath.slice(0, -"placeholder".length)}`;
    return [...revision.availablePaths].some((candidate) =>
      candidate.startsWith(prefix),
    );
  };
  host.readFile = (fileName) => {
    const filePath = sourcePath(fileName);
    return filePath ? revision.read(filePath) : originalReadFile(fileName);
  };
  host.getSourceFile = (
    fileName,
    languageVersion,
    onError,
    shouldCreateNewSourceFile,
  ) => {
    const filePath = sourcePath(fileName);
    if (!filePath) {
      return originalGetSourceFile(
        fileName,
        languageVersion,
        onError,
        shouldCreateNewSourceFile,
      );
    }
    const content = revision.read(filePath);
    return content === undefined
      ? undefined
      : ts.createSourceFile(
          fileName,
          content,
          languageVersion,
          true,
          filePath.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
        );
  };

  const program = ts.createProgram(
    [...rootPaths].map((filePath) => path.resolve(filePath)),
    options,
    host,
  );
  const checker = program.getTypeChecker();
  const formatType = (type, node) => {
    if (type.isUnion()) {
      return type.types
        .map((part) => formatType(part, node))
        .sort()
        .join(" | ");
    }
    if (type.isIntersection()) {
      return type.types
        .map((part) => formatType(part, node))
        .sort()
        .join(" & ");
    }
    return checker.typeToString(
      type,
      node,
      ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias,
    );
  };
  const findDeclaration = (origin, predicate) => {
    const source = program.getSourceFile(path.resolve(origin.path));
    return source?.statements.find(
      (statement) =>
        predicate(statement) && declarationName(statement) === origin.name,
    );
  };
  const findVariable = (origin) => {
    const source = program.getSourceFile(path.resolve(origin.path));
    for (const statement of source?.statements ?? []) {
      if (!ts.isVariableStatement(statement)) continue;
      const declaration = statement.declarationList.declarations.find(
        (item) => ts.isIdentifier(item.name) && item.name.text === origin.name,
      );
      if (declaration) return declaration;
    }
    return undefined;
  };
  const resolveAlias = (origin) => {
    const declaration = findDeclaration(origin, ts.isTypeAliasDeclaration);
    if (!declaration) return undefined;
    const type = checker.getTypeFromTypeNode(declaration.type);
    return formatType(type, declaration);
  };
  const resolveProperties = (type, declaration) =>
    new Map(
      checker
        .getPropertiesOfType(type)
        .filter(
          (property) =>
            !property.declarations?.some(
              (member) =>
                hasModifier(member, ts.SyntaxKind.PrivateKeyword) ||
                hasModifier(member, ts.SyntaxKind.ProtectedKeyword),
            ),
        )
        .map((property) => [
          property.name,
          {
            kind: "property",
            optional: Boolean(property.flags & ts.SymbolFlags.Optional),
            readonly:
              property.declarations?.some((member) =>
                hasModifier(member, ts.SyntaxKind.ReadonlyKeyword),
              ) ?? false,
            type: formatType(
              checker.getTypeOfSymbolAtLocation(property, declaration),
              declaration,
            ),
          },
        ]),
    );
  const resolveInterface = (origin) => {
    const declaration = findDeclaration(origin, ts.isInterfaceDeclaration);
    if (!declaration) return undefined;
    return resolveProperties(
      checker.getTypeAtLocation(declaration),
      declaration,
    );
  };
  const resolveValue = (origin, kind) => {
    const declaration =
      kind === "function"
        ? findDeclaration(origin, ts.isFunctionDeclaration)
        : findVariable(origin);
    if (!declaration) return undefined;
    return formatType(checker.getTypeAtLocation(declaration), declaration);
  };
  const resolveClass = (origin) => {
    const declaration = findDeclaration(origin, ts.isClassDeclaration);
    if (!declaration) return undefined;
    const symbol = checker.getSymbolAtLocation(declaration.name);
    if (!symbol) return undefined;
    return {
      instance: resolveProperties(
        checker.getTypeAtLocation(declaration),
        declaration,
      ),
      static: resolveProperties(
        checker.getTypeOfSymbolAtLocation(symbol, declaration),
        declaration,
      ),
    };
  };
  return { resolveAlias, resolveInterface, resolveValue, resolveClass };
};

export const main = () => {
  const quiet = process.argv.includes("--quiet");
  const stagedPaths = new Set(
    runGit(["diff", "--cached", "--name-only", "--diff-filter=ACMRD", "-z"])
      .split("\0")
      .filter(Boolean),
  );
  const relevantPaths = [...stagedPaths].filter(
    (filePath) =>
      SOURCE_FILE_PATTERN.test(filePath) &&
      !IGNORED_FILE_PATTERN.test(filePath),
  );
  if (relevantPaths.length === 0) {
    if (!quiet)
      console.log("No staged TypeScript public API changes to check.");
    return;
  }

  const unstagedPaths = new Set(
    runGit(["diff", "--name-only", "--diff-filter=ACMRD", "-z", "--", "src"])
      .split("\0")
      .filter(Boolean),
  );
  const beforePaths = new Set(
    runGit(["ls-tree", "-r", "--name-only", "-z", "HEAD", "--", "src"])
      .split("\0")
      .filter(Boolean),
  );
  const afterPaths = new Set(
    runGit(["ls-files", "--cached", "-z", "--", "src"])
      .split("\0")
      .filter(Boolean),
  );
  const changedPaths = new Set([...stagedPaths, ...unstagedPaths]);
  for (const filePath of beforePaths) {
    if (!afterPaths.has(filePath)) changedPaths.add(filePath);
  }
  for (const filePath of afterPaths) {
    if (!beforePaths.has(filePath)) changedPaths.add(filePath);
  }
  const beforeRevision = createRevision("HEAD", changedPaths, beforePaths);
  const afterRevision = createRevision("", changedPaths, afterPaths);
  const issues = [];
  const entryPaths = new Set(
    [...beforePaths, ...afterPaths].filter(
      (filePath) =>
        SOURCE_FILE_PATTERN.test(filePath) &&
        ENTRY_FILE_PATTERN.test(filePath) &&
        !IGNORED_FILE_PATTERN.test(filePath) &&
        !INTERNAL_PATH_PATTERN.test(filePath) &&
        (filePath.startsWith("src/components/") ||
          SUPPORTED_NON_COMPONENT_ENTRIES.has(filePath)),
    ),
  );
  entryPaths.add(ROOT_ENTRY);
  const addedExports = new Set();
  const declarationPairs = new Map();
  for (const entryPath of entryPaths) {
    const beforeExports = beforeRevision.getExports(entryPath);
    const afterExports = afterRevision.getExports(entryPath);
    for (const [publicName, beforeOrigin] of beforeExports) {
      const afterOrigin = afterExports.get(publicName);
      if (!afterOrigin) {
        const renamedTo = [...afterExports].find(
          ([name, origin]) =>
            !beforeExports.has(name) &&
            origin.path === beforeOrigin.path &&
            origin.name === beforeOrigin.name,
        )?.[0];
        const description = renamedTo
          ? `Public export \`${publicName}\` was renamed to \`${renamedTo}\`.`
          : `Public export \`${publicName}\` was removed.`;
        issues.push(`${entryPath}: ${description}`);
        continue;
      }

      const pairKey = JSON.stringify([beforeOrigin, afterOrigin]);
      const pair = declarationPairs.get(pairKey) ?? {
        beforeOrigin,
        afterOrigin,
        names: new Set(),
      };
      pair.names.add(publicName);
      declarationPairs.set(pairKey, pair);
    }
    for (const publicName of afterExports.keys()) {
      if (!beforeExports.has(publicName)) addedExports.add(publicName);
    }
  }

  const beforeDeclarationsByPath = new Map();
  const afterDeclarationsByPath = new Map();
  const getDeclarations = (revision, cache, filePath) => {
    if (!cache.has(filePath)) {
      const content = revision.read(filePath);
      cache.set(
        filePath,
        content ? declarationsFromSource(filePath, content) : new Map(),
      );
    }
    return cache.get(filePath);
  };
  const aliasPairs = [];
  const interfacePairs = [];
  const valuePairs = [];
  const classPairs = [];
  for (const {
    beforeOrigin,
    afterOrigin,
    names,
  } of declarationPairs.values()) {
    const beforeDeclarations = getDeclarations(
      beforeRevision,
      beforeDeclarationsByPath,
      beforeOrigin.path,
    );
    const afterDeclarations = getDeclarations(
      afterRevision,
      afterDeclarationsByPath,
      afterOrigin.path,
    );
    const location =
      beforeOrigin.path === afterOrigin.path
        ? beforeOrigin.path
        : `${beforeOrigin.path} → ${afterOrigin.path}`;
    const beforeEntries = beforeDeclarations.get(beforeOrigin.name) ?? [];
    const afterEntries = afterDeclarations.get(afterOrigin.name);
    const originChanged =
      beforeOrigin.path !== afterOrigin.path ||
      beforeOrigin.name !== afterOrigin.name ||
      relevantPaths.includes(beforeOrigin.path) ||
      relevantPaths.includes(afterOrigin.path);
    const resolveInterfaceTypes =
      beforeEntries.length === 1 &&
      afterEntries?.length === 1 &&
      beforeEntries[0].kind === "interface" &&
      afterEntries[0].kind === "interface";
    const resolveAliasTypes =
      beforeEntries.length === 1 &&
      afterEntries?.length === 1 &&
      beforeEntries[0].kind === "type" &&
      afterEntries[0].kind === "type";
    const resolveClassTypes =
      beforeEntries.length === 1 &&
      afterEntries?.length === 1 &&
      beforeEntries[0].kind === "class" &&
      afterEntries[0].kind === "class";
    const declarationIssues = originChanged
      ? compareDeclarations(
          [...names].join(", "),
          beforeEntries,
          afterEntries,
          {
            compareAliasTypes: !resolveAliasTypes,
            compareInterfaceTypes: !resolveInterfaceTypes,
            compareClassTypes: !resolveClassTypes,
          },
        )
      : [];
    issues.push(...declarationIssues.map((issue) => `${location}: ${issue}`));
    if (
      declarationIssues.length === 0 &&
      beforeEntries.length === 1 &&
      afterEntries?.length === 1
    ) {
      const pair = { beforeOrigin, afterOrigin, names, location };
      if (beforeEntries[0].kind === "type" && afterEntries[0].kind === "type") {
        aliasPairs.push(pair);
      } else if (
        beforeEntries[0].kind === "interface" &&
        afterEntries[0].kind === "interface"
      ) {
        interfacePairs.push(pair);
      } else if (
        ["function", "variable"].includes(beforeEntries[0].kind) &&
        beforeEntries[0].kind === afterEntries[0].kind
      ) {
        valuePairs.push({ ...pair, kind: beforeEntries[0].kind });
      } else if (
        beforeEntries[0].kind === "class" &&
        afterEntries[0].kind === "class"
      ) {
        classPairs.push(pair);
      }
    }
  }

  if (
    aliasPairs.length > 0 ||
    interfacePairs.length > 0 ||
    valuePairs.length > 0 ||
    classPairs.length > 0
  ) {
    const resolvedPairs = [
      ...aliasPairs,
      ...interfacePairs,
      ...valuePairs,
      ...classPairs,
    ];
    const beforeTypes = createTypeResolver(
      beforeRevision,
      new Set(resolvedPairs.map(({ beforeOrigin }) => beforeOrigin.path)),
    );
    const afterTypes = createTypeResolver(
      afterRevision,
      new Set(resolvedPairs.map(({ afterOrigin }) => afterOrigin.path)),
    );
    for (const { beforeOrigin, afterOrigin, names, location } of aliasPairs) {
      const previous = beforeTypes.resolveAlias(beforeOrigin);
      const current = afterTypes.resolveAlias(afterOrigin);
      if (
        previous === undefined ||
        current === undefined ||
        previous === current ||
        acceptsPreviousType(previous, current)
      ) {
        continue;
      }
      issues.push(
        `${location}: ${[...names].join(", ")} resolved type changed from \`${previous}\` to \`${current}\`.`,
      );
    }
    for (const {
      beforeOrigin,
      afterOrigin,
      names,
      location,
    } of interfacePairs) {
      const previous = beforeTypes.resolveInterface(beforeOrigin);
      const current = afterTypes.resolveInterface(afterOrigin);
      if (!previous || !current) continue;
      const declarationIssues = [];
      compareMembers(
        [...names].join(", "),
        previous,
        current,
        declarationIssues,
        {
          allowOptionalAdditions: true,
        },
      );
      issues.push(...declarationIssues.map((issue) => `${location}: ${issue}`));
    }
    for (const {
      beforeOrigin,
      afterOrigin,
      names,
      location,
      kind,
    } of valuePairs) {
      const previous = beforeTypes.resolveValue(beforeOrigin, kind);
      const current = afterTypes.resolveValue(afterOrigin, kind);
      if (
        previous === undefined ||
        current === undefined ||
        previous === current
      ) {
        continue;
      }
      issues.push(
        `${location}: ${[...names].join(", ")} resolved type changed from \`${previous}\` to \`${current}\`.`,
      );
    }
    for (const { beforeOrigin, afterOrigin, names, location } of classPairs) {
      const previous = beforeTypes.resolveClass(beforeOrigin);
      const current = afterTypes.resolveClass(afterOrigin);
      if (!previous || !current) continue;
      for (const surface of ["instance", "static"]) {
        const declarationIssues = [];
        compareMembers(
          `${[...names].join(", ")}${surface === "static" ? ".static" : ""}`,
          previous[surface],
          current[surface],
          declarationIssues,
          { allowOptionalAdditions: false, allowWidening: false },
        );
        issues.push(
          ...declarationIssues.map((issue) => `${location}: ${issue}`),
        );
      }
    }
  }

  if (issues.length === 0) {
    if (!quiet && addedExports.size > 0) {
      console.log(`New public exports: ${[...addedExports].join(", ")}`);
    }
    if (!quiet) console.log("Staged public API compatibility check passed.");
    return;
  }

  const messageFile = process.argv[2];
  if (
    messageFile &&
    hasBreakingChangeFooter(fs.readFileSync(messageFile, "utf8"))
  ) {
    if (!quiet) {
      console.log(
        "Breaking public API changes are documented in the commit message.",
      );
    }
    return;
  }

  console.error("\nPotential breaking public API changes detected:\n");
  issues.forEach((issue) => console.error(`  - ${issue}`));
  console.error(
    "\nPlease include intentional breaking public API changes in a commit with a BREAKING CHANGE: footer.\n",
  );
  process.exitCode = 1;
};
