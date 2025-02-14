const fs = require("fs");
const path = require("path");

const libDir = path.resolve("dist/lib/components");

function generatePackageJson(componentName) {
  return {
    sideEffects: false,
    main: "./index.js",
    module: `../../../esm/components/${componentName}/index.js`,
    types: "./index.d.ts",
  };
}

function writePackageJson(componentPath, componentName) {
  const packageJsonPath = path.join(componentPath, "package.json");
  const packageJsonContent = JSON.stringify(
    generatePackageJson(componentName),
    null,
    2,
  );
  fs.writeFileSync(packageJsonPath, packageJsonContent);
}

function processComponents(directory) {
  fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .forEach((entry) => {
      writePackageJson(path.join(directory, entry.name), entry.name);
    });
}

// Ensure the directories exist before processing
if (fs.existsSync(libDir)) processComponents(libDir);

console.log("Generated package.json for each component.");
