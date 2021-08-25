import * as React from "react";
import { mount } from "@cypress/react";
import AppWrapper from "./app-wrapper.component";

const appWrapperComponent = '[data-component="app-wrapper"]';
const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

describe("Should render app wrapper component", () => {
  it("should render default App Wrapper", () => {
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

  it("should render App Wrapper with special characters", () => {
    // and mount the story using @cypress/react library
    testData.forEach((element) => {
      mount(<AppWrapper>{element}</AppWrapper>);

      // then run our tests
      cy.get(appWrapperComponent).should("have.text", element);
    });
  });
});
