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

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.overwrite(
    "type",
    (originalFn, subject, string, options) => originalFn(
        subject,
        string,
        Object.assign({}, options, { delay: 100 })
    )
)

Cypress.Commands.add("iFrame",
    (selector) => {
        cy.wait(100).get('#storybook-preview-iframe').then(($iframe) => {
            return cy.wrap($iframe.contents().find(selector));
        })
    }
)