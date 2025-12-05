import semver from "semver";
import chalk from "chalk";

const versionRange = ">=24";
if (!semver.satisfies(process.version, versionRange)) {
  // eslint-disable-next-line no-console
  console.error(
    chalk.red(
      `node ${process.version} is not supported.\nSee https://github.com/Sage/carbon/blob/master/docs/dev-environment-setup.md#nodejs--npm for more details.`
    )
  );
  process.exit(1);
}
