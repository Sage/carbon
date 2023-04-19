import "cypress-each";
import "cypress-real-events/support";
import "cypress-axe";
import { Result } from "axe-core";
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

const terminalLog = (violations: Result[]) => {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("table", violationData);
};

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
  cy.checkA11y(".cypress_axe_class", A11YOptions, terminalLog);
}

Cypress.Commands.add("checkAccessibility", checkAccessibility);
