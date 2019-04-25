import {
  DIALOG, STICKY_FORM_FOOTER_ELEMENT, BACKGROUND_UI_BLOCKER, DIALOG_TITLE, DIALOG_SUBTITLE,
} from './locators';

// component preview locators
export const dialogPreview = () => cy.iFrame(DIALOG);
export const backgroundBlocker = () => cy.iFrame(BACKGROUND_UI_BLOCKER);
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE);
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE);
export const dialogStickyFormFooter = () => cy.iFrame(STICKY_FORM_FOOTER_ELEMENT);
