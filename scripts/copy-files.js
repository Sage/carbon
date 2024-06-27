/* eslint-disable no-console */
const path = require("path");
const fse = require("fs-extra");
const glob = require("fast-glob");

const packagePath = process.cwd();
const cjsPath = path.join(packagePath, "./lib");
const esmPath = path.join(packagePath, "./esm");
const srcPath = path.join(packagePath, "./src");
const specHelperInternalPath = "__spec_helper__/__internal__";

async function createPackages({ from, to }) {
  const packageDirectories = glob
    .sync("**/*/index.{js,ts,tsx}", { cwd: from })
    .map(path.dirname)
    .filter((p) => !p.includes(specHelperInternalPath));

  await Promise.all(
    packageDirectories.map(async (packageDirectory) => {
      const packageJsonPath = path.join(to, packageDirectory, "package.json");

      const esmDirectoryPath = path.join(esmPath, packageDirectory);
      const directoryPath = path.join(to, packageDirectory);
      const relativePath = path.join(
        path.relative(directoryPath, esmDirectoryPath),
        "index.js"
      );

      const typesExist = fse.pathExists(
        path.resolve(path.dirname(packageJsonPath), "./index.d.ts")
      );

      const packageJson = {
        sideEffects: false,
        module: relativePath,
        main: "./index.js",
        types: typesExist ? "./index.d.ts" : undefined,
      };

      fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

      return packageJsonPath;
    })
  );
}

async function copyFiles({ from, to }) {
  const files = await glob("**/*", {
    cwd: from,
    ignore: [
      "**/*.js",
      "**/*.ts",
      "**/*.tsx",
      "**/*.md",
      "**/*.mdx",
      "**/*.stories.*",
      "**/*.snap",
    ],
  });
  const types = await glob("**/*.d.ts", { cwd: from });
  const promises = [...files, ...types].map((file) =>
    fse.copy(path.resolve(from, file), path.resolve(to, file))
  );

  return Promise.all(promises);
}

async function run() {
  try {
    await copyFiles({ from: srcPath, to: cjsPath });
    await copyFiles({ from: srcPath, to: esmPath });

    await createPackages({ from: srcPath, to: cjsPath });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
