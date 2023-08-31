const fse = require("fs-extra");
const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");

const storybookProperties = ["storyName", "parameters"];

function convertTestStories(filename) {
  const ast = parser.parse(fse.readFileSync(filename, "utf8"), {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    // remove default export, as it's all storybook metadata that we don't need
    ExportDefaultDeclaration(path) {
      path.remove();
    },

    // remove any Story.foo = bar assignments, where foo is a stroybook-specific property
    ExpressionStatement(path) {
      if (
        t.isAssignmentExpression(path.node.expression) &&
        path.node.expression.operator === "=" &&
        t.isMemberExpression(path.node.expression.left) &&
        t.isIdentifier(path.node.expression.left.property) &&
        storybookProperties.includes(path.node.expression.left.property.name)
      ) {
        path.remove();
      }
    },
  });

  const output = generate(ast).code;
  fse.writeFileSync(filename, output);
}

module.exports = convertTestStories;
