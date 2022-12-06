import React from "react";
import LoaderBar from "./loader-bar.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import loaderBar from "../../../cypress/locators/loader-bar/index";
import { SIZE } from "../../../cypress/support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

context("Tests for LoaderBar component", () => {
  describe("should check LoaderBar component properties", () => {
    it.each([
      [SIZE.SMALL, 4],
      [SIZE.MEDIUM, 8],
      [SIZE.LARGE, 16],
    ])("should check %s size for LoaderBar component", (size, height) => {
      CypressMountWithProviders(<LoaderBar size={size} mt={2} />);

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
});
