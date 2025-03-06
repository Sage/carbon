import { test as ctBase, expect } from "@playwright/experimental-ct-react";
import mcr from "monocart-coverage-reports";

export const coverageOptions = {
  reports: [
    [
      "json",
      {
        file: "coverage.json",
      },
    ],
  ],
  lcov: true,
  name: "My Istanbul Report",
  all: {
    dir: ["./src"],
    filter: {
      "**/*.component.tsx": true,
      "**/*.style.ts": true,
    },
  },
  outputDir: "./playwright/coverage",
};

const test = ctBase.extend({
  autoTestFixture: [
    async ({ page }, use) => {
      // coverage API is chromium only
      if (test.info().project.name === "chromium") {
        await Promise.all([
          page.coverage.startJSCoverage({
            resetOnNavigation: false,
          }),
          page.coverage.startCSSCoverage({
            resetOnNavigation: false,
          }),
        ]);
      }

      await use("autoTestFixture");

      if (test.info().project.name === "chromium") {
        const [jsCoverage, cssCoverage] = await Promise.all([
          page.coverage.stopJSCoverage(),
          page.coverage.stopCSSCoverage(),
        ]);
        const coverageList = [...jsCoverage, ...cssCoverage];
        await mcr(coverageOptions).add(coverageList);
      }
    },
    {
      scope: "test",
      auto: true,
    },
  ],
});

export { test, expect };
