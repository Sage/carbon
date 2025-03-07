import { Config } from "jest";

import coverageThresholds from "./coverage-thresholds.json";

const esmOnlyPackages = [
  "react-dnd",
  "core-dnd",
  "@react-dnd",
  "dnd-core",
  "react-dnd-html5-backend",
];

const isCI = process.env.CI === "true";

const clientConfig: Config = {
  notify: false,
  setupFiles: ["raf/polyfill"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/src/__spec_helper__/__internal__/index.ts",
    "jest-canvas-mock",
  ],
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "!**/*.server.(spec|test).[jt]s?(x)",
  ],
  testPathIgnorePatterns: ["node_modules", "lib", "esm"],
  moduleDirectories: ["src", "node_modules"],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/__spec_helper__",
    "src/locales",
    "lib",
    "esm",
  ],
  coverageReporters: ["text-summary", "html", "json"],
  coverageDirectory: "<rootDir>/coverage",
  coverageThreshold: isCI ? undefined : coverageThresholds,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "mjs"],
  transform: {
    "^.+\\.(js|mjs|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.mjs",
  },
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!(${esmOnlyPackages.join("|")}))`,
  ],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
};

/* DISABLED TEMPORARILY */
// const serverConfig: Config = {
//   ...clientConfig,
//   testMatch: ["**/*.server.(spec|test).[jt]s?(x)"],
//   testPathIgnorePatterns: ["node_modules", "lib", "esm"],
//   testEnvironment: "node",
// };

// const config: Config = {
//   projects: [clientConfig, serverConfig],
// };

export default clientConfig;
