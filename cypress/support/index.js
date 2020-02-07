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
//     cy.server();
//     cy.route('/countries*', {});
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
