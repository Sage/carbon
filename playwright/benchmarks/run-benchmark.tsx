import React from "react";
import type { Locator, Page, TestInfo } from "@playwright/test";
import type { MountResult } from "@playwright/experimental-ct-react";
import fs from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";
import benchmarkConfig from "./benchmark.config";
import type { BenchmarkDefinition } from "./define-benchmark";
import ProfiledBenchmark from "./profiled-benchmark";
import type { ProfileCommit, ProfileSample } from "./profiler.types";

const runnerPhases = [
  "preparation",
  "settleAndStart",
  "action",
  "completion",
  "settleAndStop",
  "verification",
] as const;
type RunnerPhase = (typeof runnerPhases)[number];

interface RunnerIterationTiming {
  iteration: number;
  warmup: boolean;
  totalMs: number;
  phasesMs: Record<RunnerPhase, number>;
}

const statistics = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return {
    min: sorted[0],
    median:
      sorted.length % 2
        ? sorted[middle]
        : (sorted[middle - 1] + sorted[middle]) / 2,
    mean: sorted.reduce((total, value) => total + value, 0) / sorted.length,
    max: sorted[sorted.length - 1],
  };
};

// Drain immediate frame-driven positioning updates. This is not a paint guarantee
// or a general async-idle detector: complete must await scenario-specific work.
const settleAndCollect = (collector: Locator, operation: "start" | "stop") =>
  collector.evaluate(async (element, collectorOperation) => {
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          // Run after the frame's remaining callbacks, as the former separate
          // browser call did. Avoid starting/stopping midway through that frame.
          setTimeout(resolve, 0);
        }),
      );
    });

    const result = element as HTMLOutputElement;
    if (collectorOperation === "start") {
      result.dataset.commits = "[]";
      result.dataset.active = "true";
      return [];
    }

    result.dataset.active = "false";
    return JSON.parse(result.dataset.commits ?? "[]") as ProfileCommit[];
  }, operation);

