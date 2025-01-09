import { defineConfig, devices } from "@playwright/experimental-ct-react17";

import { resolve } from "path";

const playwrightDir = resolve(__dirname, "./playwright");

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: resolve(__dirname, "./src/components"),

  snapshotDir: resolve(playwrightDir, "./__snapshots__"),

  outputDir: resolve(playwrightDir, "./test-results"),

  timeout: 30 * 1000,

  fullyParallel: true,

  retries: 3,

  maxFailures: process.env.CI ? 10 : undefined,

  reporter: process.env.CI
    ? "blob"
    : [["html", { outputFolder: resolve(playwrightDir, "./test-report") }]],

  use: {
    trace: "retain-on-failure",

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
