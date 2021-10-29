/* eslint-disable no-console */
const fetch = require("node-fetch");
const chalk = require("chalk");
const { version } = require("../package.json");

const majorVersion = version.split(".")[0];

const checkCarbonVersion = () => {
  fetch("https://registry.npmjs.com/carbon-react")
    .then((res) => res.json())
    .then((data) => {
      const { latest } = data["dist-tags"];
      const latestMajor = latest.split(".")[0];

      const diff = Number(latestMajor) - Number(majorVersion);

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
