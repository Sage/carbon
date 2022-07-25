import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

import {
  searchInput,
  searchDefaultInput,
  searchCrossIcon,
  searchButton,
  searchWitchButtonInput,
  searchDefaultInnerIcon,
  searchInnerIcon,
  searchIcon,
} from "../../locators/search";
import { keyCode } from "../helper";

Then("Search component placeholder is set to {word}", (placeholder) => {
  searchDefaultInput().should("have.attr", "placeholder", placeholder);
});

When("I clear default search input", () => {
  searchDefaultInput().clear();
});

When("Type {string} text into default search input", (text) => {
  searchDefaultInput().clear().type(text);
});

When("Type {string} text into search with button input", (text) => {
  searchWitchButtonInput().clear().type(text);
});

When("Type {string} text into search input", (text) => {
  searchDefaultInput().clear().type(text);
});

Then("Search component has input and {string} as icon", (iconType) => {
  searchDefaultInput()
    .should("have.attr", "data-element", "input")
    .and("be.visible");
  searchDefaultInnerIcon()
    .should("have.attr", "data-element", iconType)
    .and("be.visible");
});

Then("I click on cross icon", () => {
  searchCrossIcon().click();
});

When("search input is empty", () => {
  searchDefaultInput().should("be.empty");
});

Then("Search component input has golden border", () => {
  searchInput()
    .parent()
    .should("have.css", "outline", "rgb(255, 181, 0) solid 3px");
});

When("I click on search icon", () => {
  searchButton().click({ force: true });
});

When("I click inside input", () => {
  searchInput().click();
});

When("I focus on cross icon", () => {
  searchCrossIcon().parent().focus();
});

Then("Cross icon has golden border", () => {
  searchCrossIcon()
    .parent()
    .should("have.css", "outline", "rgb(255, 181, 0) solid 3px");
});

Then("search icon has golden border", () => {
  searchButton().should("have.css", "outline", "rgb(255, 181, 0) solid 3px");
});

Then("search icon has proper inner color", () => {
  const mintColor = "rgb(0, 126, 69)";
  searchIcon().should("have.css", "background-color", mintColor);
});

Then("search icon as button is visible", () => {
  searchButton().should("exist").and("be.visible");
});

Then("search icon as button is not visible", () => {
  searchInnerIcon().should("not.exist");
});

When("I press onto cross icon using {string} key", (key) => {
  searchCrossIcon().trigger("keydown", keyCode(key));
});
