import React from "react";
import Icon from "./icon.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { icon, getDataElementByValue } from "../../../cypress/locators";
import {
  SIZE,
  COLOR,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const colorData = [COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN];

const IconComponent = ({ ...props }) => {
  return <Icon type="add" tooltipVisible {...props} />;
};

const IconTooltipComponent = ({ ...props }) => {
  return (
    <div
      style={{
        marginLeft: "300px",
        marginRight: "64px",
        marginTop: "64px",
        marginBottom: "64px",
      }}
    >
      <Icon
        type="add"
        tooltipVisible
        tooltipMessage="Hey I'm a tooltip with a different position!"
        {...props}
      />
      ;
    </div>
  );
};

context("Tests for Icon component", () => {
  describe("should check Icon component properties", () => {
    it.each(["error", "add", "admin", "alert"])(
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
    ])("should check %s bgSize for Icon component", (size, pixelSize) => {
      CypressMountWithProviders(<IconComponent bgSize={size} />);
      icon().then(($el) => {
        useJQueryCssValueAndAssert($el, "height", pixelSize);
        useJQueryCssValueAndAssert($el, "width", pixelSize);
      });
    });

    it.each([
      ["circle", 50],
      ["rounded-rect", 20],
      ["square", 0],
    ])("should check bgShape as %s for Icon component", (bgShape, radius) => {
      CypressMountWithProviders(<IconComponent bgShape={bgShape} />);
      icon()
        .should("have.css", "border-bottom-left-radius", `${radius}%`)
        .and("have.css", "border-bottom-right-radius", `${radius}%`)
        .and("have.css", "border-top-left-radius", `${radius}%`)
        .and("have.css", "border-top-right-radius", `${radius}%`);
    });

    it.each([
      [SIZE.SMALL, 24],
      [SIZE.MEDIUM, 32],
      [SIZE.LARGE, 40],
      [SIZE.EXTRALARGE, 56],
    ])("should check %s fontSize for Icon component", (fontSize, pixelSize) => {
      CypressMountWithProviders(<IconComponent fontSize={fontSize} />);
      icon().then(($el) => {
        useJQueryCssValueAndAssert($el, "height", pixelSize);
        useJQueryCssValueAndAssert($el, "width", pixelSize);
      });
    });

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

    it.each(["true", "false"])(
      "should check when aria-hidden is %s for Icon component",
      (bool) => {
        CypressMountWithProviders(<IconComponent aria-hidden={bool} />);
        icon().should("have.attr", "aria-hidden", bool);
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
          .contains(tooltipMessage);
      }
    );

    it.each(["bottom", "left", "right", "top"])(
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
      ["left", "bottom", "top"],
      ["top", "bottom", "top"],
      ["left", "top", "bottom"],
      ["bottom", "top", "bottom"],
      ["bottom", "left", "bottom"],
      ["bottom", "right", "bottom"],
      ["top", "left", "top"],
      ["top", "right", "top"],
      ["right", "bottom", "right"],
      ["right", "top", "right"],
    ])(
      "should check flip position to the %s when tooltip position is %s and scrolling to the %s side for Icon component",
      (flipPosition, tooltipPosition, scrollPosition) => {
        CypressMountWithProviders(
          <div style={{ padding: "60px 60px 60px 60px" }}>
            <IconTooltipComponent
              tooltipFlipOverrides={[flipPosition]}
              tooltipPosition={tooltipPosition}
            />
          </div>
        );
        cy.viewport(700, 120);
        cy.scrollTo(scrollPosition);
        getDataElementByValue("tooltip").should(
          "have.attr",
          "data-placement",
          flipPosition
        );
      }
    );

    it.each(testData)("should check id as %s for Icon component", (id) => {
      CypressMountWithProviders(<IconComponent id={id} />);
      icon().should("have.id", id);
    });
  });
});
