import "cypress-axe";
import "cypress-real-events/support";
import "cypress-storybook/cypress";
import "cypress-each";

require("cypress-plugin-tab");

const DEBUG_FLAG = false;

/* returning false here prevents Cypress from failing the test */
Cypress.on("uncaught:exception", () => false);

Cypress.Commands.overwrite("log", (subject, message) =>
  cy.task("log", message)
);

Cypress.Screenshot.defaults({ screenshotOnRunFailure: DEBUG_FLAG });

export default DEBUG_FLAG;

// replace the moment.js because of deprecation
const dayjs = require("dayjs");

Cypress.dayjs = dayjs;
