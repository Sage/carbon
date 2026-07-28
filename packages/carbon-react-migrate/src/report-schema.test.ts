import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { Ajv2020 } from "ajv/dist/2020.js";
import { EXIT } from "./cli.js";

const packageRoot = resolve(import.meta.dirname, "..");
const repositoryRoot = resolve(packageRoot, "../..");
const fixtures = resolve(packageRoot, "test/fixtures");
const cli = resolve(import.meta.dirname, "cli.js");
const schema = JSON.parse(
  readFileSync(resolve(packageRoot, "schema/report-v1.schema.json"), "utf8"),
);
const validate = new Ajv2020({
  allErrors: true,
  strict: true,
  strictRequired: false,
}).compile(schema);

type MutableReport = {
  migrations: Array<Record<string, unknown>>;
  findings: Array<Record<string, unknown>>;
  summary: Record<string, unknown>;
  [key: string]: unknown;
};

function directReport(args: string[], expectedExit: number): MutableReport {
  const result = spawnSync(
    process.execPath,
    [cli, ...args, "--format", "json"],
    {
      encoding: "utf8",
    },
  );
  assert.equal(result.status, expectedExit, result.stderr);
  assert.equal(result.stderr, "");
  const report = JSON.parse(result.stdout) as MutableReport;
  assert.equal(validate(report), true, JSON.stringify(validate.errors));
  return report;
}

test("actual plan, check, and check-deprecations reports validate against schema v1", () => {
  directReport(["plan", "--from", "159.0.0", "--to", "160.0.0"], EXIT.SUCCESS);
  directReport(
    [
      "check",
      "--from",
      "160.0.0",
      "--to",
      "161.0.0",
      resolve(fixtures, "supported"),
    ],
    EXIT.FINDINGS,
  );
  directReport(
    ["check-deprecations", resolve(fixtures, "supported")],
    EXIT.FINDINGS,
  );
});

test("schema rejects malformed migration summaries, summaries, and findings", () => {
  const valid = directReport(
    ["check-deprecations", resolve(fixtures, "supported")],
    EXIT.FINDINGS,
  );
  const invalidReports: Array<[string, (report: MutableReport) => void]> = [
    [
      "missing migration field",
      (report) => delete report.migrations[0].summary,
    ],
    ["missing summary field", (report) => delete report.summary.message],
    [
      "invalid selection track",
      (report) => {
        report.summary.selectionTrack = "invented-track";
      },
    ],
    [
      "invalid automation status",
      (report) => {
        report.migrations[0].automationStatus = "automatic";
      },
    ],
    [
      "negative count",
      (report) => {
        report.summary.findingCount = -1;
      },
    ],
    [
      "missing finding evidence",
      (report) => delete report.findings[0].matchedApi,
    ],
    [
      "empty finding file",
      (report) => {
        report.findings[0].file = "";
      },
    ],
    [
      "unexpected additional field",
      (report) => {
        report.summary.unexpected = true;
      },
    ],
    [
      "unexpected top-level field",
      (report) => {
        report.unexpected = true;
      },
    ],
  ];

  for (const [name, mutate] of invalidReports) {
    const report = structuredClone(valid);
    mutate(report);
    assert.equal(validate(report), false, name);
  }
});

test("documented silent npm invocation emits only parseable JSON", () => {
  const command = [
    "run",
    "--silent",
    "migrate",
    "--prefix",
    "packages/carbon-react-migrate",
    "--",
  ];
  const plan = spawnSync(
    "npm",
    [
      ...command,
      "plan",
      "--from",
      "159.0.0",
      "--to",
      "160.0.0",
      "--format",
      "json",
    ],
    { cwd: repositoryRoot, encoding: "utf8" },
  );
  assert.equal(plan.status, EXIT.SUCCESS, plan.stderr);
  assert.equal(plan.stderr, "");
  assert.doesNotThrow(() => JSON.parse(plan.stdout));

  const findings = spawnSync(
    "npm",
    [
      ...command,
      "check-deprecations",
      "packages/carbon-react-migrate/test/fixtures/supported",
      "--format",
      "json",
    ],
    { cwd: repositoryRoot, encoding: "utf8" },
  );
  assert.equal(findings.status, EXIT.FINDINGS, findings.stderr);
  assert.equal(findings.stderr, "");
  const report = JSON.parse(findings.stdout);
  assert.equal(report.summary.findingCount, 3);
  assert.equal(validate(report), true, JSON.stringify(validate.errors));
});
