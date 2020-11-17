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
require('events').EventEmitter.setMaxListeners = 150; // value should be updated due to amount of regression files (150)

const path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
    table(message) {
      console.table(message);
      return null;
    },
  });
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-site-isolation-trials');
      launchOptions.args.push('--disable-gpu');
      return launchOptions;
    }
    if (browser.name === 'firefox') {
      // works only for macOS
      // issue for Win https://bugzilla.mozilla.org/show_bug.cgi?id=855899
      launchOptions.args.push('-new-instance');
      return launchOptions;
    }
  });

  // we can use this standard approach
  const options = {
    outputRoot: `${config.projectRoot}/cypress/.logs/`,
    printLogsToFile: 'always',
    // Used to trim the base path of specs and reduce nesting in the
    // generated output directory.
    specRoot: path.relative(config.fileServerFolder, config.integrationFolder),
    outputTarget: {
      'cypress-logs|json': 'json',
    },
  };

  // we can use custom.output approach

  // const options = {
  //   outputRoot: `${config.projectRoot}/cypress/.logs/`,
  //   outputTarget: {
  //     'custom.output': function (messages) {
  //       // messages= {[specPath: string]: {[testTitle: string]: [type: string, message: string, severity: string][]}

  //       Object.entries(allMessages).forEach(([spec, tests]) => {
  //         const dataString = '';
  //         // .. Process the tests object into desired format ..
  //         // Insert chunk into file, by default at the end.
  //         this.writeSpecChunk(spec, dataString);
  //         // Or before the last two characters.
  //         this.writeSpecChunk(spec, dataString, -2);
  //       });
  //     },
  //   },
  // };

  // eslint-disable-next-line import/no-extraneous-dependencies
  require('cypress-terminal-report/src/installLogsPrinter')(on, options);
};
