import React from "react";
import * as testStories from "./breadcrumbs-test.stories";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  breadcrumbsComponent,
  crumb,
} from "../../../cypress/locators/breadcrumbs";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

context("Testing Breadcrumbs component", () => {
  describe("should render Breadcrumbs component", () => {
    it("should check Breadcrumbs children is set visible", () => {
      CypressMountWithProviders(<testStories.Default />);

      breadcrumbsComponent()
        .find("ol")
        .children()
        .should("have.length", 4)
        .and("be.visible");
    });

    it("should check Breadcrumbs on hover color", () => {
      CypressMountWithProviders(<testStories.Default />);

      crumb(1)
        .realHover()
        .find("a")
        .should("have.css", "color", "rgb(0, 103, 56)");
    });

    it("should check Breadcrumbs on focus", () => {
      CypressMountWithProviders(<testStories.Default />);

      cy.get("body").tab();
      crumb(0).find("a").should("be.focused");
      cy.focused().tab().tab();
      crumb(2).find("a").should("be.focused");
    });

    it.each([
      [true, "aria-current", "page"],
      [false, "href", "#"],
    ])(
      "should check Crumb with isCurrent prop is %s",
      (boolean, attr, value) => {
        CypressMountWithProviders(
          <testStories.DefaultCrumb isCurrent={boolean} />
        );

        crumb(0).find("a").should("have.attr", attr, value);
      }
    );

    it("should check Crumb with href prop set to default val", () => {
      CypressMountWithProviders(
        <testStories.DefaultCrumb href={CHARACTERS.STANDARD} />
      );

      crumb(0).find("a").should("have.attr", "href", CHARACTERS.STANDARD);
    });
  });

  describe("should check Crumb props", () => {
    it.each([
      ["not.exist", true],
      ["be.visible", false],
    ])("should check Crumb divider is %s", (assertion, boolean) => {
      CypressMountWithProviders(
        <testStories.DefaultCrumb isCurrent={boolean} />
      );

      crumb(0).children().eq(1).should(assertion);
      if (!boolean) {
        crumb(0)
          .children()
          .eq(1)
          .then(($el) => {
            expect($el).to.have.text("/");
            expect($el).to.have.css("color", "rgba(0, 0, 0, 0.55)");
          });
      }
    });
  });

  describe("Accessibility tests for Breadcrumbs component", () => {
    it("should pass accessibilty tests for Breadcrumbs default story", () => {
      CypressMountWithProviders(<testStories.Default />);
      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for Crumb default story", () => {
      CypressMountWithProviders(<testStories.DefaultCrumb />);
      cy.checkAccessibility();
    });
  });
});
