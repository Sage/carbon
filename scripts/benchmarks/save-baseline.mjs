import fs from "node:fs/promises";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";

export const validateReport = (report, id) => {
  if (!/^[a-z0-9]+(?:[/-][a-z0-9]+)*$/.test(id)) {
    throw new Error(
      "Invalid scenario id; use lowercase words separated by / or -.",
    );
  }
  if (report.id !== id)
    throw new Error(`Report belongs to ${report.id}, not ${id}.`);
  if (
    report.schemaVersion !== 2 ||
    !report.provenance?.git?.commit ||
    !report.provenance?.scenario?.fingerprint ||
    !report.provenance?.build?.fingerprint ||
    !report.provenance?.dependencies?.["@sage/design-tokens-fusion"]
  ) {
    throw new Error(
      "Report is missing baseline provenance. Run the benchmark again with the current runner.",
    );
  }
  const { configuration, samples, summary, environment } = report;
  if (
    !Number.isInteger(configuration?.samples) ||
    configuration.samples < 1 ||
    !Array.isArray(samples) ||
    samples.length !== configuration.samples ||
    !environment?.browserVersion ||
    !summary?.commitCount ||
    !summary?.actualDurationMs ||
    samples.some(
      (sample) =>
        !Number.isInteger(sample.commitCount) ||
        sample.commitCount < 0 ||
        !Number.isFinite(sample.actualDurationMs) ||
        sample.actualDurationMs < 0 ||
        !Array.isArray(sample.commits) ||
        sample.commits.length !== sample.commitCount,
    )
  ) {
    throw new Error("Report has incomplete or invalid benchmark measurements.");
  }
};

export default async function saveBaseline({
  id,
  reportPath,
  directory,
  replace = false,
}) {
  const reportBody = await fs.readFile(reportPath, "utf8");
  const report = JSON.parse(reportBody);
  validateReport(report, id);
  // Nested scenario paths avoid filename collisions between slashes and hyphens.
  const destination = path.resolve(directory, `${id}.json`);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  const lockPath = `${destination}.lock`;
  let lock;
  try {
    lock = await fs.open(lockPath, "wx");
  } catch (error) {
    if (error.code === "EEXIST")
      throw new Error(`Another save is in progress for ${id}: ${lockPath}`);
    throw error;
  }
  const temporaryPath = `${destination}.${randomUUID()}.tmp`;
  let archivePath;
  try {
    let previous;
    try {
      previous = await fs.readFile(destination, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (previous !== undefined && !replace) {
      throw new Error(
        `Baseline already exists for ${id}. Use --replace to archive it and save this report.`,
      );
    }
    const baseline = {
      schemaVersion: 1,
      savedAt: new Date().toISOString(),
      reportSha256: createHash("sha256").update(reportBody).digest("hex"),
      report,
    };
    await fs.writeFile(
      temporaryPath,
      `${JSON.stringify(baseline, null, 2)}\n`,
      { flag: "wx" },
    );
    if (previous !== undefined) {
      archivePath = path.resolve(
        directory,
        "history",
        `${id}/${Date.now()}-${randomUUID()}.json`,
      );
      await fs.mkdir(path.dirname(archivePath), { recursive: true });
      await fs.writeFile(archivePath, previous, { flag: "wx" });
    }
    await fs.rename(temporaryPath, destination);
    return { destination, archivePath, samples: report.configuration.samples };
  } finally {
    await fs.rm(temporaryPath, { force: true });
    await lock.close();
    await fs.unlink(lockPath);
  }
}
