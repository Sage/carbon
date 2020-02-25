export const DEBUG_FLAG = false;

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// You can mock if needed. Example below
// beforeEach(() => {
//     // cy.server();
//     // cy.route('/countries*', {});
// })

/* returning false here prevents Cypress from failing the test */
Cypress.on('uncaught:exception', (err, runnable) => false);

Cypress.Commands.overwrite(
  'type',
  (originalFn, subject, string, options) => originalFn(
    subject,
    string,
    Object.assign({}, options, { delay: 100 }),
  ),
);

function getItem(selector, counter) {
  if ((document.readyState === 'loading' || document.readyState === 'interactive') && document.readyState !== 'completed') { // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', getItem);
  } else {
    cy.wait(100, { log: DEBUG_FLAG })
      .get('#storybook-preview-iframe', { log: DEBUG_FLAG })
      .then(($iframe) => {
        const doc = $iframe.contents();
        if (!doc.find(selector).length && counter > 0) {
          return getItem(selector, --counter);
        }
        return cy.wrap(doc.find(selector));
      });
  }
}

Cypress.Commands.add('iFrame', (selector) => { getItem(selector, 50); });

before(() => {
  cy.wait(1000, { log: DEBUG_FLAG });
});

Cypress.Screenshot.defaults({ screenshotOnRunFailure: DEBUG_FLAG });

// Configure custom commands eyes-cypress
import '@applitools/eyes-cypress/commands'

const {
  Before,
  After
} = require("cypress-cucumber-preprocessor/steps");


Before({ tags: "@applitools" }, () => {
  // debugger

  cy.eyesOpen({
    appName: 'Carbon Sage',
    matchLevel: 'Strict', // Strict, Exact, Layout and Content - https://help.applitools.com/hc/en-us/articles/360007188591-Match-Levels
    envName: 'Development',
    testName: cy.state('ctx').test.title, // Assign the current test name to Applitools test name
    batchName: cy.state('ctx').test.parent.title, // Assign the feature name to Applitools batch name
    browser: [            
              // {width: 800, height: 600, name: 'firefox'},
              // {width: 1024, height: 768, name: 'chrome'},
              {width: 1440, height: 1219, name: 'edge'}

              // {
              //     deviceName: 'iPhone X',
              //     screenOrientation: 'landscape',
              //     name: 'chrome' // optional, just to make it explicit this is browser emulation and not a real device. Only chrome is supported for device emulation.
              // },

              // {
              //  deviceName: 'iPad',
              //   screenOrientation: 'landscape',
              //   name: 'chrome' // optional, just to make it explicit this is browser emulation and not a real device. Only chrome is supported for device emulation.
              // }
            ]
  
  }); 
});

After({ tags: "@applitools" }, () => {
  cy.eyesClose();
});


