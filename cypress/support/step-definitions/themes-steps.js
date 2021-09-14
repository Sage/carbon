import { getComponent, getElement } from "../../locators";
import {
  buttonToggleComponent,
  linkComponent,
  loaderBarComponent,
  loaderComponent,
} from "../../locators/themes";

const COLOR = "color";
const BACKGROUND_COLOR = "background-color";

Then(
  "{string} component css {string} is set to {string} common",
  (componentName, css, themeName) => {
    cy.fixture("themes/themes.json").then((json) => {
      getComponent(componentName).should(
        "have.css",
        css,
        json.common[themeName]
      );
    });
  }
);

Then(
  "{string} component css {string} is set to {string}",
  (componentName, css, themeName) => {
    cy.fixture("themes/themes.json").then((json) => {
      getComponent(componentName).should(
        "have.css",
        css,
        json[componentName][themeName]
      );
    });
  }
);

Then(
  "Button Toggle component css background color is set to {string}",
  (themeName) => {
    cy.fixture("themes/themes.json").then((json) => {
      buttonToggleComponent().should(
        "have.css",
        BACKGROUND_COLOR,
        json["button-toggle"][themeName]
      );
    });
  }
);

Then(
  "{string} element css {string} is set to {string} common",
  (componentName, css, themeName) => {
    cy.fixture("themes/themes.json").then((json) => {
      getElement(componentName)
        .should("have.css", css)
        .and("contains", json.common[themeName]);
    });
  }
);

When("I click {string} component", (componentName) => {
  getComponent(componentName).first().click();
});

Then("Link component css color is set to {string}", (themeName) => {
  cy.fixture("themes/themes.json").then((json) => {
    linkComponent()
      .children()
      .should("have.css", COLOR, json.common[themeName]);
  });
});

Then(
  "Loader component css background color is set to {string}",
  (themeName) => {
    cy.fixture("themes/themes.json").then((json) => {
      loaderComponent().should(
        "have.css",
        BACKGROUND_COLOR,
        json.common[themeName]
      );
    });
  }
);

Then(
  "Loader Bar component css background color is set to {string}",
  (themeName) => {
    cy.fixture("themes/themes.json").then((json) => {
      loaderBarComponent()
        .children()
        .should("have.css", BACKGROUND_COLOR, json["loader-bar"][themeName]);
      loaderBarComponent()
        .children()
        .children()
        .should("have.css", BACKGROUND_COLOR, json.common[themeName]);
    });
  }
);
