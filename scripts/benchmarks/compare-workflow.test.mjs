import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import test from "node:test";
import compareWorkflow from "./compare-workflow.mjs";
import report from "./comparison-test-fixture.mjs";

const setup = async (t) => {
  const root = await fs.mkdtemp(
    path.join(os.tmpdir(), "carbon-compare-workflow-"),
  );
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  git("init", "--quiet");
  await fs.mkdir(path.join(root, "src"));
  await fs.writeFile(path.join(root, "src/component.txt"), "1");
  git("add", "src/component.txt");
  git(
    "-c",
    "user.name=Benchmark Test",
    "-c",
    "user.email=benchmark@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--quiet",
    "-m",
    "Base component",
  );
  await fs.writeFile(path.join(root, "src/component.txt"), "2");
  await fs.mkdir(path.join(root, "playwright/benchmarks"), { recursive: true });
  await fs.writeFile(
    path.join(root, "playwright/benchmarks/fixture.tsx"),
    "current harness",
  );
  await fs.writeFile(
    path.join(root, "playwright-benchmark.config.ts"),
    "current configuration",
  );
  await fs.mkdir(path.join(root, "scripts/benchmarks"), { recursive: true });
  await fs.writeFile(
    path.join(root, "scripts/benchmarks/collect-metadata.mjs"),
    "current metadata collector",
  );
  const installs = [];
  const run = async (command, args, options) => {
    if (command === "git") {
      if (args[0] === "worktree" && args[1] === "add") {
        assert.equal(options.env.HUSKY, "0");
      }
      execFileSync(command, args, {
        cwd: options.cwd,
        env: options.env,
        stdio: "pipe",
      });
    } else if (args[0] === "ci") {
      installs.push(options.cwd);
    } else if (args[1] === "test") {
      if (args.includes("--list")) return;
      assert.equal(options.env.BENCHMARK_CT_PORT, "34567");
      assert.equal(
        await fs.readFile(
          path.join(options.cwd, "playwright/benchmarks/fixture.tsx"),
          "utf8",
        ),
        "current harness",
      );
      const value = Number(
        await fs.readFile(path.join(options.cwd, "src/component.txt"), "utf8"),
      );
      await fs.mkdir(options.env.BENCHMARK_OUTPUT_DIR, { recursive: true });
      await fs.writeFile(
        path.join(options.env.BENCHMARK_OUTPUT_DIR, "open.json"),
        JSON.stringify(report(value, value)),
      );
    }
  };
  return { root, git, run, installs, allocatePort: async () => 34567 };
};

test("workflow uses base component code with current fixtures, preserves candidate edits and cleans its worktree", async (t) => {
  const fixture = await setup(t);
  const branch = fixture.git("symbolic-ref", "HEAD");
  const result = await compareWorkflow({
    ...fixture,
    base: "HEAD",
    samples: 1,
    warmups: 0,
  });
  assert.equal(result.comparison.scenarios[0].commitCount.base, 1);
  assert.equal(result.comparison.scenarios[0].commitCount.candidate, 2);
  assert.match(
    await fs.readFile(
      path.join(result.runDirectory, "comparison.html"),
      "utf8",
    ),
    /Component benchmark comparison/,
  );
  assert.equal(fixture.installs.length, 1);
  assert.notEqual(fixture.installs[0], fixture.root);
  assert.equal(fixture.git("symbolic-ref", "HEAD"), branch);
  assert.equal(
    await fs.readFile(path.join(fixture.root, "src/component.txt"), "utf8"),
    "2",
  );
  assert.equal(
    fixture.git("worktree", "list", "--porcelain").split("worktree ").length -
      1,
    1,
  );
});

test("an invalid candidate filter fails before installing base dependencies", async (t) => {
  const fixture = await setup(t);
  await assert.rejects(
    compareWorkflow({
      ...fixture,
      base: "HEAD",
      grep: "no matching tests",
      run: async (command, args, options) => {
        if (args.includes("--list")) throw new Error("No tests found");
        await fixture.run(command, args, options);
      },
    }),
    /No tests found/,
  );
  assert.equal(fixture.installs.length, 0);
  assert.equal(
    fixture.git("worktree", "list", "--porcelain").split("worktree ").length -
      1,
    1,
  );
});

test("failed checkout after worktree creation still cleans the Git registration", async (t) => {
  const fixture = await setup(t);
  await assert.rejects(
    compareWorkflow({
      ...fixture,
      base: "HEAD",
      run: async (command, args, options) => {
        await fixture.run(command, args, options);
        if (args[0] === "worktree" && args[1] === "add") {
          throw new Error("checkout hook failed after creation");
        }
      },
    }),
    /checkout hook failed/,
  );
  assert.equal(
    fixture.git("worktree", "list", "--porcelain").split("worktree ").length -
      1,
    1,
  );
});

test("dependency installation failure retains diagnostics and still removes the temporary worktree", async (t) => {
  const fixture = await setup(t);
  await assert.rejects(
    compareWorkflow({
      ...fixture,
      base: "HEAD",
      run: async (command, args, options) => {
        if (args[0] === "ci") throw new Error("installation failed");
        await fixture.run(command, args, options);
      },
    }),
    /installation failed.*\nPartial reports retained/,
  );
  const directory = path.join(
    fixture.root,
    "playwright/benchmark-results/comparisons",
  );
  const [runDirectory] = await fs.readdir(directory);
  const manifest = JSON.parse(
    await fs.readFile(
      path.join(directory, runDirectory, "workflow.json"),
      "utf8",
    ),
  );
  assert.equal(manifest.status, "failed");
  assert.equal(
    fixture.git("worktree", "list", "--porcelain").split("worktree ").length -
      1,
    1,
  );
});
