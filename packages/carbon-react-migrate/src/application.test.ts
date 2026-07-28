import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";
import {
  codemodRegistry,
  planApplication,
  writeChangesAtomically,
} from "./application.js";
import { EXIT } from "./cli.js";
import { scan } from "./scanner.js";
import {
  selectDeprecationMigrations,
  selectUpgradeMigrations,
} from "./index.js";

const cli = resolve(import.meta.dirname, "cli.js");
const deprecations = selectDeprecationMigrations();
const track = "optional-proactive-deprecation" as const;

test("every safe catalogue rule uses the shared named codemod registry", () => {
  assert.deepEqual(
    Object.keys(codemodRegistry).sort(),
    deprecations
      .flatMap((record) =>
        record.automation.status === "safe" ? [record.automation.rule] : [],
      )
      .sort(),
  );
});

function project(files: Record<string, string>): string {
  const root = mkdtempSync(resolve(tmpdir(), "carbon-apply-"));
  for (const [file, source] of Object.entries(files))
    writeFileSync(resolve(root, file), source);
  return root;
}

function initCleanGit(root: string): void {
  execFileSync("git", ["init", "-q"], { cwd: root });
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Carbon migration test",
      "-c",
      "user.email=carbon-migration@example.invalid",
      "commit",
      "-qm",
      "fixture",
    ],
    { cwd: root },
  );
}

test("shared detector evidence drives both safe transforms and preserves comments", () => {
  const root = project({
    "app.tsx": `// keep this comment
import { StepSequenceItem as Item } from "carbon-react";
import FullScreen from "carbon-react/lib/components/dialog-full-screen";
export const app = <>
  <Item ariaLabel="First" />
  <FullScreen title="Example" />
</>;
`,
  });
  const checked = scan(root, deprecations, track);
  const plan = planApplication(root, deprecations, track);
  assert.deepEqual(plan.findings, checked);
  assert.equal(plan.changes.length, 1);
  assert.deepEqual(plan.changes[0].migrationIds, [
    "dialog-full-screen-component",
    "step-sequence-item-aria-label",
  ]);
  assert.match(plan.changes[0].after, /\/\/ keep this comment/);
  assert.match(plan.changes[0].after, /aria-label="First"/);
  assert.match(plan.changes[0].after, /carbon-react\/lib\/components\/dialog/);
  assert.match(plan.changes[0].after, /size="fullscreen"/);
});

function assertSharedDialogImportTransforms(source: string): void {
  const dryRoot = project({ "app.tsx": source });
  const applyRoot = project({ "app.tsx": source });
  initCleanGit(dryRoot);
  initCleanGit(applyRoot);

  const dry = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", dryRoot, "--dry-run", "--format", "json"],
    { encoding: "utf8" },
  );
  const applied = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", applyRoot, "--format", "json"],
    { encoding: "utf8" },
  );
  assert.equal(dry.status, EXIT.FINDINGS, dry.stderr);
  assert.equal(applied.status, EXIT.FINDINGS, applied.stderr);
  assert.deepEqual(
    JSON.parse(dry.stdout).changes,
    JSON.parse(applied.stdout).changes,
  );

  const transformed = readFileSync(resolve(applyRoot, "app.tsx"), "utf8");
  assert.equal(
    transformed.match(/carbon-react\/lib\/components\/dialog"/g)?.length,
    1,
  );
  assert.doesNotMatch(transformed, /dialog-full-screen/);
  assert.equal(transformed.match(/size="fullscreen"/g)?.length, 2);
  assert.equal(transformed.match(/<Full /g)?.length, 2);
  assert.match(transformed, /\/\/ preserve shared import/);

  const repeated = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", applyRoot, "--allow-dirty", "--format", "json"],
    { encoding: "utf8" },
  );
  assert.equal(repeated.status, EXIT.SUCCESS, repeated.stderr);
  assert.deepEqual(JSON.parse(repeated.stdout).changes, []);
}

test("rewrites one named aliased DialogFullScreen import used twice", () => {
  assertSharedDialogImportTransforms(`// preserve shared import
import { DialogFullScreen as Full } from "carbon-react/lib/components/dialog-full-screen";
export const app = <>
  <Full open />
  <Full open />
</>;
`);
});

test("rewrites one default aliased DialogFullScreen import used twice", () => {
  assertSharedDialogImportTransforms(`// preserve shared import
import Full from "carbon-react/lib/components/dialog-full-screen";
export const app = <>
  <Full open />
  <Full open />
</>;
`);
});

