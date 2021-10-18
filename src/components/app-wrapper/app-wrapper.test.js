import * as React from "react";
import { mount } from "@cypress/react";
import AppWrapper from "./app-wrapper.component";

const appWrapperComponent = '[data-component="app-wrapper"]';
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
      cy.get(appWrapperComponent).should(
        "have.text",
        "This component will wrap its children within the width constraints of your application."
      );
      cy.get(appWrapperComponent).should("have.class", "cypressTest");
    });

    it.each(testData)(
      "should render App Wrapper with %s as special characters",
      (specialCharacters) => {
        // and mount the story using @cypress/react library
        mount(<AppWrapper>{specialCharacters}</AppWrapper>);

        // then run our tests
        cy.get(appWrapperComponent).should("have.text", specialCharacters);
      }
    );
  });
});
