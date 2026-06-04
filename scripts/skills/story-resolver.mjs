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
 * Return an object/binding property name without source quotes.
 * @param {import("ts-morph").Node | undefined} nameNode
 * @returns {string | null}
 */
function getStaticPropertyName(nameNode) {
  if (!nameNode) return null;
  if (
    nameNode.isKind(SyntaxKind.StringLiteral) ||
    nameNode.isKind(SyntaxKind.NoSubstitutionTemplateLiteral) ||
    nameNode.isKind(SyntaxKind.NumericLiteral)
  ) {
    return nameNode.getLiteralText();
  }
  return nameNode.getText();
}

/**
 * Resolve the stories file's default-exported meta object.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @returns {import("ts-morph").ObjectLiteralExpression | null}
 */
function resolveMetaObject(sourceFile) {
  const exportAssignment = sourceFile
    .getExportAssignments()
    .find((assignment) => !assignment.isExportEquals());
  return exportAssignment
    ? resolveObjectLiteralExpr(exportAssignment.getExpression(), sourceFile)
    : null;
}

/**
 * Resolve an inline or referenced render function.
 * @param {import("ts-morph").Node | undefined} expression
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {Set<string>} visited
 * @returns {import("ts-morph").ArrowFunction | import("ts-morph").FunctionExpression | import("ts-morph").FunctionDeclaration | null}
 */
function resolveFunction(expression, sourceFile, visited = new Set()) {
  const node = unwrap(expression);
  if (!node) return null;
  if (
    node.isKind(SyntaxKind.ArrowFunction) ||
    node.isKind(SyntaxKind.FunctionExpression) ||
    node.isKind(SyntaxKind.FunctionDeclaration)
  ) {
    return node;
  }
  if (!node.isKind(SyntaxKind.Identifier)) return null;

  const name = node.getText();
  if (visited.has(name)) return null;
  visited.add(name);

  const functionDeclaration = sourceFile.getFunction(name);
  if (functionDeclaration) return functionDeclaration;

  const variable = sourceFile.getVariableDeclaration(name);
  return variable
    ? resolveFunction(variable.getInitializer(), sourceFile, visited)
    : null;
}

/**
 * Read a render member from an object literal.
 * @param {import("ts-morph").ObjectLiteralExpression} objectLiteral
 * @param {import("ts-morph").SourceFile} sourceFile
 * @returns {import("ts-morph").ArrowFunction | import("ts-morph").FunctionExpression | import("ts-morph").FunctionDeclaration | import("ts-morph").MethodDeclaration | null}
 */
function resolveRenderMember(objectLiteral, sourceFile) {
  const renderProp = objectLiteral.getProperty("render");
  if (!renderProp) return null;

  if (renderProp.isKind(SyntaxKind.PropertyAssignment)) {
    return resolveFunction(renderProp.getInitializer(), sourceFile);
  }
  if (renderProp.isKind(SyntaxKind.ShorthandPropertyAssignment)) {
    return resolveFunction(renderProp.getNameNode(), sourceFile);
  }
  if (renderProp.isKind(SyntaxKind.MethodDeclaration)) {
    return renderProp;
  }
  return null;
}

/**
 * Get the story-level render function for an export, resolving composition in
 * JavaScript property order. A later spread/render overrides an earlier one.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} exportName
 * @param {Set<string>} visited
 * @returns {import("ts-morph").ArrowFunction | import("ts-morph").FunctionExpression | import("ts-morph").FunctionDeclaration | import("ts-morph").MethodDeclaration | null}
 */
function resolveStoryRender(sourceFile, exportName, visited) {
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
    let resolved = null;
    for (const prop of init.getProperties()) {
      if (prop.isKind(SyntaxKind.SpreadAssignment)) {
        const spreadExpr = unwrap(prop.getExpression());
        if (spreadExpr?.isKind(SyntaxKind.Identifier)) {
          const inherited = resolveStoryRender(
            sourceFile,
            spreadExpr.getText(),
            new Set(visited),
          );
          if (inherited) resolved = inherited;
        }
      } else if (prop.getName?.() === "render") {
        resolved = resolveRenderMember(init, sourceFile);
      }
    }
    return resolved;
  }

  return null;
}

