import fs from "node:fs";
import path from "node:path";

const libDir = path.resolve("lib");

function writePackageJson(directory) {
  const hasIndexJs = fs.existsSync(path.join(directory, "index.js"));
  const hasIndexTypes = fs.existsSync(path.join(directory, "index.d.ts"));

  if (!hasIndexJs && !hasIndexTypes) return;

  const isLibRoot = directory === libDir;
  const packageJson = isLibRoot
    ? { type: "module" }
    : {
        type: "module",
        sideEffects: false,
        ...(hasIndexJs && { module: "./index.js" }),
        ...(hasIndexTypes && { types: "./index.d.ts" }),
      };

  fs.writeFileSync(
    path.join(directory, "package.json"),
    `${JSON.stringify(packageJson, null, 2)}\n`,
  );
}

function processDirectoryRecursively(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory does not exist: ${directory}`);
    return;
  }

  writePackageJson(directory);

  fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .forEach((entry) => {
      processDirectoryRecursively(path.join(directory, entry.name));
    });
}

processDirectoryRecursively(libDir);
console.log("Package.json generation completed.");
