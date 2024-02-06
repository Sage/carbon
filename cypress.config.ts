import { defineConfig } from "cypress";
import webpackConfig from "./cypress/webpack.config.js";

export default defineConfig({
  blockHosts: ["www.google-analytics.com", "sockjs*", "countries*"],
  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1366,
  viewportHeight: 768,
  chromeWebSecurity: false,
  projectId: "8458bb",
  retries: {
    runMode: 1,
    openMode: 1,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
    },
    watchForFileChanges: true,
    excludeSpecPattern: ["**/examples/*", "**/*.spec.{js|ts*}"],
    specPattern: [
      "./cypress/components/**/*.cy.js",
      "./cypress/components/**/*.cy.tsx",
    ],
  },
  reporter: "list",
});
