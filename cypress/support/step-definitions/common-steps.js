import {
  visitComponentUrl,
  pressESCKey,
  pressTABKey,
  positionOfElement,
  keyCode,
  visitComponentUrlWithParameters,
  pressShiftTABKey,
  continuePressingTABKey,
} from "../helper";
import {
  backgroundUILocator,
  tooltipPreview,
  getDataElementByValue,
  commonButtonPreviewRoot,
  closeIconButton,
  fieldHelpPreview,
  helpIconByPosition,
  getElement,
  helpIcon,
} from "../../locators";
import { dialogTitle } from "../../locators/dialog";
import DEBUG_FLAG from "..";
import { pagerSummary } from "../../locators/pager";

const TEXT_ALIGN = "justify-content";

Given(
  "I open {word} {string} component with {string} json from {string} using {string} object name",
  (type, component, json, path, nameOfObject) => {
    visitComponentUrlWithParameters(component, type, json, path, nameOfObject);
  }
);

Given("I open {string} component page {string}", (component, story) => {
  visitComponentUrl(component, story);
});

When("I open component preview", () => {
  commonButtonPreviewRoot().click();
});

When("I click {string} button on preview", (text) => {
  getDataElementByValue("main-text").contains(text).click();
});

Then("component title on preview is {word}", (title) => {
  dialogTitle().should("have.text", title);
});

Then("label on preview is {word}", (text) => {
  getDataElementByValue("label").should("have.text", text);
});

Then("label is set to {word}", (text) => {
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

Then("Background UI is enabled", () => {
  backgroundUILocator().should("not.exist");
});

Then("closeIcon is visible", () => {
  closeIconButton().should("be.visible");
});

Then("I click closeIcon", () => {
  closeIconButton().click();
});

Then("closeIcon is not visible", () => {
  closeIconButton().should("not.exist");
});

Then("I focus closeIcon", () => {
  closeIconButton().focus();
});

Then(
  "closeIcon has the border outline color {string} and width {string}",
  (color, width) => {
    closeIconButton()
      .should("have.css", "outline-color", color)
      .and("have.css", "outline-width", width);
  }
);

Then("closeIcon is focused", () => {
  closeIconButton().focus();
});

When("I hit ESC key", () => {
  pressESCKey();
});

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

When("I press Tab onto focused element", () => {
  cy.focused().tab();
});

When("I press ESC onto focused element", () => {
  cy.focused().trigger("keydown", { keyCode: 16, which: 16, release: false });
  cy.focused().trigger("keydown", { keyCode: 27, which: 27 });
});

When("I press ShiftTab onto focused element", () => {
  cy.focused().tab({ shift: true });
});

Then("focused element inner content is set to {string}", (text) => {
  cy.focused().should("contain", text);
});

When("I press {string} key times {int}", (key, times) => {
  for (let i = 0; i < times; i++) {
    cy.focused().type(`${key}`);
  }
});

When("I click onto root in Test directory", () => {
  cy.get("#root").click({ force: true });
});

Then("totalRecords is set to {string} {word}", (totalRecords, element) => {
  pagerSummary().invoke("text").should("contain", `${totalRecords} ${element}`);
});

Then("label Align on preview is {string}", (direction) => {
  if (direction === "left") {
    getDataElementByValue("label")
      .parent()
      .should(($element) =>
        expect($element).to.have.css(TEXT_ALIGN, "flex-start")
      );
  } else {
    getDataElementByValue("label")
      .parent()
      .should(($element) =>
        expect($element).to.have.css(TEXT_ALIGN, "flex-end")
      );
  }
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
