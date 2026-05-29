// @ts-check
/* eslint-disable no-console -- hook output */
/**
 * Called by the commit-msg hook to gate breaking public API changes.
 *
 * Two checks run every time:
 *   1. Type snapshot — compares staged types/carbon-react/types.json vs HEAD
 *   2. Export paths — compares staged vs HEAD for non-internal index.ts files
 *
 * If any breaking changes are found and the commit message does not contain
 * "BREAKING CHANGE", the commit is rejected.
 *
 * Usage (via husky commit-msg hook):
 *   node ./scripts/types/check_breaking_changes.mjs <commit-msg-file>
 */

/**
 * @typedef {{
 *   component: string;
 *   moduleSpecifier: string;
 *   propsType: string | null;
 *   propsTypeLocal: string | null;
 *   props: Array<{ name: string; required: boolean; type: string }>;
 * }} ComponentTypeSnapshot
 */

import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import { Project } from "ts-morph";
import { compareSnapshots } from "./public_types_core.mjs";

const commitMsgFile = process.argv[2];
if (!commitMsgFile) {
  process.exit(0);
}

const commitMsg = await fs.readFile(commitMsgFile, "utf8");

/**
 * @typedef {{
 *   kind: "type";
 *   component: string;
 *   module: string;
 *   change: string;
 * } | {
 *   kind: "export";
 *   file: string;
 *   change: string;
 * }} BreakingChange
 */

/** @type {BreakingChange[]} */
const breaking = [];

// ─── 1. Prop type snapshot changes ───────────────────────────────────────────

/** @type {Record<string, ComponentTypeSnapshot> | null} */
let stagedComponents = null;
try {
  const raw = execSync("git show :types/carbon-react/types.json", {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    stdio: ["pipe", "pipe", "pipe"],
  });
  stagedComponents = JSON.parse(raw).components ?? {};
} catch {
  // Not staged — fall back to the on-disk file (written by pre-commit even if
  // git add hasn't run yet, or if only non-component files were staged).
  try {
    const raw = await fs.readFile(
      new URL("../../types/carbon-react/types.json", import.meta.url),
      "utf8",
    );
    stagedComponents = JSON.parse(raw).components ?? {};
  } catch {
    // No types.json at all — skip type check
  }
}

if (stagedComponents) {
  /** @type {Record<string, ComponentTypeSnapshot> | null} */
  let headComponents = null;
  try {
    const raw = execSync("git show HEAD:types/carbon-react/types.json", {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
      stdio: ["pipe", "pipe", "pipe"],
    });
    headComponents = JSON.parse(raw).components ?? {};
  } catch {
    // No HEAD version — first commit, nothing to compare
  }

  if (headComponents) {
    for (const [name, baseline] of Object.entries(headComponents)) {
      const current = stagedComponents[name];
      if (!current) {
        breaking.push({ kind: "type", component: name, module: baseline.moduleSpecifier, change: "Component removed from public API." });
        continue;
      }
      const { breaking: componentBreaking } = compareSnapshots(baseline, current);
      for (const change of componentBreaking) {
        breaking.push({ kind: "type", component: name, module: baseline.moduleSpecifier, change });
      }
    }
  }
}

// ─── 2. Export path changes in non-internal index.ts files ───────────────────

const stagedIndexFiles = execSync("git diff --cached --name-only", {
  encoding: "utf8",
  stdio: ["pipe", "pipe", "pipe"],
})
  .split("\n")
  .map((f) => f.trim())
  .filter((f) => f.endsWith("index.ts") && f.startsWith("src/"))
  .filter((f) => !f.split("/").some((part) => part === "__internal__"));

for (const filePath of stagedIndexFiles) {
  let headContent;
  try {
    headContent = execSync(`git show HEAD:${filePath}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch {
    continue; // New file — only additions, nothing breaking
  }

  let stagedContent;
  try {
    stagedContent = execSync(`git show :${filePath}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch {
    continue;
  }

  const headExports = extractFileExports(headContent, filePath);
  const stagedExports = extractFileExports(stagedContent, filePath);

  for (const name of headExports.named) {
    if (!stagedExports.named.has(name)) {
      breaking.push({ kind: "export", file: filePath, change: `Named export '${name}' removed or renamed.` });
    }
  }

  if (headExports.hasDefault && !stagedExports.hasDefault) {
    breaking.push({ kind: "export", file: filePath, change: "Default export removed." });
  }
}

// ─── Gate on commit message ───────────────────────────────────────────────────

if (breaking.length === 0 || commitMsg.includes("BREAKING CHANGE")) {
  process.exit(0);
}

console.error(
  `Breaking public API changes detected (${breaking.length}).
Add a BREAKING CHANGE footer to your commit message or revert the change:\n`,
);
for (const entry of breaking) {
  if (entry.kind === "type") {
    console.groupCollapsed("Type change");
    console.error("Component :", entry.component);
    console.error("Module    :", entry.module);
    console.error("Change    :", entry.change);
    console.groupEnd();
  } else {
    console.groupCollapsed("Export change");
    console.error("File      :", entry.file);
    console.error("Change    :", entry.change);
    console.groupEnd();
  }
}
process.exit(1);

// ─── Export extraction ────────────────────────────────────────────────────────

/**
 * Parses the named and default exports from a TypeScript file's source text.
 * Handles explicit re-exports (`export { Foo } from "..."`) and export assignments.
 * Skips `export *` since those can't be statically resolved without module resolution.
 *
 * @param {string} content
 * @param {string} filename
 * @returns {{ named: Set<string>; hasDefault: boolean }}
 */
function extractFileExports(content, filename) {
  const project = new Project({ useInMemoryFileSystem: true });
  const file = project.createSourceFile(filename, content);

  /** @type {Set<string>} */
  const named = new Set();
  let hasDefault = false;

  for (const decl of file.getExportDeclarations()) {
    for (const namedExport of decl.getNamedExports()) {
      const alias = namedExport.getAliasNode()?.getText();
      const exportedName = alias ?? namedExport.getName();
      if (exportedName === "default") {
        hasDefault = true;
      } else {
        named.add(exportedName);
      }
    }
    // export * from "..." — skip; can't resolve without the full module graph
  }

  // export default Foo  /  export = Foo
  for (const assignment of file.getExportAssignments()) {
    if (!assignment.isExportEquals()) {
      hasDefault = true;
    }
  }

  return { named, hasDefault };
}
