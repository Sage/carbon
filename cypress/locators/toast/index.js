import { TOAST_PREVIEW } from './locators';

// component preview locators
export const toastPreview = () => cy.iFrame(TOAST_PREVIEW).children();
export const toastComponent = () => cy.iFrame(TOAST_PREVIEW);
