import type { Page } from "@playwright/test";
import {
  ALERT,
  ALERT_CROSS_ICON,
  ALERT_TITLE,
  ALERT_SUBTITLE,
  ALERT_DIALOG,
} from "./locators";

const alert = (page: Page) => {
  return page.locator(ALERT);
};

const alertCrossIcon = (page: Page) => {
  return page.locator(ALERT_CROSS_ICON);
};

const alertTitle = (page: Page) => {
  return page.locator(ALERT_TITLE);
};

const alertSubtitle = (page: Page) => {
  return page.locator(ALERT_SUBTITLE);
};

const alertDialog = (page: Page) => {
  return page.locator(ALERT_DIALOG);
};

const alertChildren = (page: Page) => {
  return page.locator('[data-component="alert"] div:nth-of-type(2) div');
};

export {
  alert,
  alertCrossIcon,
  alertTitle,
  alertSubtitle,
  alertDialog,
  alertChildren,
};