test("ambiguous, conflicting, partial, and manual findings never produce edits", () => {
  const ambiguous = project({
    "ambiguous.tsx": `import { StepSequenceItem } from "carbon-react";
import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
const props = {};
export const app = <>
  <StepSequenceItem {...props} ariaLabel="No edit" />
  <DialogFullScreen size="small" />
</>;
`,
    "import-conflict.tsx": `import DialogFullScreen, { helper } from "carbon-react/lib/components/dialog-full-screen";
export const app = <DialogFullScreen title={helper} />;
`,
  });
  const ambiguityPlan = planApplication(ambiguous, deprecations, track);
  assert.equal(ambiguityPlan.changes.length, 0);
  assert.deepEqual(
    ambiguityPlan.findings.map(({ automationStatus }) => automationStatus),
    ["unsupported", "unsupported", "unsupported"],
  );

  const manual = project({
    "types.ts": `import type { ButtonHandle } from "carbon-react/lib/components/button/__next__";
export type Ref = ButtonHandle;
`,
  });
  const upgrade = selectUpgradeMigrations("160.0.0", "161.0.0");
  const manualPlan = planApplication(manual, upgrade, "required-upgrade");
  assert.equal(manualPlan.findings[0].automationStatus, "partial");
  assert.equal(manualPlan.changes.length, 0);
});

test("an unsupported finding quarantines the whole file from automatic edits", () => {
  const source = `import { StepSequenceItem } from "carbon-react";
import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
export const app = <>
  <StepSequenceItem ariaLabel="Otherwise safe" />
  <DialogFullScreen size="small" />
</>;
`;
  const root = project({ "mixed.tsx": source });
  const result = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", root],
    { encoding: "utf8" },
  );
  assert.equal(result.status, EXIT.FINDINGS, result.stderr);
  assert.equal(readFileSync(resolve(root, "mixed.tsx"), "utf8"), source);
  assert.match(result.stdout, /ambiguous-component \[unsupported\]/);
});

test("dry-run and actual apply report identical proposed changes, then apply is idempotent", () => {
  const source = `import { StepSequenceItem } from "carbon-react";
export const item = <StepSequenceItem ariaLabel="First" />;
`;
  const dryRoot = project({ "app.jsx": source });
  const applyRoot = project({ "app.jsx": source });
  initCleanGit(dryRoot);
  initCleanGit(applyRoot);

  const dry = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", dryRoot, "--dry-run", "--format", "json"],
    { encoding: "utf8" },
  );
  const applied = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", applyRoot, "--format", "json"],
    { encoding: "utf8" },
  );
  assert.equal(dry.status, EXIT.FINDINGS, dry.stderr);
  assert.equal(applied.status, EXIT.FINDINGS, applied.stderr);
  const dryReport = JSON.parse(dry.stdout);
  const appliedReport = JSON.parse(applied.stdout);
  const checked = spawnSync(
    process.execPath,
    [cli, "check-deprecations", dryRoot, "--format", "json"],
    { encoding: "utf8" },
  );
  assert.equal(checked.status, EXIT.FINDINGS, checked.stderr);
  assert.deepEqual(JSON.parse(checked.stdout).findings, dryReport.findings);
  assert.deepEqual(dryReport.changes, appliedReport.changes);
  assert.equal(readFileSync(resolve(dryRoot, "app.jsx"), "utf8"), source);
  assert.match(
    readFileSync(resolve(applyRoot, "app.jsx"), "utf8"),
    /aria-label="First"/,
  );

  const second = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", applyRoot, "--allow-dirty", "--format", "json"],
    { encoding: "utf8" },
  );
  assert.equal(second.status, EXIT.SUCCESS, second.stderr);
  assert.deepEqual(JSON.parse(second.stdout).changes, []);
});

test("dirty worktrees refuse writes unless explicitly overridden; dry-run stays read-only", () => {
  const source = `import { StepSequenceItem } from "carbon-react";
export const item = <StepSequenceItem ariaLabel="First" />;
`;
  const root = project({ "app.jsx": source });
  initCleanGit(root);
  writeFileSync(resolve(root, "app.jsx"), `${source}// dirty\n`);

  const refused = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", root],
    { encoding: "utf8" },
  );
  assert.equal(refused.status, EXIT.INVALID_INPUT);
  assert.match(refused.stderr, /dirty Git worktree/);
  assert.match(readFileSync(resolve(root, "app.jsx"), "utf8"), /ariaLabel/);

  const dryRun = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", root, "--dry-run"],
    { encoding: "utf8" },
  );
  assert.equal(dryRun.status, EXIT.FINDINGS);
  assert.match(readFileSync(resolve(root, "app.jsx"), "utf8"), /ariaLabel/);

  const overridden = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", root, "--allow-dirty"],
    { encoding: "utf8" },
  );
  assert.equal(overridden.status, EXIT.FINDINGS, overridden.stderr);
  assert.match(readFileSync(resolve(root, "app.jsx"), "utf8"), /aria-label/);
});

test("targets outside Git use the same validated atomic application path", () => {
  const root = project({
    "app.js": `import { StepSequenceItem } from "carbon-react";
export const item = <StepSequenceItem ariaLabel="First" />;
`,
  });
  const result = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", root],
    { encoding: "utf8" },
  );
  assert.equal(result.status, EXIT.FINDINGS, result.stderr);
  assert.match(readFileSync(resolve(root, "app.js"), "utf8"), /aria-label/);
});