const runBenchmark = async (
  definition: BenchmarkDefinition,
  fixtures: {
    page: Page;
    mount: (element: React.ReactElement) => Promise<MountResult>;
  },
  testInfo: TestInfo,
) => {
  const runnerStartedAt = performance.now();
  const { page, mount } = fixtures;
  const component = await mount(
    <ProfiledBenchmark>{definition.fixture}</ProfiledBenchmark>,
  );
  const mountMs = performance.now() - runnerStartedAt;
  const context = { component, page };
  const collector = page.locator("[data-benchmark-profile]");
  const samples: ProfileSample[] = [];
  const iterationTimings: RunnerIterationTiming[] = [];

  try {
    if ((await collector.getAttribute("data-ready")) !== "true") {
      throw new Error(
        "React Profiler is inactive. Use development React or a production profiling build.",
      );
    }
    for (
      let iteration = 0;
      iteration < benchmarkConfig.warmups + benchmarkConfig.samples;
      iteration += 1
    ) {
      const iterationStartedAt = performance.now();
      const phasesMs = Object.fromEntries(
        runnerPhases.map((phase) => [phase, 0]),
      ) as Record<RunnerPhase, number>;
      const timeStep = async <T,>(
        phase: RunnerPhase,
        step: () => Promise<T>,
      ) => {
        const startedAt = performance.now();
        const value = await step();
        phasesMs[phase] = performance.now() - startedAt;
        return value;
      };

      const { prepare } = definition;
      if (prepare) {
        await timeStep("preparation", () => prepare(context));
      }
      await timeStep("settleAndStart", () =>
        settleAndCollect(collector, "start"),
      );

      await timeStep("action", () => definition.action(context));
      await timeStep("completion", () => definition.complete(context));
      const commits = await timeStep("settleAndStop", () =>
        settleAndCollect(collector, "stop"),
      );
      const { verify } = definition;
      if (verify) {
        await timeStep("verification", () => verify(context));
      }
      iterationTimings.push({
        iteration: iteration + 1,
        warmup: iteration < benchmarkConfig.warmups,
        totalMs: performance.now() - iterationStartedAt,
        phasesMs,
      });

      if (iteration >= benchmarkConfig.warmups) {
        samples.push({
          commitCount: commits.length,
          actualDurationMs: commits.reduce(
            (total, commit) => total + commit.actualDurationMs,
            0,
          ),
          commits,
        });
      }
    }

    const metadataStartedAt = performance.now();
    const environment = {
      browserVersion: page.context().browser()?.version(),
      ...(await page.evaluate(() => ({
        userAgent: navigator.userAgent,
        hardwareConcurrency: navigator.hardwareConcurrency,
        viewport: { width: innerWidth, height: innerHeight },
      }))),
    };
    const metadataMs = performance.now() - metadataStartedAt;
    const reportingStartedAt = performance.now();
    const report = {
      schemaVersion: 1,
      id: definition.id,
      generatedAt: new Date().toISOString(),
      configuration: {
        samples: benchmarkConfig.samples,
        warmups: benchmarkConfig.warmups,
        buildMode: "production-profiling",
        strictMode: false,
        collector: "react-profiler",
        boundary:
          "after preparation through completion plus two animation frames",
      },
      environment,
      summary: {
        commitCount: statistics(samples.map((sample) => sample.commitCount)),
        actualDurationMs: statistics(
          samples.map((sample) => sample.actualDurationMs),
        ),
      },
      samples,
    };
    const outputPath = path.resolve(
      benchmarkConfig.outputDirectory,
      `${definition.id.replaceAll("/", "--")}.json`,
    );
    const body = JSON.stringify(report, null, 2);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, `${body}\n`, "utf8");
    await testInfo.attach(definition.id, {
      body: Buffer.from(body),
      contentType: "application/json",
    });
    const reportingMs = performance.now() - reportingStartedAt;
    const runnerTiming = {
      schemaVersion: 2,
      id: definition.id,
      generatedAt: report.generatedAt,
      clock: "node-performance",
      configuration: {
        ...report.configuration,
        collectorBrowserCallsPerIteration: 2,
        settlingFramesPerBoundary: 2,
      },
      mountMs,
      metadataMs,
      reportingMs,
      totalBeforeDiagnosticsMs: performance.now() - runnerStartedAt,
      summary: Object.fromEntries(
        runnerPhases.map((phase) => {
          const values = iterationTimings.map(
            (timing) => timing.phasesMs[phase],
          );
          return [
            phase,
            {
              totalMs: values.reduce((total, value) => total + value, 0),
              ...statistics(values),
            },
          ];
        }),
      ),
      iterations: iterationTimings,
    };
    // Persist diagnostic timings after the component report, so reportingMs can
    // include that report's serialization, file write, and Playwright attachment.
    const timingPath = path.join(
      path.dirname(outputPath),
      "runner-timings",
      path.basename(outputPath),
    );
    const timingBody = JSON.stringify(runnerTiming, null, 2);
    await fs.mkdir(path.dirname(timingPath), { recursive: true });
    await fs.writeFile(timingPath, `${timingBody}\n`, "utf8");
    await testInfo.attach(`${definition.id}/runner-timing`, {
      body: Buffer.from(timingBody),
      contentType: "application/json",
    });
    // eslint-disable-next-line no-console
    console.log(
      `${definition.id}: median ${report.summary.commitCount.median} commits, ` +
        `${report.summary.actualDurationMs.median.toFixed(3)} ms React render duration. Report: ${outputPath}`,
    );
    // eslint-disable-next-line no-console
    console.table(
      runnerPhases.map((phase) => ({
        phase,
        totalMs: Math.round(runnerTiming.summary[phase].totalMs),
        medianMs: Number(runnerTiming.summary[phase].median.toFixed(2)),
      })),
    );
    return report;
  } finally {
    await component.unmount();
  }
};

export default runBenchmark;
