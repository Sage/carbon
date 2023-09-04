/* eslint-disable no-console */
const fse = require("fs-extra");
const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const chalk = require("chalk");

// might have to update this list if more locator methods are found that are commonly called inside test files in locator chains
const locatorChainMethods = [
  "eq",
  "get",
  "find",
  "children",
  "parent",
  "first",
  "last",
];

// there are certain methods we can leave in place, because they've been rewritten from Cypress helpers to Playwright ones, but where
// we need to ensure we `await` any such calls.
const assertionNamesToAwait = [
  "checkGoldenOutline",
  "assertCssValueIsApproximately",
];

// map from key names provided as an argument to the "keycode" function to those that can be given directly to playwright's .press
const keyNames = {
  downarrow: "ArrowDown",
  uparrow: "ArrowUp",
  leftarrow: "ArrowLeft",
  rightarrow: "ArrowRight",
  Enter: "Enter",
  EnterForce: "Enter",
  Space: " ",
  Tab: "Tab",
  Home: "Home",
  End: "End",
  Esc: "Escape",
  pagedown: "PageDown",
  pageup: "PageUp",
};

// merges multiple import declarations from the same file into one, and orders alphabetically
// with external imports first.
// The only reason this is in a separate function is to keep the variables local.
function mergeAndReorderImports(ast) {
  // a collection to hold all the imports found.
  // The keys are import paths, and the values arrays of all the identifiers imported. These contain both the "imported" and "local" names
  // as well as a tag saying by whether it's a default, named or namespace export as we need this info too to reconstruct the imports.
  // NOTE: deliberately not taking note of `import type ...`, as this seems to work as a normal import statement as well.
  const imports = {};

  traverse(ast, {
    ImportDeclaration(path) {
      // collect the information about the import and add to the collection
      const { source, specifiers } = path.node;
      const importPath = source.value;
      if (!imports[importPath]) {
        imports[importPath] = [];
      }
      imports[importPath].push(
        ...specifiers.map((node) => ({
          isDefault: t.isImportDefaultSpecifier(node),
          isNameSpace: t.isImportNamespaceSpecifier(node),
          imported: node.imported?.name,
          local: node.local.name,
        }))
      );

      // then remove it!
      path.remove();
    },
  });

  // need yet another traversal for this - it should work in the "exit" method of Program nodes but for some reason that doesn't
  // seem to allow unshiftContainer to work for importSpecifier nodes (it fails silently, but works fine for other types of node).
  // Most likely a Babel bug but not worth the time to investigate and raise!
  traverse(ast, {
    Program(path) {
      // first extract the import paths as an array, and order the imported values alphabetically, keeping default imports first
      const importsArray = Object.entries(imports);
      importsArray.forEach(([, allImports]) => {
        allImports.sort((import1, import2) => {
          // ensure the default export, if it exists, comes first
          if (import1.isDefault) {
            return -1;
          }
          if (import2.isDefault) {
            return 1;
          }
          // otherwise order alphabetically by imported name
          return import1.imported.localeCompare(import2.imported);
        });
      });

      // then order by import path, keeping external imports (those paths not beginning with . or /) first
      importsArray.sort(([path1], [path2]) => {
        const isExternal = (importPath) => ![".", "/"].includes(importPath[0]);

        // if both internal or both external, order alphabetically
        if (isExternal(path1) === isExternal(path2)) {
          return path1.localeCompare(path2);
        }

        // otherwise put the external one first. (Uses a "trick" of coercing booleans to numbers to avoid multiple cases.)
        return isExternal(path2) - isExternal(path1);
      });

      // add all the merged-and-ordered imports back in when exiting the top-level node
      const importNodes = importsArray.map(([importPath, imported]) => {
        const importSpecifiers = imported.map((importedVal) => {
          if (importedVal.isDefault) {
            return t.importDefaultSpecifier(t.identifier(importedVal.local));
          }
          if (importedVal.isNameSpace) {
            return t.importNamespaceSpecifier(t.identifier(importedVal.local));
          }
          return t.importSpecifier(
            t.identifier(importedVal.local),
            t.identifier(importedVal.imported)
          );
        });
        return t.importDeclaration(
          importSpecifiers,
          t.stringLiteral(importPath)
        );
      });

      path.unshiftContainer("body", importNodes);
    },
  });
}

function removeDuplicateConsts(ast) {
  function traverseBlock(path) {
    const constsDeclared = [];

    function isInSubblock(subpath) {
      if (subpath === path) {
        return false;
      }
      if (t.isBlockStatement(subpath)) {
        return true;
      }
      return isInSubblock(subpath.parentPath);
    }

    path.traverse({
      VariableDeclaration(subpath) {
        if (subpath.node.kind === "const") {
          const { name } = subpath.node.declarations[0].id;
          if (constsDeclared.includes(name)) {
            subpath.remove();
          } else if (!isInSubblock(subpath)) {
            constsDeclared.push(name);
          }
        }
      },

      // need to "reset" the consts declared when hitting a new block
      BlockStatement(subpath) {
        traverseBlock(subpath);
      },
    });
  }

  traverse(ast, {
    BlockStatement(path) {
      traverseBlock(path);
    },
  });
}

