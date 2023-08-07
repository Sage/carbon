/* eslint-disable no-console */
import { defineConfig } from "cypress";
import webpackConfig from "./cypress/webpack.config.js";

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
});
