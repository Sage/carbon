import type { Page } from "@playwright/test";
import {
  ALERT_DIALOG,
  DIALOG_TITLE,
  DIALOG_SUBTITLE,
  OPEN_PREVIEW,
  DIALOG_ARIALABEL,
} from "./locators";

// component preview locators
const alertDialogPreview = (page: Page) => {
  return page.locator(ALERT_DIALOG);
};
const dialogTitle = (page: Page) => {
  return page.locator(DIALOG_TITLE);
};
const dialogSubtitle = (page: Page) => {
  return page.locator(DIALOG_SUBTITLE);
};
const openPreviewButton = (page: Page) => {
  return page.locator(OPEN_PREVIEW);
};
const dialogAriaLabel = (page: Page) => {
  return page.locator(DIALOG_ARIALABEL);
};

export {
  alertDialogPreview,
  dialogTitle,
  dialogSubtitle,
  openPreviewButton,
  dialogAriaLabel,
};
