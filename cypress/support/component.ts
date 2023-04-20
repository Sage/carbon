import "./commands";
import DEBUG_FLAG from "./e2e";

/* returning false here prevents Cypress from failing the test */
Cypress.on("uncaught:exception", () => false);

Cypress.Commands.overwrite("log", (subject, message) =>
  cy.task("log", message)
);

Cypress.Screenshot.defaults({ screenshotOnRunFailure: DEBUG_FLAG });
