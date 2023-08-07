import React from "react";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { ContentComponentTest as ContentComponent } from "../../../src/components/content/content-test.stories";

import { contentTitle, contentBody } from "../../locators/content/index";
import { CHARACTERS } from "../../support/component-helper/constants";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const totalWidth = 1366;

context("Tests for Content component", () => {
  describe("should check Content component properties", () => {
    it.each([
      ["primary", "rgba(0, 0, 0, 0.9)"],
      ["secondary", "rgba(0, 0, 0, 0.55)"],
    ])(
      "should check %s as variant for Content component",
      (variant, titleColor) => {
        CypressMountWithProviders(<ContentComponent variant={variant} />);
        contentTitle().should("have.css", "color", titleColor);
      }
    );

    it.each(testData)(
      "should check %s as children for Content component",
      (children) => {
        CypressMountWithProviders(
          <ContentComponent title="Title">{children}</ContentComponent>
        );
        contentBody().should("have.text", children);
      }
    );

    it.each(testData)(
      "should check %s as title for Content component",
      (title) => {
        CypressMountWithProviders(<ContentComponent title={title} />);
        contentTitle().should("have.text", title);
      }
    );

    it("should check inline parameter is enabled for Content component", () => {
      CypressMountWithProviders(<ContentComponent inline />);
      contentTitle().should("have.css", "display", "inline-block");
    });

    it.each(["left", "center", "right"])(
      "should check %s alignment for Content component",
      (align) => {
        CypressMountWithProviders(<ContentComponent align={align} />);
        contentTitle().should("have.css", "text-align", align);
      }
    );

    it.each([
      [75, (totalWidth * 75) / 100],
      [50, (totalWidth * 50) / 100],
      [40, (totalWidth * 40) / 100],
    ])(
      "should check %s% width for Content component",
      (titleWidth, computedWidth) => {
        CypressMountWithProviders(<ContentComponent titleWidth={titleWidth} />);
        contentTitle().then(($el) => {
          assertCssValueIsApproximately($el, "width", computedWidth - 30);
        });
      }
    );

    it.each([
      [true, 70, (totalWidth * 70) / 100],
      [false, 50, (totalWidth * 50) / 100],
    ])(
      "should check Content component has bodyFullWidth parameter",
      (bodyFullWidth, titleWidth, computedWidth) => {
        CypressMountWithProviders(
          <ContentComponent
            titleWidth={titleWidth}
            bodyFullWidth={bodyFullWidth}
          />
        );
        contentBody().then(($el) => {
          assertCssValueIsApproximately(
            $el,
            "width",
            bodyFullWidth ? totalWidth : computedWidth
          );
        });
      }
    );
  });

  describe("Accessibility tests for Content component", () => {
    it("should pass accessibilty tests for Content default story", () => {
      CypressMountWithProviders(<ContentComponent />);
      cy.checkAccessibility();
    });
  });
});
