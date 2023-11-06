/* eslint-disable no-console */
const fse = require("fs-extra");
const { join } = require("path");
const { exec } = require("child_process");
const chalk = require("chalk");
const convertLocators = require("./convertLocators");
const convertTests = require("./convertTests");
const convertTestStories = require("./convertTestStories");

const componentName = process.argv[2];

const locatorSourceDir = `./cypress/locators/${componentName}`;
const locatorTargetDir = `./playwright/components/${componentName}`;
if (fse.pathExistsSync(locatorSourceDir)) {
  console.log(
    `moving locator files from ${locatorSourceDir} to ${locatorTargetDir}`
  );
  console.warn(
    chalk.yellow(
      `don't forget to remove anything from ${locatorSourceDir} - potentially entire files/folders - that are no longer used in any tests!`
    )
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
const storiesDestinationFiles = [];
if (fse.pathExistsSync(storiesSourceFile)) {
  const storiesDestinationFile = `./src/components/${componentName}/components.test-pw.tsx`;
  console.log(
    `moving stories from ${storiesSourceFile} to ${storiesDestinationFile}`
  );
  console.log(
    chalk.yellow(
      "make sure you remove any stories that aren't used in Playwright tests"
    )
  );
  fse.copySync(storiesSourceFile, storiesDestinationFile);
  storiesDestinationFiles.push(storiesDestinationFile);
} else {
  // in case of Select, and possibly others, test stories are in various subfolders - and we need to recreate this structure in the Playwright
  // component directory, as was done in Cypress
  const rootFolder = `./src/components/${componentName}/`;
  const subDirectories = fse.readdirSync(rootFolder);
  subDirectories.forEach((subDir) => {
    const fullPath = join(rootFolder, subDir);
    const sourceFile = join(fullPath, `${subDir}-test.stories.tsx`);
    if (fse.pathExistsSync(sourceFile)) {
      const destinationFile = join(fullPath, `components.test-pw.tsx`);
      console.log(`moving stories from ${sourceFile} to ${destinationFile}`);
      console.log(
        chalk.yellow(
          "make sure you remove any stories that aren't used in Playwright tests"
        )
      );
      fse.copySync(sourceFile, destinationFile);
      storiesDestinationFiles.push(destinationFile);
    }
  });
}

const testsDestinationFiles = [];
if (
  fse.pathExistsSync(
    `./cypress/components/${componentName}/${componentName}.cy.tsx`
  ) ||
  fse.pathExistsSync(
    `./cypress/components/${componentName}/${componentName}.cy.js`
  )
) {
  const testsDestinationFile = `./src/components/${componentName}/${componentName}.pw.tsx`;
  testsDestinationFiles.push(testsDestinationFile);
  try {
    const testsSourceFile = `./cypress/components/${componentName}/${componentName}.cy.tsx`;
    fse.moveSync(testsSourceFile, testsDestinationFile);
    console.log(
      `moving tests from ${testsSourceFile} to ${testsDestinationFile}`
    );
  } catch (e) {
    if (e.code === "ENOENT") {
      const testsSourceFile = `./cypress/components/${componentName}/${componentName}.cy.js`;
      fse.moveSync(testsSourceFile, testsDestinationFile);
      console.log(
        `moving tests from ${testsSourceFile} to ${testsDestinationFile}`
      );
    }
  }
} else {
  // as above - in case of Select, and possibly others, test stories are in various subfolders - and we need to recreate this structure in the Playwright
  // component directory, as was done in Cypress
  const rootFolder = `./cypress/components/${componentName}/`;
  const subDirectories = fse.readdirSync(rootFolder);
  subDirectories.forEach((subDir) => {
    const fullPath = join(rootFolder, subDir);
    const sourceFile = join(fullPath, `${subDir}.cy.tsx`);
    if (fse.pathExistsSync(sourceFile)) {
      const destinationFile = `./src/components/${componentName}/${subDir}/${subDir}.pw.tsx`;
      testsDestinationFiles.push(destinationFile);
      console.log(`moving tests from ${sourceFile} to ${destinationFile}`);
      fse.copySync(sourceFile, destinationFile);
    } else if (fse.pathExistsSync(join(fullPath, `${subDir}.cy.js`))) {
      const jsSourceFile = join(fullPath, `${subDir}-cy.js`);
      const destinationFile = `./src/components/${componentName}/${subDir}/${subDir}.pw.tsx`;
      testsDestinationFiles.push(destinationFile);
      console.log(`moving tests from ${jsSourceFile} to ${destinationFile}`);
      fse.copySync(jsSourceFile, destinationFile);
    }
  });
}
// remove entire cypress component directory, assuming it's now empty
if (fse.readdirSync(`./cypress/components/${componentName}`).length === 0) {
  console.log(
    `removing cypress test directory './cypress/components/${componentName}' as it's now empty!`
  );
  fse.removeSync(`./cypress/components/${componentName}`);
}

console.log("converting locators from cypress to playwright...");
convertLocators(join(locatorTargetDir, "index.ts"));
console.log("converting tests from cypress to playwright...");
testsDestinationFiles.forEach(convertTests);
console.log("tidying up test-pw file(s)");
storiesDestinationFiles.forEach(convertTestStories);

console.log("prettifying output");
exec(`prettier --write '${join(locatorTargetDir, "index.ts")}'`);
testsDestinationFiles.forEach((file) => {
  exec(`prettier --write '${file}'`);
});
storiesDestinationFiles.forEach((file) => {
  exec(`prettier --write '${file}'`);
});
