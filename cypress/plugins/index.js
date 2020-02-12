// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// eslint-disable-next-line import/no-extraneous-dependencies
const cucumber = require('cypress-cucumber-preprocessor').default;

// this line is required to avoid memory leak
require('events').EventEmitter.defaultMaxListeners = 150; // value should be updated due to amount of regression files (150)

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
  });
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-site-isolation-trials');
      return launchOptions;
    }
  });
};
