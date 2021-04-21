const fs = require("fs");

const data = require("../storybook-static/stories.json");

const lighthouseCiJson = "./lighthouserc.json";
const json = require("../lighthouserc.json");

const allUrls = [];
const urls = data.stories;

for (let el in urls) {
  if (
    !el.startsWith("welcome") &&
    !el.startsWith("documentation") &&
    !el.startsWith("icon-test--all")
  ) {
    el = `http://localhost:9001/?path=/story/${el}`;
    allUrls.push(el);
  }
}

json.ci.collect.url = allUrls;

fs.writeFile(lighthouseCiJson, JSON.stringify(json), (err) => {
  return err ? console.log(err) : null;
});
