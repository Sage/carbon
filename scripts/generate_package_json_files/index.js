const fs = require("fs");
const path = require("path");

const libDir = path.resolve("lib");

fs.mkdirSync(libDir, { recursive: true });
fs.writeFileSync(
  path.join(libDir, "package.json"),
  `${JSON.stringify({ type: "module", sideEffects: false }, null, 2)}\n`,
);

// eslint-disable-next-line no-console
console.log("Generated lib/package.json");
