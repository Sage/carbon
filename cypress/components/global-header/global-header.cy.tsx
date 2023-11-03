/* eslint-disable jest/valid-expect, jest/valid-expect-in-promise */
import React from "react";
import GlobalHeader from "../../../src/components/global-header";
import {
  FullMenuExample,
  GlobalHeaderWithErrorHandler,
} from "../../../src/components/global-header/global-header-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";

import carbonLogo from "../../../logo/carbon-logo.png";
import navigationBar from "../../locators/navigation-bar";
import { globalHeader, globalHeaderLogo } from "../../locators/global-header";

context("Testing Global Header component", () => {
  it("should not cause a ResizeObserver-related error to occur", () => {
    CypressMountWithProviders(<GlobalHeaderWithErrorHandler />);
    cy.wait(500);
    cy.get("#error-div").should("have.text", "");
  });

  it("should check that z-index of component is greater than that of NavigationBar", () => {
    CypressMountWithProviders(<FullMenuExample />);
    globalHeader().invoke("css", "zIndex").as("globalHeaderZIndex");

    navigationBar().invoke("css", "zIndex").as("navigationBarZIndex");
    const globalIndex = parseInt(cy.get("@globalHeaderZIndex").toString());
    const NavIndex = parseInt(cy.get("@navigationBarZIndex").toString());

    expect(globalIndex > NavIndex);
  });

  it("should check when logo prop is passed, the height of the logo element never exceeds the maximum height of the component", () => {
    const logoHeight = 41;
    const expectedHeight = 40;

    const logo = (
      <img
        data-element="logo"
        height={logoHeight}
        src={carbonLogo}
        alt="Carbon logo"
      />
    );
    CypressMountWithProviders(<GlobalHeader logo={logo}>Example</GlobalHeader>);

    globalHeaderLogo().should("have.css", "height", `${expectedHeight}px`);
  });

  describe("Accessibility tests for Global-Header component", () => {
    it("should pass accessibility tests for Global-Header FullMenuExample", () => {
      CypressMountWithProviders(<FullMenuExample />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Global-Header when logo prop is passed", () => {
      const logoHeight = 41;

      const logo = (
        <img
          data-element="logo"
          height={logoHeight}
          src={carbonLogo}
          alt="Carbon logo"
        />
      );
      CypressMountWithProviders(
        <GlobalHeader logo={logo}>Example</GlobalHeader>
      );

      cy.checkAccessibility();
    });
  });
});
