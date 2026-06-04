// @ts-check
import prettier from "prettier";
import { SyntaxKind } from "ts-morph";
import { project, getOrAddSourceFile } from "./ts-project.mjs";

/**
 * @typedef {{ valueNode: import("ts-morph").Node | undefined }} ArgValue
 */

/**
 * Unwrap `as`, `satisfies` and parenthesized expressions to their inner node.
 * @param {import("ts-morph").Node | undefined} node
 * @returns {import("ts-morph").Node | undefined}
 */
function unwrap(node) {
  if (!node) return node;
  if (
    node.isKind(SyntaxKind.AsExpression) ||
    node.isKind(SyntaxKind.SatisfiesExpression) ||
    node.isKind(SyntaxKind.ParenthesizedExpression)
  ) {
    return unwrap(node.getExpression());
  }
  return node;
}

/**
 * Resolve the object literal an expression ultimately points to (following
 * simple variable references), or null when it cannot be resolved statically.
 * @param {import("ts-morph").Node | undefined} expression
 * @param {import("ts-morph").SourceFile} sourceFile
 * @returns {import("ts-morph").ObjectLiteralExpression | null}
 */
function resolveObjectLiteralExpr(expression, sourceFile) {
  const node = unwrap(expression);
  if (!node) return null;
  if (node.isKind(SyntaxKind.ObjectLiteralExpression)) return node;
  if (node.isKind(SyntaxKind.Identifier)) {
    const variable = sourceFile.getVariableDeclaration(node.getText());
    if (variable) {
      return resolveObjectLiteralExpr(variable.getInitializer(), sourceFile);
    }
  }
  return null;
}

/**
 * Get the render function (arrow / function expression) for a story export,
 * resolving inheritance via `...OtherStory` spreads for ANY referenced story.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} exportName
 * @param {Set<string>} visited
 * @returns {import("ts-morph").ArrowFunction | import("ts-morph").FunctionExpression | null}
 */
function resolveRender(sourceFile, exportName, visited) {
  if (visited.has(exportName)) return null;
  visited.add(exportName);

  const decl = sourceFile.getVariableDeclaration(exportName);
  if (!decl) return null;

  const init = unwrap(decl.getInitializer());
  if (!init) return null;

  if (
    init.isKind(SyntaxKind.ArrowFunction) ||
    init.isKind(SyntaxKind.FunctionExpression)
  ) {
    return init;
  }

  if (init.isKind(SyntaxKind.ObjectLiteralExpression)) {
    const renderProp = init.getProperty("render");
    if (renderProp && renderProp.isKind(SyntaxKind.PropertyAssignment)) {
      const renderInit = unwrap(renderProp.getInitializer());
      if (
        renderInit &&
        (renderInit.isKind(SyntaxKind.ArrowFunction) ||
          renderInit.isKind(SyntaxKind.FunctionExpression))
      ) {
        return renderInit;
      }
    }

    // Inherit render from a spread story: `{ ...OtherStory, ... }`
    for (const prop of init.getProperties()) {
      if (!prop.isKind(SyntaxKind.SpreadAssignment)) continue;
      const spreadExpr = unwrap(prop.getExpression());
      if (spreadExpr && spreadExpr.isKind(SyntaxKind.Identifier)) {
        const inherited = resolveRender(
          sourceFile,
          spreadExpr.getText(),
          visited,
        );
        if (inherited) return inherited;
      }
    }
  }

  return null;
}

/**
 * Merge the entries of an args object literal into the ordered map, resolving
 * nested spreads such as `...OtherStory.args`.
 * @param {import("ts-morph").ObjectLiteralExpression} objLiteral
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {Map<string, ArgValue>} into
 * @param {Set<string>} visited
 */