// utility function to find all the callExpression nodes in a chain of method calls, as well as the function name of the initial call
// (which corresponds to the deepest child in the tree).
// This also needs to be flexible enough to catch non-method property chains that come from `expect`, eg
// `expect(foo).to.be.equals("bar");`
function getMethodCallNodes(node, allCallNodes = []) {
  if (t.isMemberExpression(node)) {
    return getMethodCallNodes(node.object, [node, ...allCallNodes]);
  }
  if (t.isMemberExpression(node.callee)) {
    return getMethodCallNodes(node.callee.object, [node, ...allCallNodes]);
  }
  return {
    nodes: t.isIdentifier(node) ? allCallNodes : [node, ...allCallNodes],
    name: node.name || node.callee.name || node.callee.object.name,
  };
}

// utility that attempts to give a unique name to a located element, based on the locator chain that found it and
// the arguments applied.
// These should mostly be manually altered to something better after running the script, but we need to do something and this
// should mostly work at least for simple cases.
function stringifyArgs(args) {
  const stringifySingleArg = (arg) => {
    // don't want this (a stringified AST node - no idea what that looks like!) but at least it's *something* to use as a fallback
    // for weird edge cases..
    let stringifiedArg = arg.toString();
    if (t.isTemplateLiteral(arg)) {
      // can't do a great job with template literals but need to do something to avoid crash as they're a literal with no value
      // property. Attempt to represent as close as possible to what the string looks like, with both literal parts and expression names.
      const { expressions, quasis } = arg;
      let builtString = "";
      // there will always be exactly one more "quasi" than expressions.
      quasis.forEach((quasi, index) => {
        builtString += quasi.value.raw;
        const nextExpression = expressions[index];
        if (nextExpression) {
          // hard to deal with the expressions in general, this is a simple non-crashing workaround
          builtString +=
            nextExpression.value ||
            nextExpression.name ||
            nextExpression.toString();
        }
      });
      stringifiedArg = builtString;
    } else if (t.isLiteral(arg)) {
      stringifiedArg = arg.value.toString();
    } else if (t.isIdentifier(arg)) {
      stringifiedArg = arg.name;
    } else if (t.isCallExpression(arg)) {
      const { callee, arguments: theArgs } = arg;
      stringifiedArg = stringifyArgs([callee, ...theArgs]);
    }
    // to ensure the resulting code is synactically valid, strip out any characters which can't be used in a variable name
    // (that is, all but upper and lower-case letters, numbers, _ and $)
    return stringifiedArg.replace(/[^a-zA-Z0-9_$]/g, "");
  };

  let name = "";
  args.forEach((arg) => {
    const stringifiedArg = stringifySingleArg(arg);
    name += stringifiedArg[0].toUpperCase();
    name += stringifiedArg.slice(1);
  });
  return name;
}

