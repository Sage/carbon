import { test as ctBase, expect } from "@playwright/experimental-ct-react17";
import mcr from "monocart-coverage-reports";

const coverageOptions = {
  reports: [
    [
      "console-details",
      {
        metrics: ["lines"],
      },
    ],
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
    dir: ["./src/foo"],
    filter: {
      "**/*.component.js": true,
      "**/*.style.js": true,
    },
  },
  outputDir: "./playwright/coverage",
  onEnd(coverageResults) {
    console.log(coverageResults);
  },
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
        await mcr(coverageOptions).generate();
      }
    },
    {
      scope: "test",
      auto: true,
    },
  ],
});

export { test, expect };
