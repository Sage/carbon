import { BUTTON_TOGGLE_PREVIEW, BUTTON_TOGGLE_INPUT } from "./locators";

// component preview locators
export const buttonToggleLabelPreview = (index) => cy.get("label").eq(index);
export const buttonTogglePreview = () => cy.get(BUTTON_TOGGLE_PREVIEW);
export const buttonToggleInput = () => cy.get(BUTTON_TOGGLE_INPUT);
