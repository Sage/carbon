import React from "react";
import * as stories from "./carbon-provider.stories";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

context("Testing Carbon Provider component", () => {
  describe.skip("should render Carbon Provider component", () => {
    // functionality of theming is tested in `theme.test.js` file
  });

  describe("Accessibility tests for Carbon Provider", () => {
    it("should pass accessibility tests for Carbon Provider", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Carbon Provider mixing story", () => {
      CypressMountWithProviders(<stories.Mixing />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Carbon Provider theming story", () => {
      CypressMountWithProviders(<stories.Theming />);

      cy.checkAccessibility();
    });
  });
});
