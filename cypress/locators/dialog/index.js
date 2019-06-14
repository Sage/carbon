import {
  ALERT_DIALOG, STICKY_FORM_FOOTER_ELEMENT, DIALOG_TITLE, DIALOG_SUBTITLE,
} from './locators';

// component preview locators
export const alertDialogPreview = () => cy.iFrame(ALERT_DIALOG);
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE);
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE);
export const dialogStickyFormFooter = () => cy.iFrame(STICKY_FORM_FOOTER_ELEMENT);
