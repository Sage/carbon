import React from "react";
import { IconProps } from "components/icon";
import {
  IconComponent,
  IconTooltipComponent,
} from "../../../src/components/icon/icon-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { icon, getDataElementByValue, cyRoot } from "../../locators";
import {
  SIZE,
  COLOR,
  CHARACTERS,
} from "../../support/component-helper/constants";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const colorData = [COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN];

context("Tests for Icon component", () => {
  describe("should check Icon component properties", () => {
    it.each(["error", "add", "admin", "alert"] as IconProps["type"][])(
      "should check %s type for Icon component",
      (iconType) => {
        CypressMountWithProviders(<IconComponent type={iconType} />);
        icon().should("have.attr", "type", iconType);
      }
    );

    it.each([
      [SIZE.EXTRASMALL, 16],
      [SIZE.SMALL, 24],
      [SIZE.MEDIUM, 32],
      [SIZE.LARGE, 40],
      [SIZE.EXTRALARGE, 56],
    ] as [IconProps["bgSize"], number][])(
      "should check %s bgSize for Icon component",
      (size, pixelSize) => {
        CypressMountWithProviders(<IconComponent bgSize={size} />);
        icon().then(($el) => {
          assertCssValueIsApproximately($el, "height", pixelSize);
          assertCssValueIsApproximately($el, "width", pixelSize);
        });
      }
    );

    it.each([
      ["circle", 50],
      ["rounded-rect", 20],
      ["square", 0],
    ] as [IconProps["bgShape"], number][])(
      "should check bgShape as %s for Icon component",
      (bgShape, radius) => {
        CypressMountWithProviders(<IconComponent bgShape={bgShape} />);
        icon()
          .should("have.css", "border-bottom-left-radius", `${radius}%`)
          .and("have.css", "border-bottom-right-radius", `${radius}%`)
          .and("have.css", "border-top-left-radius", `${radius}%`)
          .and("have.css", "border-top-right-radius", `${radius}%`);
      }
    );

    it.each([
      [SIZE.SMALL, 24],
      [SIZE.MEDIUM, 32],
      [SIZE.LARGE, 40],
      [SIZE.EXTRALARGE, 56],
    ] as [IconProps["fontSize"], number][])(
      "should check %s fontSize for Icon component",
      (fontSize, pixelSize) => {
        CypressMountWithProviders(<IconComponent fontSize={fontSize} />);
        icon().then(($el) => {
          assertCssValueIsApproximately($el, "height", pixelSize);
          assertCssValueIsApproximately($el, "width", pixelSize);
        });
      }
    );

    it.each(colorData)(
      "should check %s background color for Icon component",
      (backgroundColor) => {
        CypressMountWithProviders(<IconComponent bg={backgroundColor} />);
        icon().should("have.css", "background-color", backgroundColor);
      }
    );

    it.each(colorData)(
      "should check icon color as %s for Icon component",
      (iconColor) => {
        CypressMountWithProviders(<IconComponent color={iconColor} />);
        icon().should("have.css", "color", iconColor);
      }
    );

    it.each([
      [true, "rgba(0, 0, 0, 0.3)"],
      [false, "rgba(0, 0, 0, 0.9)"],
    ])("should check when disabled is %s for Icon component", (bool, color) => {
      CypressMountWithProviders(<IconComponent disabled={bool} />);
      icon().should("have.css", "color", color);
    });

    it.each(testData)(
      "should check ariaLabel as %s for Icon component",
      (ariaLabel) => {
        CypressMountWithProviders(<IconComponent ariaLabel={ariaLabel} />);
        icon().should("have.attr", "aria-label", ariaLabel);
      }
    );

    it.each([
      [true, "true"],
      [false, "false"],
    ])(
      "should check when aria-hidden is %s for Icon component",
      (bool, hidden) => {
        CypressMountWithProviders(<IconComponent aria-hidden={bool} />);
        icon().should("have.attr", "aria-hidden", hidden);
      }
    );

    it.each(testData)(
      "should check tooltipMessage as %s for Icon component",
      (tooltipMessage) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipMessage={tooltipMessage} />
        );
        icon().realHover();
        getDataElementByValue("tooltip")
          .should("be.visible")
          .and("contain.text", tooltipMessage);
        cyRoot().realHover({ position: "topLeft" });
      }
    );

    it.each([
      "bottom",
      "left",
      "right",
      "top",
    ] as IconProps["tooltipPosition"][])(
      "should check %s position of tooltip for Icon component",
      (position) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipPosition={position} />
        );
        icon().should("be.visible").and("have.css", position);
      }
    );

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should check when tooltip visibility is %s for Icon component",
      (bool, state) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipVisible={bool} />
        );
        getDataElementByValue("tooltip").should(state);
      }
    );

    it.each(colorData)(
      "should check tooltip background-color as %s for Icon component",
      (tooltipBgColor) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipBgColor={tooltipBgColor} />
        );
        getDataElementByValue("tooltip").should(
          "have.css",
          "background-color",
          tooltipBgColor
        );
      }
    );

    it.each(colorData)(
      "should check tooltip font color as %s for Icon component",
      (tooltipFontColor) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipFontColor={tooltipFontColor} />
        );
        getDataElementByValue("tooltip").should(
          "have.css",
          "color",
          tooltipFontColor
        );
      }
    );

    it.each(testData)(
      "should check tooltip id as %s for Icon component",
      (tooltipId) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipId={tooltipId} />
        );
        getDataElementByValue("tooltip").should("have.id", tooltipId);
      }
    );

    it.each([
      [["left"], "left", "bottom", "top"],
      [["top"], "top", "bottom", "top"],
      [["left"], "left", "top", "bottom"],
      [["bottom"], "bottom", "top", "bottom"],
      [["bottom"], "bottom", "left", "bottom"],
      [["bottom"], "bottom", "right", "bottom"],
      [["top"], "top", "left", "top"],
      [["top"], "top", "right", "top"],
      [["right"], "right", "bottom", "right"],
      [["right"], "right", "top", "right"],
    ] as [IconProps["tooltipFlipOverrides"], string, IconProps["tooltipPosition"], "top" | "bottom" | "right"][])(
      "should check flip position to the %s when tooltip position is %s and scrolling to the %s side for Icon component",
      (flipPosition, expectedPosition, tooltipPosition, scrollPosition) => {
        CypressMountWithProviders(
          <div style={{ padding: "60px 60px 60px 60px" }}>
            <IconTooltipComponent
              tooltipFlipOverrides={flipPosition}
              tooltipPosition={tooltipPosition}
            />
          </div>
        );
        cy.viewport(700, 120);
        cy.scrollTo(scrollPosition);
        getDataElementByValue("tooltip").should(
          "have.attr",
          "data-placement",
          expectedPosition
        );
      }
    );

    it.each(testData)("should check id as %s for Icon component", (id) => {
      CypressMountWithProviders(<IconComponent id={id} />);
      icon().should("have.id", id);
    });
  });

  describe("Accessibility tests for Icon component", () => {
    it.each(["error", "add", "admin", "alert"] as IconProps["type"][])(
      "should check %s type for accessibilty tests",
      (iconType) => {
        CypressMountWithProviders(<IconComponent type={iconType} />);
        cy.checkAccessibility();
      }
    );

    it.each([
      SIZE.EXTRASMALL,
      SIZE.SMALL,
      SIZE.MEDIUM,
      SIZE.LARGE,
      SIZE.EXTRALARGE,
    ] as IconProps["bgSize"][])(
      "should check %s bgSize for accessibilty tests",
      (size) => {
        CypressMountWithProviders(<IconComponent bgSize={size} />);
        cy.checkAccessibility();
      }
    );

    it.each(["circle", "rounded-rect", "square"] as IconProps["bgShape"][])(
      "should check bgShape as %s for accessibilty tests",
      (bgShape) => {
        CypressMountWithProviders(<IconComponent bgShape={bgShape} />);
        cy.checkAccessibility();
      }
    );

    it.each([
      SIZE.SMALL,
      SIZE.MEDIUM,
      SIZE.LARGE,
      SIZE.EXTRALARGE,
    ] as IconProps["fontSize"][])(
      "should check %s fontSize for accessibilty tests",
      (fontSize) => {
        CypressMountWithProviders(<IconComponent fontSize={fontSize} />);
        cy.checkAccessibility();
      }
    );

    it.each(colorData)(
      "should check %s background color for accessibilty tests",
      (backgroundColor) => {
        CypressMountWithProviders(<IconComponent bg={backgroundColor} />);
        cy.checkAccessibility();
      }
    );

    it.each(colorData)(
      "should check icon color as %s for accessibilty tests",
      (iconColor) => {
        CypressMountWithProviders(<IconComponent color={iconColor} />);
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should check when disabled is %s for accessibilty tests",
      (bool) => {
        CypressMountWithProviders(<IconComponent disabled={bool} />);
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should check when aria-hidden is %s for accessibilty tests",
      (bool) => {
        CypressMountWithProviders(<IconComponent aria-hidden={bool} />);
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check tooltipMessage as %s for accessibilty tests",
      (tooltipMessage) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipMessage={tooltipMessage} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([
      "bottom",
      "left",
      "right",
      "top",
    ] as IconProps["tooltipPosition"][])(
      "should check %s position of tooltip for accessibilty tests",
      (position) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipPosition={position} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should check when tooltip visibility is %s for accessibilty tests",
      (bool) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipVisible={bool} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(colorData)(
      "should check tooltip background-color as %s for accessibilty tests",
      (tooltipBgColor) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipBgColor={tooltipBgColor} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(colorData)(
      "should check tooltip font color as %s for accessibilty tests",
      (tooltipFontColor) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipFontColor={tooltipFontColor} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check tooltip id as %s for accessibilty tests",
      (tooltipId) => {
        CypressMountWithProviders(
          <IconTooltipComponent tooltipId={tooltipId} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([
      [["left"], "bottom"],
      [["top"], "bottom"],
      [["left"], "top"],
      [["bottom"], "top"],
      [["bottom"], "left"],
      [["bottom"], "right"],
      [["top"], "left"],
      [["top"], "right"],
      [["right"], "bottom"],
      [["right"], "top"],
    ] as [IconProps["tooltipFlipOverrides"], IconProps["tooltipPosition"]][])(
      "should check flip position to the %s when tooltip position is %s and scrolling to the %s side for accessibilty tests",
      (flipPosition, tooltipPosition) => {
        CypressMountWithProviders(
          <div style={{ padding: "60px 60px 60px 60px" }}>
            <IconTooltipComponent
              tooltipFlipOverrides={flipPosition}
              tooltipPosition={tooltipPosition}
            />
          </div>
        );
        cy.checkAccessibility();
      }
    );

    it.each(testData)("should check id as %s for accessibilty tests", (id) => {
      CypressMountWithProviders(<IconComponent id={id} />);
      cy.checkAccessibility();
    });

    // FE-4643
    // eslint-disable-next-line
    describe.skip("Accessibility tests for ariaLabel", () => {
      it.each(testData)(
        "should check ariaLabel as %s for accessibilty tests",
        (ariaLabel) => {
          CypressMountWithProviders(<IconComponent ariaLabel={ariaLabel} />);
          cy.checkAccessibility();
        }
      );
    });
  });
});
