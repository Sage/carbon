import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import saveBaseline from "./save-baseline.mjs";

const exampleReport = () => ({
  schemaVersion: 2,
  id: "search/type-query",
  generatedAt: "2026-10-12T12:00:00.000Z",
  provenance: {
    git: { commit: "abc123", dirty: true },
    scenario: { fingerprint: "scenario-source" },
    build: { fingerprint: "browser-source" },
    dependencies: { "@sage/design-tokens-fusion": "18.15.0" },
  },
  configuration: { samples: 1, warmups: 0 },
  environment: { browserVersion: "140.0" },
  summary: { commitCount: { median: 1 }, actualDurationMs: { median: 2 } },
  samples: [
    { commitCount: 1, actualDurationMs: 2, commits: [{ actualDurationMs: 2 }] },
  ],
});

const setup = async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "carbon-baseline-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const reportPath = path.join(root, "report.json");
  const report = exampleReport();
  await fs.writeFile(reportPath, JSON.stringify(report));
  return {
    id: report.id,
    reportPath,
    directory: path.join(root, "baselines"),
    report,
  };
};

test("saving preserves raw samples and run provenance rather than current checkout metadata", async (t) => {
  const options = await setup(t);
  const result = await saveBaseline(options);
  const saved = JSON.parse(await fs.readFile(result.destination, "utf8"));
  assert.deepEqual(saved.report, options.report);
  assert.match(saved.reportSha256, /^[a-f0-9]{64}$/);
  assert.ok(Number.isFinite(Date.parse(saved.savedAt)));
  assert.equal(result.archivePath, undefined);
});

test("saving again refuses to overwrite and leaves existing bytes intact", async (t) => {
  const options = await setup(t);
  const result = await saveBaseline(options);
  const original = await fs.readFile(result.destination, "utf8");
  await assert.rejects(saveBaseline(options), /already exists.*--replace/);
  assert.equal(await fs.readFile(result.destination, "utf8"), original);
  await assert.rejects(fs.stat(`${result.destination}.lock`), {
    code: "ENOENT",
  });
});

test("explicit replacement archives the exact previous baseline", async (t) => {
  const options = await setup(t);
  const first = await saveBaseline(options);
  const previous = await fs.readFile(first.destination, "utf8");
  options.report.provenance.git.commit = "new-commit";
  await fs.writeFile(options.reportPath, JSON.stringify(options.report));
  const replaced = await saveBaseline({ ...options, replace: true });
  assert.equal(await fs.readFile(replaced.archivePath, "utf8"), previous);
  const latest = JSON.parse(await fs.readFile(replaced.destination, "utf8"));
  assert.equal(latest.report.provenance.git.commit, "new-commit");
  const again = await saveBaseline({ ...options, replace: true });
  assert.notEqual(replaced.archivePath, again.archivePath);
});

test("old, incomplete, mismatched or unsafe reports cannot become baselines", async (t) => {
  const options = await setup(t);
  for (const report of [
    { ...options.report, schemaVersion: 1 },
    { ...options.report, provenance: undefined },
    { ...options.report, samples: [] },
    { ...options.report, id: "search/another-scenario" },
  ]) {
    await fs.writeFile(options.reportPath, JSON.stringify(report));
    await assert.rejects(saveBaseline(options));
  }
  await assert.rejects(
    saveBaseline({ ...options, id: "../../escape" }),
    /Invalid scenario/,
  );
  await assert.rejects(fs.stat(options.directory), { code: "ENOENT" });
});

test("concurrent saves never silently replace a baseline", async (t) => {
  const options = await setup(t);
  const results = await Promise.allSettled([
    saveBaseline(options),
    saveBaseline(options),
  ]);
  assert.equal(
    results.filter((result) => result.status === "fulfilled").length,
    1,
  );
  assert.equal(
    results.filter((result) => result.status === "rejected").length,
    1,
  );
});

test("distinct slash and hyphen scenario ids have distinct destinations", async (t) => {
  const options = await setup(t);
  const destinations = [];
  for (const id of ["search/a-b", "search-a/b"]) {
    await fs.writeFile(
      options.reportPath,
      JSON.stringify({ ...options.report, id }),
    );
    const saved = await saveBaseline({ ...options, id });
    destinations.push(saved.destination);
  }
  assert.notEqual(destinations[0], destinations[1]);
});
