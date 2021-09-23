import {
  BUTTON_SUBTEXT_PREVIEW,
  BUTTON_DATA_COMPONENT_PREVIEW,
} from "./locators";

// component preview locators
export const buttonDataComponent = () => cy.get(BUTTON_DATA_COMPONENT_PREVIEW);
export const buttonSubtextPreview = () => cy.get(BUTTON_SUBTEXT_PREVIEW);
