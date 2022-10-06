import React from "react";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import Image from ".";
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
});
