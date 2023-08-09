/* eslint-disable no-console */
import { defineConfig } from "cypress";
import webpackConfig from "./cypress/webpack.config.js";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cypressSplit = require("cypress-split");

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  on("task", {
    log(message) {
      console.log(message);
      return null;
    },

    table(message) {
      console.table(message);
      return null;
    },
  });
  cypressSplit(on, config);

  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  require("cypress-mochawesome-reporter/plugin")(on);

  return config;
}

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
    setupNodeEvents,
    watchForFileChanges: true,
    excludeSpecPattern: ["**/examples/*", "**/*.spec.{js|ts*}"],
    specPattern: [
      "./cypress/components/**/*.cy.js",
      "./cypress/components/**/*.cy.tsx",
    ],
  },
  reporter: "cypress-mochawesome-reporter",
});
