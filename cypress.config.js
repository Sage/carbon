/* eslint-disable prefer-destructuring */
const { defineConfig } = require("cypress");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor")
  .addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild")
  .createEsbuildPlugin;
const webpackConfig = require("./cypress/webpack.config.js");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

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

  on("before:browser:launch", (browser = {}, launchOptions) => {
    if (browser.family === "chromium" && browser.name !== "electron") {
      launchOptions.args.push("--disable-site-isolation-trials");
      launchOptions.args.push("--disable-gpu"); // disable update for chrome for CI

      launchOptions.args.push(
        `--simulate-outdated-no-au='Tue, 31 Dec 2099 23:59:59 GMT'`
      );
    }
    return launchOptions;
  });

  return config;
}

module.exports = defineConfig({
  blockHosts: ["www.google-analytics.com", "sockjs*", "countries*"],
  env: {
    TAGS: "not @ignore",
    iframe: "iframe.html?id=",
  },
  failOnStatusCode: false,
  video: false,
  viewportWidth: 1366,
  viewportHeight: 768,
  chromeWebSecurity: false,
  projectId: "8458bb",
  retries: {
    runMode: 1,
    openMode: 1,
  },
  e2e: {
    setupNodeEvents,
    baseUrl: "http://127.0.0.1:9001/",
    specPattern: "./cypress/e2e/**/(*.test.js|*.feature)",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
    },
    watchForFileChanges: true,
    specPattern: [
      "./src/components/**/*.test.js",
      "./cypress/componentTheme/themes.test.js",
    ],
  },
});
