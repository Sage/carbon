import "./commands";

const DEBUG_FLAG = false;

/* returning false here prevents Cypress from failing the test */
Cypress.on("uncaught:exception", () => false);

Cypress.Commands.overwrite("log", (subject, message) =>
  cy.task("log", message)
);

Cypress.Screenshot.defaults({ screenshotOnRunFailure: DEBUG_FLAG });

export default DEBUG_FLAG;
