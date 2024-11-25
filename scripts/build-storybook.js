const dotenv = require("dotenv");
const fs = require("fs");
const { execSync } = require("child_process");

const envConfig = dotenv.parse(fs.readFileSync(".env"));
process.env.STORYBOOK_BUILD = envConfig.STORYBOOK_BUILD;

try {
  execSync("storybook build -c .storybook", { stdio: "inherit" });
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("Failed to start the application:", error);
  process.exit(1);
}
