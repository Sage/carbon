import React from "react";
import loaderBar from "../../locators/loader-bar/index";
import { LOADER_BAR_SIZES } from "../../../src/components/loader-bar/loader-bar.config";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { LoaderBarComponentTest as LoaderBarComponent } from "../../../src/components/loader-bar/loader-bar-test.stories";
import { useJQueryCssValueAndAssert } from "../../support/component-helper/common-steps";

context("Tests for LoaderBar component", () => {
  describe("should check LoaderBar component properties", () => {
    it.each([
      [LOADER_BAR_SIZES[0], 4],
      [LOADER_BAR_SIZES[1], 8],
      [LOADER_BAR_SIZES[2], 16],
    ])("should check %s size for LoaderBar component", (size, height) => {
      CypressMountWithProviders(<LoaderBarComponent size={size} mt={2} />);

      loaderBar()
        .children()
        .then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
        });
      loaderBar()
        .children()
        .children()
        .then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
          expect($el.css("animation-duration")).to.equals("2s");
          expect($el.css("animation-play-state")).to.equals("running");
        });
    });
  });

  describe("Accessibility tests for LoaderBar", () => {
    it("should pass accessibility tests for LoaderBar Component", () => {
      CypressMountWithProviders(<LoaderBarComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for small size", () => {
      CypressMountWithProviders(<LoaderBarComponent size="small" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for medium size", () => {
      CypressMountWithProviders(<LoaderBarComponent size="medium" />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for large size", () => {
      CypressMountWithProviders(<LoaderBarComponent size="large" />);

      cy.checkAccessibility();
    });
  });
});
