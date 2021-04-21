const fs = require("fs");
const path = require("path");

const data = require("../storybook-static/stories.json");

const output = path.resolve("./lighthouserc.json");
const defaults = require("../lighthouserc.json");

const allUrls = [];
const urls = data.stories;

for (let el in urls) {
  if (
    !el.startsWith("welcome") &&
    !el.startsWith("documentation") &&
    !el.startsWith("icon-test--all")
  ) {
    el = `http://localhost:8080/?path=/story/${el}`;
    allUrls.push(el);
  }
}

defaults.ci.collect.url = allUrls;

fs.writeFile(output, JSON.stringify(defaults, null, 2), (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Wrote ${allUrls.length} URL's to ${output}`);
});
