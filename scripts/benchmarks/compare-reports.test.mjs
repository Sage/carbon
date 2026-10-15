import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import test from "node:test";
import compareReports, { compareScenario } from "./compare-reports.mjs";

import report from "./comparison-test-fixture.mjs";

test("comparison reports exact count changes and median timing differences", () => {
  const result = compareScenario(report(1, 2), report(2, 3));
  assert.equal(result.compatible, true);
  assert.deepEqual(result.commitCount, {
    base: 1,
    candidate: 2,
    change: 1,
    percentChange: 100,
  });
  assert.deepEqual(result.actualDurationMs, {
    base: 2,
    candidate: 3,
    change: 1,
    percentChange: 50,
  });
  assert.equal(
    compareScenario(report(0, 0), report(1, 1)).actualDurationMs.percentChange,
    null,
  );
});

test("workload and browser differences flag incompatibility; dependency changes are disclosed", () => {
  const base = report();
  const candidate = report();
  candidate.provenance.scenario.fingerprint = "other workload";
  candidate.environment.browserVersion = "141";
  candidate.provenance.dependencies["@sage/design-tokens-fusion"] = "18.16.0";
  const result = compareScenario(base, candidate);
  assert.equal(result.compatible, false);
  assert.equal(result.warnings.length, 3);
});

test("an incomplete scenario set cannot produce a successful comparison", async (t) => {
  const root = await fs.mkdtemp(
    path.join(os.tmpdir(), "carbon-compare-reports-"),
  );
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const base = path.join(root, "base");
  const candidate = path.join(root, "candidate");
  await fs.mkdir(base);
  await fs.mkdir(candidate);
  await fs.writeFile(path.join(base, "open.json"), JSON.stringify(report()));
  await fs.writeFile(
    path.join(candidate, "open.json"),
    JSON.stringify(report()),
  );
  await fs.writeFile(
    path.join(candidate, "close.json"),
    JSON.stringify({ ...report(), id: "component/close" }),
  );
  await assert.rejects(
    compareReports(base, candidate),
    /different scenario sets/,
  );
});
