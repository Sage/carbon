import { Config } from "jest";
import coverageThresholds from "./coverage-thresholds.json";

const isCI = process.env.CI === "true";

const config: Config = {
  notify: false,
  setupFiles: ["raf/polyfill", "<rootDir>/enzyme.config.js"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/src/__spec_helper__/__internal__/index.ts",
    "<rootDir>/src/__spec_helper__/__internal__/expect.ts",
    "jest-canvas-mock",
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
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
  coverageReporters: ["text-summary", "html"],
  coverageDirectory: "<rootDir>/coverage",
  coverageThreshold: isCI ? undefined : coverageThresholds,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "mjs"],
  transform: {
    "^.+\\.(js|mjs|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.mjs",
  },
  transformIgnorePatterns: ["/node_modules/(?!react-dnd|dnd-core|@react-dnd)"],
};

export default config;