/**
 * Resolve a story's render, falling back to the meta render.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} exportName
 * @returns {import("ts-morph").ArrowFunction | import("ts-morph").FunctionExpression | import("ts-morph").FunctionDeclaration | import("ts-morph").MethodDeclaration | null}
 */
function resolveRender(sourceFile, exportName) {
  const storyRender = resolveStoryRender(sourceFile, exportName, new Set());
  if (storyRender) return storyRender;

  const metaObject = resolveMetaObject(sourceFile);
  return metaObject ? resolveRenderMember(metaObject, sourceFile) : null;
}

/**
 * Resolve the component expression from the stories meta for Storybook's
 * default render behavior.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @returns {string | null}
 */
function resolveMetaComponentName(sourceFile) {
  const componentProp = resolveMetaObject(sourceFile)?.getProperty("component");
  if (!componentProp?.isKind(SyntaxKind.PropertyAssignment)) return null;
  return unwrap(componentProp.getInitializer())?.getText() ?? null;
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
          const sub = resolveStoryArgsMap(
            sourceFile,
            storyName,
            new Set(visited),
          );
          if (sub) {
            for (const [key, value] of sub) into.set(key, value);
          }
        }
        continue;
      }

      // `...someObjectVariable`
      if (spreadExpr.isKind(SyntaxKind.Identifier)) {
        const nested = resolveObjectLiteralExpr(spreadExpr, sourceFile);
        if (nested) {
          mergeArgsFromObject(nested, sourceFile, into, visited);
        }
        continue;
      }

      const nested = resolveObjectLiteralExpr(spreadExpr, sourceFile);
      if (nested) mergeArgsFromObject(nested, sourceFile, into, visited);
      continue;
    }

    if (prop.isKind(SyntaxKind.PropertyAssignment)) {
      const name = getStaticPropertyName(prop.getNameNode());
      if (name !== null) {
        into.set(name, { valueNode: prop.getInitializer() });
      }
      continue;
    }

    if (prop.isKind(SyntaxKind.ShorthandPropertyAssignment)) {
      const name = getStaticPropertyName(prop.getNameNode());
      if (name !== null) {
        into.set(name, { valueNode: prop.getNameNode() });
      }
    }
  }
}

/**
 * Resolve the actual `args` property of a story export. Top-level story
 * composition follows JavaScript object semantics: a later `args` property
 * replaces the args copied by an earlier `...OtherStory` spread. Spreads
 * inside the args object merge individual arg values.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} exportName
 * @param {Set<string>} visited
 * @returns {Map<string, ArgValue> | null}
 */
function resolveStoryArgsMap(sourceFile, exportName, visited) {
  if (visited.has(exportName)) return null;
  visited.add(exportName);

  const decl = sourceFile.getVariableDeclaration(exportName);
  if (!decl) return null;

  const init = unwrap(decl.getInitializer());
  if (!init) return null;

  if (init.isKind(SyntaxKind.ObjectLiteralExpression)) {
    /** @type {Map<string, ArgValue> | null} */
    let resolved = null;
    for (const prop of init.getProperties()) {
      if (prop.isKind(SyntaxKind.SpreadAssignment)) {
        const spreadExpr = unwrap(prop.getExpression());
        if (spreadExpr && spreadExpr.isKind(SyntaxKind.Identifier)) {
          const inherited = resolveStoryArgsMap(
            sourceFile,
            spreadExpr.getText(),
            new Set(visited),
          );
          if (inherited) resolved = new Map(inherited);
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
        resolved = new Map();
        if (argsObj) {
          mergeArgsFromObject(argsObj, sourceFile, resolved, visited);
        }
      }
    }
    return resolved;
  }

  // Function-style story: look for `ExportName.args = { ... }` assignments.
  if (
    init.isKind(SyntaxKind.ArrowFunction) ||
    init.isKind(SyntaxKind.FunctionExpression)
  ) {
    /** @type {Map<string, ArgValue> | null} */
    let resolved = null;
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
      resolved = new Map();
      if (argsObj) {
        mergeArgsFromObject(argsObj, sourceFile, resolved, visited);
      }
    }
    return resolved;
  }

  return null;
}

