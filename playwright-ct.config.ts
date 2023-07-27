import { defineConfig, devices } from "@playwright/experimental-ct-react17";
import { resolve } from "path";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./src/components",
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: "./__snapshots__",
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 8 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,
    /* Custom config for internal bundler Playright uses for component tests. See https://playwright.dev/docs/test-components#under-the-hood */
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
        testIdAttribute: "data-component",
      },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
});

// https://github.com/Sage/sbc.accounting.reporting.ui/blob/master/playwright/e2e/tests/common/global.ts
