/* eslint-disable no-console */
const fse = require("fs-extra");
const { join } = require("path");
const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const chalk = require("chalk");

function convertLocators(filename) {
  let childrenCalls = 0;
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
        return object.name;
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

  const output = generate(ast).code;
  fse.writeFileSync(filename, output);
}

const componentName = process.argv[2];

const locatorSourceDir = `./cypress/locators/${componentName}`;
const locatorTargetDir = `./playwright/components/${componentName}`;
if (fse.pathExistsSync(locatorSourceDir)) {
  console.log(
    `moving locator files from ${locatorSourceDir} to ${locatorTargetDir}`
  );
  console.log(
    `don't forget to remove anything from ${locatorSourceDir} - potentially entire files/folders - that are no longer used in any tests!`
  );
  fse.copySync(locatorSourceDir, locatorTargetDir);
  const fileNames = ["index", "locators"];
  console.log("changing locator files from js to ts");
  fileNames.forEach((fileName) => {
    fse.renameSync(
      join(locatorTargetDir, `${fileName}.js`),
      join(locatorTargetDir, `${fileName}.ts`)
    );
  });
} else {
  console.log("skipping copying locator files as none exist");
}

const storiesSourceFile = `./src/components/${componentName}/${componentName}-test.stories.tsx`;
const storiesDestinationFile = `./src/components/${componentName}/components.test-pw.tsx`;
console.log(
  `moving stories from ${storiesSourceFile} to ${storiesDestinationFile}`
);
console.log(
  "make sure you remove any stories that aren't used in Playwright tests"
);
fse.copySync(storiesSourceFile, storiesDestinationFile);

let testsSourceFile;
const testsDestinationFile = `./src/components/${componentName}/${componentName}.pw.tsx`;
console.log(`moving tests from ${testsSourceFile} to ${testsDestinationFile}`);
try {
  testsSourceFile = `./cypress/components/${componentName}/${componentName}.cy.tsx`;
  fse.moveSync(testsSourceFile, testsDestinationFile);
  console.log(
    `moving tests from ${testsSourceFile} to ${testsDestinationFile}`
  );
} catch (e) {
  if (e.code === "ENOENT") {
    testsSourceFile = `./cypress/components/${componentName}/${componentName}.cy.js`;
    fse.moveSync(testsSourceFile, testsDestinationFile);
    console.log(
      `moving tests from ${testsSourceFile} to ${testsDestinationFile}`
    );
  }
}

console.log("converting locators from cypress to playwright");
convertLocators(join(locatorTargetDir, "index.ts"));
