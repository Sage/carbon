import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import type { Locator } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

import {
  TableSelectionBenchmark,
  TABLE_BENCHMARK_ROW_COUNT,
} from "./components-test.pw";
import type { TableSelectionMeasurement } from "./components-test.pw";

const sampleCount = Number(process.env.TABLE_BENCHMARK_SAMPLES ?? 10);
const warmupCount = Number(process.env.TABLE_BENCHMARK_WARMUPS ?? 2);
const outputPath = path.resolve(
  process.cwd(),
  process.env.TABLE_BENCHMARK_OUTPUT ??
    "playwright/benchmark-results/table-selection.js",
);

type Operation = TableSelectionMeasurement["operation"];
type ComponentName = "table" | "flatTable";

interface Statistics {
  min: number;
  median: number;
  mean: number;
  p95: number;
  max: number;
}

const round = (value: number) => Math.round(value * 1000) / 1000;

const statistics = (values: number[]): Statistics => {
  const sortedValues = [...values].sort((a, b) => a - b);
  const percentile = (percent: number) =>
    sortedValues[Math.ceil((percent / 100) * sortedValues.length) - 1];
  const middle = Math.floor(sortedValues.length / 2);
  const median =
    sortedValues.length % 2 === 0
      ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
      : sortedValues[middle];

  return {
    min: round(sortedValues[0]),
    median: round(median),
    mean: round(
      sortedValues.reduce((total, value) => total + value, 0) /
        sortedValues.length,
    ),
    p95: round(percentile(95)),
    max: round(sortedValues.at(-1) as number),
  };
};

const readMeasurementAfterClick = async (
  result: Locator,
  action: Locator,
): Promise<TableSelectionMeasurement> => {
  const previousSequence = Number(
    (await result.getAttribute("data-sequence")) ?? 0,
  );

  await action.click();
  await expect
    .poll(async () => Number(await result.getAttribute("data-sequence")))
    .toBeGreaterThan(previousSequence);

  return JSON.parse(
    (await result.getAttribute("data-measurement")) as string,
  ) as TableSelectionMeasurement;
};

// eslint-disable-next-line
test("benchmarks selectable Table against FlatTable", async ({
  mount,
  page,
}) => {
  test.skip(
    !Number.isInteger(sampleCount) || sampleCount < 1,
    "TABLE_BENCHMARK_SAMPLES must be a positive integer",
  );
  test.skip(
    !Number.isInteger(warmupCount) || warmupCount < 0,
    "TABLE_BENCHMARK_WARMUPS must be a non-negative integer",
  );

  const rawResults: Record<ComponentName, TableSelectionMeasurement[]> = {
    table: [],
    flatTable: [],
  };
  const mountDurations: Record<ComponentName, number> = {
    table: 0,
    flatTable: 0,
  };

  const measureComponent = async (
    componentName: ComponentName,
    mountedComponent: Locator & { unmount: () => Promise<void> },
  ) => {
    const result = page.locator("[data-benchmark-result]");
    const selectAll = page.locator('[data-benchmark-action="select-all"]');
    const clearAll = page.locator('[data-benchmark-action="clear-all"]');
    const toggleIndividual = page.locator(
      '[data-benchmark-action="toggle-individual"]',
    );

    mountDurations[componentName] = Number(
      await result.getAttribute("data-mount-duration"),
    );

    for (
      let iteration = 0;
      iteration < warmupCount + sampleCount;
      iteration += 1
    ) {
      const measurements = [
        await readMeasurementAfterClick(result, toggleIndividual),
        await readMeasurementAfterClick(result, toggleIndividual),
        await readMeasurementAfterClick(result, selectAll),
        await readMeasurementAfterClick(result, clearAll),
      ];

      if (iteration >= warmupCount) {
        rawResults[componentName].push(...measurements);
      }
    }

    await mountedComponent.unmount();
  };

  await page.evaluate(() => {
    performance.clearMarks("table-benchmark-mount-start");
    performance.mark("table-benchmark-mount-start");
  });
  const tableComponent = await mount(<TableSelectionBenchmark kind="table" />);
  await measureComponent("table", tableComponent);

  await page.evaluate(() => {
    performance.clearMarks("table-benchmark-mount-start");
    performance.mark("table-benchmark-mount-start");
  });
  const flatTableComponent = await mount(
    <TableSelectionBenchmark kind="flat-table" />,
  );
  await measureComponent("flatTable", flatTableComponent);

  const operations: Operation[] = [
    "select-individual",
    "deselect-individual",
    "select-all",
    "clear-all",
  ];
  const summaries = Object.fromEntries(
    (["table", "flatTable"] as const).map((componentName) => [
      componentName,
      {
        mountDurationMs: round(mountDurations[componentName]),
        operations: Object.fromEntries(
          operations.map((operation) => [
            operation,
            statistics(
              rawResults[componentName]
                .filter((result) => result.operation === operation)
                .map((result) => result.settledDurationMs),
            ),
          ]),
        ),
      },
    ]),
  );
  const comparison = Object.fromEntries(
    operations.map((operation) => {
      const tableMedian = summaries.table.operations[operation].median;
      const flatTableMedian = summaries.flatTable.operations[operation].median;

      return [
        operation,
        {
          tableToFlatTableRatio: round(tableMedian / flatTableMedian),
          tableImprovementPercent: round(
            ((flatTableMedian - tableMedian) / flatTableMedian) * 100,
          ),
        },
      ];
    }),
  );
  const environment = await page.evaluate(() => ({
    userAgent: navigator.userAgent,
    hardwareConcurrency: navigator.hardwareConcurrency,
    viewport: { width: window.innerWidth, height: window.innerHeight },
  }));
  const report = {
    generatedAt: new Date().toISOString(),
    configuration: {
      rowCount: TABLE_BENCHMARK_ROW_COUNT,
      sampleCount,
      warmupCount,
    },
    environment,
    summaries,
    comparison,
    rawResults,
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    `// Generated by npm run benchmark:table\nmodule.exports = ${JSON.stringify(report, null, 2)};\n`,
    "utf8",
  );

  await test.info().attach("table-selection-benchmark", {
    body: Buffer.from(JSON.stringify(report, null, 2)),
    contentType: "application/json",
  });

  // eslint-disable-next-line no-console
  console.table(
    operations.map((operation) => ({
      operation,
      tableMedianMs: summaries.table.operations[operation].median,
      flatTableMedianMs: summaries.flatTable.operations[operation].median,
      tableImprovementPercent: comparison[operation].tableImprovementPercent,
    })),
  );
  // eslint-disable-next-line no-console
  console.log(`Benchmark report written to ${outputPath}`);
});