function mergeArgsFromObject(objLiteral, sourceFile, into, visited) {
  for (const prop of objLiteral.getProperties()) {
    if (prop.isKind(SyntaxKind.SpreadAssignment)) {
      const spreadExpr = unwrap(prop.getExpression());
      if (!spreadExpr) continue;

      // `...OtherStory.args`
      if (spreadExpr.isKind(SyntaxKind.PropertyAccessExpression)) {
        if (spreadExpr.getName() === "args") {
          const storyName = spreadExpr.getExpression().getText();
          const sub = resolveArgsMap(sourceFile, storyName, new Set(visited));
          for (const [key, value] of sub) into.set(key, value);
        }
        continue;
      }

      // `...OtherStory` (whole story) or `...someObjectVariable`
      if (spreadExpr.isKind(SyntaxKind.Identifier)) {
        const name = spreadExpr.getText();
        if (sourceFile.getVariableDeclaration(name)) {
          const sub = resolveArgsMap(sourceFile, name, new Set(visited));
          for (const [key, value] of sub) into.set(key, value);
        }
        continue;
      }

      const nested = resolveObjectLiteralExpr(spreadExpr, sourceFile);
      if (nested) mergeArgsFromObject(nested, sourceFile, into, visited);
      continue;
    }

    if (prop.isKind(SyntaxKind.PropertyAssignment)) {
      into.set(prop.getName(), { valueNode: prop.getInitializer() });
      continue;
    }

    if (prop.isKind(SyntaxKind.ShorthandPropertyAssignment)) {
      into.set(prop.getName(), { valueNode: prop.getNameNode() });
    }
  }
}

/**
 * Resolve the effective args for a story export, following inheritance via
 * `...OtherStory` / `...OtherStory.args` spreads for ANY referenced story.
 * Later entries win (matching JS spread semantics); the injected arg therefore
 * overrides earlier explicit props at the call site.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} exportName
 * @param {Set<string>} visited
 * @returns {Map<string, ArgValue>}
 */
function resolveArgsMap(sourceFile, exportName, visited) {
  /** @type {Map<string, ArgValue>} */
  const into = new Map();
  if (visited.has(exportName)) return into;
  visited.add(exportName);

  const decl = sourceFile.getVariableDeclaration(exportName);
  if (!decl) return into;

  const init = unwrap(decl.getInitializer());
  if (!init) return into;

  if (init.isKind(SyntaxKind.ObjectLiteralExpression)) {
    for (const prop of init.getProperties()) {
      if (prop.isKind(SyntaxKind.SpreadAssignment)) {
        // Top-level `...OtherStory` brings the inherited story's args.
        const spreadExpr = unwrap(prop.getExpression());
        if (spreadExpr && spreadExpr.isKind(SyntaxKind.Identifier)) {
          const sub = resolveArgsMap(
            sourceFile,
            spreadExpr.getText(),
            new Set(visited),
          );
          for (const [key, value] of sub) into.set(key, value);
        }
        continue;
      }
      if (
        prop.isKind(SyntaxKind.PropertyAssignment) &&
        prop.getName() === "args"
      ) {
        const argsObj = resolveObjectLiteralExpr(
          prop.getInitializer(),
          sourceFile,
        );
        if (argsObj) mergeArgsFromObject(argsObj, sourceFile, into, visited);
      }
    }
    return into;
  }

  // Function-style story: look for `ExportName.args = { ... }` assignments.
  if (
    init.isKind(SyntaxKind.ArrowFunction) ||
    init.isKind(SyntaxKind.FunctionExpression)
  ) {
    for (const statement of sourceFile.getStatements()) {
      if (!statement.isKind(SyntaxKind.ExpressionStatement)) continue;
      const expr = statement.getExpression();
      if (!expr.isKind(SyntaxKind.BinaryExpression)) continue;
      if (expr.getOperatorToken().getKind() !== SyntaxKind.EqualsToken)
        continue;
      const left = expr.getLeft();
      if (!left.isKind(SyntaxKind.PropertyAccessExpression)) continue;
      if (left.getName() !== "args") continue;
      if (left.getExpression().getText() !== exportName) continue;

      const argsObj = resolveObjectLiteralExpr(expr.getRight(), sourceFile);
      if (argsObj) mergeArgsFromObject(argsObj, sourceFile, into, visited);
    }
  }

  return into;
}

/**
 * Ensure `args` is only ever referenced through `{...args}` JSX spreads, so it
 * is safe to inline. Any other usage (destructuring, `args.foo`, `prop={args}`)
 * means we cannot statically resolve the example and should fall back.
 * @param {import("ts-morph").Node} bodyNode
 * @returns {boolean}
 */
function argsUsedOnlyInSpreads(bodyNode) {
  const identifiers = bodyNode
    .getDescendantsOfKind(SyntaxKind.Identifier)
    .filter((id) => id.getText() === "args");

  return identifiers.every((id) => {
    const parent = id.getParent();
    return (
      parent !== undefined &&
      parent.isKind(SyntaxKind.JsxSpreadAttribute) &&
      parent.getExpression() === id
    );
  });
}

