import * as React from "react";
import { mount } from "@cypress/react";
import AppWrapper from "./app-wrapper.component";
import APP_WRAPPER_PREVIEW from "../../../cypress/locators/app-wrapper/locators";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

context("Testing App Wrapper component", () => {
  describe("Should render app wrapper component", () => {
    it("should check default App Wrapper", () => {
      // and mount the story using @cypress/react library
      mount(
        <AppWrapper className="cypressTest">
          This component will wrap its children within the width constraints of
          your application.
        </AppWrapper>
      );

      // then run our tests
      cy.get(APP_WRAPPER_PREVIEW).should(
        "have.text",
        "This component will wrap its children within the width constraints of your application."
      );
      cy.get(APP_WRAPPER_PREVIEW).should("have.class", "cypressTest");
    });

    it.each(testData)(
      "should render App Wrapper with %s as special characters",
      (specialCharacters) => {
        // and mount the story using @cypress/react library
        mount(<AppWrapper>{specialCharacters}</AppWrapper>);

        // then run our tests
        cy.get(APP_WRAPPER_PREVIEW).should("have.text", specialCharacters);
      }
    );
  });
});