test("refuses a source-file symlink discovered during a directory scan", () => {
  const source = `import { StepSequenceItem } from "carbon-react";
export const item = <StepSequenceItem ariaLabel="First" />;
`;
  const root = project({ "target.tsx": source });
  const scanned = resolve(root, "src");
  mkdirSync(scanned);
  const link = resolve(scanned, "linked.tsx");
  symlinkSync(resolve(root, "target.tsx"), link);

  const result = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", scanned],
    { encoding: "utf8" },
  );
  assert.equal(result.status, EXIT.INVALID_INPUT);
  assert.match(result.stderr, /symbolic link/);
  assert.equal(lstatSync(link).isSymbolicLink(), true);
  assert.equal(readFileSync(link, "utf8"), source);
  assert.equal(readFileSync(resolve(root, "target.tsx"), "utf8"), source);
});

test("refuses a directly supplied source-file symlink", () => {
  const source = `import { StepSequenceItem } from "carbon-react";
export const item = <StepSequenceItem ariaLabel="First" />;
`;
  const root = project({ "target.tsx": source });
  const link = resolve(root, "linked.tsx");
  symlinkSync(resolve(root, "target.tsx"), link);

  const result = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", link],
    { encoding: "utf8" },
  );
  assert.equal(result.status, EXIT.INVALID_INPUT);
  assert.match(result.stderr, /symbolic link/);
  assert.equal(lstatSync(link).isSymbolicLink(), true);
  assert.equal(readFileSync(link, "utf8"), source);
  assert.equal(readFileSync(resolve(root, "target.tsx"), "utf8"), source);
});

test("refuses a file changed to a symlink after application planning", () => {
  const source = `import { StepSequenceItem } from "carbon-react";
export const item = <StepSequenceItem ariaLabel="First" />;
`;
  const root = project({ "app.tsx": source, "target.tsx": source });
  const application = planApplication(
    resolve(root, "app.tsx"),
    deprecations,
    track,
  );
  const applicationFile = resolve(root, "app.tsx");
  rmSync(applicationFile);
  symlinkSync(resolve(root, "target.tsx"), applicationFile);

  assert.throws(
    () => writeChangesAtomically(application.changes),
    /symbolic link/,
  );
  assert.equal(lstatSync(applicationFile).isSymbolicLink(), true);
  assert.equal(readFileSync(applicationFile, "utf8"), source);
  assert.equal(readFileSync(resolve(root, "target.tsx"), "utf8"), source);
});

test("a failing replacement rolls every file back and removes temporary artifacts", () => {
  const source = `import { StepSequenceItem } from "carbon-react";
export const item = <StepSequenceItem ariaLabel="First" />;
`;
  const root = project({ "a.jsx": source, "b.jsx": source });
  const plan = planApplication(root, deprecations, track);
  assert.equal(plan.changes.length, 2);
  assert.throws(
    () =>
      writeChangesAtomically(plan.changes, {
        beforeReplace(index) {
          if (index === 1) throw new Error("simulated interruption");
        },
      }),
    /simulated interruption/,
  );
  assert.equal(readFileSync(resolve(root, "a.jsx"), "utf8"), source);
  assert.equal(readFileSync(resolve(root, "b.jsx"), "utf8"), source);
  assert.deepEqual(
    readdirSync(root).filter((file) => file.includes(".carbon-migrate-")),
    [],
  );
});

test("source drift after planning aborts before replacement", () => {
  const source = `import { StepSequenceItem } from "carbon-react";
export const item = <StepSequenceItem ariaLabel="First" />;
`;
  const root = project({ "app.jsx": source });
  const plan = planApplication(root, deprecations, track);
  const drifted = `${source}// changed after planning\n`;
  writeFileSync(resolve(root, "app.jsx"), drifted);
  assert.throws(() => writeChangesAtomically(plan.changes), /Source changed/);
  assert.equal(readFileSync(resolve(root, "app.jsx"), "utf8"), drifted);
});

test("all source is parsed before any write and malformed input preserves valid files", () => {
  const valid = `import { StepSequenceItem } from "carbon-react";
export const item = <StepSequenceItem ariaLabel="First" />;
`;
  const root = project({
    "a-valid.jsx": valid,
    "z-broken.tsx": `import { StepSequenceItem } from "carbon-react";
export const broken = <StepSequenceItem ariaLabel= />;
`,
  });
  const result = spawnSync(
    process.execPath,
    [cli, "apply-deprecations", root, "--allow-dirty"],
    { encoding: "utf8" },
  );
  assert.equal(result.status, EXIT.MALFORMED_SOURCE);
  assert.equal(readFileSync(resolve(root, "a-valid.jsx"), "utf8"), valid);
});
