import { SyntaxKind } from "ts-morph";

const COMPONENT_WRAPPERS = new Set([
  "forwardRef",
  "React.forwardRef",
  "memo",
  "React.memo",
]);

/**
 * Return the render function passed to forwardRef or memo so defaults declared
 * in its props binding are discovered like those of a plain function component.
 *
 * @param {import("ts-morph").Node | undefined} node
 * @returns {import("ts-morph").Node | undefined}
 */
function unwrapComponentWrapper(node) {
  let current = node;
  while (
    current?.isKind(SyntaxKind.CallExpression) &&
    COMPONENT_WRAPPERS.has(current.getExpression().getText())
  ) {
    current = current.getArguments()[0];
  }
  return current;
}

/**
 * Extract defaults from a component declaration (function or variable initializer).
 * @param {import("ts-morph").Node} declaration
 * @returns {Map<string, string>}
 */
export function extractDefaultsFromDeclaration(declaration) {
  const defaults = new Map();

  if (declaration.isKind(SyntaxKind.FunctionDeclaration)) {
    extractFromParameters(declaration.getParameters(), defaults);
  }

  if (declaration.isKind(SyntaxKind.VariableDeclaration)) {
    const initializer = unwrapComponentWrapper(declaration.getInitializer());
    if (
      initializer &&
      (initializer.isKind(SyntaxKind.ArrowFunction) ||
        initializer.isKind(SyntaxKind.FunctionExpression))
    ) {
      extractFromParameters(initializer.getParameters(), defaults);
    }
  }

  if (
    declaration.isKind(SyntaxKind.FunctionExpression) ||
    declaration.isKind(SyntaxKind.ArrowFunction)
  ) {
    extractFromParameters(declaration.getParameters(), defaults);
  }

  return defaults;
}

/**
 * Extract default values from the first object parameter binding.
 * @param {import("ts-morph").ParameterDeclaration[]} parameters
 * @param {Map<string, string>} defaults
 */
function extractFromParameters(parameters, defaults) {
  if (!parameters || parameters.length === 0) {
    return;
  }

  const firstParam = parameters[0];
  const nameNode = firstParam.getNameNode();
  if (!nameNode || !nameNode.isKind(SyntaxKind.ObjectBindingPattern)) {
    return;
  }

  for (const element of nameNode.getElements()) {
    const initializer = element.getInitializer();
    if (!initializer) {
      continue;
    }
    const propName =
      element.getPropertyNameNode()?.getText() ?? element.getName();
    defaults.set(propName, initializer.getText());
  }
}
