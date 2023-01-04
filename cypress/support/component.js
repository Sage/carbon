import "./commands";
import "cypress-each";
import "cypress-real-events/support";
import "cypress-axe";
import { mount } from "cypress/react";
import DEBUG_FLAG from "./e2e";
import { CY_ROOT } from "../locators/locators";

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

Cypress.Commands.add("checkAccessibility", () => {
  const A11YOptions = {
    runOnly: {
      type: "tag",
      values: [
        "wcag2a", // WCAG 2.0 & WCAG 2.1 Level A
        "wcag2aa", // WCAG 2.0 & WCAG 2.1 Level AA
        "wcag21a", // WCAG 2.1 Level A
        "wcag21aa", // WCAG 2.1 Level AA
        "best-practice", // Best practices endorsed by Deque
      ],
    },
  };

  cy.get(CY_ROOT).then((root) => {
    root.addClass("cypress_axe_class");
  });

  return cy.injectAxe().then(() => {
    cy.checkA11y(".cypress_axe_class", A11YOptions);
  });
});
