import BUTTON_TOGGLE_PREVIEW from "./locators";

// component preview locators
export const buttonToggleLabelPreview = (index) => cy.get("label").eq(index);
export const buttonTogglePreview = () => cy.get(BUTTON_TOGGLE_PREVIEW);
