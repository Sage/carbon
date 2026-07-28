import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";
import { EXIT } from "./cli.js";
import { MalformedSourceError } from "./detector.js";
import { NO_FINDINGS } from "./report.js";
import { scan } from "./scanner.js";
import {
  selectDeprecationMigrations,
  selectUpgradeMigrations,
} from "./index.js";

const packageRoot = resolve(import.meta.dirname, "..");
const fixtures = resolve(packageRoot, "test/fixtures");
const cli = resolve(import.meta.dirname, "cli.js");

function malformedProject(): string {
  const project = mkdtempSync(resolve(tmpdir(), "carbon-cli-malformed-"));
  const source = readFileSync(
    resolve(fixtures, "malformed/broken.tsx.fixture"),
    "utf8",
  );
  writeFileSync(resolve(project, "broken.tsx"), source);
  return project;
}

test("detects supported JS, JSX, TS, and TSX patterns in stable order", () => {
  const records = selectDeprecationMigrations();
  const first = scan(
    resolve(fixtures, "supported"),
    records,
    "optional-proactive-deprecation",
  );
  const second = scan(
    resolve(fixtures, "supported"),
    records,
    "optional-proactive-deprecation",
  );
  assert.deepEqual(first, second);
  assert.deepEqual(
    first.map(({ file, migrationId }) => [file, migrationId]),
    [
      ["alias.jsx", "dialog-full-screen-component"],
      ["component.tsx", "step-sequence-item-aria-label"],
      ["positive.js", "step-sequence-item-aria-label"],
    ],
  );
});

test("detects the supported Button type pattern", () => {
  const records = selectUpgradeMigrations("160.0.0", "161.0.0");
  const findings = scan(
    resolve(fixtures, "supported"),
    records,
    "required-upgrade",
  );
  assert.deepEqual(
    findings.map(({ file, matchKind }) => [file, matchKind]),
    [["types.ts", "type-reference"]],
  );
  assert.ok(
    findings.every(
      ({ requiredForRequestedUpgrade }) => requiredForRequestedUpgrade,
    ),
  );
});

test("negative and shadowed identifiers produce no findings", () => {
  assert.deepEqual(
    scan(
      resolve(fixtures, "negative"),
      selectDeprecationMigrations(),
      "optional-proactive-deprecation",
    ),
    [],
  );
});

test("ambiguous spreads are reported as unsupported, never safe", () => {
  const [finding] = scan(
    resolve(fixtures, "ambiguous"),
    selectDeprecationMigrations(),
    "optional-proactive-deprecation",
  );
  assert.equal(finding.automationStatus, "unsupported");
  assert.equal(finding.matchKind, "ambiguous-prop");
});

test("malformed source has a distinct failure", () => {
  assert.throws(
    () =>
      scan(
        malformedProject(),
        selectDeprecationMigrations(),
        "optional-proactive-deprecation",
      ),
    MalformedSourceError,
  );
});

test("JSON output is schema v1, deterministic, complete, and read-only", () => {
  const target = resolve(fixtures, "supported");
  const before = execFileSync(
    "find",
    [target, "-type", "f", "-exec", "shasum", "{}", ";"],
    { encoding: "utf8" },
  );
  const args = [cli, "check-deprecations", target, "--format", "json"];
  const first = spawnSync(process.execPath, args, { encoding: "utf8" });
  const second = spawnSync(process.execPath, args, { encoding: "utf8" });
  assert.equal(first.status, EXIT.FINDINGS);
  assert.equal(first.stdout, second.stdout);
  const report = JSON.parse(first.stdout);
  assert.equal(report.schemaVersion, 1);
  assert.equal(report.summary.selectionTrack, "optional-proactive-deprecation");
  assert.equal(report.findings.length, 3);
  for (const finding of report.findings) {
    for (const field of [
      "migrationId",
      "applicableVersion",
      "selectionTrack",
      "requiredForRequestedUpgrade",
      "file",
      "location",
      "matchedApi",
      "importOrigin",
      "matchKind",
      "automationStatus",
      "documentation",
      "manualChecks",
      "risks",
      "limitations",
      "runtimeWarningChecks",
    ])
      assert.ok(field in finding, field);
  }
  const snapshot = JSON.parse(
    readFileSync(resolve(fixtures, "report-v1.snapshot.json"), "utf8"),
  );
  assert.deepEqual(
    report.findings.map(
      ({
        file,
        migrationId,
        matchKind,
        automationStatus,
        selectionTrack,
        requiredForRequestedUpgrade,
      }: Record<string, unknown>) => ({
        file,
        migrationId,
        matchKind,
        automationStatus,
        selectionTrack,
        requiredForRequestedUpgrade,
      }),
    ),
    snapshot,
  );
  const after = execFileSync(
    "find",
    [target, "-type", "f", "-exec", "shasum", "{}", ";"],
    { encoding: "utf8" },
  );
  assert.equal(after, before);
});

