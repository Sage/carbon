/* eslint-disable no-console */
const fse = require("fs-extra");
const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const chalk = require("chalk");

function convertLocators(filename) {
  if (!fse.pathExistsSync(filename)) {
    console.log(
      chalk.yellow(
        "No locator file found for component. Skipping this conversion and moving straight to the tests..."
      )
    );
    return;
  }
  let childrenCalls = 0;
  let parentCalls = 0;

  const ast = parser.parse(fse.readFileSync(filename, "utf8"), {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  // keep array of names of all locators defined in the file, so that we can capture calls to them in other locators in the same file
  const locatorNames = [];

  // recursively traverse the AST to determine iff a property access chain is called from "cy" or "page".
  // (have to allow either in order to not depend on the order the traversal is done in)
  // The idea is to return true from cy.get(selector1).find(selector2).eq(2).get(selector3) etc,
  // but not from eg foo.get(bar) where foo is some non-Cypress utility being used.
  function isLocatorChain(node) {
    const { type, object } = node;
    if (type === "Identifier") {
      // a special case for chaining off another locator. (Assumed to be defined in the same file. THIS WILL NOT WORK for locators
      // imported from outside!)
      if (locatorNames.includes(node.name)) {
        return true;
      }
    }
    if (type !== "MemberExpression") {
      return false;
    }
    switch (object.type) {
      case "Identifier":
        return ["cy", "page"].includes(object.name);
      case "CallExpression":
        return isLocatorChain(object.callee);
      default:
        return false;
    }
  }

  traverse(ast, {
    // insert `import type { Page } from “@playwright/test”` at the top of the file
    Program(path) {
      const specifiers = [
        t.importSpecifier(t.identifier("Page"), t.identifier("Page")),
      ];
      const pwPageImport = {
        ...t.importDeclaration(specifiers, t.stringLiteral("@playwright/test")),
        importKind: "type",
      };
      path.unshiftContainer("body", pwPageImport);
    },

    // add `page: Page` argument to each locator function
    // (this might be too indiscriminate, page: Page will get added as an argument to every arrow function anywhere in the file!
    // It will also miss any that are not defined as arrow functions.
    // But I think it's OK given the simple content of the existing locator files - will come back to this if any problems are encountered.)
    ArrowFunctionExpression(path) {
      // capture locator name if there is one. If not this is likely to not be an actual locator.
      const parentDeclaration = path.parentPath.node;
      if (parentDeclaration.type === "VariableDeclarator") {
        const locatorName = parentDeclaration.id.name;
        locatorNames.push(locatorName);
        const pageArgument = {
          ...t.identifier("page"),
          typeAnnotation: t.tsTypeAnnotation(
            t.tsTypeReference(t.identifier("Page"))
          ),
        };
        path.node.params.unshift(pageArgument);
      }

      // also add a `number` type annotation to any existing argument called `index`. (This is common in our locators!)
      path.node.params.forEach((param) => {
        if (t.isIdentifier(param) && param.name === "index") {
          param.typeAnnotation = t.tsTypeAnnotation(t.tsNumberKeyword());
        }
      });
    },

    // add "page" argument to any call to locator functions from within the same file
    CallExpression(path) {
      const calledFunctionName = path.node.callee.name;
      if (locatorNames.includes(calledFunctionName)) {
        path.node.arguments.unshift(t.identifier("page"));
      }
    },

    // replace `cy` with `page`
    Identifier(path) {
      if (path.node.name === "cy") {
        path.node.name = "page";
      }
    },

    MemberExpression(path) {
      if (isLocatorChain(path.node)) {
        const propertyName = path.node.property.name;
        // replace `.get` and `.find` with `.locator`
        if (["get", "find"].includes(propertyName)) {
          path.node.property.name = "locator";
        }

        // replace `.eq` with `.nth`
        if (propertyName === "eq") {
          path.node.property.name = "nth";
        }

        // warning about `.children`
        if (propertyName === "children") {
          // just add 1 to the count to report the total number once after the transformations are run
          childrenCalls += 1;
        } else if (propertyName === "parent") {
          // just add 1 to the count to report the total number once after the transformations are run
          parentCalls += 1;
        }
      }
    },
  });

  if (childrenCalls > 0) {
    console.log(
      chalk.yellow(
        `warning: ${childrenCalls} call${
          childrenCalls > 1 ? "s" : ""
        } to .children() found in locators file. This is not possible to automatically translate to a Playwright locator - you will need to manually inspect the component's DOM and determine an appropriate substitute`
      )
    );
  }

  if (parentCalls > 0) {
    console.log(
      chalk.yellow(
        `warning: ${parentCalls} call${
          parentCalls > 1 ? "s" : ""
        } to .parent() found in locators file. This is not possible to automatically translate to a Playwright locator - you will need to manually inspect the component's DOM and determine an appropriate substitute`
      )
    );
  }

  const output = generate(ast).code;
  fse.writeFileSync(filename, output);
}

module.exports = convertLocators;
