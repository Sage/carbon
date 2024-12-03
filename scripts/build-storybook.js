const dotenv = require("dotenv");
const fs = require("fs");
const { execSync } = require("child_process");

const whitelistArgs = [
  "-h",
  "--help",
  "-V",
  "--version",
  "-o",
  "--output-dir",
  "-c",
  "--config-dir",
  "--loglevel",
  "--quiet",
  "--debug",
  "--debug-webpack",
  "--stats-json",
  "--docs",
  "--test",
  "--ci",
  "--smoke-test",
  "--preview-url",
  "--force-build-preview",
  "--disable-telemetry",
  "--enable-crash-reports",
  "--webpack-stats-json",
];
const envConfig = dotenv.parse(fs.readFileSync(".env"));
process.env.STORYBOOK_BUILD = envConfig.STORYBOOK_BUILD;
const args = process.argv.slice(2);
const storybookArgs = args
  .filter((arg) => whitelistArgs.includes(arg.split("=")[0]))
  .join(" ");

try {
  execSync(`storybook build -c .storybook ${storybookArgs}`, {
    stdio: "inherit",
  });
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("Failed to start the application:", error);
  process.exit(1);
}
