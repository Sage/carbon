const { defineConfig } = require("cypress");
const webpackConfig = require("./cypress/webpack.config.js");

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
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      return require("./cypress/plugins/index.js")(on, config);
    },
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
    specPattern: "src/components/**/*.test.js",
  },
});
