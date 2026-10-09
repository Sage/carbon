import { defineConfig, devices } from "@playwright/experimental-ct-react";
import { resolve } from "node:path";

export default defineConfig({
  testDir: resolve(__dirname, "playwright/benchmarks"),
  testMatch: /.*\.benchmark\.pw\.tsx/,
  outputDir: resolve(__dirname, "playwright/benchmark-results/test-output"),
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    ctPort: 3101,
    ctCacheDir: "playwright/.benchmark-cache",
    trace: "off",
    ctViteConfig: {
      resolve: {
        alias: [
          {
            find: "~@sage",
            replacement: resolve(__dirname, "node_modules/@sage"),
          },
          // Keep production behavior while enabling React Profiler callbacks.
          {
            find: /^react-dom$/,
            replacement: require.resolve("react-dom/profiling"),
          },
        ],
      },
    },
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
      },
    },
  ],
});
