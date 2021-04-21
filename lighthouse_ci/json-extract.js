const fs = require("fs");
const path = require("path");

const { stories } = require("../storybook-static/stories.json");
const defaults = require("../lighthouserc.json");

const output = path.resolve("./lighthouserc.json");
const urls = [];

for (let i = 0; i < 3; i++) {
  const storyId = stories[i];
  if (
    !storyId.startsWith("welcome") &&
    !storyId.startsWith("documentation") &&
    !storyId.startsWith("icon-test--all")
  ) {
    urls.push(`http://localhost:8080/?path=/story/${storyId}`);
  }
}

defaults.ci.collect.url = urls;

fs.writeFile(output, JSON.stringify(defaults, null, 2), (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Wrote ${urls.length} URL's to ${output}`);
});
