import fs from "fs";
import fetch from "node-fetch";
import semver from "semver";

const { gt } = semver;

const MIN_VERSION = "100.1.1";

const fetchVersions = async () => {
  const response = await fetch("https://registry.npmjs.com/carbon-react");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch from npm with HTTP error code ${response.status}`
    );
  }

  const json = await response.json();

  return Object.keys(json.versions);
};

const formatVersions = (versions) => {
  const filteredVersions = versions
    .filter((ver) => gt(ver, MIN_VERSION))
    .reverse();
  const versionsJson = {
    versions: {},
  };

  filteredVersions.forEach((item) => {
    versionsJson.versions[
      `v${item}`
    ] = `https://carbon.sage.com/v/${item}/index.html`;
  });

  return JSON.stringify(versionsJson);
};

export const writeFile = (jsonString) => {
  fs.mkdirSync("metadata", {}, (err) => {
    if (err) throw err;
  });

  fs.writeFileSync("metadata/metadata.json", jsonString, (err) => {
    if (err) {
      throw err;
    } else {
      global.console.log("Successfully created metadata.json file.");
    }
  });
};

export const generateMetadata = async () => {
  let versions;

  try {
    versions = await fetchVersions();
  } catch (err) {
    global.console.error(err);
    return;
  }

  const formattedVersions = formatVersions(versions);

  writeFile(formattedVersions);
};
