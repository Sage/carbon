import "./commands";
import "cypress-each";
import "cypress-real-events/support";
import { mount } from "cypress/react";
import DEBUG_FLAG from "./e2e";

require("cypress-plugin-tab");

/* returning false here prevents Cypress from failing the test */
Cypress.on("uncaught:exception", () => false);

Cypress.Commands.overwrite("log", (subject, message) =>
  cy.task("log", message)
);

Cypress.Screenshot.defaults({ screenshotOnRunFailure: DEBUG_FLAG });

Cypress.Commands.add("mount", mount);

// replace the moment.js because of deprecation
const dayjs = require("dayjs");

Cypress.dayjs = dayjs;
