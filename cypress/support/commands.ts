import "cypress-each";
import "cypress-real-events/support";
import "cypress-axe";
import type { Options } from "cypress-axe";
import { mount } from "cypress/react";
import { CY_ROOT } from "../locators/locators";
import "cypress-plugin-tab";

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      checkAccessibility: typeof checkAccessibility;
    }
  }
}

Cypress.Commands.add("mount", mount);

function checkAccessibility() {
  const A11YOptions: Options = {
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

  cy.injectAxe();
  cy.checkA11y(".cypress_axe_class", A11YOptions);
}

Cypress.Commands.add("checkAccessibility", checkAccessibility);
