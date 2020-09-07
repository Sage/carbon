import { TOAST_PREVIEW } from './locators';

// component preview locators
export const toastPreview = () => cy.iFrame(TOAST_PREVIEW).children();
export const toastComponentIFrame = () => cy.iFrame(TOAST_PREVIEW);
export const toastTogglePreview = e => cy.iFrame(`#${e}`);

export const toastComponent = () => cy.get(TOAST_PREVIEW);
