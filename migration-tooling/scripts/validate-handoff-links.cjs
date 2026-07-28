const fs = require("node:fs");
const path = require("node:path");

const handoff = process.argv[2];
if (!handoff) {
  throw new Error("Usage: node validate-handoff-links.cjs <handoff>");
}

const contents = fs.readFileSync(handoff, "utf8");
const links = [...contents.matchAll(/\]\(([^)#]+)(?:#[^)]+)?\)/g)].map(
  (match) => match[1],
);
const missing = links.filter(
  (link) => !fs.existsSync(path.resolve(path.dirname(handoff), link)),
);

if (missing.length) {
  throw new Error(`Missing handoff links:\n- ${missing.join("\n- ")}`);
}

process.stdout.write(
  `Validated ${links.length} handoff links in ${handoff}.\n`,
);
