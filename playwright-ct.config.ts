import { defineConfig, devices } from "@playwright/experimental-ct-react";

import { resolve } from "path";

const playwrightDir = resolve(__dirname, "./playwright");

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
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 8 : undefined,
  // Limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 10 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? "blob"
    : [["html", { outputFolder: resolve(playwrightDir, "./test-report") }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,
    /* Custom config for internal bundler Playwright uses for component tests. See https://playwright.dev/docs/test-components#under-the-hood */
    ctViteConfig: {
      resolve: {
        alias: {
          // Required to load font assets correctly from @sage/design-tokens package
          "~@sage": resolve(__dirname, "./node_modules/@sage/"),
        },
      },
    },
  },
  testMatch: /.*\.pw\.tsx/,
  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        testIdAttribute: "data-role",
        viewport: { width: 1366, height: 768 },
      },
    },
  ],
});
