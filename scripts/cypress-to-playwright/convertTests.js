/* eslint-disable no-console */
const fse = require("fs-extra");
const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
// const t = require("@babel/types");

function convertTests(filename) {
  const ast = parser.parse(fse.readFileSync(filename, "utf8"), {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  console.log(`this will eventually convert the tests in ${filename}`);

  traverse(ast, {
    // TODO!
  });

  const output = generate(ast).code;
  fse.writeFileSync(filename, output);
}

module.exports = convertTests;
