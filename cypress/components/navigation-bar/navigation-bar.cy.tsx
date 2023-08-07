import React from "react";
import Box from "../../../src/components/box";
import NavigationBar, {
  NavigationBarProps,
} from "../../../src/components/navigation-bar";
import { NavigationBarComponent } from "../../../src/components/navigation-bar/navigation-bar-test.stories";
import { Menu, MenuItem } from "../../../src/components/menu";
import * as stories from "../../../src/components/navigation-bar/navigation-bar.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import navigationBar from "../../locators/navigation-bar";
import { COLOR, CHARACTERS } from "../../support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = CHARACTERS.STANDARD;
const variants = [
  ["black", COLOR.BLACK],
  ["light", "rgb(230, 235, 237)"],
  ["white", "rgb(255, 255, 255)"],
  ["dark", "rgb(0, 50, 76)"],
] as [NavigationBarProps["navigationType"], string][];
const offsetVal = [25, 100, -100];

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

    it.each(["fixed", "sticky"] as NavigationBarProps["position"][])(
      "should render NavigationBar component with position prop set to %s with orientation set to top",
      (position) => {
        CypressMountWithProviders(
          <NavigationBarComponent position={position} orientation="top" />
        );

        navigationBar().should("have.css", "position", position);
      }
    );

    it.each(["fixed", "sticky"] as NavigationBarProps["position"][])(
      "should render NavigationBar component with position prop set to %s with orientation set to bottom",
      (position) => {
        CypressMountWithProviders(
          <NavigationBarComponent position={position} orientation="bottom" />
        );

        navigationBar().should("have.css", "position", position);
      }
    );

    describe.each(["top", "bottom"] as NavigationBarProps["orientation"][])(
      "orientation %s",
      (orientation) => {
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
      }
    );

    it.each(["top", "bottom"] as NavigationBarProps["orientation"][])(
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
    ] as [NavigationBarProps["position"], string][])(
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

  describe("Accessibility tests for NavigationBar component", () => {
    it("should pass accessibility tests for NavigationBar Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NavigationBar DarkTheme story", () => {
      CypressMountWithProviders(<stories.DarkTheme />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NavigationBar WhiteTheme story", () => {
      CypressMountWithProviders(<stories.WhiteTheme />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NavigationBar BlackTheme story", () => {
      CypressMountWithProviders(<stories.BlackTheme />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NavigationBar ExampleWithMenu story", () => {
      CypressMountWithProviders(<stories.ExampleWithMenu />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NavigationBar IsLoading story", () => {
      CypressMountWithProviders(<stories.IsLoading />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NavigationBar WithCustomSpacing story", () => {
      CypressMountWithProviders(<stories.WithCustomSpacing />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NavigationBar ContentMaxWidthBox story", () => {
      CypressMountWithProviders(<stories.ContentMaxWidthBox />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NavigationBar Sticky story", () => {
      CypressMountWithProviders(<stories.Sticky />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NavigationBar Fixed story", () => {
      CypressMountWithProviders(<stories.Fixed />);

      cy.checkAccessibility();
    });
  });
});
