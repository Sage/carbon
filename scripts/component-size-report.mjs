#!/usr/bin/env node
// Reports raw and gzip sizes of built ESM files for a given component path.
// Reads from esm/ (the tree-shakeable build output) — run npm run build first.
// Usage:
//   npm run component-size -- flat-table
//   npm run component-size -- flat-table/sort
//   npm run component-size -- flat-table/flat-table.component.tsx
import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, relative, sep } from "path";
import { fileURLToPath } from "url";
import { gzipSync } from "zlib";

const arg = process.argv[2];

if (!arg) {
  console.error("Usage: node scripts/component-size.mjs <path>");
  console.error("  node scripts/component-size.mjs flat-table");
  console.error("  node scripts/component-size.mjs flat-table/sort");
  console.error("  node scripts/component-size.mjs flat-table/flat-table.component.tsx");
  process.exit(1);
}

// fileURLToPath avoids the leading-slash issue with import.meta.url on Windows
const root = fileURLToPath(new URL("..", import.meta.url));
// strip source extensions so tsx/ts paths resolve to the built .js
const normalized = arg.replace(/\.(tsx?|jsx?)$/, "");
const esmPath = join(root, "esm/components", normalized);
const singleFile = esmPath + ".js";

// recursively collects all .js files (excludes .d.ts type declaration files)
function collectFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(full));
    } else if (entry.name.endsWith(".js") && !entry.name.endsWith(".d.ts")) {
      files.push(full);
    }
  }
  return files;
}

let files;

// resolve arg to either a single file or a full directory tree
if (existsSync(singleFile)) {
  files = [singleFile];
} else if (existsSync(esmPath) && statSync(esmPath).isDirectory()) {
  files = collectFiles(esmPath);
} else {
  console.error(`Not found: esm/components/${normalized}(.js)`);
  console.error("Run npm run build first, or check the path.");
  process.exit(1);
}

const kb = (n) => (n / 1024).toFixed(2) + " kB";

let totalRaw = 0;
let totalGzip = 0;

const rows = files.map((file) => {
  const content = readFileSync(file);
  const raw = content.byteLength;
  const gzip = gzipSync(content).byteLength;
  totalRaw += raw;
  totalGzip += gzip;
  // normalise to forward slashes for consistent output on Windows
  return { rel: relative(join(root, "esm/components"), file).split(sep).join("/"), raw, gzip };
});

// size the file column to fit the longest path in the result set
const COL = Math.max(...rows.map((r) => r.rel.length), "File".length) + 2;

console.log(`\nFile sizes (esm): ${normalized}\n`);
console.log("File".padEnd(COL) + "Raw".padStart(10) + "Gzip".padStart(10));
console.log("─".repeat(COL + 20));

for (const { rel, raw, gzip } of rows) {
  console.log(rel.padEnd(COL) + kb(raw).padStart(10) + kb(gzip).padStart(10));
}

console.log("─".repeat(COL + 20));
console.log("Total".padEnd(COL) + kb(totalRaw).padStart(10) + kb(totalGzip).padStart(10));
console.log();


