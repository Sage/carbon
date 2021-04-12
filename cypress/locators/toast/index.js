import TOAST_PREVIEW from "./locators";

// component preview locators
export const toastTogglePreview = (e) => cy.get(`#${e}`);
export const toastComponent = () => cy.get(TOAST_PREVIEW);
export const toastComponentIFrame = () => cy.iFrame(TOAST_PREVIEW);
