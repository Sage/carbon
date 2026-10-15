import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { randomUUID } from "node:crypto";
import { execFileSync, spawn } from "node:child_process";
import { createServer } from "node:net";
import compareReports, { formatComparison } from "./compare-reports.mjs";
import writeHtmlReport from "./html-report.mjs";

const availablePort = () =>
  new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, () => {
      const { port } = server.address();
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });

export const runCommand = (command, args, options) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", ...options });
    const interrupt = () => child.kill("SIGINT");
    const terminate = () => child.kill("SIGTERM");
    process.once("SIGINT", interrupt);
    process.once("SIGTERM", terminate);
    const cleanup = () => {
      process.removeListener("SIGINT", interrupt);
      process.removeListener("SIGTERM", terminate);
    };
    child.once("error", (error) => {
      cleanup();
      reject(error);
    });
    child.once("exit", (code, signal) => {
      cleanup();
      if (code === 0) resolve();
      else
        reject(
          new Error(`${command} ${args.join(" ")} failed (${signal ?? code}).`),
        );
    });
  });

export default async function compareWorkflow({
  root,
  base,
  fetch = false,
  grep,
  samples = 30,
  warmups = 5,
  directory = path.join(root, "playwright/benchmark-results/comparisons"),
  run = runCommand,
  allocatePort = availablePort,
}) {
  if (!base || base.startsWith("-"))
    throw new Error(
      "Provide a base Git reference, for example --base origin/master.",
    );
  if (
    !Number.isInteger(samples) ||
    samples < 1 ||
    !Number.isInteger(warmups) ||
    warmups < 0
  ) {
    throw new Error(
      "Samples must be an integer >= 1 and warmups an integer >= 0.",
    );
  }
  const git = (...args) =>
    execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  if (fetch) {
    const match = /^([^/]+)\/(.+)$/.exec(base);
    if (
      !match ||
      !git("remote").split("\n").includes(match[1]) ||
      match[2].startsWith("-")
    ) {
      throw new Error(
        "--fetch requires a remote branch reference such as origin/master.",
      );
    }
    await run("git", ["fetch", "--no-tags", match[1], match[2]], { cwd: root });
  }
  const baseCommit = git(
    "rev-parse",
    "--verify",
    "--end-of-options",
    `${base}^{commit}`,
  );
  const runDirectory = path.resolve(
    directory,
    `${new Date().toISOString().replaceAll(":", "-")}-${randomUUID()}`,
  );
  await fs.mkdir(runDirectory, { recursive: true });
  const temporaryRoot = await fs.mkdtemp(
    path.join(os.tmpdir(), "carbon-benchmark-base-"),
  );
  const worktree = path.join(temporaryRoot, "checkout");
  const manifest = {
    schemaVersion: 1,
    status: "running",
    baseReference: base,
    baseCommit,
    candidateCommit: git("rev-parse", "HEAD"),
    candidateDirty: git("status", "--porcelain").length > 0,
    harness:
      "current checkout's benchmark fixtures, runner and configuration on both sides",
    configuration: {
      samples,
      warmups,
      grep: grep ?? null,
      order: "base then candidate",
    },
    baseDirectory: path.join(runDirectory, "base"),
    candidateDirectory: path.join(runDirectory, "candidate"),
  };
  const writeManifest = () =>
    fs.writeFile(
      path.join(runDirectory, "workflow.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );
  let worktreeCreated = false;
  try {
    await writeManifest();
    process.stdout.write(
      `Comparison reports: ${runDirectory}\nPreparing base ${base} (${baseCommit}).\n`,
    );
    // Catch missing candidate dependencies or an empty filter before paying for
    // the temporary base's dependency installation.
    const listingArgs = [
      path.join(root, "node_modules/@playwright/experimental-ct-react/cli.js"),
      "test",
      "-c",
      "playwright-benchmark.config.ts",
      "--list",
    ];
    if (grep) listingArgs.push("--grep", grep);
    await run(process.execPath, listingArgs, { cwd: root });
    await run("git", ["worktree", "add", "--detach", worktree, baseCommit], {
      cwd: root,
      env: { ...process.env, HUSKY: "0" },
    });
    worktreeCreated = true;
    // Instrumentation is copied, component code and dependency manifests stay at base.
    for (const relative of [
      "playwright/benchmarks",
      "playwright-benchmark.config.ts",
      "scripts/benchmarks/collect-metadata.mjs",
    ]) {
      const destination = path.join(worktree, relative);
      await fs.rm(destination, { recursive: true, force: true });
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.cp(path.join(root, relative), destination, { recursive: true });
    }
    const npm = process.platform === "win32" ? "npm.cmd" : "npm";
    await run(npm, ["ci"], {
      cwd: worktree,
      env: { ...process.env, HUSKY: "0" },
    });
    for (const [label, checkout, output] of [
      ["base", worktree, manifest.baseDirectory],
      ["candidate", root, manifest.candidateDirectory],
    ]) {
      process.stdout.write(`Running ${label} benchmarks.\n`);
      const env = {
        ...process.env,
        BENCHMARK_OUTPUT_DIR: output,
        BENCHMARK_SAMPLES: String(samples),
        BENCHMARK_WARMUPS: String(warmups),
        // Playwright otherwise reuses any server already listening on ctPort.
        BENCHMARK_CT_PORT: String(await allocatePort()),
      };
      await run(npm, ["run", "generate-tokens"], { cwd: checkout, env });
      const args = [
        path.join(
          checkout,
          "node_modules/@playwright/experimental-ct-react/cli.js",
        ),
        "test",
        "-c",
        "playwright-benchmark.config.ts",
      ];
      if (grep) args.push("--grep", grep);
      await run(process.execPath, args, { cwd: checkout, env });
    }
    const scenarios = await compareReports(
      manifest.baseDirectory,
      manifest.candidateDirectory,
    );
    const comparison = {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      ...manifest,
      status: "complete",
      scenarios,
    };
    await fs.writeFile(
      path.join(runDirectory, "comparison.json"),
      `${JSON.stringify(comparison, null, 2)}\n`,
    );
    const text = formatComparison(scenarios);
    await fs.writeFile(path.join(runDirectory, "comparison.txt"), text);
    const htmlPath = await writeHtmlReport(runDirectory);
    process.stdout.write(text);
    process.stdout.write(`HTML comparison report: ${htmlPath}\n`);
    manifest.status = "complete";
    return { runDirectory, comparison };
  } catch (error) {
    manifest.status = "failed";
    manifest.error = error.message;
    throw new Error(
      `${error.message}\nPartial reports retained: ${runDirectory}`,
    );
  } finally {
    try {
      await writeManifest();
    } finally {
      // Checkout hooks can fail after Git has already registered the worktree.
      if (!worktreeCreated) {
        try {
          await fs.access(path.join(worktree, ".git"));
          worktreeCreated = true;
        } catch (error) {
          if (error.code !== "ENOENT") throw error;
        }
      }
      if (worktreeCreated) {
        // Only remove this command's detached temporary worktree. If Git fails,
        // leave its directory intact and explain where manual cleanup is needed.
        try {
          await run("git", ["worktree", "remove", "--force", worktree], {
            cwd: root,
          });
        } catch (error) {
          throw new Error(
            `Temporary worktree cleanup failed: ${worktree}. ${error.message}`,
          );
        }
      }
      await fs.rm(temporaryRoot, { recursive: true, force: true });
    }
  }
}
