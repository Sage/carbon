import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const libDir = path.resolve("lib");

function* declarations(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* declarations(file);
    else if (entry.name.endsWith(".d.ts")) yield file;
  }
}

function resolveSpecifier(file, specifier) {
  if (!specifier.startsWith(".") || /\.(?:js|mjs|cjs|json)$/.test(specifier)) {
    return specifier;
  }
  const target = path.resolve(path.dirname(file), specifier);
  if (fs.existsSync(`${target}.d.ts`)) return `${specifier}.js`;
  if (fs.existsSync(path.join(target, "index.d.ts"))) {
    return `${specifier}/index.js`;
  }
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return specifier;
  throw new Error(`Cannot resolve ${specifier} in ${file}`);
}

let changedFiles = 0;
let rewrittenImports = 0;
for (const file of declarations(libDir)) {
  const source = fs.readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const replacements = [];

  function add(specifier) {
    if (!specifier || !ts.isStringLiteral(specifier)) return;
    const replacement = resolveSpecifier(file, specifier.text);
    if (replacement !== specifier.text) {
      replacements.push({
        start: specifier.getStart(ast) + 1,
        end: specifier.getEnd() - 1,
        value: replacement,
      });
    }
  }

  function visit(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      add(node.moduleSpecifier);
    } else if (
      ts.isImportTypeNode(node) &&
      ts.isLiteralTypeNode(node.argument)
    ) {
      add(node.argument.literal);
    } else if (ts.isModuleDeclaration(node)) {
      add(node.name);
    }
    ts.forEachChild(node, visit);
  }

  visit(ast);
  if (!replacements.length) continue;
  let output = source;
  for (const { start, end, value } of replacements.reverse()) {
    output = `${output.slice(0, start)}${value}${output.slice(end)}`;
  }
  fs.writeFileSync(file, output);
  changedFiles += 1;
  rewrittenImports += replacements.length;
}

console.log(
  `Rewrote ${rewrittenImports} imports in ${changedFiles} declarations.`,
);
