import React from "react";
import Hr from "./hr.component";
import hrComponent from "../../../cypress/locators/hr";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

context("Testing Hr component", () => {
  describe("check props for Hr component", () => {
    it("verify Hr component is displayed properly", () => {
      CypressMountWithProviders(<Hr />);

      hrComponent()
        .should("have.css", "margin-top", "24px")
        .and("have.css", "margin-bottom", "24px");
    });

    it.each([
      ["799", 78, 320],
      ["800", 78, 320],
      ["801", 0, 0],
    ])(
      "verify Hr component adaptiveMxBreakpoint prop sets left and right margins to 0px when larger than viewport",
      (breakpoint, leftMargin, rightMargin) => {
        cy.viewport(800, 300);

        CypressMountWithProviders(
          <Hr
            mb={7}
            mt={7}
            ml="10%"
            mr="40%"
            adaptiveMxBreakpoint={breakpoint}
          />
        );

        hrComponent().then(($el) => {
          useJQueryCssValueAndAssert($el, "margin-left", leftMargin);
          useJQueryCssValueAndAssert($el, "margin-right", rightMargin);
        });
      }
    );
  });
});
