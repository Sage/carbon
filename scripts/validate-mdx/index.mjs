#!/usr/bin/env node
// @ts-check
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import validateComponentCoverage from "./component-coverage.mjs";
import { DEFAULT_MDX_GLOBS, DEFAULT_MDX_IGNORES } from "./config.mjs";
import SourceInspector from "./source-inspector.mjs";
import validateMdx from "./validator.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const args = process.argv.slice(2);
const json = args.includes("--json");
const help = args.includes("--help") || args.includes("-h");
const patterns = args.filter((arg) => !arg.startsWith("--"));

if (help) {
  process.stdout.write(`Validate Carbon component MDX documentation.

Usage:
  npm run validate:mdx
  npm run validate:mdx -- src/components/pill/pill.mdx
  npm run validate:mdx -- 'src/components/{pill,pager}/*.mdx'
  npm run validate:mdx -- --json

Missing sections are reported but never created automatically.\n`);
  process.exit(0);
}

const directFiles = patterns
  .map((entry) => path.resolve(repoRoot, entry))
  .filter((entry) => existsSync(entry) && statSync(entry).isFile());
const globPatterns = patterns.filter(
  (entry) => !directFiles.includes(path.resolve(repoRoot, entry)),
);
const discovered = fg.sync(
  globPatterns.length ? globPatterns : patterns.length ? [] : DEFAULT_MDX_GLOBS,
  {
    cwd: repoRoot,
    absolute: true,
    onlyFiles: true,
    ignore: patterns.length ? [] : DEFAULT_MDX_IGNORES,
  },
);
const files = [...new Set([...directFiles, ...discovered])].sort();

if (!files.length) {
  process.stderr.write("No MDX files matched the provided paths.\n");
  process.exit(2);
}

const inspector = new SourceInspector(repoRoot);
const diagnostics = patterns.length
  ? []
  : validateComponentCoverage(repoRoot, files);
for (const filePath of files) {
  const content = await fs.readFile(filePath, "utf8");
  diagnostics.push(...validateMdx(content, filePath, inspector));
}
diagnostics.sort(
  (a, b) =>
    a.filePath.localeCompare(b.filePath) ||
    a.line - b.line ||
    a.column - b.column ||
    a.rule.localeCompare(b.rule),
);

const errors = diagnostics.filter(({ severity }) => severity === "error");
const warnings = diagnostics.filter(({ severity }) => severity === "warning");
if (json) {
  process.stdout.write(
    JSON.stringify(
      {
        files: files.length,
        errors: errors.length,
        warnings: warnings.length,
        diagnostics,
      },
      null,
      2,
    ) + "\n",
  );
} else {
  for (const item of diagnostics) {
    const relative = path.relative(repoRoot, item.filePath);
    process.stdout.write(
      `${relative}:${item.line}:${item.column} ${item.severity} ${item.rule} ${item.message}\n`,
    );
  }
  process.stdout.write(
    `Validated ${files.length} MDX file${files.length === 1 ? "" : "s"}: ${errors.length} error${errors.length === 1 ? "" : "s"}, ${warnings.length} warning${warnings.length === 1 ? "" : "s"}.\n`,
  );
}

process.exitCode = errors.length ? 1 : 0;
