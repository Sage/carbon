import { defineConfig, devices } from "@playwright/experimental-ct-react17";
import { PlaywrightTestConfig } from "@playwright/test";
import { resolve } from "path";

const playwrightDir = resolve(__dirname, "./playwright");

const chromiumOptions: PlaywrightTestConfig["use"] = {
  ...devices["Desktop Chrome"],
  testIdAttribute: "data-component",
  viewport: { width: 1366, height: 768 },
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /** Directory with the test files. */
  testDir: resolve(__dirname, "./src/components"),
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: resolve(playwrightDir, "./__snapshots__"),
  /* The output directory for files created during test execution */
  outputDir: resolve(playwrightDir, "./test-results"),
  /* Opt out of parallelised workers in CI to prioritise stability and reproducibility. */
  workers: process.env.CI ? 1 : undefined,
  /* Limit the number of failures on CI to save resources */
  maxFailures: process.env.CI ? 10 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? "blob"
    : [["html", { outputFolder: resolve(playwrightDir, "./test-report") }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* Custom config for internal bundler Playwright uses for component tests. See https://playwright.dev/docs/test-components#under-the-hood */
    ctViteConfig: {
      resolve: {
        alias: {
          /* Required to load font assets correctly from @sage/design-tokens package */
          "~@sage": resolve(__dirname, "./node_modules/@sage/"),
        },
      },
    },
  },
  testMatch: /.*\.pw\.tsx/,
  projects: [
    {
      name: "chromium",
      grepInvert: /@flaky/,
      use: chromiumOptions,
      retries: 0,
    },
    {
      name: "flaky tests",
      grep: /@flaky/,
      use: chromiumOptions,
      retries: 2,
      // Increase test timeout for flaky tests
      timeout: 60 * 1000,
      expect: {
        // Increase assertion timeout for flaky tests
        timeout: 10 * 1000,
      },
    },
  ],
});
