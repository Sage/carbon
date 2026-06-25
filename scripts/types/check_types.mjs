// @ts-check
/* eslint-disable no-console -- CLI output */
/**
 * Generates types/carbon-react/types.json from all public component props.
 *
 * Usage:
 *   npm run versioning-check              — generate + compare vs committed baseline
 *   npm run versioning-check -- Button    — same, scoped to one component
 *   node check_types.mjs --update-only  — generate silently (used by pre-commit hook)
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
import path from "node:path";
import {
  createProject,
  collectPublicComponentTypeSnapshots,
  compareSnapshots,
  normalizeComponentArg,
  repoRoot,
  toKebabCase,
} from "./public_types_core.mjs";

const updateOnly = process.argv.includes("--update-only");
const componentArg = process.argv.find((a) => !a.startsWith("-") && process.argv.indexOf(a) >= 2);

const typesFile = path.join(repoRoot, "types", "carbon-react", "types.json");

const project = createProject();
let snapshots = collectPublicComponentTypeSnapshots(project);

if (componentArg) {
  const normalized = normalizeComponentArg(componentArg).toLowerCase();
  snapshots = snapshots.filter(
    (s) =>
      s.component.toLowerCase() === normalized ||
      toKebabCase(s.component) === normalized,
  );

  if (snapshots.length === 0) {
    console.error(`Could not resolve component from argument: ${componentArg}`);
    process.exit(1);
  }
}

// Build map of new snapshots
/** @type {Record<string, ComponentTypeSnapshot>} */
const newComponents = Object.fromEntries(snapshots.map((s) => [s.component, s]));

// Merge with existing types.json so a scoped run doesn't wipe other components
/** @type {Record<string, ComponentTypeSnapshot>} */
let existingComponents = {};
try {
  const raw = await fs.readFile(typesFile, "utf8");
  existingComponents = JSON.parse(raw).components ?? {};
} catch {
  // First generation
}

const merged = { ...existingComponents, ...newComponents };

const generatedNotice =
  "AUTO-GENERATED FILE. DO NOT EDIT MANUALLY. Regenerate via `npm run versioning-check` or commit hooks.";

await fs.mkdir(path.dirname(typesFile), { recursive: true });
await fs.writeFile(
  typesFile,
  JSON.stringify({ _notice: generatedNotice, components: merged }, null, 2) + "\n",
  "utf8",
);

if (updateOnly) {
  process.exit(0);
}

// ─── Compare with committed baseline and report ───────────────────────────────

/** @type {Record<string, ComponentTypeSnapshot> | null} */
let committedComponents = null;
try {
  const raw = execSync("git show HEAD:types/carbon-react/types.json", {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    stdio: ["pipe", "pipe", "pipe"],
  });
  committedComponents = JSON.parse(raw).components ?? {};
} catch {
  // No committed baseline yet
}

if (!committedComponents) {
  console.log(`Generated types for ${snapshots.length} component(s) — no baseline to compare against yet.`);
  process.exit(0);
}

let totalBreaking = 0;

for (const snapshot of snapshots) {
  const baseline = committedComponents[snapshot.component];
  if (!baseline) {
    console.log(`[${snapshot.component}] New component.`);
    continue;
  }

  const { breaking, safe: _safe } = compareSnapshots(baseline, snapshot);

  if (breaking.length) {
    console.error(`[${snapshot.component}] Breaking changes:`);
    for (const msg of breaking) {
      console.error(`  ! ${msg}`);
    }
    totalBreaking += breaking.length;
  }
}

if (totalBreaking > 0) {
  console.error(`\n${totalBreaking} breaking type change(s) detected.`);
  process.exit(1);
}

console.log(`\nDone. Processed ${snapshots.length} component(s), no breaking changes.`);