/**
 * Render a single resolved arg as JSX attribute text.
 * @param {string} name
 * @param {ArgValue} info
 * @returns {string}
 */
function renderAttribute(name, info) {
  const valueNode = info.valueNode;
  if (!valueNode) return name;

  if (valueNode.isKind(SyntaxKind.StringLiteral)) {
    const text = valueNode.getLiteralText();
    const quoted = JSON.stringify(text);
    // Double quotes inside the value break `attr="..."`, use an expression.
    return text.includes('"') ? `${name}={${quoted}}` : `${name}=${quoted}`;
  }
  if (valueNode.isKind(SyntaxKind.TrueKeyword)) return name;

  return `${name}={${valueNode.getText()}}`;
}

/**
 * Replace every `{...args}` JSX spread with explicit attributes built from the
 * resolved args map. The injected arg wins over an earlier explicit attribute
 * of the same name (matching runtime spread semantics).
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {Map<string, ArgValue>} argsMap
 */
function injectArgsIntoJsx(sourceFile, argsMap) {
  for (;;) {
    const spread = sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxSpreadAttribute)
      .find((node) => node.getExpression().getText() === "args");
    if (!spread) break;

    const element =
      spread.getFirstAncestorByKind(SyntaxKind.JsxOpeningElement) ??
      spread.getFirstAncestorByKind(SyntaxKind.JsxSelfClosingElement);
    if (!element) {
      spread.remove();
      continue;
    }

    const isSelfClosing = element.isKind(SyntaxKind.JsxSelfClosingElement);
    const tagName = element.getTagNameNode().getText();

    /** @type {string[]} */
    const parts = [];
    for (const attr of element.getAttributes()) {
      if (
        attr.isKind(SyntaxKind.JsxSpreadAttribute) &&
        attr.getExpression().getText() === "args"
      ) {
        for (const [name, info] of argsMap) {
          parts.push(renderAttribute(name, info));
        }
        continue;
      }
      if (
        attr.isKind(SyntaxKind.JsxAttribute) &&
        argsMap.has(attr.getNameNode().getText())
      ) {
        // Dropped: the injected arg wins over this explicit attribute.
        continue;
      }
      parts.push(attr.getText());
    }

    const inner = [tagName, ...parts].join(" ");
    element.replaceWithText(isSelfClosing ? `<${inner} />` : `<${inner}>`);
  }
}

/**
 * Resolve a story export into a clean, runnable example snippet: the render
 * body is normalized into `export const <Name>: Story = () => (...)`, the
 * `render`/args plumbing is removed, and resolved args are inlined as explicit
 * JSX props. Returns null when the story cannot be resolved statically, so the
 * caller can fall back to the raw source.
 * @param {string} filePath
 * @param {string} exportName
 * @returns {Promise<string | null>}
 */
export async function resolveStoryExample(filePath, exportName) {
  const sourceFile = getOrAddSourceFile(filePath);
  if (!sourceFile) return null;

  const decl = sourceFile.getVariableDeclaration(exportName);
  if (!decl) return null;

  const renderFn = resolveRender(sourceFile, exportName, new Set());
  if (!renderFn) return null;

  const body = renderFn.getBody();
  if (!body) return null;

  if (!argsUsedOnlyInSpreads(body)) return null;

  const argsMap = resolveArgsMap(sourceFile, exportName, new Set());

  let bodyText;
  if (body.isKind(SyntaxKind.Block)) {
    bodyText = body.getText();
  } else {
    const inner = body.isKind(SyntaxKind.ParenthesizedExpression)
      ? body.getExpression().getText()
      : body.getText();
    bodyText = `(${inner})`;
  }

  const typeNode = decl.getTypeNode();
  const typeAnnotation = typeNode ? `: ${typeNode.getText()}` : "";
  const snippet = `export const ${exportName}${typeAnnotation} = () => ${bodyText};`;

  const tmpName = `__story_example_${exportName}_${Math.random().toString(36).slice(2)}.tsx`;
  const tmp = project.createSourceFile(tmpName, snippet, { overwrite: true });
  try {
    injectArgsIntoJsx(tmp, argsMap);
    const formatted = await prettier.format(tmp.getFullText(), {
      parser: "typescript",
    });
    return formatted.trimEnd();
  } finally {
    project.removeSourceFile(tmp);
  }
}