/**
 * Resolve meta args and overlay the story's args, matching Storybook's
 * effective args inheritance.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} exportName
 * @returns {Map<string, ArgValue>}
 */
function resolveArgsMap(sourceFile, exportName) {
  /** @type {Map<string, ArgValue>} */
  const resolved = new Map();
  const metaObject = resolveMetaObject(sourceFile);
  const metaArgs = metaObject?.getProperty("args");
  if (metaArgs?.isKind(SyntaxKind.PropertyAssignment)) {
    const argsObject = resolveObjectLiteralExpr(
      metaArgs.getInitializer(),
      sourceFile,
    );
    if (argsObject) {
      mergeArgsFromObject(argsObject, sourceFile, resolved, new Set());
    }
  }

  const storyArgs = resolveStoryArgsMap(sourceFile, exportName, new Set());
  if (storyArgs) {
    for (const [key, value] of storyArgs) resolved.set(key, value);
  }
  return resolved;
}

/**
 * @param {ArgValue | undefined} info
 * @returns {string}
 */
function renderArgValue(info) {
  return info?.valueNode?.getText() ?? "undefined";
}

/**
 * @param {ArgValue | undefined} info
 * @returns {boolean}
 */
function isUndefinedArg(info) {
  const node = unwrap(info?.valueNode);
  return (
    !node ||
    (node.isKind(SyntaxKind.Identifier) && node.getText() === "undefined") ||
    node.isKind(SyntaxKind.VoidExpression)
  );
}

/**
 * @param {Map<string, ArgValue>} argsMap
 * @returns {string}
 */
function renderArgsObject(argsMap) {
  return `{ ${[...argsMap]
    .map(([name, info]) => `${JSON.stringify(name)}: ${renderArgValue(info)}`)
    .join(", ")} }`;
}

/**
 * Replace an arg read, using natural JSX text when a string is rendered as a
 * child and a JavaScript expression everywhere else.
 * @param {import("ts-morph").Node} node
 * @param {ArgValue | undefined} info
 */
function replaceWithArgValue(node, info) {
  const valueNode = unwrap(info?.valueNode);
  const parent = node.getParent();
  if (
    valueNode?.isKind(SyntaxKind.StringLiteral) &&
    parent?.isKind(SyntaxKind.JsxExpression) &&
    parent.getParent()?.isKind(SyntaxKind.JsxElement)
  ) {
    const jsxText = valueNode
      .getLiteralText()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;");
    parent.replaceWithText(jsxText);
    return;
  }
  node.replaceWithText(renderArgValue(info));
}

/**
 * Replace `binding.prop` and `binding["prop"]` reads with the corresponding
 * effective arg values.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} bindingName
 * @param {Map<string, ArgValue>} argsMap
 */
function replaceArgPropertyReads(sourceFile, bindingName, argsMap) {
  const propertyAccesses = sourceFile
    .getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
    .filter((node) => node.getExpression().getText() === bindingName)
    .reverse();
  for (const access of propertyAccesses) {
    replaceWithArgValue(access, argsMap.get(access.getName()));
  }

  const elementAccesses = sourceFile
    .getDescendantsOfKind(SyntaxKind.ElementAccessExpression)
    .filter((node) => node.getExpression().getText() === bindingName)
    .reverse();
  for (const access of elementAccesses) {
    const argument = unwrap(access.getArgumentExpression());
    const key =
      argument?.isKind(SyntaxKind.StringLiteral) ||
      argument?.isKind(SyntaxKind.NoSubstitutionTemplateLiteral)
        ? argument.getLiteralText()
        : null;
    if (key !== null) {
      replaceWithArgValue(access, argsMap.get(key));
    }
  }
}

