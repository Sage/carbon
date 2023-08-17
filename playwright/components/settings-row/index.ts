import type { Page } from "@playwright/test";
import {
  SETTINGS_ROW_COMPONENT,
  SETTINGS_ROW_CHILDREN,
  SETTINGS_ROW_DESCRIPTION,
  SETTINGS_ROW_TITLE,
} from "./locators";

export const settingsRowPreview = (page: Page) => {
  return page.locator(SETTINGS_ROW_COMPONENT);
};
export const settingsRowChildren = (page: Page) => {
  return page.locator(SETTINGS_ROW_CHILDREN);
};
export const settingsRowDescription = (page: Page) => {
  return page.locator(SETTINGS_ROW_DESCRIPTION);
};

export const settingsRowTitle = (page: Page) => {
  return page.locator(SETTINGS_ROW_TITLE);
};
