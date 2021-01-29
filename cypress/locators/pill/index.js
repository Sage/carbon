import { PILL_PREVIEW, PILL_CLOSE_ICON } from "./locators";

// component preview locators
export const pillPreview = () => cy.get(PILL_PREVIEW);
export const pillCloseIcon = () => cy.get(PILL_CLOSE_ICON);
export const pillCloseIconIframe = () => cy.iFrame(PILL_CLOSE_ICON);
