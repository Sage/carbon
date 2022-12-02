import * as React from "react";
import LoaderBar from "./loader-bar.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import loaderBar from "../../../cypress/locators/loader-bar/index";
import { SIZE } from "../../../cypress/support/component-helper/constants";

context("Tests for LoaderBar component", () => {
  describe("should check LoaderBar component properties", () => {
    it.each([
      [SIZE.SMALL, 4],
      [SIZE.MEDIUM, 8],
      [SIZE.LARGE, 16],
    ])("should check %s size for LoaderBar component", (size, height) => {
      CypressMountWithProviders(<LoaderBar size={size} mt={2} />);

      loaderBar().children().should("have.css", "height", `${height}px`);
      loaderBar()
        .children()
        .children()
        .should("have.css", "height", `${height}px`)
        .and("have.css", "animation-duration", "2s")
        .and("have.css", "animation-play-state", "running");
    });
  });
});
