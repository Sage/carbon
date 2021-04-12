import BUTTON_TOGGLE_PREVIEW from "./locators";

// component preview locators
export const buttonToggleLabelPreview = (index) => cy.get("label").eq(index);

// component preview locators in IFrame
export const buttonTogglePreviewIFrame = () => cy.iFrame(BUTTON_TOGGLE_PREVIEW);
