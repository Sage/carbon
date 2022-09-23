import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import {
  visitComponentUrl,
  pressTABKey,
  positionOfElement,
  keyCode,
  visitComponentUrlWithParameters,
  pressShiftTABKey,
  continuePressingTABKey,
} from "../helper";
import {
  tooltipPreview,
  getDataElementByValue,
  closeIconButton,
  fieldHelpPreview,
  helpIconByPosition,
  getElement,
  helpIcon,
} from "../../locators";
import DEBUG_FLAG from "../e2e";
import { buttonDataComponent } from "../../locators/button";

Given(
  "I open {word} {string} component with {string} json from {string} using {string} object name",
  (type, component, json, path, nameOfObject) => {
    visitComponentUrlWithParameters(component, type, json, path, nameOfObject);
  }
);

Given("I open {string} component page {string}", (component, story) => {
  visitComponentUrl(component, story);
});

When("I click {string} button on preview", (text) => {
  getDataElementByValue("main-text").contains(text).click();
});

Then("label on preview is {word}", (text) => {
  getDataElementByValue("label").should("have.text", text);
});

When("I hover mouse onto help icon", () => {
  helpIcon().trigger("mouseover");
});

When("I hover mouse onto {string} help icon", (position) => {
  helpIconByPosition(positionOfElement(position)).trigger("mouseover");
});

Then("I hover mouse onto {string} icon", (name) => {
  getDataElementByValue(name).trigger("mouseover");
});

Then("tooltipPreview on preview is set to {word}", (text) => {
  tooltipPreview().should("have.text", text);
});

Then("fieldHelp on preview is set to {word}", (text) => {
  fieldHelpPreview().should("have.text", text);
});

Then("I click closeIcon", () => {
  closeIconButton().click();
});

Then(
  "closeIcon has the border outline color {string} and width {string}",
  (color, width) => {
    closeIconButton()
      .should("have.css", "outline-color", color)
      .and("have.css", "outline-width", width);
  }
);

When("I hit Tab key {int} time(s)", (times) => {
  pressTABKey(times);
});

When("I continue to hit Tab key {int} time(s)", (times) => {
  continuePressingTABKey(times);
});

When("I hit shift Tab key {int} time(s)", (times) => {
  pressShiftTABKey(times);
});

Then("{word} action was called in Actions Tab", (event) => {
  cy.storyAction(event).should("have.been.called");
});

When("I press keyboard {string} key times {int}", (key, times) => {
  for (let i = 0; i < times; i++) {
    cy.focused().trigger("keydown", keyCode(key));
  }
});

When("I press {string} onto focused element", (key) => {
  cy.focused().trigger("keydown", keyCode(key));
});

When("I press {string} key times {int}", (key, times) => {
  for (let i = 0; i < times; i++) {
    cy.focused().type(`${key}`);
  }
});

When("I click onto root in Test directory", () => {
  cy.get("#root").click({ force: true });
});

Then("icon name on preview is {string}", (iconName) => {
  getElement(iconName);
});

When("I click {string} icon", (iconName) => {
  getDataElementByValue(iconName).click();
});

When("I wait {int}", (timeout) => {
  cy.wait(timeout, { log: DEBUG_FLAG });
});

When("I press Shift Tab on focused element", () => {
  cy.focused().tab({ shift: true });
});

When("I click on {string}", (element) => {
  buttonDataComponent(element).click({ force: true });
});
