import * as React from "react";
import AppWrapper from "./app-wrapper.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import APP_WRAPPER_PREVIEW from "../../../cypress/locators/app-wrapper/locators";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

context("Testing App Wrapper component", () => {
  describe("Should render app wrapper component", () => {
    it("should check default App Wrapper", () => {
      CypressMountWithProviders(
        <AppWrapper className="cypressTest">
          This component will wrap its children within the width constraints of
          your application.
        </AppWrapper>
      );

      cy.get(APP_WRAPPER_PREVIEW).should(
        "have.text",
        "This component will wrap its children within the width constraints of your application."
      );
      cy.get(APP_WRAPPER_PREVIEW).should("have.class", "cypressTest");
    });

    it.each(testData)(
      "should render App Wrapper with %s as special characters",
      (specialCharacters) => {
        CypressMountWithProviders(<AppWrapper>{specialCharacters}</AppWrapper>);

        cy.get(APP_WRAPPER_PREVIEW).should("have.text", specialCharacters);
      }
    );
  });
});
