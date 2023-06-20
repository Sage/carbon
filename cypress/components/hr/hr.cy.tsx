import React from "react";
import Hr from "../../../src/components/hr";
import * as stories from "../../../src/components/hr/hr.stories";
import hrComponent from "../../locators/hr";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

context("Testing Hr component", () => {
  describe("check props for Hr component", () => {
    it("verify Hr component is displayed properly", () => {
      CypressMountWithProviders(<Hr />);

      hrComponent()
        .should("have.css", "margin-top", "24px")
        .and("have.css", "margin-bottom", "24px");
    });

    it.each([
      [799, 78, 320],
      [800, 78, 320],
      [801, 0, 0],
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
          assertCssValueIsApproximately($el, "margin-left", leftMargin);
          assertCssValueIsApproximately($el, "margin-right", rightMargin);
        });
      }
    );
  });

  describe("Accessibility tests for Hr component", () => {
    it("should pass accessibility tests for Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for DifferentSpacing story", () => {
      CypressMountWithProviders(<stories.DifferentSpacing />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for EnablingAdaptiveBehaviour story", () => {
      CypressMountWithProviders(<stories.EnablingAdaptiveBehaviour />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for InsideForm story", () => {
      CypressMountWithProviders(<stories.InsideForm />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for InsideFormInlineLabels story", () => {
      CypressMountWithProviders(<stories.InsideFormInlineLabels />);

      cy.checkAccessibility();
    });
  });
});
