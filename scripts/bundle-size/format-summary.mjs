import { readFile } from "node:fs/promises";

const [inputPath] = process.argv.slice(2);

if (!inputPath) {
  throw new Error("Expected a Size Limit JSON file path.");
}

const report = JSON.parse(await readFile(inputPath, "utf8"));

if (!Array.isArray(report) || report.length === 0) {
  throw new Error("Expected Size Limit to report at least one measurement.");
}

if (report.some(({ name, size }) => !name || typeof size !== "number")) {
  throw new Error("Size Limit report is missing a component name or size.");
}

const formatKilobytes = (size) => `${(size / 1000).toFixed(2)} kB`;

const output = [
  "## Bundle size",
  "",
  "| Component | Gzip size |",
  "| --- | ---: |",
];

for (const { name, size } of report) {
  output.push(`| ${name} | ${formatKilobytes(size)} |`);
}

process.stdout.write(`${output.join("\n")}\n`);
