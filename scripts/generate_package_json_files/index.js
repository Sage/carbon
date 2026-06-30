const fs = require("fs");
const path = require("path");

// Base directory for compiled output
const libDir = path.resolve("lib");

function generatePackageJson(componentPath) {
  const relativePath = path.relative(libDir, componentPath);

  let esmBaseDir;
  if (relativePath === "") {
    // lib/ root — go up 1 to package root, then into esm/
    esmBaseDir = "../../esm";
  } else {
    // depth = number of path segments + 1 (for lib/ itself)
    const depth = relativePath.split(path.sep).length + 1;
    esmBaseDir = "../".repeat(depth) + "esm";
  }

  const esmPath =
    relativePath === ""
      ? `${esmBaseDir}/index.js`
      : path.join(esmBaseDir, relativePath, "index.js").replace(/\\/g, "/");

  return {
    sideEffects: false,
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
    
    // Skip generating package.json for lib root and esm root - only for subdirectories
    if (componentName !== "" && componentName !== ".") {
      const packageJsonContent = JSON.stringify(
        generatePackageJson(componentPath),
        null,
        2,
      );

      fs.writeFileSync(packageJsonPath, packageJsonContent);
      console.log(`Generated package.json for ${componentName}`);
    }
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
