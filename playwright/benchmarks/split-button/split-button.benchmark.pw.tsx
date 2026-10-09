import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { defineBenchmark } from "../define-benchmark";
import type { BenchmarkContext } from "../define-benchmark";
import runBenchmark from "../run-benchmark";
import SplitButtonFixture from "./fixture";

const toggle = ({ component }: BenchmarkContext) =>
  component.getByRole("button", { name: "Save options", exact: true });

const prepareClosed = async (context: BenchmarkContext) => {
  if ((await toggle(context).getAttribute("aria-expanded")) === "true") {
    await toggle(context).click();
  }
  await expect(context.page.getByRole("list")).toBeHidden();
};

const prepareOpen = async (context: BenchmarkContext) => {
  await prepareClosed(context);
  await toggle(context).click();
  await expect(
    context.page.getByRole("button", { name: "Save draft" }),
  ).toBeVisible();
};

const benchmarks = [
  defineBenchmark({
    id: "split-button/open-menu",
    fixture: <SplitButtonFixture />,
    prepare: prepareClosed,
    action: async (context) => {
      await toggle(context).click();
    },
    complete: async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Save draft" }),
      ).toBeVisible();
    },
    verify: async (context) => {
      await expect(toggle(context)).toHaveAttribute("aria-expanded", "true");
    },
  }),
  defineBenchmark({
    id: "split-button/close-menu",
    fixture: <SplitButtonFixture />,
    prepare: prepareOpen,
    action: async (context) => {
      await toggle(context).click();
    },
    complete: async ({ page }) => {
      await expect(page.getByRole("list")).toBeHidden();
    },
    verify: async (context) => {
      await expect(toggle(context)).toHaveAttribute("aria-expanded", "false");
    },
  }),
  defineBenchmark({
    id: "split-button/choose-option",
    fixture: <SplitButtonFixture />,
    prepare: async (context) => {
      await prepareOpen(context);
      await context.component
        .locator("[data-fixture-action]")
        .evaluate((element) => {
          (element as HTMLElement).dataset.count = "0";
          (element as HTMLElement).dataset.action = "";
        });
    },
    action: async ({ page }) => {
      await page.getByRole("button", { name: "Save draft" }).click();
    },
    complete: async ({ page }) => {
      await expect(page.getByRole("list")).toBeHidden();
    },
    verify: async (context) => {
      await expect(
        context.component.locator("[data-fixture-action]"),
      ).toHaveAttribute("data-action", "save-draft");
      await expect(
        context.component.locator("[data-fixture-action]"),
      ).toHaveAttribute("data-count", "1");
      await expect(toggle(context)).toBeFocused();
    },
  }),
];

for (const benchmark of benchmarks) {
  test(benchmark.id, async ({ mount, page }) => {
    const report = await runBenchmark(benchmark, { mount, page }, test.info());
    expect(report.samples).toHaveLength(report.configuration.samples);
  });
}
