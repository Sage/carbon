/* eslint-disable no-console */
const fse = require("fs-extra");
const { join } = require("path");
const convertLocators = require("./convertLocators");

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