test("exit codes and unsupported direct path are stable", () => {
  const noFindings = spawnSync(
    process.execPath,
    [cli, "check-deprecations", resolve(fixtures, "negative")],
    { encoding: "utf8" },
  );
  assert.equal(noFindings.status, EXIT.SUCCESS);
  assert.match(
    noFindings.stdout,
    new RegExp(NO_FINDINGS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
  );

  const unsupported = spawnSync(
    process.execPath,
    [cli, "plan", "--from", "159.0.0", "--to", "161.7.0"],
    { encoding: "utf8" },
  );
  assert.equal(unsupported.status, EXIT.INVALID_INPUT);
  assert.match(
    unsupported.stderr,
    /159\.0\.0 -> 160\.0\.0 -> 161\.0\.0 -> 161\.3\.0 -> 161\.7\.0/,
  );

  const malformed = spawnSync(
    process.execPath,
    [cli, "check-deprecations", malformedProject()],
    { encoding: "utf8" },
  );
  assert.equal(malformed.status, EXIT.MALFORMED_SOURCE);

  const missing = spawnSync(
    process.execPath,
    [cli, "check-deprecations", resolve(fixtures, "missing")],
    { encoding: "utf8" },
  );
  assert.equal(missing.status, EXIT.INVALID_INPUT);

  const internalFailure = mkdtempSync(resolve(tmpdir(), "carbon-cli-failure-"));
  symlinkSync(
    resolve(internalFailure, "missing-target"),
    resolve(internalFailure, "broken.js"),
  );
  const internal = spawnSync(
    process.execPath,
    [cli, "check-deprecations", internalFailure],
    { encoding: "utf8" },
  );
  assert.equal(internal.status, EXIT.INTERNAL_FAILURE);
});

test("plan/check remain required-only and schema artifact declares v1", () => {
  const plan = spawnSync(
    process.execPath,
    [cli, "plan", "--from", "159.0.0", "--to", "160.0.0", "--format", "json"],
    { encoding: "utf8" },
  );
  assert.equal(plan.status, EXIT.SUCCESS);
  const report = JSON.parse(plan.stdout);
  assert.ok(
    report.migrations.every(
      (item: { requiredForRequestedUpgrade: boolean }) =>
        item.requiredForRequestedUpgrade,
    ),
  );
  assert.ok(
    report.migrations.every(
      (item: { migrationId: string }) =>
        !item.migrationId.includes("dialog") &&
        !item.migrationId.includes("step-sequence"),
    ),
  );
  const schema = JSON.parse(
    readFileSync(resolve(packageRoot, "schema/report-v1.schema.json"), "utf8"),
  );
  assert.equal(schema.properties.schemaVersion.const, 1);
});

test("command-specific argument validation is deterministic", () => {
  const target = resolve(fixtures, "negative");
  const detectedVersionProject = mkdtempSync(
    resolve(tmpdir(), "carbon-cli-version-"),
  );
  mkdirSync(resolve(detectedVersionProject, "node_modules/carbon-react"), {
    recursive: true,
  });
  writeFileSync(
    resolve(detectedVersionProject, "node_modules/carbon-react/package.json"),
    '{"version":"159.0.0"}\n',
  );
  writeFileSync(resolve(detectedVersionProject, "app.js"), "export {};\n");
  const cases: Array<{
    name: string;
    args: string[];
    exit: number;
  }> = [
    {
      name: "valid plan",
      args: ["plan", "--from", "159.0.0", "--to", "160.0.0"],
      exit: EXIT.SUCCESS,
    },
    {
      name: "valid check path",
      args: ["check", "--from", "159.0.0", "--to", "160.0.0", target],
      exit: EXIT.SUCCESS,
    },
    {
      name: "valid detected from version",
      args: ["check", "--to", "160.0.0", detectedVersionProject],
      exit: EXIT.SUCCESS,
    },
    {
      name: "valid deprecation path",
      args: ["check-deprecations", target],
      exit: EXIT.SUCCESS,
    },
    {
      name: "valid apply dry run",
      args: [
        "apply",
        "--from",
        "159.0.0",
        "--to",
        "160.0.0",
        target,
        "--dry-run",
      ],
      exit: EXIT.SUCCESS,
    },
    {
      name: "valid apply deprecations dry run",
      args: ["apply-deprecations", target, "--dry-run"],
      exit: EXIT.SUCCESS,
    },
    {
      name: "plan positional path",
      args: ["plan", "--from", "159.0.0", "--to", "160.0.0", target],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "deprecation from",
      args: ["check-deprecations", "--from", "159.0.0", target],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "deprecation to",
      args: ["check-deprecations", "--to", "160.0.0", target],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "missing to",
      args: ["plan", "--from", "159.0.0"],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "missing from value",
      args: ["plan", "--from", "--to", "160.0.0"],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "missing to value",
      args: ["plan", "--from", "159.0.0", "--to"],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "option used as format value",
      args: [
        "plan",
        "--from",
        "159.0.0",
        "--to",
        "160.0.0",
        "--format",
        "--from",
      ],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "duplicate from",
      args: [
        "plan",
        "--from",
        "159.0.0",
        "--from",
        "159.0.0",
        "--to",
        "160.0.0",
      ],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "duplicate format",
      args: [
        "plan",
        "--from",
        "159.0.0",
        "--to",
        "160.0.0",
        "--format",
        "json",
        "--format",
        "json",
      ],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "unknown option",
      args: ["check-deprecations", "--unknown"],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "dry run on check",
      args: ["check-deprecations", target, "--dry-run"],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "dirty override on plan",
      args: ["plan", "--from", "159.0.0", "--to", "160.0.0", "--allow-dirty"],
      exit: EXIT.INVALID_INPUT,
    },
    {
      name: "excess positional arguments",
      args: ["check-deprecations", target, target],
      exit: EXIT.INVALID_INPUT,
    },
  ];

  for (const { name, args, exit } of cases) {
    const result = spawnSync(process.execPath, [cli, ...args], {
      encoding: "utf8",
    });
    assert.equal(result.status, exit, name);
  }
});
