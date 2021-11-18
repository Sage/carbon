/* eslint-disable no-console */
const { Octokit } = require("@octokit/rest");
const dotenv = require("dotenv");
const chalk = require("chalk");

dotenv.config();
const octokit = new Octokit({
  baseUrl: "https://api.github.com",
});

const method = "GET";
const owner = "sage";
const path = "pulls";
const repo = "carbon";
const url = "/repos/{owner}/{repo}/{path}";

const getOpenRfcs = async () => {
  const { data } = await octokit.request({
    owner,
    repo,
    url,
    method,
    path,
  });

  return data.filter((item) => {
    const labels = item.labels.filter((label) => label.name === "RFC");

    return labels.length > 0;
  });
};

const getRfcTitle = (rfc) => rfc.title.split(": ")[1];

const checkRfcs = async () => {
  const openRfcs = await getOpenRfcs();

  if (openRfcs.length > 0) {
    console.log("\ncarbon-react currently has open RFCs:");

    openRfcs.forEach((item) => {
      const title = getRfcTitle(item);
      console.log(`- ${title}: ${chalk.cyan(item.html_url)}`);
    });
    console.log("\n");
  }
};

if (!process.env.CARBON_INSTALL) checkRfcs();
