import { Config } from "jest";
import { resolve } from "path";

import coverageThresholds from "./coverage-thresholds.json";

const rootDir = resolve(__dirname, ".");
const isCI = process.env.CI === "true";

const esmOnlyPackages = ["react-error-boundary"];

const baseProjectConfig: Config = {
  rootDir,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "mjs"],
  transform: {
    "^.+\\.(js|mjs|jsx|ts|tsx)$": "@swc/jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.mjs",
  },
  moduleDirectories: ["src", "node_modules"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/src/__spec_helper__",
    "<rootDir>/src/locales",
    "<rootDir>/lib",
    "<rootDir>/esm",
    ".*index\\.ts$",
    ".*[.-]config\\.ts$",
  ],
  coverageDirectory: "<rootDir>/coverage",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/lib",
    "<rootDir>/esm",
  ],
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!(${esmOnlyPackages.join("|")}))`,
  ],
};

const clientConfig: Config = {
  displayName: "Client",
  testMatch: ["**/!(*.server).+(spec|test).[jt]s?(x)"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/src/__spec_helper__/__internal__/index.ts",
    "jest-canvas-mock",
  ],
  ...baseProjectConfig,
};

const serverConfig: Config = {
  displayName: { name: "Server", color: "blue" },
  testMatch: ["**/*.server.(spec|test).[jt]s?(x)"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/__spec_helper__/__internal__/index.ts"],
  ...baseProjectConfig,
};

const globalConfig: Config = {
  projects: [clientConfig, serverConfig],
  notify: false,
  collectCoverage: true,
  coverageReporters: ["text-summary", "html", "json"],
  coverageThreshold: isCI ? undefined : coverageThresholds,
};

export default globalConfig;
