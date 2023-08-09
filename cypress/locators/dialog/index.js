import {
  ALERT_DIALOG,
  DIALOG_TITLE,
  DIALOG_SUBTITLE,
  OPEN_PREVIEW,
  DIALOG_ARIALABEL,
} from "./locators";

// component preview locators
export const alertDialogPreview = () => cy.get(ALERT_DIALOG);
export const dialogTitle = () => cy.get(DIALOG_TITLE);
export const dialogSubtitle = () => cy.get(DIALOG_SUBTITLE);
export const openPreviewButton = () => cy.get(OPEN_PREVIEW);
export const dialogAriaLabel = () => cy.get(DIALOG_ARIALABEL);
