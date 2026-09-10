import { defineConfig, devices } from "@playwright/experimental-ct-react";
import { resolve } from "path";

export default defineConfig({
  testDir: resolve(__dirname, "./benchmarks/table-selection"),
  testMatch: /table-selection\.benchmark\.pw\.tsx/,
  outputDir: resolve(__dirname, "./playwright/benchmark-results/test-output"),
  timeout: 5 * 60 * 1000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    ctPort: 3101,
    trace: "off",
    ctViteConfig: {
      resolve: {
        alias: {
          "~@sage": resolve(__dirname, "./node_modules/@sage/"),
        },
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
