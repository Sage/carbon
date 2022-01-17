/* eslint-disable no-console */
import * as babel from "@babel/core";
import * as ttp from "typescript-to-proptypes";
import * as babelTypes from "@babel/types";
import { v4 as uuid } from "uuid";

function customBabelPlugin(
  propTypes: ttp.ProgramNode,
  mapOfPropTypes: Map<string, string>
): babel.PluginObj {
  function injectPropTypes(parserOptions: {
    path: babel.NodePath;
    props: ttp.ComponentNode;
    nodeName: string;
    importName: string;
  }) {
    const { path, props, nodeName, importName } = parserOptions;
    const source = ttp.generate(props, {
      importedName: importName,
    });

    if (source.length === 0) {
      return;
    }

    const placeholder = `const a${uuid().replace(/-/g, "_")} = null;`;
    mapOfPropTypes.set(placeholder, source);

    if (babelTypes.isExportNamedDeclaration(path.parent)) {
      path.insertAfter(babel.template.ast(`export { ${nodeName} };`));
      path.insertAfter(babel.template.ast(placeholder));
      path.parentPath.replaceWith(path.node);
    } else if (babelTypes.isExportDefaultDeclaration(path.parent)) {
      path.insertAfter(babel.template.ast(`export default ${nodeName};`));
      path.insertAfter(babel.template.ast(placeholder));
      path.parentPath.replaceWith(path.node);
    } else {
      path.insertAfter(babel.template.ast(placeholder));
    }
  }

  let importedName = "PropTypes";

  return {
    visitor: {
      Program: {
        enter(path) {
          const propTypesImport = babel.template.ast(
            'import PropTypes from "prop-types"'
          ) as babel.types.ImportDeclaration;

          const firstImport = path
            .get("body")
            .find((nodePath) => babelTypes.isImportDeclaration(nodePath.node));

          if (firstImport) {
            firstImport.insertAfter(propTypesImport);
          } else {
            const firstRequire = path
              .get("body")
              .find((nodePath) =>
                babelTypes.isVariableDeclaration(nodePath.node)
              );

            if (firstRequire) {
              importedName = "_propTypes.default";

              const propTypesRequire = babel.template.ast(
                'var _propTypes = _interopRequireDefault(require("prop-types"))'
              ) as babel.types.VariableDeclaration;

              firstRequire.insertAfter(propTypesRequire);
            } else {
              path.node.body = [propTypesImport, ...path.node.body];
            }
          }
        },
      },
      FunctionDeclaration(path) {
        const { node } = path;

        if (!node.id) return;
        const props = propTypes.body.find(
          (prop) => prop.name === node.id?.name
        );
        if (!props) return;

        injectPropTypes({
          nodeName: node.id.name,
          path,
          props,
          importName: importedName,
        });
      },
      VariableDeclarator(path) {
        const { node } = path;

        if (!babelTypes.isIdentifier(node.id)) return;
        const nodeName = node.id.name;

        const props = propTypes.body.find((prop) => prop.name === nodeName);
        if (!props) return;

        function inject() {
          if (!props) return;

          injectPropTypes({
            path: path.parentPath,
            props,
            nodeName,
            importName: importedName,
          });
        }

        if (
          babelTypes.isArrowFunctionExpression(node.init) ||
          babelTypes.isFunctionExpression(node.init)
        ) {
          inject();
        } else if (babelTypes.isCallExpression(node.init)) {
          const arg = node.init.arguments[0];
          if (
            babelTypes.isArrowFunctionExpression(arg) ||
            babelTypes.isFunctionExpression(arg)
          ) {
            inject();
          }
        }
      },
    },
  };
}

function injectProptypes(
  propTypes: ttp.ProgramNode,
  sourceFile: string
): string | null {
  const jsPropTypes = new Map<string, string>();

  const result = babel.transformSync(sourceFile, {
    plugins: [
      require.resolve("@babel/plugin-syntax-class-properties"),
      require.resolve("@babel/plugin-syntax-jsx"),
      customBabelPlugin(propTypes, jsPropTypes),
    ],
    configFile: false,
    babelrc: false,
    retainLines: true,
    filename: sourceFile,
  });

  let code = result && result.code;
  if (!code) return null;

  jsPropTypes.forEach((value, key) => {
    code = code?.replace(key, `\n\n${value}\n\n`);
  });

  return code;
}

export default injectProptypes;
