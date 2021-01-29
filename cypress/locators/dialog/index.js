import {
  ALERT_DIALOG,
  STICKY_FORM_FOOTER_ELEMENT,
  DIALOG_TITLE,
} from "./locators";

// component preview locators
export const alertDialogPreviewIFrame = () => cy.iFrame(ALERT_DIALOG);

// component preview locators in NoIFrame
export const alertDialogPreview = () => cy.get(ALERT_DIALOG);
export const alertChildren = () =>
  alertDialogPreview().find("div:nth-child(2)").children();
export const dialogTitle = () => cy.get(DIALOG_TITLE);
export const dialogStickyFormFooter = () => cy.get(STICKY_FORM_FOOTER_ELEMENT);
export const dialogStickyFormFooterButton = (index) =>
  cy.get(STICKY_FORM_FOOTER_ELEMENT).children().eq(index).children();
