import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { compareScenario } from "./compare-reports.mjs";
import report from "./comparison-test-fixture.mjs";
import writeHtmlReport, { buildHtmlReport } from "./html-report.mjs";

const example = () => {
  const base = report(1, 2);
  const candidate = report(2, 3);
  return {
    comparison: {
      schemaVersion: 1,
      status: "complete",
      baseReference: "origin/master",
      baseCommit: "old-commit",
      candidateCommit: "new-commit",
      candidateDirty: true,
      generatedAt: "2026-10-13T10:00:00Z",
      scenarios: [compareScenario(base, candidate)],
    },
    base: new Map([[base.id, base]]),
    candidate: new Map([[candidate.id, candidate]]),
  };
};

test("HTML includes side-by-side results, raw samples, metadata and review warnings", () => {
  const data = example();
  data.candidate.get("component/open").environment.browserVersion = "141";
  data.comparison.scenarios = [
    compareScenario(
      data.base.get("component/open"),
      data.candidate.get("component/open"),
    ),
  ];
  const html = buildHtmlReport(data.comparison, data.base, data.candidate);
  assert.match(html, /component\/open/);
  assert.match(html, /2\.000 → 3\.000/);
  assert.match(html, /\+1\.000 \(\+50\.0%\)/);
  assert.match(html, /Browser version differs/);
  assert.match(html, /Raw React commits/);
  assert.match(html, /Run metadata and dependency versions/);
  assert.match(html, /sample 1: 2\.000 ms/);
  assert.doesNotMatch(html, /<script[^>]+src=|<link[^>]+href=/);
});

test("untrusted metadata is rendered as text, including closing-script strings", () => {
  const data = example();
  const injection = '</script><img src=x onerror="alert(1)">';
  data.comparison.baseReference = injection;
  data.base.get("component/open").provenance.host.cpuModel = injection;
  const html = buildHtmlReport(data.comparison, data.base, data.candidate);
  assert.doesNotMatch(html, /<img src=x/);
  assert.match(html, /&lt;\/script&gt;&lt;img/);
  assert.equal((html.match(/<script>/g) ?? []).length, 1);
});

test("zero-duration samples produce finite chart coordinates and an explicit zero-base percentage", () => {
  const base = report(0, 0);
  const candidate = report(0, 0);
  const data = example();
  data.comparison.scenarios = [compareScenario(base, candidate)];
  const html = buildHtmlReport(
    data.comparison,
    new Map([[base.id, base]]),
    new Map([[candidate.id, candidate]]),
  );
  assert.doesNotMatch(html, /NaN|Infinity/);
  assert.match(html, /percentage unavailable \(base is zero\)/);
});

test("a moved comparison folder regenerates HTML using its relative raw reports", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "carbon-html-report-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const data = example();
  data.comparison.baseDirectory = "/missing/original/location/base";
  data.comparison.candidateDirectory = "/missing/original/location/candidate";
  await fs.writeFile(
    path.join(root, "comparison.json"),
    JSON.stringify(data.comparison),
  );
  for (const [directory, reports] of [
    ["base", data.base],
    ["candidate", data.candidate],
  ]) {
    await fs.mkdir(path.join(root, directory));
    await fs.writeFile(
      path.join(root, directory, "open.json"),
      JSON.stringify(reports.get("component/open")),
    );
  }
  const output = await writeHtmlReport(root);
  assert.match(
    await fs.readFile(output, "utf8"),
    /Component benchmark comparison/,
  );
  await fs.writeFile(
    path.join(root, "candidate", "extra.json"),
    JSON.stringify({ ...report(), id: "component/close" }),
  );
  await assert.rejects(writeHtmlReport(root), /scenario sets differ/);
});
