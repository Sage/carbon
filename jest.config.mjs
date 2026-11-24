// @ts-check

/** @typedef {import("jest").Config} JestConfig */

import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const coverageThresholds = JSON.parse(
  readFileSync(new URL("./coverage-thresholds.json", import.meta.url), "utf8"),
);

const rootDir = dirname(fileURLToPath(import.meta.url));
const isCI = process.env.CI === "true";

const esmOnlyPackages = ["react-error-boundary"];

/** @type {JestConfig} */
const baseProjectConfig = {
  rootDir,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "mjs"],
  transform: {
    "^.+\\.(js|mjs|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.mjs",
  },
  moduleDirectories: ["src", "node_modules"],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/src/__spec_helper__",
    "<rootDir>/src/locales",
    "<rootDir>/lib",
    "<rootDir>/esm",
    "<rootDir>/playwright",
  ],
  coverageDirectory: "<rootDir>/coverage",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/lib",
    "<rootDir>/esm",
    "<rootDir>/.storybook",
    "<rootDir>/scripts",
  ],
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!(${esmOnlyPackages.join("|")}))`,
  ],
};

/** @type {JestConfig} */
const clientConfig = {
  displayName: "Client",
  testMatch: ["**/!(*.server).+(spec|test).[jt]s?(x)"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/src/__spec_helper__/__internal__/index.ts",
    "jest-canvas-mock",
  ],
  ...baseProjectConfig,
};

/** @type {JestConfig} */
const serverConfig = {
  displayName: { name: "Server", color: "blue" },
  testMatch: ["**/*.server.(spec|test).[jt]s?(x)"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/__spec_helper__/__internal__/index.ts"],
  ...baseProjectConfig,
};

// Runs specific script unit tests, which the main projects ignore.
/** @type {JestConfig} */
const scriptsConfig = {
  ...serverConfig,
  displayName: { name: "Scripts", color: "magenta" },
  setupFilesAfterEnv: [],
  testMatch: ["<rootDir>/scripts/**/*.test.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/scripts"],
};

/** @type {JestConfig} */
const globalConfig = {
  projects: [clientConfig, serverConfig, scriptsConfig],
  notify: false,
  collectCoverage: true,
  coverageReporters: ["text-summary", "html", "json"],
  coverageThreshold: isCI ? undefined : coverageThresholds,
};

export default globalConfig;
