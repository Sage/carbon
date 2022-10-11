import React from "react";
import Box from "../box/box.component";
import NavigationBar from "./navigation-bar.component";
import { Menu, MenuItem } from "../menu";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import navigationBar from "../../../cypress/locators/navigation-bar";

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const testData = "cypressData";
const variants = [
  ["black", "rgb(0, 0, 0)"],
  ["light", "rgb(230, 235, 237)"],
  ["white", "rgb(255, 255, 255)"],
  ["dark", "rgb(0, 50, 76)"],
];
const offsetVal = [25, 100, -100];

const NavigationBarComponent = ({ children, ...props }) => {
  const isChildren = children != null ? children : "Cypress tests";
  return <NavigationBar {...props}>{isChildren}</NavigationBar>;
};

context("Testing NavigationBar component", () => {
  describe("should render NavigationBar component", () => {
    it.each(specialCharacters)(
      "should render NavigationBar component with %s as a children",
      (childrenValue) => {
        CypressMountWithProviders(
          <NavigationBarComponent>{childrenValue}</NavigationBarComponent>
        );

        navigationBar().should("have.text", childrenValue);
      }
    );

    it("should render NavigationBar component with ariaLabel prop", () => {
      CypressMountWithProviders(
        <NavigationBarComponent ariaLabel={testData} />
      );

      navigationBar().should("have.attr", "aria-label", testData);
    });

    it.each(variants)(
      "should render NavigationBar component with %s as a navigationType",
      (navigationType, color) => {
        CypressMountWithProviders(
          <NavigationBarComponent navigationType={navigationType} />
        );

        navigationBar().should("have.css", "background-color", color);
      }
    );

    it.each([
      [true, "not.exist"],
      [false, "be.visible"],
    ])(
      "should render NavigationBar component with isLoading prop set to %s",
      (boolean, assertion) => {
        CypressMountWithProviders(
          <NavigationBarComponent isLoading={boolean}>
            {testData}
          </NavigationBarComponent>
        );

        cy.contains(testData).should(assertion);
      }
    );

    it.each(["fixed", "sticky"])(
      "should render NavigationBar component with position prop set to %s with orientation set to top",
      (position) => {
        CypressMountWithProviders(
          <NavigationBarComponent position={position} orientation="top" />
        );

        navigationBar().should("have.css", "position", position);
      }
    );

    it.each(["fixed", "sticky"])(
      "should render NavigationBar component with position prop set to %s with orientation set to bottom",
      (position) => {
        CypressMountWithProviders(
          <NavigationBarComponent position={position} orientation="bottom" />
        );

        navigationBar().should("have.css", "position", position);
      }
    );

    describe.each(["top", "bottom"])("orientation %s", (orientation) => {
      it.each(offsetVal)(
        "should render NavigationBar component with offset prop set to %s px",
        (offset) => {
          CypressMountWithProviders(
            <NavigationBarComponent
              offset={`${offset}px`}
              orientation={orientation}
              position="fixed"
            />
          );
          navigationBar().should("have.css", orientation, `${offset}px`);
        }
      );
    });

    it.each(["top", "bottom"])(
      "should render NavigationBar component with orientation prop set to %s",
      (orientation) => {
        CypressMountWithProviders(
          <NavigationBarComponent orientation={orientation} position="fixed" />
        );

        navigationBar().should("have.css", orientation, "0px");
      }
    );

    it.each([
      ["fixed", "be.visible"],
      ["sticky", "not.be.visible"],
    ])(
      "should render NavigationBar component with position prop set to %s and work as expected",
      (position, assertionOfFirstNavBar) => {
        CypressMountWithProviders(
          <div
            style={{
              height: "250px",
            }}
          >
            <NavigationBar
              position={position}
              orientation="top"
              offset="25px"
              aria-label="header"
            >
              <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
                <Menu display="flex" flex="1">
                  <MenuItem flex="1" onClick={() => {}}>
                    Menu Item One
                  </MenuItem>
                </Menu>
              </Box>
            </NavigationBar>
            <div
              style={{
                height: "1000px",
              }}
            />
            <NavigationBar
              position={position}
              orientation="bottom"
              offset="25px"
              aria-label="footer"
            >
              <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
                <Menu display="flex" flex="1">
                  <MenuItem flex="1" onClick={() => {}}>
                    Menu Item One
                  </MenuItem>
                </Menu>
              </Box>
            </NavigationBar>
          </div>
        );

        navigationBar().eq(0).should("be.visible");
        navigationBar().eq(1).should("be.visible");
        cy.scrollTo("bottomRight");
        navigationBar().eq(0).should(assertionOfFirstNavBar);
        navigationBar().eq(1).should("be.visible");
      }
    );
  });
});
