import React from "react";
import { sprintf } from "sprintf-js";
import Box from "../box";
import Help from "./help.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import { getDataElementByValue, getComponent } from "../../../cypress/locators";

import { keyCode } from "../../../cypress/support/helper";
import {
  COLOR,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const tooltipText = "Some helpful text goes here";
const errorMsg = (msg, param) => sprintf(msg, param, "");

const HelpComponent = ({ ...props }) => {
  return (
    <div
      style={{
        marginLeft: "200px",
        marginRight: "64px",
        marginTop: "64px",
        marginBottom: "64px",
      }}
    >
      <Help {...props} />
    </div>
  );
};

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

    it.each(["-1", "0", "1", "5"])(
      "should check %s as tabIndex for Help component",
      (tabIndex) => {
        CypressMountWithProviders(<HelpComponent tabIndex={tabIndex} />);

        if (tabIndex === "-1") {
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
      const asElem = "foo";
      const error = errorMsg(
        "Warning: The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.%s",
        asElem
      );
      let errors;
      beforeEach(() => {
        cy.window().then((win) => {
          errors = cy.spy(win.console, "error").as("spyWinConsoleError");
        });
      });
      it("should throw a console error when invalid html elements are used", () => {
        CypressMountWithProviders(<HelpComponent as={asElem} />);
        cy.wrap(errors).then(() => {
          if (errors.getCalls().length) {
            const consoleError = errors.getCalls()[0].args[0];
            const consoleErrorTrim = consoleError.replace("\n", "");
            expect(errorMsg(consoleErrorTrim, asElem)).to.equal(error);
          }
        });
      });
    });

    it.each(["bottom", "left", "right", "top"])(
      "should check %s position of tooltip for Help component",
      (position) => {
        CypressMountWithProviders(
          <HelpComponent tooltipPosition={position} isFocused>
            {`This tooltip is positioned ${position}`}
          </HelpComponent>
        );
        getComponent("help").should("be.visible").and("have.css", position);
      }
    );

    it.each([
      ["carbon", "https://carbon.sage.com"],
      ["google", "https://www.google.com"],
    ])("should check %s href for Help component", (name, link) => {
      CypressMountWithProviders(<HelpComponent href={link} />);
      getComponent("help").should("have.attr", "href", link);
    });

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

    it.each([
      ["orange", COLOR.ORANGE],
      ["red", COLOR.RED],
      ["black", COLOR.BLACK],
      ["brown", COLOR.BROWN],
    ])(
      "should check tooltip background-color as %s for Help component",
      (name, color) => {
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

    it.each([
      ["orange", COLOR.ORANGE],
      ["red", COLOR.RED],
      ["black", COLOR.BLACK],
      ["brown", COLOR.BROWN],
    ])(
      "should check tooltip font color as %s for Help component",
      (name, color) => {
        CypressMountWithProviders(
          <HelpComponent tooltipFontColor={color} isFocused>
            {tooltipText}
          </HelpComponent>
        );
        getDataElementByValue("tooltip").should("have.css", "color", color);
      }
    );

    it.each(["top", "bottom", "right", "left"])(
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
            {tooltipText}{" "}
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

    it.each(["error", "add", "minus", "settings"])(
      "should check %s icon for Help component",
      (icon) => {
        CypressMountWithProviders(<HelpComponent isFocused type={icon} />);
        getComponent("icon").should("have.attr", "type", icon);
      }
    );
  });
});
