import React from "react";
import {
  AnchorNavigationComponent,
  InFullScreenDialogStory,
} from "../../../src/components/anchor-navigation/anchor-navigation-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import {
  anchorNavigationStickyNavigation,
  anchorNavigationStickyMainPage,
  anchorNavigationItem,
} from "../../locators/anchor-navigation";
import { getDataElementByValue } from "../../locators";

context("Testing AnchorNavigation component", () => {
  describe("should render AnchorNavigation component", () => {
    it.each([
      ["First", "First section"],
      ["Second", "Second section"],
      ["Third", "Third section"],
      ["Navigation item with very long label", "Fourth section"],
      ["Fifth", "Fifth section"],
    ])(
      "should scrolldown to the %s AnchorNavigation section after pressing Tab on the %s",
      (sectionIndex, sectionName) => {
        CypressMountWithProviders(<AnchorNavigationComponent />);

        anchorNavigationStickyNavigation(sectionIndex).click();
        anchorNavigationStickyMainPage(sectionName).should("be.visible");
      }
    );

    it.each([
      ["First", "First section"],
      ["Fifth", "Fifth section"],
    ])(
      "should scroll to the %s and verify that proper %s AnchorNavigation row is visible",
      (sectionIndex, sectionName) => {
        CypressMountWithProviders(<AnchorNavigationComponent />);

        anchorNavigationStickyNavigation(sectionIndex).click();
        anchorNavigationStickyMainPage(sectionName).scrollIntoView();
        anchorNavigationStickyMainPage(sectionName).should("be.visible");
      }
    );
  });

  describe("Accessibility tests for Anchor Navigation component", () => {
    it("should pass accessibility tests for Anchor Navigation default story", () => {
      CypressMountWithProviders(<AnchorNavigationComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Anchor Navigation in full screen dialog", () => {
      CypressMountWithProviders(<InFullScreenDialogStory />);

      return getDataElementByValue("main-text")
        .click()
        .then(() => {
          cy.checkAccessibility();
        });
    });
  });

  it("should have the expected border radius styling", () => {
    CypressMountWithProviders(<AnchorNavigationComponent />);

    anchorNavigationItem(0).should(
      "have.css",
      "border-radius",
      "0px 8px 8px 0px"
    );
    anchorNavigationItem(1).should(
      "have.css",
      "border-radius",
      "0px 8px 8px 0px"
    );
    anchorNavigationItem(2).should(
      "have.css",
      "border-radius",
      "0px 8px 8px 0px"
    );
    anchorNavigationItem(3).should(
      "have.css",
      "border-radius",
      "0px 8px 8px 0px"
    );
    anchorNavigationItem(4).should(
      "have.css",
      "border-radius",
      "0px 8px 8px 0px"
    );
  });
});
