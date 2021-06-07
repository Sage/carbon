const semver = require("semver");
const chalk = require("chalk");
const execa = require("execa");
const { resolve } = require("path");

const wantedNodeVersion = ">=14.16.0 14";
if (!semver.satisfies(process.version, wantedNodeVersion)) {
  // eslint-disable-next-line no-console
  console.error(
    chalk.red(
      `node ${process.version} is not supported.\nSee https://github.com/Sage/carbon/blob/master/docs/dev-environment-setup.md#nodejs--npm for more details.`
    )
  );
  process.exit(1);
}

/**
 * When running a script using npm it adds node_modules/.bin to the path, but we want to check the globally installed
 * version not any declared as dependencies
 */
const wantedNpmVersion = ">=7.16.0 7";
const { stdout: whichNpm } = execa.sync("which", ["-a", "npm"]);
const carbonBin = resolve("node_modules", ".bin");
const npmOnPathWithoutCarbon = whichNpm
  .split("\n")
  .filter((path) => !path.startsWith(carbonBin));
const localDir = npmOnPathWithoutCarbon[0];

const { stdout: actualNpmVersion } = execa.sync("npm", ["--version"], {
  preferLocal: true,
  localDir,
});

if (!semver.satisfies(actualNpmVersion, wantedNpmVersion)) {
  // eslint-disable-next-line no-console
  console.error(
    chalk.red(
      `npm ${actualNpmVersion} is not supported.\nSee https://github.com/Sage/carbon/blob/master/docs/dev-environment-setup.md#nodejs--npm for more details.`
    )
  );
  process.exit(1);
}
