import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

export const digestFiles = async (root, files) => {
  const hash = createHash("sha256");
  for (const file of [...new Set(files)].sort()) {
    hash.update(path.relative(root, file).split(path.sep).join("/"));
    hash.update("\0");
    hash.update(await fs.readFile(file));
    hash.update("\0");
  }
  return hash.digest("hex");
};

const benchmarkSources = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) return benchmarkSources(file);
      return /\.(?:tsx?|mjs)$/.test(entry.name) ? [file] : [];
    }),
  );
  return files.flat();
};

export default async function collectMetadata({
  root,
  testFile,
  cacheDirectory,
}) {
  const git = (...args) =>
    execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  const manifest = JSON.parse(
    await fs.readFile(path.join(cacheDirectory, "metainfo.json"), "utf8"),
  );
  const localBuildSources = Object.keys(manifest.sources).filter((file) => {
    const relative = path.relative(root, file);
    return (
      !relative.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relative) &&
      !relative.split(path.sep).includes("node_modules")
    );
  });
  const scenarioSources = await benchmarkSources(
    path.join(root, "playwright/benchmarks"),
  );
  const dependencyVersions = {};
  for (const name of [
    "react",
    "react-dom",
    "@playwright/experimental-ct-react",
    "@sage/design-tokens",
    "@sage/design-tokens-fusion",
  ]) {
    const installed = JSON.parse(
      await fs.readFile(
        path.join(root, "node_modules", name, "package.json"),
        "utf8",
      ),
    );
    dependencyVersions[name] = installed.version;
  }

  return {
    git: {
      commit: git("rev-parse", "HEAD"),
      dirty: git("status", "--porcelain").length > 0,
    },
    scenario: {
      sourceFile: path.relative(root, testFile).split(path.sep).join("/"),
      fingerprint: await digestFiles(root, [...scenarioSources, testFile]),
      fingerprintScope:
        "benchmark suite source files, including fixtures and workloads",
    },
    build: {
      fingerprint: await digestFiles(root, [
        ...localBuildSources,
        ...scenarioSources,
        testFile,
        path.join(root, "playwright-benchmark.config.ts"),
        path.join(root, "package-lock.json"),
      ]),
      fingerprintScope:
        "local browser build inputs, benchmark sources, configuration and lockfile",
    },
    dependencies: dependencyVersions,
    host: {
      platform: os.platform(),
      release: os.release(),
      architecture: os.arch(),
      cpuModel: os.cpus()[0]?.model ?? "unknown",
      nodeVersion: process.version,
    },
  };
}
