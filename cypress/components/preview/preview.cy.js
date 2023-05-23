import React from "react";
import Preview from "../../../src/components/preview";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { cyRoot } from "../../locators/index";
import { previewComponent, lineComponent } from "../../locators/preview/index";
import { CHARACTERS } from "../../support/component-helper/constants";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const pixelsData = [256, 275, 300];

const PreviewComponent = ({ ...props }) => {
  return <Preview loading {...props} />;
};

context("Tests for Preview component", () => {
  describe("should check Preview component properties", () => {
    it.each(pixelsData)(
      "should check height as %spx for Preview component",
      (height) => {
        CypressMountWithProviders(<PreviewComponent height={`${height}px`} />);
        previewComponent().then(($el) => {
          assertCssValueIsApproximately($el, "height", height);
        });
      }
    );

    it.each(pixelsData)(
      "should check width as %spx for Preview component",
      (width) => {
        CypressMountWithProviders(<PreviewComponent width={`${width}px`} />);
        previewComponent().then(($el) => {
          assertCssValueIsApproximately($el, "width", width);
        });
      }
    );

    it.each(testData)(
      "should check children as %s for Preview component",
      (children) => {
        CypressMountWithProviders(<Preview>{children}</Preview>);
        cyRoot().should("have.text", children);
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should check when loading is %s for Preview component",
      (bool, state) => {
        CypressMountWithProviders(<PreviewComponent loading={bool} />);
        previewComponent().should(state);
      }
    );

    it.each([5, 6, 8, 10])(
      "should check %s loading lines for Preview component",
      (line) => {
        CypressMountWithProviders(<PreviewComponent lines={line} />);
        lineComponent().should("have.length", line);
      }
    );
  });

  describe("Accessibility tests for Preview component", () => {
    it.each(pixelsData)(
      "should pass accessibilty tests for Preview height story",
      (height) => {
        CypressMountWithProviders(<PreviewComponent height={`${height}px`} />);
        cy.checkAccessibility();
      }
    );

    it.each(pixelsData)(
      "should pass accessibilty tests for Preview width story",
      (width) => {
        CypressMountWithProviders(<PreviewComponent width={`${width}px`} />);
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should pass accessibilty tests for Preview default story",
      (children) => {
        CypressMountWithProviders(<Preview>{children}</Preview>);
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should pass accessibilty tests for Preview loading state",
      (bool) => {
        CypressMountWithProviders(<PreviewComponent loading={bool} />);
        cy.checkAccessibility();
      }
    );

    it.each([5, 6, 8, 10])(
      "should pass accessibilty tests for Preview lines story",
      (line) => {
        CypressMountWithProviders(<PreviewComponent lines={line} />);
        cy.checkAccessibility();
      }
    );
  });
});
