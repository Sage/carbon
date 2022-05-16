import * as tsUtils from "./ts-utils.mjs";
import injectPropTypes from "./inject-prop-types.mjs";

/**
 * Custom Babel plugin that injects `import PropTypes from "prop-types";`
 * and js proptypes in the format `Component.propTypes = {...};` into
 * TypeScript components just before they are compiled to JavaScript.
 */

export default async function ({ types: t }) {
  const tsProgram = await tsUtils.generateTsProgram();

  function inject(path, props, nodeName) {
    injectPropTypes(t, {
      path,
      props,
      nodeName,
    });
  }

  return {
    visitor: {
      ImportDeclaration(path, state) {
        const { filename } = state;
        if (filename.includes(".component.tsx")) {
          // Find React import and insert prop types after
          if (t.isStringLiteral(path.node.source, { value: "react" })) {
            path.insertAfter(
              t.importDeclaration(
                [t.importDefaultSpecifier(t.identifier("PropTypes"))],
                t.stringLiteral("prop-types")
              )
            );
          }
        }
      },
      FunctionDeclaration(path, state) {
        const { filename } = state;
        if (filename.includes(".component.tsx")) {
          const { node } = path;
          if (!node.id) return;

          const proptypesAST = tsUtils.generateProptypes(filename, tsProgram);
          const nodeName = node.id.name;
          const props = proptypesAST.body.find(
            (prop) => prop.name === nodeName
          );
          if (!props) return;

          inject(path, props, nodeName);
        }
      },
      VariableDeclarator(path, state) {
        const { filename } = state;
        if (filename.includes(".component.tsx")) {
          const { node } = path;
          if (!t.isIdentifier(node.id)) return;

          const proptypesAST = tsUtils.generateProptypes(filename, tsProgram);
          const nodeName = node.id.name;
          const props = proptypesAST.body.find(
            (prop) => prop.name === nodeName
          );
          if (!props) return;

          if (
            t.isArrowFunctionExpression(node.init) ||
            t.isFunctionExpression(node.init)
          ) {
            inject(path.parentPath, props, nodeName);
          } else if (t.isCallExpression(node.init)) {
            const arg = node.init.arguments[0];
            if (
              t.isArrowFunctionExpression(arg) ||
              t.isFunctionExpression(arg)
            ) {
              inject(path.parentPath, props, nodeName);
            }
          }
        }
      },
    },
  };
}
