import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { defineBenchmark } from "../define-benchmark";
import type { BenchmarkContext } from "../define-benchmark";
import runBenchmark from "../run-benchmark";
import resetFixture from "../reset-fixture";
import { ControlledSearchFixture, GroupedSearchFixture } from "./fixtures";
import SEARCH_RESULT_COUNT from "./workload";

const input = ({ component }: BenchmarkContext) =>
  component.locator('input[type="search"]');
const results = ({ page }: BenchmarkContext) =>
  page.locator('[data-component="popover-menu-item"]');
const result = ({ page }: BenchmarkContext, number: string) =>
  page.locator(`#search-result-${number}`);
const reset = async (context: BenchmarkContext) => {
  await resetFixture(context.component);
  await expect(input(context)).toHaveValue("");
  await expect(
    context.page.getByRole("listbox", { name: "Search products", exact: true }),
  ).toBeHidden();
  // Resetting to an empty query cancels pending debounced announcements.
  // The runner drains preparation effects before starting the next sample.
};

const resetControlled = async (context: BenchmarkContext) => {
  await resetFixture(context.component);
  await expect(input(context)).toHaveValue("");
  await expect(
    context.component.locator("[data-search-submission]"),
  ).toHaveText("");
};

const prepareResults = async (context: BenchmarkContext) => {
  await reset(context);
  await input(context).fill("Product");
  await expect(results(context)).toHaveCount(SEARCH_RESULT_COUNT);
  await expect(
    context.page.getByRole("listbox", { name: "Search products", exact: true }),
  ).toBeVisible();
};

const verifySelection = async (context: BenchmarkContext, number: string) => {
  await expect(context.component.locator("[data-search-selection]")).toHaveText(
    `product-${number}`,
  );
  await expect(input(context)).toHaveValue(`Product ${number}`);
  await expect(input(context)).toBeFocused();
};

// Profile the visible interaction without waiting for delayed announcements.
const completeSelection = async (context: BenchmarkContext, number: string) => {
  await expect(
    context.page.getByRole("listbox", { name: "Search products", exact: true }),
  ).toBeHidden();
  await expect(input(context)).toHaveValue(`Product ${number}`);
  await expect(context.component.locator("[data-search-selection]")).toHaveText(
    `product-${number}`,
  );
};

const benchmarks = [
  defineBenchmark({
    id: "search/type-query",
    fixture: <ControlledSearchFixture />,
    prepare: resetControlled,
    action: async (context) => {
      await input(context).pressSequentially("carbon");
    },
    complete: async (context) => {
      await expect(input(context)).toHaveValue("carbon");
    },
  }),
  defineBenchmark({
    id: "search/clear-query",
    fixture: <ControlledSearchFixture />,
    prepare: async (context) => {
      await resetControlled(context);
      await input(context).fill("carbon");
    },
    action: async (context) => {
      await input(context).press("Escape");
    },
    complete: async (context) => {
      await expect(input(context)).toHaveValue("");
    },
    verify: async (context) => {
      await expect(input(context)).toBeFocused();
    },
  }),
  defineBenchmark({
    id: "search/submit-query",
    fixture: <ControlledSearchFixture />,
    prepare: async (context) => {
      await resetControlled(context);
      await input(context).fill("carbon");
    },
    action: async ({ component }) => {
      await component.getByRole("button", { name: "Submit search" }).click();
    },
    complete: async ({ component }) => {
      await expect(component.locator("[data-search-submission]")).toHaveText(
        "carbon",
      );
    },
  }),
  defineBenchmark({
    id: "search/open-results",
    fixture: <GroupedSearchFixture />,
    prepare: reset,
    action: async (context) => {
      await input(context).fill("Product");
    },
    complete: async (context) => {
      await expect(
        context.page.getByRole("listbox", {
          name: "Search products",
          exact: true,
        }),
      ).toBeVisible();
      await expect(results(context)).toHaveCount(SEARCH_RESULT_COUNT);
    },
    verify: async (context) => {
      await expect(input(context)).toHaveAttribute("aria-expanded", "true");
    },
  }),
  defineBenchmark({
    id: "search/refine-results",
    fixture: <GroupedSearchFixture />,
    prepare: prepareResults,
    action: async (context) => {
      await input(context).fill("Product 01");
    },
    complete: async (context) => {
      await expect(results(context)).toHaveCount(10);
    },
    verify: async (context) => {
      await expect(result(context, "010")).toBeVisible();
      await expect(result(context, "001")).toHaveCount(0);
    },
  }),
  defineBenchmark({
    id: "search/no-results",
    fixture: <GroupedSearchFixture />,
    prepare: prepareResults,
    action: async (context) => {
      await input(context).fill("missing product");
    },
    complete: async (context) => {
      await expect(results(context)).toHaveCount(0);
    },
    verify: async (context) => {
      await expect(input(context)).toHaveValue("missing product");
    },
  }),
  defineBenchmark({
    id: "search/navigate-results",
    fixture: <GroupedSearchFixture />,
    prepare: async (context) => {
      await prepareResults(context);
      await input(context).press("ArrowDown");
      await input(context).press("ArrowDown");
      await input(context).press("ArrowDown");
      await input(context).press("ArrowDown");
      await expect(result(context, "004")).toHaveAttribute(
        "data-has-focus",
        "true",
      );
    },
    action: async (context) => {
      await input(context).press("ArrowDown");
    },
    complete: async (context) => {
      // Product 005 is disabled; navigation should skip it.
      await expect(result(context, "006")).toHaveAttribute(
        "data-has-focus",
        "true",
      );
    },
    verify: async (context) => {
      await expect(result(context, "004")).toHaveAttribute(
        "data-has-focus",
        "false",
      );
      await expect(input(context)).toBeFocused();
    },
  }),
  defineBenchmark({
    id: "search/select-result-mouse",
    fixture: <GroupedSearchFixture />,
    prepare: prepareResults,
    action: async (context) => {
      await result(context, "002").click();
    },
    complete: async (context) => {
      await completeSelection(context, "002");
    },
    verify: async (context) => {
      await verifySelection(context, "002");
    },
  }),
  defineBenchmark({
    id: "search/select-result-keyboard",
    fixture: <GroupedSearchFixture />,
    prepare: async (context) => {
      await prepareResults(context);
      await input(context).press("ArrowDown");
      await expect(result(context, "001")).toHaveAttribute(
        "data-has-focus",
        "true",
      );
    },
    action: async (context) => {
      await input(context).press("Enter");
    },
    complete: async (context) => {
      await completeSelection(context, "001");
    },
    verify: async (context) => {
      await verifySelection(context, "001");
    },
  }),
  defineBenchmark({
    id: "search/dismiss-results",
    fixture: <GroupedSearchFixture />,
    prepare: prepareResults,
    action: async (context) => {
      await input(context).press("Escape");
    },
    complete: async (context) => {
      await expect(
        context.page.getByRole("listbox", {
          name: "Search products",
          exact: true,
        }),
      ).toBeHidden();
    },
    verify: async (context) => {
      await expect(input(context)).toHaveAttribute("aria-expanded", "false");
      await expect(input(context)).toBeFocused();
      await expect(
        context.component.locator("[data-search-selection]"),
      ).toHaveText("");
    },
  }),
];

for (const benchmark of benchmarks) {
  test(benchmark.id, async ({ mount, page }) => {
    const report = await runBenchmark(benchmark, { mount, page }, test.info());
    expect(report.samples).toHaveLength(report.configuration.samples);
    for (const sample of report.samples) {
      expect(sample.commitCount).toBeGreaterThan(0);
    }
  });
}