/**
 * Replace references to a destructured render parameter with its effective
 * value. Declaration/property-name positions are intentionally left alone.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} name
 * @param {string} valueText
 */
function replaceBindingReferences(sourceFile, name, valueText) {
  const identifiers = sourceFile
    .getDescendantsOfKind(SyntaxKind.Identifier)
    .filter((id) => id.getText() === name)
    .reverse();

  for (const identifier of identifiers) {
    const parent = identifier.getParent();
    if (!parent) continue;
    if (
      (parent.isKind(SyntaxKind.PropertyAccessExpression) &&
        parent.getNameNode() === identifier) ||
      (parent.isKind(SyntaxKind.JsxAttribute) &&
        parent.getNameNode() === identifier) ||
      parent.isKind(SyntaxKind.VariableDeclaration) ||
      parent.isKind(SyntaxKind.Parameter) ||
      parent.isKind(SyntaxKind.BindingElement)
    ) {
      continue;
    }
    if (parent.isKind(SyntaxKind.ShorthandPropertyAssignment)) {
      parent.replaceWithText(`${name}: ${valueText}`);
      continue;
    }
    identifier.replaceWithText(valueText);
  }
}

/**
 * Resolve the render function's first parameter into concrete bindings.
 * Returns args-rest bindings that still need JSX spread expansion.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {import("ts-morph").ArrowFunction | import("ts-morph").FunctionExpression | import("ts-morph").FunctionDeclaration | import("ts-morph").MethodDeclaration} renderFn
 * @param {Map<string, ArgValue>} argsMap
 * @returns {Map<string, Map<string, ArgValue>>}
 */
function inlineRenderParameters(sourceFile, renderFn, argsMap) {
  /** @type {Map<string, Map<string, ArgValue>>} */
  const spreadBindings = new Map();
  const parameter = renderFn.getParameters()[0];
  if (!parameter) return spreadBindings;

  const nameNode = parameter.getNameNode();
  if (nameNode.isKind(SyntaxKind.Identifier)) {
    const name = nameNode.getText();
    replaceArgPropertyReads(sourceFile, name, argsMap);
    spreadBindings.set(name, argsMap);
    return spreadBindings;
  }

  if (!nameNode.isKind(SyntaxKind.ObjectBindingPattern)) {
    return spreadBindings;
  }

  const consumed = new Set();
  for (const element of nameNode.getElements()) {
    const localNameNode = element.getNameNode();
    if (!localNameNode.isKind(SyntaxKind.Identifier)) continue;
    const localName = localNameNode.getText();

    if (element.getDotDotDotToken()) {
      const rest = new Map(argsMap);
      for (const key of consumed) rest.delete(key);
      replaceArgPropertyReads(sourceFile, localName, rest);
      spreadBindings.set(localName, rest);
      continue;
    }

    const propertyName =
      getStaticPropertyName(element.getPropertyNameNode()) ?? localName;
    consumed.add(propertyName);
    const info = argsMap.get(propertyName);
    const initializer = element.getInitializer();
    const valueText =
      !info || isUndefinedArg(info)
        ? (initializer?.getText() ?? "undefined")
        : renderArgValue(info);
    replaceBindingReferences(sourceFile, localName, valueText);
  }

  return spreadBindings;
}

/**
 * Render a single resolved arg as JSX attribute text.
 * @param {string} name
 * @param {ArgValue} info
 * @returns {string | null}
 */
function renderAttribute(name, info) {
  const valueNode = info.valueNode;
  if (!valueNode || isUndefinedArg(info)) return null;

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
 * resolved args map, preserving last-write-wins JSX attribute semantics.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} bindingName
 * @param {Map<string, ArgValue>} argsMap
 */
