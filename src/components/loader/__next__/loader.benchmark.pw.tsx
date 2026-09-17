/* eslint-disable playwright/expect-expect, playwright/no-skipped-test, playwright/no-wait-for-timeout -- this opt-in file records measurements rather than asserting time-sensitive thresholds */
import React from "react";
import { test } from "@playwright/experimental-ct-react";

import { LoaderProps } from ".";
import LoaderBenchmarkFixture from "./loader-benchmark.fixture";

const COUNTS = [1, 25, 100];
const REPEATS = 3;
const SAMPLE_TIME_MS = 2000;
const WARM_UP_MS = 750;

interface BenchmarkSample {
  framesPerSecond: number;
  longFrames: number;
  taskTimeMs: number;
  scriptTimeMs: number;
  layoutTimeMs: number;
  styleTimeMs: number;
  layoutCount: number;
  styleRecalcCount: number;
  paintTimeMs: number;
  compositeTimeMs: number;
  domNodes: number;
  jsHeapUsedBytes: number;
}

const scenarios: Array<{
  name: string;
  loaderType: LoaderProps["loaderType"];
  variant?: LoaderProps["variant"];
}> = [
  { name: "standalone-typical", loaderType: "standalone", variant: "typical" },
  { name: "standalone-ai", loaderType: "standalone", variant: "ai" },
  { name: "ring-typical", loaderType: "ring", variant: "stacked" },
  { name: "ring-ai", loaderType: "ring", variant: "ai-stacked" },
  { name: "sparkle", loaderType: "star" },
];

const median = (values: number[]) => {
  const sorted = [...values].sort((first, second) => first - second);
  return sorted[Math.floor(sorted.length / 2)];
};

test.skip(
  process.env.LOADER_BENCHMARK !== "true",
  "Run explicitly with `npm run benchmark:loader`.",
);

test("profiles animated loader batches", async ({ mount, page }, testInfo) => {
  test.setTimeout(180_000);
  await page.setViewportSize({ width: 1366, height: 768 });

  const client = await page.context().newCDPSession(page);
  await client.send("Performance.enable");
  const results = [];

  for (const scenario of scenarios) {
    for (const count of COUNTS) {
      const samples: BenchmarkSample[] = [];

      for (let repeat = 0; repeat < REPEATS; repeat += 1) {
        const component = await mount(
          <LoaderBenchmarkFixture
            count={count}
            loaderType={scenario.loaderType}
            variant={scenario.variant}
          />,
        );
        await page.waitForTimeout(WARM_UP_MS);

        const traceEvents: Array<{ name: string; dur?: number }> = [];
        const collectTraceEvents = ({
          value,
        }: {
          value: Record<string, string>[];
        }) =>
          traceEvents.push(
            ...value.map(({ name, dur }) => ({
              name,
              ...(dur !== undefined && { dur: Number(dur) }),
            })),
          );
        client.on("Tracing.dataCollected", collectTraceEvents);
        await client.send("Tracing.start", {
          categories: "devtools.timeline,disabled-by-default-devtools.timeline",
          options: "sampling-frequency=10000",
        });

        await client.send("HeapProfiler.collectGarbage");
        const before = await client.send("Performance.getMetrics");
        const frameSample = await page.evaluate(
          (sampleTime) =>
            new Promise<{ frames: number; longFrames: number }>((resolve) => {
              let frames = 0;
              let longFrames = 0;
              let previous = performance.now();
              const started = previous;

              const recordFrame = (now: number) => {
                frames += 1;
                if (now - previous > 25) longFrames += 1;
                previous = now;

                if (now - started >= sampleTime) {
                  resolve({ frames, longFrames });
                } else {
                  requestAnimationFrame(recordFrame);
                }
              };

              requestAnimationFrame(recordFrame);
            }),
          SAMPLE_TIME_MS,
        );
        await client.send("HeapProfiler.collectGarbage");
        const after = await client.send("Performance.getMetrics");
        const domNodes = await page
          .getByTestId("loader-benchmark-batch")
          .evaluate((batch) => batch.querySelectorAll("*").length + 1);

        const tracingComplete = new Promise<void>((resolve) => {
          client.once("Tracing.tracingComplete", () => resolve());
        });
        await client.send("Tracing.end");
        await tracingComplete;

        const beforeMetrics = Object.fromEntries(
          before.metrics.map(({ name, value }) => [name, value]),
        );
        const afterMetrics = Object.fromEntries(
          after.metrics.map(({ name, value }) => [name, value]),
        );
        const durationDelta = (name: string) =>
          (afterMetrics[name] ?? 0) - (beforeMetrics[name] ?? 0);
        const traceDuration = (names: string[]) =>
          traceEvents
            .filter(({ name }) => names.includes(name))
            .reduce((total, { dur = 0 }) => total + dur, 0) / 1000;

        samples.push({
          framesPerSecond: frameSample.frames / (SAMPLE_TIME_MS / 1000),
          longFrames: frameSample.longFrames,
          taskTimeMs: durationDelta("TaskDuration") * 1000,
          scriptTimeMs: durationDelta("ScriptDuration") * 1000,
          layoutTimeMs: durationDelta("LayoutDuration") * 1000,
          styleTimeMs: durationDelta("RecalcStyleDuration") * 1000,
          layoutCount: durationDelta("LayoutCount"),
          styleRecalcCount: durationDelta("RecalcStyleCount"),
          paintTimeMs: traceDuration(["Paint", "PaintImage"]),
          compositeTimeMs: traceDuration([
            "CompositeLayers",
            "RasterTask",
            "UpdateLayerTree",
          ]),
          domNodes,
          jsHeapUsedBytes: afterMetrics.JSHeapUsedSize ?? 0,
        });

        client.removeListener("Tracing.dataCollected", collectTraceEvents);
        await component.unmount();
      }

      const metricNames = Object.keys(samples[0]) as Array<
        keyof (typeof samples)[0]
      >;
      results.push({
        scenario: scenario.name,
        count,
        samples,
        median: Object.fromEntries(
          metricNames.map((name) => [
            name,
            median(samples.map((sample) => sample[name])),
          ]),
        ),
      });
    }
  }

  const browserVersion = await page.evaluate(() => navigator.userAgent);
  const benchmarkReport = {
    browserVersion,
    viewport: { width: 1366, height: 768 },
    warmUpMs: WARM_UP_MS,
    sampleTimeMs: SAMPLE_TIME_MS,
    repeats: REPEATS,
    results,
  };

  process.stdout.write(
    `\nLOADER_BENCHMARK_MEDIANS=${JSON.stringify(
      results.map(({ scenario, count, median: medianValues }) => ({
        scenario,
        count,
        median: medianValues,
      })),
    )}\n`,
  );
  await testInfo.attach("loader-benchmark.json", {
    body: JSON.stringify(benchmarkReport, null, 2),
    contentType: "application/json",
  });
});
