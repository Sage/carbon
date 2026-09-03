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
    "^.+\\.(js|mjs|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.mjs",
  },
  moduleDirectories: ["src", "node_modules"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "^@sage/design-tokens-fusion/js/es6/(.*)$":
      "@sage/design-tokens-fusion/js/common/$1",
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/src/__spec_helper__",
    "<rootDir>/src/locales",
    "<rootDir>/lib",
    "<rootDir>/esm",
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

// Runs specific script unit tests, which the main projects ignore.
const scriptsConfig: Config = {
  ...serverConfig,
  displayName: { name: "Scripts", color: "magenta" },
  setupFilesAfterEnv: [],
  // we can add more script-specific tests here in the future
  testMatch: ["<rootDir>/scripts/check-release-age/check-release-age.test.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/scripts"],
};

const globalConfig: Config = {
  projects: [clientConfig, serverConfig, scriptsConfig],
  notify: false,
  collectCoverage: true,
  coverageReporters: ["text-summary", "html", "json"],
  coverageThreshold: isCI ? undefined : coverageThresholds,
};

export default globalConfig;
