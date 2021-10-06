const fs = require("fs-extra");

const oldPathFile = "./storybook-static/stories.json";
const newPathFile = "./cypress/fixtures/stories/stories.json";

fs.renameSync(oldPathFile, newPathFile);
