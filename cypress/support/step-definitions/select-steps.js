import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

import {
  selectOption,
  selectOptionRow,
  dropdownButton,
  selectList,
  selectInput,
  multiSelectDataComponent,
  multiSelectPill,
  multiSelectPillByPosition,
  selectListText,
  multiColumnsSelectListHeader,
  multiColumnsSelectListBody,
  boldedAndUnderlinedValue,
  selectListPosition,
  selectText,
} from "../../locators/select";
import { positionOfElement, keyCode } from "../helper";
import {
  getDataElementByValue,
  commonDataElementInputPreview,
  label,
} from "../../locators";
import { dataComponentButtonByText } from "../../locators/pages";
import { loader } from "../../locators/loader";

Then("{string} list is open", () => {
  selectInput().should("have.attr", "aria-expanded", "true");
  selectList().should("be.visible");
});

Then("{string} list is closed", () => {
  selectInput().should("have.attr", "aria-expanded", "false");
  selectList().should("not.be.visible");
});

When("I click on Select input", () => {
  selectInput().click();
});

When("I click on Select text", () => {
  selectText().click();
});

When("I click on controlled Select input", () => {
  commonDataElementInputPreview().realClick();
});

When("I focus on controlled Select input", () => {
  commonDataElementInputPreview().focus();
});

When("{string} option on the list is hovered over", (position) => {
  selectOption(positionOfElement(position))
    .should("have.attr", "aria-selected", "true")
    .and("have.css", "background-color", "rgb(153, 173, 183)");
});

When("{string} option on the list is highlighted", (position) => {
  selectOption(positionOfElement(position)).should(
    "have.css",
    "background-color",
    "rgb(153, 173, 183)"
  );
});

When("I click onto controlled select using {string} key", (key) => {
  commonDataElementInputPreview().trigger("keydown", keyCode(key));
});

When("I press the {string} key, when focused on the input", (key) => {
  selectInput().trigger("keydown", { ...keyCode(key), force: true });
});

Then("Multi select input has {string} pill", (text) => {
  multiSelectPill().should("have.attr", "title", text);
});

Then("Multi select input has {int} values", (length) => {
  multiSelectPill().should("have.length", length);
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

When("I select the {string} Option", (text) => {
  selectListText(text).click();
});

When("I type {string} into input", (text) => {
  commonDataElementInputPreview().type(text);
});

When(
  "Type {string} text into multi select input and select the value",
  (text) => {
    commonDataElementInputPreview().type(`${text}{downarrow}{enter}`);
  }
);

When("I type {string} into default input", (text) => {
  commonDataElementInputPreview().type(text);
});

When("{string} option on Select list is {string}", (position, text) => {
  selectOption(positionOfElement(position)).should("have.text", text);
});

When("{string} row on Select list contains {string}", (position, text) => {
  selectOptionRow(positionOfElement(position)).should("contain.text", text);
});

When("I click on {string} option on Select list", (position) => {
  selectOption(positionOfElement(position)).click();
});

When("I click on Select label", () => {
  label().click({ force: true });
});

When("I click onto {string} button", (buttonName) => {
  dataComponentButtonByText(buttonName).click();
});

Then("Lazy loading is visible", () => {
  for (let i = 0; i < 3; i++) {
    loader(i).should("be.visible");
  }
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
  commonDataElementInputPreview().type(text);
});

When("I scroll page to top", () => {
  cy.scrollTo("0", "0");
});

Then("{string} Select list is visible at the {word}", (name, position) => {
  selectListPosition(name)
    .should("have.attr", "data-popper-placement", `${position}-start`)
    .and("be.visible");
});
