/* eslint-disable no-console */
const { Octokit } = require("@octokit/rest");
const chalk = require("chalk");
const ci = require("ci-info");

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

const getTitle = (rfc) => rfc.title.split(": ")[1];

const checkRfcs = async () => {
  if (ci.isCI && process.env.NODE_ENV !== "test") {
    return;
  }

  try {
    const openRfcs = await getOpenRfcs();

    if (!openRfcs.length) return;

    const header = chalk.bold.inverse.white(
      " ".repeat(20),
      "Open RFCs for carbon-react",
      " ".repeat(20),
    );

    const rfcText = openRfcs
      .map((item) => {
        const title = getTitle(item);
        return `- ${chalk.bold(title)}: ${chalk.cyan.italic(item.html_url)}`;
      })
      .join("\n\n");

    console.log(`${header}\n\n${rfcText}\n`);
  } catch (error) {
    const rfcLink =
      "https://github.com/Sage/carbon/pulls?q=is%3Aopen+is%3Apr+label%3ARFC";
    const message = `Failed to retrieve open RFCs for carbon-react. Go to ${chalk.cyan.italic(
      rfcLink,
    )} to view current RFCs.`;
    console.log(
      `${chalk.yellow.inverse(" WARN ")}\n${chalk.yellow(message)}\n`,
    );
  }
};

module.exports = checkRfcs;
