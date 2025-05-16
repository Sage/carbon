const fs = require("fs");
const path = require("path");

// Base directory for compiled output
const libDir = path.resolve("lib");

function generatePackageJson(componentPath) {
  // Extract the relative path from the base directory
  const relativePath = path.relative(libDir, componentPath);

  // Determine the proper ESM base path based on component depth
  // The main entry point (at lib root) uses "../../esm"
  // All other components use "../../../esm"
  const esmBaseDir = relativePath === "" ? "../../esm" : "../../../esm";

  // Create the corresponding ESM path
  const esmPath =
    relativePath === ""
      ? `${esmBaseDir}/index.js`
      : path.join(esmBaseDir, relativePath, "index.js").replace(/\\/g, "/");

  return {
    sideEffects: false,
    main: "./index.js",
    module: esmPath,
    types: "./index.d.ts",
  };
}

function writePackageJson(componentPath) {
  // Check for index.js or index.d.ts file
  const hasIndexFile =
    fs.existsSync(path.join(componentPath, "index.js")) ||
    fs.existsSync(path.join(componentPath, "index.d.ts"));

  if (hasIndexFile) {
    const packageJsonPath = path.join(componentPath, "package.json");
    const componentName = path.relative(libDir, componentPath);

    const packageJsonContent = JSON.stringify(
      generatePackageJson(componentPath),
      null,
      2,
    );

    fs.writeFileSync(packageJsonPath, packageJsonContent);
    console.log(`Generated package.json for ${componentName || "root"}`);
  }
}

function processDirectoryRecursively(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory does not exist: ${directory}`);
    return;
  }

  // Process current directory
  writePackageJson(directory);

  // Process all subdirectories
  fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .forEach((entry) => {
      const subdirPath = path.join(directory, entry.name);
      processDirectoryRecursively(subdirPath);
    });
}

// Process all directories recursively starting from lib
if (fs.existsSync(libDir)) processDirectoryRecursively(libDir);
console.log("Package.json generation completed.");
