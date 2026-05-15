import semver from "semver";

const versionRange = ">=24";
if (!semver.satisfies(process.version, versionRange)) {
  // eslint-disable-next-line no-console
  console.error(
    `\x1b[31mnode ${process.version} is not supported.\nSee https://github.com/Sage/carbon/blob/master/docs/dev-environment-setup.md#nodejs--npm for more details.\x1b[0m`
  );
  process.exit(1);
}
