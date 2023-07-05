import {
  BUTTON_SUBTEXT_PREVIEW,
  BUTTON_DATA_COMPONENT_PREVIEW,
  BUTTON_MINOR_COMPONENT,
} from "./locators";

// component preview locators
export const buttonDataComponent = () => cy.get(BUTTON_DATA_COMPONENT_PREVIEW);
export const buttonSubtextPreview = () => cy.get(BUTTON_SUBTEXT_PREVIEW);
export const buttonMinorComponent = (index = 0) =>
  cy.get(BUTTON_MINOR_COMPONENT).eq(index);
