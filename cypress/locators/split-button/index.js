import {
  SPLIT_TOGGLE_BUTTON,
  ADDITIONAL_BUTTONS,
  SPLIT_MAIN_BUTTON,
  MAIN_BUTTON,
} from "./locators";

// component preview locators
export const splitToggleButton = () => cy.get(SPLIT_TOGGLE_BUTTON);
export const additionalButton = (index) =>
  cy.get(ADDITIONAL_BUTTONS).children().eq(index);
export const splitMainButtonDataComponent = (index) =>
  cy.get(SPLIT_MAIN_BUTTON).children().eq(index);
export const mainButton = () => cy.get(MAIN_BUTTON);