function convertTests(filename) {
  // keep track of any importred locator names, to use later in transformation
  const importedLocators = [];

  const ast = parser.parse(fse.readFileSync(filename, "utf8"), {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  let childrenCalls = 0;
  let parentCalls = 0;

  traverse(ast, {
    // a few always/commonly-needed imports at the top of the file.
    // (Import order and merging will be done in a separate traversal.)
    Program(path) {
      const pwImportSpecifiers = [
        t.importSpecifier(t.identifier("test"), t.identifier("test")),
        t.importSpecifier(t.identifier("expect"), t.identifier("expect")),
      ];
      const pwImport = t.importDeclaration(
        pwImportSpecifiers,
        t.stringLiteral("@playwright/experimental-ct-react17")
      );
      path.unshiftContainer("body", pwImport);

      const hooksConfigImportSpecifiers = [
        t.importSpecifier(
          t.identifier("HooksConfig"),
          t.identifier("HooksConfig")
        ),
      ];
      const hooksConfigImport = {
        ...t.importDeclaration(
          hooksConfigImportSpecifiers,
          t.stringLiteral("../../../playwright")
        ),
        importKind: "type",
      };
      path.unshiftContainer("body", hooksConfigImport);

      const utilImportSpecifiers = [
        t.importSpecifier(t.identifier("getStyle"), t.identifier("getStyle")),
        t.importSpecifier(
          t.identifier("checkAccessibility"),
          t.identifier("checkAccessibility")
        ),
        t.importSpecifier(
          t.identifier("containsClass"),
          t.identifier("containsClass")
        ),
      ];
      const utilImport = t.importDeclaration(
        utilImportSpecifiers,
        t.stringLiteral("../../../playwright/support/helper")
      );
      path.unshiftContainer("body", utilImport);
    },

    // Note: the following import transformations will leave multiple separate import statements from some folders, which is
    // a lint error. This is fixed in a separate traversal afterwards!
    ImportDeclaration(path) {
      const { specifiers, source } = path.node;
      // remove CypressMountWithProviders import
      if (specifiers.length === 1) {
        const specifier = specifiers[0];
        if (
          t.isImportDefaultSpecifier(specifier) &&
          t.isIdentifier(specifier.local) &&
          specifier.local.name === "CypressMountWithProviders"
        ) {
          path.remove();
          return;
        }
      }

      // update import paths:
      if (source.type === "StringLiteral") {
        // ../../locators<rest> => ../../../playwright/components<rest>
        // [note, can't put a slash before <rest> because sometimes it's a raw folder import]. This shouldn't matter
        // as we don't have other folders in the same place that starat with locators or support!
        if (source.value.startsWith("../../locators")) {
          const newSource = source.value.replace(
            "../../locators",
            "../../../playwright/components"
          );
          source.value = newSource;
          // add locator name to list so we know to add the page argument to it when called
          importedLocators.push(...specifiers.map(({ local }) => local.name));

          // remove any import of cyRoot
          path.node.specifiers = specifiers.filter(
            (specifier) =>
              !t.isImportSpecifier(specifier) ||
              specifier.imported.name !== "cyRoot"
          );
        }
        // ../../support<rest> => ../../../playwright/support<rest>
        // (same comment as above)
        if (source.value.startsWith("../../support")) {
          const newSource = source.value.replace(
            "../../support",
            "../../../playwright/support"
          );
          source.value = newSource;

          // remove any import of keycode function
          path.node.specifiers = specifiers.filter(
            (specifier) =>
              !t.isImportSpecifier(specifier) ||
              specifier.imported.name !== "keyCode"
          );
        }
        // remove `/component-helper` from paths, as this doesn't exist in the playwright folder and the contents are simply
        // in the parent support directory.
        // And the common-steps are merged into the helper file, so fix that.
        source.value = source.value.replace("/component-helper", "");
        source.value = source.value.replace("/common-steps", "/helper");

        // replace accordion-test.stories import with the new components.test-pw file
        if (source.value.includes("-test.stories")) {
          source.value = source.value.replace(
            /\/[^/]+-test\.stories/,
            "/components.test-pw"
          );
        }
      }
    },

    CallExpression(path) {
      const { callee, arguments: args } = path.node;
      // remove top-level context("component") call and replace with body of function argument
      if (
        t.isProgram(path.parentPath.parentPath.node) &&
        callee.name === "context"
      ) {
        path.replaceWithMultiple(path.node.arguments[1].body.body);
      }

      // change describe() call to test.describe()
      if (callee.name === "describe") {
        path.node.callee = t.memberExpression(
          t.identifier("test"),
          t.identifier("describe")
        );
      }

      if (callee.name === "it") {
        // change it() calls to test()
        callee.name = "test";

        // make function argument async and add { mount, page } as argument
        const testBody = args[1];
        testBody.async = true;
        testBody.params = [
          t.objectPattern(
            ["mount", "page"].map((arg) =>
              t.objectProperty(
                t.identifier(arg),
                t.identifier(arg),
                false,
                true
              )
            )
          ),
        ];
      }

      // change calls to CypressMountWithProviders to mount
      if (callee.name === "CypressMountWithProviders") {
        callee.name = "mount";

        // also need to pass any flags/arguments correctly
        if (args.length > 1) {
          // add <HooksConfig> generic to call
          path.node.typeArguments = t.tsTypeParameterInstantiation([
            t.tsTypeReference(t.identifier("HooksConfig")),
          ]);

          // pass additional arguments, when not undefined, to hooksConfig object.
          // NOTE: this assumes theme and locale will be added to HooksConfig type when needed.
          // This may have to change if a different solution is adopted.
          const hooksConfigProperties = [];
          // ugly but convenient way to rule out both the argument not being there and being passed as the undefined literal
          if (String(args[1]?.name) !== "undefined") {
            hooksConfigProperties.push(
              t.objectProperty(t.identifier("theme"), args[1])
            );
          }
          if (String(args[2]?.name) !== "undefined") {
            hooksConfigProperties.push(
              t.objectProperty(t.identifier("locale"), args[2])
            );
          }
          if (args[3] && t.isObjectExpression(args[3])) {
            hooksConfigProperties.push(...args[3].properties);
          }
          const hooksConfigObject = t.objectExpression(hooksConfigProperties);
          const hooksConfigArg = t.objectExpression([
            t.objectProperty(t.identifier("hooksConfig"), hooksConfigObject),
          ]);
          path.node.arguments = [args[0], hooksConfigArg];
        }

        // also add await call. Need to call skip for this to avoid infinite recursion. Should be OK to not restart as there should be nothing
        // to convert "inside" the call.
        path.skip();

        path.replaceWith(t.awaitExpression(path.node));
      } else if (assertionNamesToAwait.includes(callee.name)) {
        path.replaceWith(t.awaitExpression(path.node));
        path.skip();
      }

      if (t.isMemberExpression(callee)) {
        if (callee.object.name === "cy") {
          if (callee.property.name === "checkAccessibility") {
            // change cy.checkAccessibility() to await checkAccessibility(page)
            path.skip();

            path.replaceWith(
              t.awaitExpression(
                t.callExpression(t.identifier("checkAccessibility"), [
                  t.identifier("page"),
                ])
              )
            );
          } else if (callee.property.name === "viewport") {
            // convert `cy.viewport(w, h);` to `await page.setViewportSize({ width: w, height: h });`
            const setViewportSizeMethod = t.memberExpression(
              t.identifier("page"),
              t.identifier("setViewportSize")
            );
            const setViewportSizeArg = t.objectExpression([
              t.objectProperty(t.identifier("width"), args[0]),
              t.objectProperty(t.identifier("height"), args[1]),
            ]);
            const setViewportSizeCall = t.callExpression(
              setViewportSizeMethod,
              [setViewportSizeArg]
            );
            path.replaceWith(t.awaitExpression(setViewportSizeCall));
          }
        }

        // repeat "easy" locator substitutions (already done in convertLocators file)

        // this is basically the same util as used in convertLocators, but now checking for chaining off an imported locator rather
        // than "cy" or "page"
        const isLocatorChain = (node) => {
          const { type, object } = node;
          if (type === "Identifier") {
            // a special case for chaining off another locator. (Assumed to be defined in the same file. THIS WILL NOT WORK for locators
            // imported from outside!)
            if (importedLocators.includes(node.name)) {
              return true;
            }
          }
          if (type !== "MemberExpression") {
            return false;
          }
          switch (object.type) {
            case "Identifier":
              return importedLocators.includes(object.name);
            case "CallExpression":
              return isLocatorChain(object.callee);
            default:
              return false;
          }
        };

        if (isLocatorChain(callee)) {
          const propertyName = callee.property.name;

          // replace `.get` and `.find` with `.locator`
          if (["get", "find"].includes(propertyName)) {
            callee.property.name = "locator";
          }

          // replace `.eq` with `.nth`
          if (propertyName === "eq") {
            callee.property.name = "nth";
          }

          // warning about `.children` and `.parent`
          if (propertyName === "children") {
            // just add 1 to the count to report the total number once after the transformations are run
            childrenCalls += 1;
          } else if (propertyName === "parent") {
            // just add 1 to the count to report the total number once after the transformations are run
            parentCalls += 1;
          }
        }
      }
    },

    ExpressionStatement(path) {
      if (t.isCallExpression(path.node.expression)) {
        // This section is to transform:
        // it.each(array)(message, (args) => testFn)
        // to:
        // array.forEach(destructuredArgs => {test(newMessage, testFn); }
        // where destructuredArgs destructures the elements of the individual elements if it's an array of arrays,
        // and newMessage replaces each successive %s with the argument names.
        // Similarly for `describe.each`, which gets the same transformation except that we end up calling
        // `describe` rather than `it`.
        if (
          t.isCallExpression(path.node.expression.callee) &&
          t.isMemberExpression(path.node.expression.callee.callee) &&
          path.node.expression.callee.callee.property.name === "each" &&
          ["it", "describe"].includes(
            path.node.expression.callee.callee.object.name
          )
        ) {
          // unwrap each individual array element if they contain only one element
          // [But only if it's an array literal, not if it's a reference to a const defined elsewhere.]
          // Also take into account the fact that it might have a TS type assertion.
          const outerArray = path.node.expression.callee.arguments[0];
          const hasTsTypeAssertion = t.isTSAsExpression(outerArray);
          const arrayToIterate = hasTsTypeAssertion
            ? outerArray.expression
            : outerArray;
          if (t.isArrayExpression(arrayToIterate)) {
            arrayToIterate.elements = arrayToIterate.elements.map(
              (arrayElementExpression) =>
                t.isArrayExpression(arrayElementExpression) &&
                arrayElementExpression.elements.length === 1
                  ? arrayElementExpression.elements[0]
                  : arrayElementExpression
            );
          }

          // add TS "as const", it's often needed and unlikely to do any harm.
          // (But only do this for array literals containg string/array literals, not variable/const references.
          // Also don't do it if it already has a TS type assertion.)
          const arrayExpression =
            t.isArrayExpression(arrayToIterate) &&
            !t.isIdentifier(arrayToIterate.elements[0]) &&
            !hasTsTypeAssertion
              ? t.tsAsExpression(
                  arrayToIterate,
                  t.tsTypeReference(t.identifier("const"))
                )
              : outerArray;

          const forEach = t.memberExpression(
            arrayExpression,
            t.identifier("forEach")
          );

          const testFunctionParams = path.node.expression.arguments[1].params;
          // destructure the array if there is more than one argument, otherwise just take the only argument
          const shouldDestructure =
            t.isArrayExpression(arrayToIterate) &&
            t.isArrayExpression(arrayToIterate.elements[0]);
          const forEachFunctionArgParam = shouldDestructure
            ? t.arrayPattern(testFunctionParams)
            : testFunctionParams[0];
          const originalMessage = path.node.expression.arguments[0];
          let newMessage = originalMessage;
          // build a new message as a template literal from occurrences of %s in the original string
          const parts = originalMessage.value.split("%s");
          if (parts.length > 0) {
            const quasis = parts.map((partialStr, index) =>
              t.templateElement({
                raw: partialStr,
                tail: index === parts.length - 1,
              })
            );
            // we may have more arguments than %s's, which causes an error when constructing the template literal.
            // Can fix this by only taking the number of array elements we need.
            // HOWEVER in some places (button-toggle) we have the opposite problem - more %s's than arguments.
            // This is wrong and causes the Cypress output to simply contain a %s, so should be fixed - but we
            // don't want to crash the whole script. So in this case we simply repeat arguments from the start
            // to fill out the required %s's. This both avoids a crash and, at least in the faulty message in
            // ButtonToggle, produces what was probably intended.
            const templateExpressions = path.node.expression.arguments[1].params.slice(
              0,
              parts.length - 1
            );
            let currentIndex = 0;
            while (templateExpressions.length < quasis.length - 1) {
              templateExpressions.push(
                path.node.expression.arguments[1].params[currentIndex]
              );
              currentIndex += 1;
            }
            newMessage = t.templateLiteral(quasis, templateExpressions);
          }
          const forEachFunctionArgBody = t.blockStatement([
            // use the incorrect "it" as the function name, so that this is later converted correctly (to "test" with async ({ page, mount }) etc) by the
            // CallExpression transforms elsewhere in this visitor
            t.expressionStatement(
              t.callExpression(
                t.identifier(path.node.expression.callee.callee.object.name),
                [newMessage, path.node.expression.arguments[1]]
              )
            ),
          ]);

          const forEachFunctionArg = t.arrowFunctionExpression(
            [forEachFunctionArgParam],
            forEachFunctionArgBody
          );

          const forEachVersion = t.callExpression(forEach, [
            forEachFunctionArg,
          ]);

          path.node.expression = forEachVersion;

          // early return as we don't need to do any of the below stuff with locators for this expression!
          // (and trying to do so anyway causes errors)
          return;
        }

        // This section is to split up a complex method call chain after a locator into multiple calls/assertions, all awaited
        // eg locator().focus().should().and() should become:
        // const element = await locator(page);
        // await element.focus();
        // await element.should();
        // await element.and();
        // (the should etc. calls are be replaced with the correct playwright methods in a separate step)
        const { name, nodes } = getMethodCallNodes(path.node.expression);

        if (name === "expect") {
          // need to convert `expect(someVal).to.<some property chain>()` to `await expect(someVal).toBeSomething()`

          // first find the assertion chain in string form, eg "to.be.equals"
          // The slice is to cut off the initial "expect" node
          const stringAssertion = nodes
            .slice(1)
            .map(
              (node) =>
                node.name ||
                node.property?.name ||
                node.callee?.name ||
                node.callee?.property?.name
            )
            .join(".");

          // this will not be a terrible fallback if everything goes wrong, in terms of showing what the test was doing previously!
          let expectMethod = stringAssertion.split(".").join("");
          const assertionArgs = path.node.expression.arguments;

          switch (stringAssertion) {
            case "to.equal":
            case "to.equals":
            case "to.eq":
              expectMethod = "toBe";
              break;
            case "to.deep.equal":
              expectMethod = "toEqual";
              break;
            case "to.be.within":
              // this is trickier as it needs to convert to 2 separate calls. As this is a one-off we compute the final result
              // here and return early
              path.replaceWithMultiple([
                t.awaitExpression(
                  t.callExpression(
                    t.memberExpression(
                      nodes[0],
                      t.identifier("toBeGreaterThanOrEqual")
                    ),
                    [assertionArgs[0]]
                  )
                ),
                t.awaitExpression(
                  t.callExpression(
                    t.memberExpression(
                      nodes[0],
                      t.identifier("toBeLessThanOrEqual")
                    ),
                    [assertionArgs[1]]
                  )
                ),
              ]);
              return;
            case "to.have.css":
              expectMethod = "toHaveCSS";
              break;
            case "to.have.been.calledOnce":
              console.log(
                chalk.yellow(
                  "toHaveBeenCalledOnce assertion found - this is not possible to automatically translate to Playwright, please do it manually"
                )
              );
              break;
            default:
              break;
          }
          const singleCall = t.callExpression(
            t.memberExpression(nodes[0], t.identifier(expectMethod)),
            assertionArgs
          );

          path.replaceWith(t.awaitExpression(singleCall));
          return;
        }

        // we also need to handle various `cy.something()` as well as calls to imported locators
        if (["cy", ...importedLocators].includes(name)) {
          // we now know this is a chain coming from a locator call

          // build a name for the const (representing the located element) that's unique according to the locators called and arguments given.
          // These won't be the best names but it's the best we can do systematically!
          let elementName = `${name}Element`;

          // start building the new nodes, inserting the page argument in the initial locator call
          // We can't assume just the first node is the locator call, as there might be other locators chained off it.
          // So we have to look at the property name at each node and only stop when we reach a non-locator
          const numLocatorNodes = nodes.findIndex(
            (callNode, index) =>
              index > 0 &&
              ![...locatorChainMethods].includes(callNode.callee.property.name)
          );

          // should just need the one node here, as it will be a single statement in the output, and each successive element of nodes is deeper in
          // the AST, which has the original locator call at the base
          const locatorCallNode = nodes[numLocatorNodes - 1];

          if (!locatorCallNode) {
            // this happens when there is a single call to a cy method with nothing chained off;
            // It's not possible to translate most of these but it leads to errors in the below - just warn and move on.
            // We exclude those we can already translate elsewhere in the CallExpression visitor.
            if (
              !["checkAccessibility", "viewport"].includes(
                nodes[0].callee.property.name
              )
            ) {
              console.log(
                chalk.yellow(
                  `call to cy.${nodes[0].callee.property.name} found - this has not been translated to playwright as it's unclear what to do in general. Please fix it manually.`
                )
              );
            }
            return;
          }

          const otherNodes = nodes.slice(numLocatorNodes);
          const pageArgument = {
            ...t.identifier("page"),
            typeAnnotation: t.tsTypeAnnotation(
              t.tsTypeReference(t.identifier("Page"))
            ),
          };
          let actualLocatorNode = locatorCallNode;
          while (
            ![...importedLocators, "cy"].includes(
              actualLocatorNode.name || actualLocatorNode.callee.name
            )
          ) {
            actualLocatorNode = actualLocatorNode.callee.object;
          }

          let newNodes;

          //  various special cases for `cy.something()`
          if (name === "cy") {
            const methodCallName = locatorCallNode.callee.property.name;
            if (methodCallName === "focused") {
              // will replace `cy.focused()` with `page.locator("*:focus")` (see https://github.com/microsoft/playwright/issues/15865)
              // There are probably better replacements in most cases but this is simpler and should work at least most of the time!
              const pageLocatorCall = t.callExpression(
                t.memberExpression(
                  t.identifier("page"),
                  t.identifier("locator")
                ),
                [t.stringLiteral("*:focus")]
              );

              // also need to replace the variable elementName so that subsequent calls reference the correct variable
              elementName = "focusedElement";

              const getElementNode = t.variableDeclaration("const", [
                t.variableDeclarator(
                  t.identifier(elementName),
                  t.awaitExpression(pageLocatorCall)
                ),
              ]);

              newNodes = [getElementNode];
            } else if (methodCallName !== "checkAccessibility") {
              // log warning
              console.log(
                chalk.yellow(
                  `call to cy.${methodCallName}() found - this has not been translated to playwright as it's unclear what to do in general. Please fix it manually.`
                )
              );

              // just copy the "base case" from below - this won't work, but at least will output something
              const getElementNode = t.variableDeclaration("const", [
                t.variableDeclarator(
                  t.identifier(elementName),
                  t.awaitExpression(locatorCallNode)
                ),
              ]);
              // this may be a duplicate definition in the same scope, which would be an error - but there's no way of telling at this point.
              // We do a separate traversal later to remove these duplicates.
              newNodes = [getElementNode];
            }
          } else {
            // now we have the actual node we can find its arguments and compute the systematic (and badly confusing!) element name
            elementName += stringifyArgs(actualLocatorNode.arguments);
            nodes.slice(1, numLocatorNodes).forEach((node) => {
              const methodName = node.callee.property.name;
              const args = node.arguments;
              // try to make the final name look camel-cased
              elementName += methodName[0].toUpperCase();
              elementName += methodName.slice(1);
              elementName += stringifyArgs(args);
            });

            actualLocatorNode.arguments.unshift(pageArgument);

            const getElementNode = t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(elementName),
                t.awaitExpression(locatorCallNode)
              ),
            ]);
            // this may be a duplicate definition in the same scope, which would be an error - but there's no way of telling at this point.
            // We do a separate traversal later to remove these duplicates.
            newNodes = [getElementNode];
          }
          const indicesToSkip = [];
          // add more nodes (statements/expressions) based on other method calls
          otherNodes.forEach((node, index) => {
            let calleeName = elementName; // typically we'll call expect with an element name, but in some complex cases this has to be changed
            // if we've marked a node to skip (see later - this happens when it's already considered as part of the previous one)
            // then we need to pass over it here
            if (indicesToSkip.includes(index)) {
              return;
            }
            // in some complex translations we may need additional nodes to precede or follow the main `await expect(...)` statement
            const precedingNodes = [];
            const followingNodes = [];
            let skipThisNode = false;
            // need to adjust this to change a `element.should(...)` or `element.and()` to `expect(originalLocator).toDoSomething()
            // - where there are various cases for toDoSomething!
            let nodeToAwait = node;
            if (["should", "and"].includes(nodeToAwait.callee.property.name)) {
              // attempt to convert assertions to playwright. Some might not be possible, will warn about these.
              let methodName = "toDoSomething";
              let methodArgs = [];
              const assertionArgs = nodeToAwait.arguments;
              let assertionName = assertionArgs[0].value;
              let negatedAssertion = false;
              if (t.isStringLiteral(assertionArgs[0])) {
                // deal with a "not.something" assertion - by splitting it off and noting that we have to negate the assertion with a `.not` at the end
                if (assertionName.startsWith("not.")) {
                  assertionName = assertionName.slice(4);
                  negatedAssertion = true;
                }
                switch (assertionName) {
                  case "have.css":
                    if (assertionArgs.length === 3) {
                      methodName = "toHaveCSS";
                      methodArgs = assertionArgs.slice(1);
                    } else if (assertionArgs.length === 2) {
                      // this `.should("have.css", property) [with no value argument] has a few uses
                      const nextNode = otherNodes[index + 1];
                      const nextNodeMethodName = nextNode?.callee.property.name;
                      // one is when it's followed by a `.and("contain")
                      if (
                        nextNodeMethodName === "and" &&
                        nextNode.arguments.length === 2 &&
                        nextNode.arguments[0].value === "contain"
                      ) {
                        indicesToSkip.push(index + 1);
                        const styleProperty =
                          assertionArgs[1].value || assertionArgs[1].name;
                        const getStyleArgs = [
                          t.identifier(elementName),
                          assertionArgs[1],
                        ];
                        const getStyleCall = t.callExpression(
                          t.identifier("getStyle"),
                          getStyleArgs
                        );
                        const cssConstName = `css${
                          styleProperty[0].toUpperCase() +
                          styleProperty.slice(1)
                        }Value`;
                        const getStyleDeclaration = t.variableDeclaration(
                          "const",
                          [
                            t.variableDeclarator(
                              t.identifier(cssConstName),
                              getStyleCall
                            ),
                          ]
                        );
                        precedingNodes.push(getStyleDeclaration);
                        methodName = "toContain";
                        methodArgs = [nextNode.arguments[1]];
                        // need to make the expect call on the css property const
                        calleeName = cssConstName;
                      } else {
                        // other situations are complex, and relatively rare enough to be not worth doing a general transformation for. So do nothing and give warning instead
                        console.log(
                          chalk.yellow(
                            "`have.css` assertion found with only one subsequent argument. It's not clear how to translate this automatically - please inspect and fix manually."
                          )
                        );
                        // leave the call looking as it was so it's easier to fix manually!
                        methodName = "toHaveCSS";
                        methodArgs = assertionArgs.slice(1);
                      }
                    }
                    break;
                  case "have.attr":
                    if (assertionArgs.length === 3) {
                      methodName = "toHaveAttribute";
                      methodArgs = assertionArgs.slice(1);
                    } else if (assertionArgs.length === 2) {
                      // various special cases here, and some difficult-to-handle ones. Will deal with as many as possible but
                      // leave warnings for others.
                      if (assertionArgs[1].value === "disabled") {
                        methodName = "toBeDisabled";
                        methodArgs = [];
                      } else if (assertionArgs[1].value === "readOnly") {
                        negatedAssertion = !negatedAssertion; // likely can just set this to true, but this way is safe against `.not.toHaveAttribute("readOnly")` which is certainly possible
                        methodName = "toBeEditable";
                        methodArgs = [];
                      } else {
                        // other situations are complex, and relatively rare enough to be not worth doing a general transformation for. So do nothing and give warning instead
                        console.log(
                          chalk.yellow(
                            "`have.attr` assertion found with only one subsequent argument. It's not clear how to translate this automatically - please inspect and fix manually."
                          )
                        );
                        // leave the call looking as it was so it's easier to fix manually!
                        methodName = "toHaveAttribute";
                        methodArgs = assertionArgs.slice(1);
                      }
                    }
                    break;
                  case "be.visible":
                  case "exist":
                    // this seems to be the best translation of `.should("exist")`, but others may be available...
                    methodName = "toBeVisible";
                    methodArgs = [];
                    break;
                  case "contain.text":
                  case "contain":
                    // not sure if contain should always be translated to containText, but that seems to be how we use it...
                    methodName = "toContainText";
                    methodArgs = assertionArgs.slice(1);
                    break;
                  case "have.text":
                    methodName = "toHaveText";
                    methodArgs = assertionArgs.slice(1);
                    break;
                  case "have.id":
                    methodName = "toHaveAttribute";
                    methodArgs = [t.stringLiteral("id"), assertionArgs[1]];
                    break;
                  case "have.value":
                    methodName = "toHaveAttribute";
                    methodArgs = [t.stringLiteral("value"), assertionArgs[1]];
                    break;
                  case "be.focused":
                    methodName = "toBeFocused";
                    methodArgs = [];
                    break;
                  case "be.checked":
                    methodName = "toBeChecked";
                    methodArgs = [];
                    break;
                  default:
                    console.log(
                      chalk.yellow(
                        `Assertion found of ${assertionName} with arguments [${assertionArgs
                          .slice(1)
                          .map((arg) => arg.value)
                          .join(
                            ","
                          )}] which I don't yet know how to automatically convert to playwright. Translating to a generic "toDoSomething() - please convert manually.`
                      )
                    );
                }
              } else if (t.isIdentifier(assertionArgs[0])) {
                console.log(
                  chalk.yellow(
                    `Variable argument ${assertionArgs[0].name} found for should/and assertion. This is impossible to translate automatically to a playwright assertion - please inspect and fix manually.`
                  )
                );
              } else {
                console.log(
                  chalk.yellow(
                    `Non string literal argument found for should/and assertion. This is impossible to translate automatically to a playwright assertion - please inspect and fix manually.`
                  )
                );
              }

              const transformedAssertionObject = t.callExpression(
                t.identifier("expect"),
                [t.identifier(calleeName)]
              );

              nodeToAwait = t.callExpression(
                t.memberExpression(
                  negatedAssertion
                    ? t.memberExpression(
                        transformedAssertionObject,
                        t.identifier("not")
                      )
                    : transformedAssertionObject,
                  t.identifier(methodName)
                ),
                methodArgs
              );
            } else if (nodeToAwait.callee.property.name === "trigger") {
              nodeToAwait.callee.object = t.identifier(calleeName);
              const triggerArgs = nodeToAwait.arguments;
              // convert `.trigger("keydown", something)` or the same with "keyup" to `.press()` with the appropriate key string as argument
              if (
                t.isStringLiteral(triggerArgs[0]) &&
                ["keyup", "keydown"].includes(triggerArgs[0].value)
              ) {
                nodeToAwait.callee.property = t.identifier("press");
                const keyArgument = triggerArgs[1];
                let keyString = "UNKNOWN KEY - PLEASE FIX!";
                let keyIdentifier;
                if (
                  t.isCallExpression(keyArgument) &&
                  t.isIdentifier(keyArgument.callee) &&
                  keyArgument.callee.name === "keyCode" &&
                  keyArgument.arguments.length === 1 &&
                  t.isStringLiteral(keyArgument.arguments[0])
                ) {
                  const keycodeArgument = keyArgument.arguments[0].value;
                  keyString = keyNames[keycodeArgument] || keycodeArgument;
                } else if (
                  t.isObjectExpression(keyArgument) &&
                  keyArgument.properties.find(
                    (property) =>
                      t.isIdentifier(property.key) &&
                      property.key.name === "key"
                  )
                ) {
                  const keyProperty = keyArgument.properties.find(
                    (property) =>
                      t.isIdentifier(property.key) &&
                      property.key.name === "key"
                  ).value;
                  if (t.isStringLiteral(keyProperty)) {
                    keyString = keyProperty.value;
                  } else if (t.isIdentifier(keyProperty)) {
                    keyIdentifier = keyProperty.name;
                  } else {
                    console.log(
                      chalk.yellow(
                        "Call to keycode found in triggering a keypress, with arguments too complex to automatically convert. Please convert this manually."
                      )
                    );
                  }
                } else {
                  console.log(
                    chalk.yellow(
                      "Keydown/keyup triggered with an argument for the key that's too complex to automatically convert. Please convert this manually."
                    )
                  );
                }
                if (keyIdentifier) {
                  nodeToAwait.arguments = [t.identifier(keyIdentifier)];
                } else {
                  nodeToAwait.arguments = [t.stringLiteral(keyString)];
                }
              } else if (
                t.isStringLiteral(triggerArgs[0]) &&
                triggerArgs[0].value === "mouseover"
              ) {
                // convert `.trigger("mouseover")` to `.hover()`
                nodeToAwait.callee.property = t.identifier("hover");
                nodeToAwait.arguments = [];
              } else {
                console.log(
                  chalk.yellow(
                    `Call found to trigger with arguments [${triggerArgs
                      .map((arg) => arg.value || arg.name)
                      .join(
                        ","
                      )}] which I don't yet know how to automatically convert to playwright. Please convert this manually.`
                  )
                );
              }
            } else if (nodeToAwait.callee.property.name === "tab") {
              // convert `.tab()` to `.press("Tab")`
              // and `.tab({ shift: true })` to `.press("Shift+Tab")`
              nodeToAwait.callee.object = t.identifier(calleeName);
              nodeToAwait.callee.property = t.identifier("press");
              const tabArgs = nodeToAwait.arguments;
              if (tabArgs.length === 0) {
                nodeToAwait.arguments = [t.stringLiteral("Tab")];
              } else if (
                tabArgs.length === 1 &&
                t.isObjectExpression(tabArgs[0]) &&
                t.isBooleanLiteral(
                  tabArgs[0].properties.find(
                    (property) =>
                      t.isIdentifier(property.key) &&
                      property.key.name === "shift"
                  )?.value
                )
              ) {
                const shiftVal = tabArgs[0].properties.find(
                  (property) =>
                    t.isIdentifier(property.key) &&
                    property.key.name === "shift"
                ).value;
                nodeToAwait.arguments = [
                  t.stringLiteral(shiftVal ? "Shift+Tab" : "Tab"),
                ];
              } else {
                console.log(
                  chalk.yellow(
                    "Call to .tab() found with a complex argument. Please convert this manually."
                  )
                );
              }
            } else if (nodeToAwait.callee.property.name === "then") {
              // convert `.then((arg) => furtherTests(arg))` to `furtherTests(elementName)`
              // and `.then(() => furtherTests())` to `furtherTests()` (the latter will always chain of some action rather than
              // a direct locator method)
              const thenFunctionArg = nodeToAwait.arguments[0];
              if (!t.isFunction(thenFunctionArg)) {
                console.log(
                  chalk.red(
                    "argument to .then found which is not a function! Skipping but please investigate this!"
                  )
                );
                return;
              }
              const functionArgs = thenFunctionArg.params;
              const functionBody = t.isBlockStatement(thenFunctionArg.body)
                ? thenFunctionArg.body.body
                : [thenFunctionArg.body];
              // we need to skip this `.then` call node (as there won't be any `.then`, or anything else with a function argument, in
              // the translation), and add all the function's content next in the main test. (We don't have to translate it here, as
              // it will be picked up later by the visitor.)
              skipThisNode = true;
              followingNodes.push(...functionBody);
              // but there is one thing to take care of: in the case of `.then(($el) => { someTests($el); })`, we need to
              // replace any reference to $el (or whatever the argument is called) with the variable name we've already assigned
              // to the located element.
              // NOTE: in the case where `.then` is chained off a call to the `getDesignTokensByCssProperty` method, this isn't correct.
              // But there isn't yet any Playwright translation of this method. If that gets done, so we know what that should be changed to,
              // this can be updated. (But only 3 Cypress test suites even use this, so there may be no benefit to automating.)
              if (functionArgs.length > 0) {
                // there should only ever be one argument to such a `.then` call...
                const argumentName = functionArgs[0].name;
                skipThisNode = true;
                // need to find all uses of argumentName in the body and replace them with the element name.
                // Unfortunately we can't call the `traverse` method on the functionBody because that needs a Path to be called on, and
                // it's impossible to get a Path from a Node (unlike the other way round). So in this simple situation I've resorted to
                // just doing it manually with recursion...
                const updateIdentifierNames = (currentNode) => {
                  if (
                    t.isIdentifier(currentNode) &&
                    currentNode.name === argumentName
                  ) {
                    currentNode.name = elementName;
                    return;
                  }
                  if (typeof currentNode === "object") {
                    // note that this covers arrays as well as objects.
                    // (Also null due to a well-known JS bug, but I don't think null can ever appear in an AST!)
                    Object.values(currentNode).forEach(updateIdentifierNames);
                  }
                };
                updateIdentifierNames(functionBody);
              }
            } else {
              // base case (a method that hasn't been explicitly considered above) - just leave as it is.
              // This is correct for methods like `.focus()` - for others it will probably be flagged by TS/lint errors!
              nodeToAwait.callee.object = t.identifier(calleeName);
            }
            newNodes.push(...precedingNodes);
            if (!skipThisNode) {
              newNodes.push(
                t.expressionStatement(t.awaitExpression(nodeToAwait))
              );
            }
            newNodes.push(...followingNodes);
          });

          // replace the nodes
          path.replaceWithMultiple(newNodes);
        }
      }
    },
  });

  // separate traversal to merge import paths
  mergeAndReorderImports(ast);

  // and another one to remove duplicate const delcarations put in by transformations of assertions on locators
  removeDuplicateConsts(ast);

  if (childrenCalls > 0) {
    console.log(
      chalk.yellow(
        `warning: ${childrenCalls} call${
          childrenCalls > 1 ? "s" : ""
        } to .children() found in tests file. This is not possible to automatically translate to a Playwright locator - you will need to manually inspect the component's DOM and determine an appropriate substitute`
      )
    );
  }

  if (parentCalls > 0) {
    console.log(
      chalk.yellow(
        `warning: ${parentCalls} call${
          parentCalls > 1 ? "s" : ""
        } to .parent() found in tests file. This is not possible to automatically translate to a Playwright locator - you will need to manually inspect the component's DOM and determine an appropriate substitute`
      )
    );
  }

  const output = generate(ast).code;
  fse.writeFileSync(filename, output);
}

module.exports = convertTests;
