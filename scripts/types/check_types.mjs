// @ts-check
/**
 * Generates types/carbon-react/types.json from all public component props.
 *
 * Usage:
 *   npm run versioning-check              — generate + compare vs committed baseline
 *   npm run versioning-check -- Button    — same, scoped to one component
 *   node check_types.mjs --update-only  — generate silently (used by pre-commit hook)
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
    // eslint-disable-next-line no-console -- CLI output
    console.error(`Could not resolve component from argument: ${componentArg}`);
    process.exit(1);
  }
}

// Build map of new snapshots
/** @type {Record<string, import("./public_types_core.mjs").ComponentTypeSnapshot>} */
const newComponents = Object.fromEntries(snapshots.map((s) => [s.component, s]));

// Merge with existing types.json so a scoped run doesn't wipe other components
/** @type {Record<string, import("./public_types_core.mjs").ComponentTypeSnapshot>} */
let existingComponents = {};
try {
  const raw = await fs.readFile(typesFile, "utf8");
  existingComponents = JSON.parse(raw).components ?? {};
} catch {
  // First generation
}

const merged = { ...existingComponents, ...newComponents };

await fs.mkdir(path.dirname(typesFile), { recursive: true });
await fs.writeFile(typesFile, JSON.stringify({ components: merged }, null, 2) + "\n", "utf8");

if (updateOnly) {
  process.exit(0);
}

// ─── Compare with committed baseline and report ───────────────────────────────

/** @type {Record<string, import("./public_types_core.mjs").ComponentTypeSnapshot> | null} */
let committedComponents = null;
try {
  const raw = execSync("git show HEAD:types/carbon-react/types.json", {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  committedComponents = JSON.parse(raw).components ?? {};
} catch {
  // No committed baseline yet
}

if (!committedComponents) {
  // eslint-disable-next-line no-console -- CLI output
  console.log(`Generated types for ${snapshots.length} component(s) — no baseline to compare against yet.`);
  process.exit(0);
}

let totalBreaking = 0;

for (const snapshot of snapshots) {
  const baseline = committedComponents[snapshot.component];
  if (!baseline) {
    // eslint-disable-next-line no-console -- CLI output
    console.log(`[${snapshot.component}] New component.`);
    continue;
  }

  const { breaking, safe } = compareSnapshots(baseline, snapshot);

  if (safe.length) {
    // eslint-disable-next-line no-console -- CLI output
    console.log(`[${snapshot.component}] Safe changes:`);
    for (const msg of safe) {
      // eslint-disable-next-line no-console -- CLI output
      console.log(`  + ${msg}`);
    }
  }

  if (breaking.length) {
    // eslint-disable-next-line no-console -- CLI output
    console.error(`[${snapshot.component}] Breaking changes:`);
    for (const msg of breaking) {
      // eslint-disable-next-line no-console -- CLI output
      console.error(`  ! ${msg}`);
    }
    totalBreaking += breaking.length;
  }
}

if (totalBreaking > 0) {
  // eslint-disable-next-line no-console -- CLI output
  console.error(`\n${totalBreaking} breaking type change(s) detected.`);
  process.exit(1);
}

// eslint-disable-next-line no-console -- CLI output
console.log(`\nDone. Processed ${snapshots.length} component(s), no breaking changes.`);
