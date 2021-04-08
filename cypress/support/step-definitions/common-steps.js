import {
  visitComponentUrl,
  pressESCKey,
  pressTABKey,
  asyncWaitForKnobs,
  positionOfElement,
  keyCode,
  visitComponentUrlWithParameters,
  clickActionsTab,
  clickClear,
  pressTABKeyInNoIframe,
  pressShiftTABKeyInNoIframe,
  continuePressingTABKeyInNoIframe,
  pressESCKeyNoIframe,
} from "../helper";
import {
  helpIconByPosition,
  backgroundUILocator,
  closeIconButtonIFrame,
  getKnobsInput,
  getKnobsInputWithName,
  iconIFrame,
  eventInAction,
  tooltipPreview,
  getDataElementByValue,
  knobsNameTab,
  commonButtonPreviewNoIFrameRoot,
  getDataElementByValueIframe,
  closeIconButton,
  fieldHelpPreviewNoIFrame,
  helpIconByPositionNoIFrame,
  getElementNoIframe,
  helpIcon,
} from "../../locators";
import { dialogTitle } from "../../locators/dialog";
import DEBUG_FLAG from "..";
import { pagerSummary } from "../../locators/pager";

const TEXT_ALIGN = "justify-content";

Given(
  "I open Test {word} {string} component in noIFrame with {string} json from {string} using {string} object name",
  (type, component, json, path, nameOfObject) => {
    visitComponentUrlWithParameters(
      `${component}-test`,
      type,
      "design-system-",
      json,
      path,
      nameOfObject
    );
  }
);

Given(
  "I open {word} {string} component in noIFrame with {string} json from {string} using {string} object name",
  (type, component, json, path, nameOfObject) => {
    visitComponentUrlWithParameters(
      component,
      type,
      "",
      json,
      path,
      nameOfObject
    );
  }
);

Given("I open {string} component page {string}", (component, story) => {
  visitComponentUrl(component, story, false);
});

Given(
  "I open {string} component page {string} in no iframe",
  (component, story) => {
    visitComponentUrl(component, story, true);
  }
);

When("I open {word} tab", (text) => {
  cy.wait(500, { log: DEBUG_FLAG }); // required because element needs to be loaded
  knobsNameTab(text).click();
});

When("I set {word} to {word} word", (propertyName, text) => {
  getKnobsInput(propertyName).clear().type(text);
});

When("I set {word} to {string}", (propertyName, text) => {
  getKnobsInput(propertyName).clear().type(text);
});

When("I set {string} {string} to {string}", (propertyName, fieldName, text) => {
  asyncWaitForKnobs(propertyName, fieldName);
  getKnobsInputWithName(propertyName, fieldName).clear().type(text);
});

When("I set {word}-{word} to {string}", (word1, word2, text) => {
  getKnobsInput(`${word1}-${word2}`).clear().type(text);
});

When("I select {word} to {string}", (propertyName, selection) => {
  getKnobsInput(propertyName).select(selection);
});

When("I select {word} {word} to {string}", (propertyName, text, selection) => {
  getKnobsInputWithName(propertyName, text).select(selection);
});

When("I open component preview in noIFrame", () => {
  commonButtonPreviewNoIFrameRoot().click();
});

When("I {string} button on preview", (text) => {
  getDataElementByValue("main-text").contains(text).click();
});

Then("component title on preview is {word}", (title) => {
  dialogTitle().should("have.text", title);
});

Then("label on preview is {word} in NoIFrame", (text) => {
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

When("I hover mouse onto {string} help icon in NoIFrame", (position) => {
  helpIconByPositionNoIFrame(positionOfElement(position)).trigger("mouseover");
});

When("I hover mouse onto icon", () => {
  cy.wait(100, { log: DEBUG_FLAG }); // delayed in case the element need to be reloaded
  iconIFrame().trigger("mouseover");
});

Then("I hover mouse onto {string} icon in no iFrame", (name) => {
  getDataElementByValue(name).trigger("mouseover");
});

Then("tooltipPreview on preview is set to {word}", (text) => {
  tooltipPreview().should("have.text", text);
});

Then("fieldHelp on preview is set to {word} in NoIFrame", (text) => {
  fieldHelpPreviewNoIFrame().should("have.text", text);
});

Then("Background UI is enabled", () => {
  backgroundUILocator().should("not.exist");
});

Then("closeIcon is visible", () => {
  closeIconButton().should("be.visible");
});

Then("I click closeIcon in IFrame", () => {
  closeIconButtonIFrame().click();
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

When("I hit ESC key in noIframe", () => {
  pressESCKeyNoIframe();
});

When("I hit Tab key {int} time(s)", (times) => {
  pressTABKey(times);
});

When("I hit Tab key {int} time(s) in no Iframe", (times) => {
  pressTABKeyInNoIframe(times);
});

When("I continue to hit Tab key {int} time(s) in no Iframe", (times) => {
  continuePressingTABKeyInNoIframe(times);
});

When("I hit shift Tab key {int} time(s) in no Iframe", (times) => {
  pressShiftTABKeyInNoIframe(times);
});

When("I check {word} checkbox", (checkboxName) => {
  getKnobsInput(checkboxName).scrollIntoView();
  getKnobsInput(checkboxName).check();
});

When("I check {word} {word} checkbox", (checkboxName, text) => {
  getKnobsInputWithName(checkboxName, text).scrollIntoView();
  getKnobsInputWithName(checkboxName, text).check();
});

Then("{word} action was called in Actions Tab", (event) => {
  eventInAction(event);
});

When("I close Sidebar", () => {
  closeIconButtonIFrame().click();
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

When("I click onto root in Test directory in no iFrame", () => {
  cy.get("#root").click({ force: true });
});

Then("totalRecords is set to {string} {word}", (totalRecords, element) => {
  pagerSummary().invoke("text").should("contain", `${totalRecords} ${element}`);
});

Then("label Align on preview is {string} in NoIFrame", (direction) => {
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

Then("icon name in noIframe on preview is {string}", (iconName) => {
  getElementNoIframe(iconName);
});

When("I click {string} icon in iFrame", (iconName) => {
  getDataElementByValueIframe(iconName).click();
});

When("clear all actions in Actions Tab", () => {
  clickActionsTab();
  clickClear();
});

When("I wait {int}", (timeout) => {
  cy.wait(timeout, { log: DEBUG_FLAG });
});
