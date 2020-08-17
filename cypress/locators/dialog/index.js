import {
  ALERT_DIALOG,
  STICKY_FORM_FOOTER_ELEMENT,
  DIALOG_TITLE, 
  DIALOG_SUBTITLE,
} from './locators';

// component preview locators
export const alertDialogPreview = () => cy.iFrame(ALERT_DIALOG);
export const alertChildren = () => cy.iFrame(ALERT_DIALOG)
  .find('div:nth-child(2)').children();
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE);
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE);
export const dialogStickyFormFooterIFrame = () => cy.iFrame(STICKY_FORM_FOOTER_ELEMENT);


// component preview locators in NoIFrame
export const alertDialogPreviewNoIFrame = () => cy.get(ALERT_DIALOG);
export const alertChildrenNoIframe = () => alertDialogPreviewNoIFrame()
  .find('div:nth-child(2)').children();
export const dialogTitleNoIFrame = () => cy.get(DIALOG_TITLE);
export const dialogSubtitleNoIFrame = () => cy.get(DIALOG_SUBTITLE);
export const dialogStickyFormFooter = () => cy.get(STICKY_FORM_FOOTER_ELEMENT);
export const dialogStickyFormFooterButton = index => cy.get(STICKY_FORM_FOOTER_ELEMENT).children()
  .eq(index).children();