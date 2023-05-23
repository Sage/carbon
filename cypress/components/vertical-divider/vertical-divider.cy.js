import React from "react";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";
import { VerticalDividerComponent } from "../../../src/components/vertical-divider/vertical-divider-test.stories";

import verticalDividerComponent from "../../locators/vertical-divider/index";

context("Tests for VerticalDivider component", () => {
  describe("should check VerticalDivider component properties", () => {
    it.each([30, 50, "30px", "50px"])(
      "should check h set to %s for VerticalDivider component",
      (h) => {
        CypressMountWithProviders(<VerticalDividerComponent h={h} />);
        verticalDividerComponent()
          .then(($el) => {
            const val = Number.isNaN(h) ? h : parseInt(h);
            assertCssValueIsApproximately($el, "height", val);
          })
          .should("have.attr", "height", h);

        cy.checkAccessibility();
      }
    );

    it.each([30, 50, "30px", "50px"])(
      "should check height set to %s for VerticalDivider component",
      (height) => {
        CypressMountWithProviders(<VerticalDividerComponent height={height} />);
        verticalDividerComponent()
          .then(($el) => {
            const val = Number.isNaN(height) ? height : parseInt(height);
            assertCssValueIsApproximately($el, "height", val);
          })
          .should("have.attr", "height", height);

        cy.checkAccessibility();
      }
    );

    it.each([
      [3, "rgb(8, 57, 78)"],
      [57, "rgb(145, 167, 177)"],
      [71, "rgb(181, 196, 202)"],
      [98, "rgb(250, 251, 251)"],
    ])(
      "should check tint set to %s for VerticalDivider component",
      (tint, color) => {
        CypressMountWithProviders(<VerticalDividerComponent tint={tint} />);
        verticalDividerComponent()
          .children()
          .should("have.css", "border-left-color", color);

        cy.checkAccessibility();
      }
    );

    it.each([
      [true, "have.css"],
      [false, "not.have.css"],
    ])(
      "should check displayInline set to %s for VerticalDivider component",
      (boolean, assertion) => {
        CypressMountWithProviders(
          <VerticalDividerComponent displayInline={boolean} />
        );
        verticalDividerComponent().should(assertion, "display", "inline");

        cy.checkAccessibility();
      }
    );
  });
});
