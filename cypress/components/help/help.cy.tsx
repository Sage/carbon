/* eslint-disable jest/valid-expect, jest/no-conditional-expect */
import React from "react";
import Box from "../../../src/components/box";
import Help, { HelpProps } from "../../../src/components/help/help.component";
import { HelpComponent } from "../../../src/components/help/help-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { getDataElementByValue, getComponent } from "../../locators";
import { keyCode } from "../../support/helper";
import { COLOR, CHARACTERS } from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const tooltipText = "Some helpful text goes here";

context("Tests for Help component", () => {
  describe("should check Help component properties", () => {
    it.each(testData)(
      "should check %s as className for Help component",
      (classname) => {
        CypressMountWithProviders(<HelpComponent className={classname} />);
        getComponent("help").should("have.class", classname);
      }
    );

    it.each(testData)(
      "should check %s as children for Help component",
      (children) => {
        CypressMountWithProviders(<Help> {children} </Help>);
        getComponent("help").realHover();
        getDataElementByValue("tooltip")
          .should("be.visible")
          .and("contain.text", children);
      }
    );

    it.each(testData)("should check %s as helpId for Help component", (id) => {
      CypressMountWithProviders(<HelpComponent helpId={id} />);
      getComponent("help").should("have.id", id);
    });

    it.each([-1, 0, 1, 5])(
      "should check %s as tabIndex for Help component",
      (tabIndex) => {
        CypressMountWithProviders(<HelpComponent tabIndex={tabIndex} />);

        if (tabIndex === -1) {
          getComponent("help").trigger("keydown", {
            ...keyCode("Tab"),
            force: true,
          });

          getComponent("help").should("not.be.focused");
        } else {
          getComponent("help").tab().should("have.focus");
        }
      }
    );

    describe("check as prop for Help component", () => {
      it("should throw a console error when invalid html elements are used", () => {
        cy.spy(window.console, "error").as("consoleErrorSpy");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        CypressMountWithProviders(<HelpComponent as="foo" />);
        cy.get("@consoleErrorSpy").should("have.been.called");
      });
    });

    it.each([
      "bottom",
      "left",
      "right",
      "top",
    ] as HelpProps["tooltipPosition"][])(
      "should check %s position of tooltip for Help component",
      (tooltipPosition) => {
        CypressMountWithProviders(
          <HelpComponent tooltipPosition={tooltipPosition} isFocused>
            {`This tooltip is positioned ${tooltipPosition}`}
          </HelpComponent>
        );
        getComponent("help")
          .should("be.visible")
          .and("have.css", tooltipPosition);
      }
    );

    it.each(["https://carbon.sage.com", "google", "https://www.google.com"])(
      "should check %s href for Help component",
      (link) => {
        CypressMountWithProviders(<HelpComponent href={link} />);
        getComponent("help").should("have.attr", "href", link);
      }
    );

    it.each([true, false])(
      "should check when isFocused is %s for Help component",
      (boolVal) => {
        CypressMountWithProviders(
          <HelpComponent isFocused={boolVal}>{tooltipText}</HelpComponent>
        );
        if (boolVal === true) {
          getDataElementByValue("tooltip").should("be.visible");
        } else {
          getDataElementByValue("tooltip").should("not.exist");
        }
      }
    );

    it.each([COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN])(
      "should check tooltip background-color as %s for Help component",
      (color) => {
        CypressMountWithProviders(
          <HelpComponent tooltipBgColor={color} isFocused>
            {tooltipText}
          </HelpComponent>
        );
        getDataElementByValue("tooltip").should(
          "have.css",
          "background-color",
          color
        );
      }
    );

    it.each([COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN])(
      "should check tooltip font color as %s for Help component",
      (color) => {
        CypressMountWithProviders(
          <HelpComponent tooltipFontColor={color} isFocused>
            {tooltipText}
          </HelpComponent>
        );
        getDataElementByValue("tooltip").should("have.css", "color", color);
      }
    );

    it.each(["top", "bottom", "right", "left"] as HelpProps["position"][])(
      "should check flip position to the %s for Help component",
      (position) => {
        CypressMountWithProviders(
          <Box m="50px">
            <HelpComponent isFocused tooltipFlipOverrides={[position]}>
              {`This tooltip is positioned ${position}`}
            </HelpComponent>
          </Box>
        );
        cy.viewport(700, 120);
        cy.scrollTo(50, 50);
        getDataElementByValue("tooltip").should(
          "have.attr",
          "data-placement",
          position
        );
      }
    );

    it.each(testData)(
      "should check tooltip id as %s for Help component",
      (id) => {
        CypressMountWithProviders(
          <HelpComponent tooltipId={id} isFocused>
            {tooltipText}
          </HelpComponent>
        );
        getDataElementByValue("tooltip").should("have.id", id);
      }
    );

    it.each(testData)(
      "should check aria-label as %s for Help component",
      (label) => {
        CypressMountWithProviders(<HelpComponent ariaLabel={label} />);
        getComponent("help").should("have.attr", "aria-label", label);
      }
    );

    it.each(["error", "add", "minus", "settings"] as HelpProps["type"][])(
      "should check %s icon for Help component",
      (icon) => {
        CypressMountWithProviders(<HelpComponent isFocused type={icon} />);
        getComponent("icon").should("have.attr", "type", icon);
      }
    );
  });

  describe("Accessibility tests for Help component", () => {
    it.each(testData)(
      "should check %s as helpId for accessibility tests",
      (id) => {
        CypressMountWithProviders(<HelpComponent helpId={id} />);
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check className as %s for accessibility tests",
      (classname) => {
        CypressMountWithProviders(<HelpComponent className={classname} />);
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check %s as children for accessibility tests",
      (children) => {
        CypressMountWithProviders(<Help> {children} </Help>);
        cy.checkAccessibility();
      }
    );

    // FE-5625
    // eslint-disable-next-line
    describe.skip("check accessibility for tabIndex", () => {
      it.each([-1, 0, 1])(
        "should check tabIndex as %s for accessibility tests",
        (tabIndex) => {
          CypressMountWithProviders(<HelpComponent tabIndex={tabIndex} />);
          cy.checkAccessibility();
        }
      );
    });

    it.each([
      "bottom",
      "left",
      "right",
      "top",
    ] as HelpProps["tooltipPosition"][])(
      "should check tooltipPosition as %s for accessibility tests",
      (position) => {
        CypressMountWithProviders(
          <HelpComponent tooltipPosition={position} isFocused>
            {`This tooltip is positioned ${position}`}
          </HelpComponent>
        );
        cy.checkAccessibility();
      }
    );

    it.each(["https://carbon.sage.com", "https://www.google.com"])(
      "should check href as %s for accessibility tests",
      (name, link) => {
        CypressMountWithProviders(<HelpComponent href={link} />);
        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "should check isFocused as %s for accessibility tests",
      (boolVal) => {
        CypressMountWithProviders(
          <HelpComponent isFocused={boolVal}>{tooltipText}</HelpComponent>
        );
        cy.checkAccessibility();
      }
    );

    it.each([COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN])(
      "should check tooltipBgColor as %s for accessibility tests",
      (color) => {
        CypressMountWithProviders(
          <HelpComponent tooltipBgColor={color} isFocused>
            {tooltipText}
          </HelpComponent>
        );
        cy.checkAccessibility();
      }
    );

    it.each([COLOR.ORANGE, COLOR.RED, COLOR.BLACK, COLOR.BROWN])(
      "should check tooltipFontColor as %s for accessibility tests",
      (color) => {
        CypressMountWithProviders(
          <HelpComponent tooltipFontColor={color} isFocused>
            {tooltipText}
          </HelpComponent>
        );
        cy.checkAccessibility();
      }
    );

    it.each(["top", "bottom", "right", "left"] as HelpProps["position"][])(
      "should check tooltipFlipOverrides position as %s for accessibility tests",
      (position) => {
        CypressMountWithProviders(
          <Box m="50px">
            <HelpComponent isFocused tooltipFlipOverrides={[position]}>
              {`This tooltip is positioned ${position}`}
            </HelpComponent>
          </Box>
        );
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check tooltipId as %s for accessibility tests",
      (id) => {
        CypressMountWithProviders(
          <HelpComponent tooltipId={id} isFocused>
            {tooltipText}
          </HelpComponent>
        );
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check ariaLabel as %s for accessibility tests",
      (label) => {
        CypressMountWithProviders(<HelpComponent ariaLabel={label} />);
        cy.checkAccessibility();
      }
    );

    it.each(["error", "add", "minus", "settings"] as HelpProps["type"][])(
      "should check type as %s for accessibility tests",
      (icon) => {
        CypressMountWithProviders(<HelpComponent isFocused type={icon} />);
        cy.checkAccessibility();
      }
    );
  });
});
