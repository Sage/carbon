/* eslint-disable no-console */
/* istanbul ignore file */
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const chalk = require("chalk");
const ci = require("ci-info");
const { version } = require("../../package.json");

dotenv.config();
const majorVersion = version.split(".")[0];

const checkCarbonVersion = () => {
  if (ci.isCI && process.env.NODE_ENV !== "test") {
    return;
  }

  fetch("https://registry.npmjs.com/carbon-react")
    .then((res) => res.json())
    .then((data) => {
      const { latest } = data["dist-tags"];
      const latestMajor = latest.split(".")[0];

      const diff = Number(latestMajor) - Number(majorVersion);

      // This is ignored as coverage will fail when run in CI without it
      if (diff > 1) {
        console.log(
          `carbon-react version installed is currently ${chalk.yellow(
            diff
          )} major versions behind the latest.`
        );
      }
    })
    .catch((err) => console.log(err));
};

checkCarbonVersion();

module.exports = checkCarbonVersion;