function injectArgsIntoJsx(sourceFile, bindingName, argsMap) {
  for (;;) {
    const spread = sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxSpreadAttribute)
      .find((node) => node.getExpression().getText() === bindingName);
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
    const jsxElement = element.isKind(SyntaxKind.JsxOpeningElement)
      ? element.getParentIfKind(SyntaxKind.JsxElement)
      : undefined;
    const hasRenderedChildren = Boolean(
      jsxElement
        ?.getJsxChildren()
        .some((child) => child.getText().trim().length > 0),
    );

    /** @type {Array<{name: string | null, text: string}>} */
    const expanded = [];
    for (const attr of element.getAttributes()) {
      if (
        attr.isKind(SyntaxKind.JsxSpreadAttribute) &&
        attr.getExpression().getText() === bindingName
      ) {
        for (const [name, info] of argsMap) {
          if (name === "children" && hasRenderedChildren) continue;
          const text = renderAttribute(name, info);
          if (text) expanded.push({ name, text });
        }
        continue;
      }
      if (attr.isKind(SyntaxKind.JsxAttribute)) {
        expanded.push({
          name: attr.getNameNode().getText(),
          text: attr.getText(),
        });
      } else {
        expanded.push({ name: null, text: attr.getText() });
      }
    }

    // JSX uses last-write-wins semantics for duplicate attributes. Expanding
    // the spread first and then retaining the last named attribute preserves
    // whether `{...args}` appeared before or after an explicit prop.
    const lastIndex = new Map();
    expanded.forEach((part, index) => {
      if (part.name !== null) lastIndex.set(part.name, index);
    });
    const parts = expanded
      .filter(
        (part, index) =>
          part.name === null || lastIndex.get(part.name) === index,
      )
      .map((part) => part.text);

    const inner = [tagName, ...parts].join(" ");
    element.replaceWithText(isSelfClosing ? `<${inner} />` : `<${inner}>`);
  }

  // A render may pass the complete args object somewhere other than JSX.
  replaceBindingReferences(sourceFile, bindingName, renderArgsObject(argsMap));
}

/**
 * Resolve a story export into a clean, runnable example snippet: the render
 * body is normalized into `export const <Name>: Story = () => (...)`, the
 * `render`/args plumbing is removed, and resolved args are inlined as explicit
 * JSX props. Returns null when the story cannot be resolved statically; the
 * caller treats that as a build error rather than emitting ambiguous CSF.
 * @param {string} filePath
 * @param {string} exportName
 * @returns {Promise<string | null>}
 */
export async function resolveStoryExample(filePath, exportName) {
  const sourceFile = getOrAddSourceFile(filePath);
  if (!sourceFile) return null;

  const decl = sourceFile.getVariableDeclaration(exportName);
  if (!decl) return null;

  const renderFn = resolveRender(sourceFile, exportName);
  const componentName = renderFn ? null : resolveMetaComponentName(sourceFile);
  if (!renderFn && !componentName) return null;

  const body = renderFn?.getBody();
  if (renderFn && !body) return null;

  const argsMap = resolveArgsMap(sourceFile, exportName);

  let bodyText;
  if (!body) {
    bodyText = `(<${componentName} {...args} />)`;
  } else if (body.isKind(SyntaxKind.Block)) {
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
    const spreadBindings = renderFn
      ? inlineRenderParameters(tmp, renderFn, argsMap)
      : new Map([["args", argsMap]]);
    for (const [bindingName, bindingArgs] of spreadBindings) {
      injectArgsIntoJsx(tmp, bindingName, bindingArgs);
    }
    const formatted = await prettier.format(tmp.getFullText(), {
      parser: "typescript",
    });
    return formatted.trimEnd();
  } finally {
    project.removeSourceFile(tmp);
  }
}
