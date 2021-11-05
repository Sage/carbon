const semver = require("semver");
const chalk = require("chalk");

const version = ">=14.16.0 14";
if (!semver.satisfies(process.version, version)) {
  // eslint-disable-next-line no-console
  console.error(
    chalk.red(
      `node ${process.version} is not supported.\nSee https://github.com/Sage/carbon/blob/master/docs/dev-environment-setup.md#nodejs--npm for more details.`
    )
  );
  process.exit(1);
}
