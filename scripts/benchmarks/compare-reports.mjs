import fs from "node:fs/promises";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { validateReport } from "./save-baseline.mjs";

export const readReports = async (directory) => {
  const reports = new Map();
  for (const file of await fs.readdir(directory)) {
    if (!file.endsWith(".json")) continue;
    const report = JSON.parse(
      await fs.readFile(path.join(directory, file), "utf8"),
    );
    validateReport(report, report.id);
    if (reports.has(report.id))
      throw new Error(`Duplicate report for ${report.id}.`);
    reports.set(report.id, report);
  }
  if (!reports.size)
    throw new Error(`No scenario reports found in ${directory}.`);
  return reports;
};

const difference = (base, candidate) => ({
  base,
  candidate,
  change: candidate - base,
  percentChange: base === 0 ? null : ((candidate - base) / base) * 100,
});

export const compareScenario = (base, candidate) => {
  validateReport(base, base.id);
  validateReport(candidate, base.id);
  const warnings = [];
  const check = (label, first, second) => {
    if (!isDeepStrictEqual(first, second))
      warnings.push(`${label} differs between runs.`);
  };
  check(
    "Scenario/fixture source",
    base.provenance.scenario.fingerprint,
    candidate.provenance.scenario.fingerprint,
  );
  check(
    "Measurement configuration",
    base.configuration,
    candidate.configuration,
  );
  check(
    "Browser version",
    base.environment.browserVersion,
    candidate.environment.browserVersion,
  );
  check("Viewport", base.environment.viewport, candidate.environment.viewport);
  check("Host", base.provenance.host, candidate.provenance.host);
  check(
    "Hardware concurrency",
    base.environment.hardwareConcurrency,
    candidate.environment.hardwareConcurrency,
  );
  const compatible = warnings.length === 0;
  check(
    "Dependency versions",
    base.provenance.dependencies,
    candidate.provenance.dependencies,
  );
  return {
    id: base.id,
    compatible,
    warnings,
    commitCount: difference(
      base.summary.commitCount.median,
      candidate.summary.commitCount.median,
    ),
    actualDurationMs: difference(
      base.summary.actualDurationMs.median,
      candidate.summary.actualDurationMs.median,
    ),
    baseCommit: base.provenance.git.commit,
    candidateCommit: candidate.provenance.git.commit,
  };
};

export default async function compareReports(
  baseDirectory,
  candidateDirectory,
) {
  const base = await readReports(baseDirectory);
  const candidate = await readReports(candidateDirectory);
  if (
    JSON.stringify([...base.keys()].sort()) !==
    JSON.stringify([...candidate.keys()].sort())
  ) {
    throw new Error(
      "Base and candidate runs produced different scenario sets; comparison is incomplete.",
    );
  }
  return [...base.keys()]
    .sort()
    .map((id) => compareScenario(base.get(id), candidate.get(id)));
}

export const formatComparison = (scenarios) => {
  const rows = scenarios.map((scenario) => {
    const timing = scenario.actualDurationMs;
    const percent =
      timing.percentChange === null
        ? "n/a"
        : `${timing.percentChange.toFixed(1)}%`;
    return (
      `${scenario.id}: commits ${scenario.commitCount.base} -> ${scenario.commitCount.candidate}; ` +
      `React render median ${timing.base.toFixed(3)} -> ${timing.candidate.toFixed(3)} ms (${percent})` +
      (scenario.compatible ? "" : " [configuration/workload mismatch]") +
      scenario.warnings.map((warning) => `\n  Warning: ${warning}`).join("")
    );
  });
  return `${rows.join("\n")}\nTimings are descriptive medians from sequential runs, without significance testing or performance budgets.\n`;
};
