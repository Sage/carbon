import React from "react";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";
import { VerticalDividerComponent } from "../../../src/components/vertical-divider/vertical-divider-test.stories";

import verticalDividerComponent from "../../locators/vertical-divider/index";
import { VerticalDividerProps } from "../../../src/components/vertical-divider";

context("Tests for VerticalDivider component", () => {
  describe("should check VerticalDivider component properties", () => {
    describe.each(["h", "height"])(
      "when %s prop is passed as a string",
      (propName) => {
        it.each(["30px", "50px"])(
          `verify that the ${propName} is set to %s for VerticalDivider component`,
          (val) => {
            const props = { [propName]: val };
            CypressMountWithProviders(<VerticalDividerComponent {...props} />);

            verticalDividerComponent()
              .then(($el) => {
                assertCssValueIsApproximately($el, "height", parseInt(val));
              })
              .should("have.attr", "height", val);
          }
        );
      }
    );

    describe.each(["h", "height"])(
      "when %s prop is passed as a number",
      (propName) => {
        it.each([30, 50])(
          `verify that the ${propName} is set to %s as number for VerticalDivider component`,
          (val) => {
            const props = { [propName]: val };
            CypressMountWithProviders(<VerticalDividerComponent {...props} />);

            verticalDividerComponent()
              .then(($el) => {
                assertCssValueIsApproximately($el, "height", val);
              })
              .should("have.attr", "height", val);
          }
        );
      }
    );

    it.each([
      [3, "rgb(8, 57, 78)"],
      [57, "rgb(145, 167, 177)"],
      [71, "rgb(181, 196, 202)"],
      [98, "rgb(250, 251, 251)"],
    ] as [VerticalDividerProps["tint"], string][])(
      "should check tint set to %s for VerticalDivider component",
      (tint, color) => {
        CypressMountWithProviders(<VerticalDividerComponent tint={tint} />);
        verticalDividerComponent()
          .children()
          .should("have.css", "border-left-color", color);
      }
    );

    it.each([
      [true, "have.css"],
      [false, "not.have.css"],
    ] as [VerticalDividerProps["displayInline"], string][])(
      "should check displayInline set to %s for VerticalDivider component",
      (boolean, assertion) => {
        CypressMountWithProviders(
          <VerticalDividerComponent displayInline={boolean} />
        );
        verticalDividerComponent().should(assertion, "display", "inline");
      }
    );
  });

  describe("check Vertical Divider accessibility", () => {
    describe.each(["h", "height"])(
      "when %s prop is passed as a string",
      (propName) => {
        it.each(["30px", "50px"])(
          `verify that the ${propName} is set to %s for VerticalDivider component`,
          (val) => {
            const props = { [propName]: val };
            CypressMountWithProviders(<VerticalDividerComponent {...props} />);

            verticalDividerComponent()
              .then(($el) => {
                assertCssValueIsApproximately($el, "height", parseInt(val));
              })
              .should("have.attr", "height", val);
          }
        );
      }
    );

    describe.each(["h", "height"])(
      "when %s prop is passed as a number",
      (propName) => {
        it.each([30, 50])(
          `check the accessibility when the ${propName} is set to %s as number for VerticalDivider component`,
          (val) => {
            const props = { [propName]: val };
            CypressMountWithProviders(<VerticalDividerComponent {...props} />);

            cy.checkAccessibility();
          }
        );
      }
    );

    it.each([3, 57, 71, 98] as VerticalDividerProps["tint"][])(
      "should check the accessibility when the tint is set to %s for VerticalDivider component",
      (tint) => {
        CypressMountWithProviders(<VerticalDividerComponent tint={tint} />);

        cy.checkAccessibility();
      }
    );

    it.each([true, false] as VerticalDividerProps["displayInline"][])(
      "should check the accessibility when the displayInline set to %s for VerticalDivider component",
      (boolean) => {
        CypressMountWithProviders(
          <VerticalDividerComponent displayInline={boolean} />
        );
        cy.checkAccessibility();
      }
    );
  });
});
