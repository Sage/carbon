import BUTTON_TOGGLE_GROUP_CONTAINER from "./locators";

// component preview locators
const labelPreviewByTextIFrame = () =>
  cy
    .iFrame(BUTTON_TOGGLE_GROUP_CONTAINER)
    .find('div[data-component="button-toggle"]')
    .find("label");

export default labelPreviewByTextIFrame;
