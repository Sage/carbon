import type { Page } from "@playwright/test";
import {
  ALERT_DIALOG,
  DIALOG,
  DIALOG_TITLE,
  DIALOG_SUBTITLE,
  OPEN_PREVIEW,
  DIALOG_ARIALABEL,
  DIALOG_WITH_ROLE,
} from "./locators";

// component preview locators
const alertDialogPreview = (page: Page) => {
  return page.locator(ALERT_DIALOG);
};
const dialog = (page: Page) => {
  return page.locator(DIALOG);
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
const dialogWithRole = (page: Page, role: string) => {
  return page.locator(DIALOG_WITH_ROLE(role));
};

export {
  alertDialogPreview,
  dialog,
  dialogTitle,
  dialogSubtitle,
  openPreviewButton,
  dialogAriaLabel,
  dialogWithRole,
};
