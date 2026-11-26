import semver from "semver";
import chalk from "chalk";
import packageJson from "../package.json" with { type: "json" };

const versionRange = packageJson.engines.node;
if (!semver.satisfies(process.version, versionRange)) {
  // eslint-disable-next-line no-console
  console.error(
    chalk.red(
      `node ${process.version} is not supported. Expected ${versionRange}.\nSee https://github.com/Sage/carbon/blob/master/contributing/dev-environment-setup.md#nodejs--npm for more details.`,
    ),
  );
  process.exit(1);
}
