import { defineConfig, devices } from "@playwright/experimental-ct-react";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));
const playwrightDir = resolve(projectDir, "./playwright");

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: resolve(projectDir, "./src"),

  testMatch: /.*\.pw\.tsx/,

  snapshotDir: resolve(playwrightDir, "./__snapshots__"),

  outputDir: resolve(playwrightDir, "./test-results"),

  timeout: 30 * 1000,

  fullyParallel: true,

  retries: 3,

  maxFailures: process.env.CI ? 10 : undefined,

  reporter: process.env.CI
    ? "blob"
    : [
        ["list"],
        ["html", { outputFolder: resolve(playwrightDir, "./test-report") }],
        [resolve(playwrightDir, "./support/accessibility-reporter.mts")],
      ],

  use: {
    trace: "retain-on-failure",

    ctPort: 3100,
    /* Custom config for internal bundler Playwright uses for component tests. See https://playwright.dev/docs/test-components#under-the-hood */
    ctViteConfig: {
      resolve: {
        alias: {
          // Required to load font assets correctly from @sage/design-tokens package
          "~@sage": resolve(projectDir, "./node_modules/@sage/"),
        },
      },
    },
  },

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

  globalTeardown: resolve(projectDir, "./playwright/global-teardown.js"),
});
