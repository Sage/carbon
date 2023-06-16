import React from "react";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import Image from "../../../src/components/image/image.component";
import * as stories from "../../../src/components/image/image.stories";
import carbonLogo from "../../../logo/carbon-logo.png";

context("Image component", () => {
  it("when hidden prop is false, component should be visible to sighted users", () => {
    CypressMountWithProviders(<Image src={carbonLogo} alt="Carbon logo" />);
    cy.get("img").should("be.visible");
  });

  it("when hidden prop is true, component should not be visible to sighted users", () => {
    CypressMountWithProviders(
      <Image src={carbonLogo} alt="Carbon logo" hidden />
    );
    cy.get("img").should("not.be.visible");
  });

  describe("Accessibility tests for Image component", () => {
    it("should pass accessibility tests for Image default story", () => {
      CypressMountWithProviders(<stories.DefaultStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Image component AsAnImg story", () => {
      CypressMountWithProviders(<stories.AsAnImg />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Image component CustomResponsiveBehaviour story", () => {
      CypressMountWithProviders(<stories.CustomResponsiveBehaviour />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Image component DecorativeStory", () => {
      CypressMountWithProviders(<stories.DecorativeStory />);

      cy.checkAccessibility();
    });
  });
});
