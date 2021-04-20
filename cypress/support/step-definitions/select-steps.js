import {
  simpleSelectID,
  selectOption,
  dropdownButton,
  selectList,
  simpleSelectNoIframe,
  selectDataComponent,
  simpleSelectIframe,
  multiSelectDataComponent,
  openOnFocusID,
  multiSelectPill,
  multiSelectPillByPosition,
  dropdownButtonInIframe,
  selectDataComponentInIframe,
  selectListInIframe,
  selectOptionInIframe,
  multiSelectDataComponentInIframe,
  isLoading,
  selectListText,
  multiColumnsSelectListHeader,
  multiColumnsSelectListBody,
  boldedAndUnderlinedValue,
  selectListPosition,
} from "../../locators/select";
import { positionOfElement, keyCode } from "../helper";
import {
  label,
  getDataElementByValue,
  commonDataElementInputPreviewNoIframe,
} from "../../locators";
import { dataComponentButtonByTextNoIFrame } from "../../locators/pages";
import { loader } from "../../locators/loader";

When("I focus select input", () => {
  simpleSelectID().focus();
});

When("I focus default Select input", () => {
  simpleSelectIframe().focus();
});

When("I focus openOnFocus Select input", () => {
  openOnFocusID().focus();
});

When("I click openOnFocus Select input", () => {
  openOnFocusID().click({ force: true });
});

Then("{string} Select list is opened", (name) => {
  selectDataComponent(name).should("have.attr", "aria-expanded", "true");
  selectList().should("be.visible");
});

Then("{string} Select list is closed", (name) => {
  selectDataComponent(name).should("have.attr", "aria-expanded", "false");
  selectList().should("not.exist");
});

Then("{string} Select list is closed in iframe", (name) => {
  selectDataComponentInIframe(name).should(
    "have.attr",
    "aria-expanded",
    "false"
  );
  selectListInIframe().should("not.exist");
});

Then("multi Select list is opened", () => {
  multiSelectDataComponent().should("have.attr", "aria-expanded", "true");
  selectList().should("be.visible");
});

Then("multi Select list is closed", () => {
  multiSelectDataComponent().should("have.attr", "aria-expanded", "false");
  selectList().should("not.exist");
});

Then("multi Select list is closed in iframe", () => {
  multiSelectDataComponentInIframe().should(
    "have.attr",
    "aria-expanded",
    "false"
  );
  selectListInIframe().should("not.exist");
});

When("I click on Select input", () => {
  simpleSelectID().click();
});

When("I click on default Select input", () => {
  simpleSelectIframe().click();
});

When("I click on Select input in noIframe", () => {
  simpleSelectNoIframe().click();
});
When("{string} option on the list is hovered over", (position) => {
  selectOption(positionOfElement(position))
    .should("have.attr", "aria-selected", "true")
    .and("have.css", "background-color", "rgb(242, 245, 246)");
});

When("I click onto controlled select using {string} key", (key) => {
  simpleSelectID().trigger("keydown", keyCode(key));
});

When("I click onto default select using {string} key", (key) => {
  simpleSelectIframe().trigger("keydown", keyCode(key));
});

Then("Design system Select input has {string} value", (text) => {
  simpleSelectID().should("have.attr", "value", text);
});

Then("Multi select input has {string} pill", (text) => {
  multiSelectPill().should("have.attr", "title", text);
});

Then("Multi select {string} pill has {string} value", (int, text) => {
  multiSelectPillByPosition(positionOfElement(int)).should(
    "have.attr",
    "title",
    text
  );
});

Then("Multi select input has not any value", () => {
  multiSelectDataComponent(1).should("not.have.attr", "data-component", "pill");
});

When("I click on dropdown button", () => {
  dropdownButton().click();
});

When("I click on dropdown button in iframe", () => {
  dropdownButtonInIframe().click();
});

When("I select value {string}", (text) => {
  simpleSelectID().type(`${text}{enter}`);
});

When("I type {string} into input", (text) => {
  simpleSelectID().type(text);
});

When(
  "Type {string} text into multi select input and select the value",
  (text) => {
    simpleSelectID().type(`${text}{downarrow}{enter}`);
  }
);

When("I type {string} into default input", (text) => {
  simpleSelectIframe().type(text);
});

When("I type {string} into simple select input in noIframe", (text) => {
  simpleSelectNoIframe().type(text);
});

When("{string} option on Select list is {string}", (position, text) => {
  selectOption(positionOfElement(position)).should("have.text", text);
});

When("I click on {string} option on Select list", (position) => {
  selectOption(positionOfElement(position)).click();
});

When("I click on {string} option on Select list in iframe", (position) => {
  selectOptionInIframe(positionOfElement(position)).click();
});

When("I click on Select label", () => {
  label().click();
});

When("I click onto {string} button", (buttonName) => {
  dataComponentButtonByTextNoIFrame(buttonName).click();
});

When("I click on Select input with lazy loading in no iframe", () => {
  isLoading().click();
});

Then("Lazy loading is visible", () => {
  loader().should("be.visible");
});

When("I scroll to the {string} of Select List", (direction) => {
  selectList().scrollTo(direction).wait(250);
  selectList().scrollTo(direction);
});

Then("Select list {string} option is visible", (option) => {
  selectListText(option).should("be.visible");
});

Then("option list has {int} elements", (count) => {
  selectList()
    .find("li")
    .should(($lis) => {
      expect($lis).to.have.length(count);
    });
});

Then(
  "visible options on Select list are {string}, {string}, {string}",
  (firstText, secondText, thirdText) => {
    selectOption(positionOfElement("first"))
      .should("have.text", firstText)
      .and("be.visible");
    selectOption(positionOfElement("second"))
      .should("have.text", secondText)
      .and("be.visible");
    selectOption(positionOfElement("third"))
      .should("have.text", thirdText)
      .and("be.visible");
  }
);

Then("Select input has {string} value", (text) => {
  getDataElementByValue("input").should("have.attr", "value", text);
});

Then("Select input has no value", () => {
  getDataElementByValue("input").should("have.attr", "value", "");
});

Then("Option list has multiColumns header", () => {
  multiColumnsSelectListHeader().should("have.length", "3").and("be.visible");
});

Then("Option list has multiColumns body", () => {
  multiColumnsSelectListBody().should("have.length", "3").and("be.visible");
});

Then("The matching string {string} is underline and bolded", (text) => {
  boldedAndUnderlinedValue(text)
    .should("have.css", "text-decoration-line", "underline")
    .and("have.css", "text-decoration-style", "solid")
    .and("have.css", "font-weight", "700");
});

Then("I type {string} into select input", (text) => {
  commonDataElementInputPreviewNoIframe().type(text);
});

When("I scroll page to top", () => {
  cy.scrollTo("0", "0");
});

Then("{string} Select list is visible in {word} position", (name, position) => {
  selectListPosition(name)
    .should("have.attr", "data-popper-placement", position)
    .and("be.visible");
});

Then("{string} Select list is visible at the {word}", (name, position) => {
  selectListPosition(name)
    .should("have.attr", "data-popper-placement", `${position}-end`)
    .and("be.visible");
});
