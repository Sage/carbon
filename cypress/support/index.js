// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-axe';

export const DEBUG_FLAG = false;

/* returning false here prevents Cypress from failing the test */
Cypress.on('uncaught:exception', (err, runnable) => false);

Cypress.Commands.overwrite(
  'type',
  (originalFn, subject, string, options) => originalFn(
    subject,
    string,
    Object.assign({}, options, { delay: 75 }),
  ),
);

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));

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

Cypress.Screenshot.defaults({ screenshotOnRunFailure: DEBUG_FLAG });

const options = {
  filterLog: ([type, message, severity]) => {
    if (['cons:log'].includes(type)) {
      if (['success'].includes(severity)) {
        return true;
      }
    }
  },
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('cypress-terminal-report/src/installLogsCollector')(options);
