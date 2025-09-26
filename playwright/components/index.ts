import type { Page } from "@playwright/test";
import {
  ICON,
  LINK,
  PILL_PREVIEW,
  CLOSE_ICON_BUTTON,
  TOOLTIP_PREVIEW,
  DLS_ROOT,
  FIELD_HELP_PREVIEW,
  LABEL,
  COMMON_INPUT_CHARACTER_LIMIT,
  STICKY_FOOTER,
  COMMMON_DATA_ELEMENT_INPUT,
  PORTAL,
  BUTTON,
  HELP_ICON_PREVIEW,
  BACKGROUND_UI_LOCATOR,
  COMMON_INPUT_PREFIX,
  VISUALLY_HIDDEN_CHARACTER_COUNT,
  VISUALLY_HIDDEN_HINT,
  CHARACTER_COUNT,
  CHARACTER_LIMIT,
} from "./locators";

export const icon = (page: Page) => {
  return page.locator(ICON);
};

export const getDataElementByValue = (page: Page, element: string) => {
  return page.locator(`[data-element="${element}"]`);
};

export const commonDataElementInputPreview = (page: Page) => {
  return page.locator(COMMMON_DATA_ELEMENT_INPUT);
};

export const button = (page: Page) => {
  return page.locator(BUTTON);
};

export const getDataComponentByValue = (page: Page, element: string) => {
  return page.locator(`[data-component="${element}"]`);
};

export const getDataRoleByValue = (page: Page, element: string) => {
  return page.locator(`[data-role="${element}"]`);
};

export const closeIconButton = (page: Page) => {
  return page.locator(CLOSE_ICON_BUTTON);
};

export const stickyFooter = (page: Page) => {
  return page.locator(STICKY_FOOTER);
};

export const tooltipPreview = (page: Page) => {
  return page.locator(TOOLTIP_PREVIEW);
};

export const dlsRoot = (page: Page) => {
  return page.locator(DLS_ROOT);
};

export const link = (page: Page) => {
  return page.locator(LINK);
};

export const pillPreview = (page: Page) => {
  return page.locator(PILL_PREVIEW);
};

export const fieldHelpPreview = (page: Page) => {
  return page.locator(FIELD_HELP_PREVIEW).first();
};

export const getComponent = (page: Page, component: string) => {
  return page.locator(`[data-component="${component}"]`);
};

export const getElement = (page: Page, element: string) => {
  return page.locator(`[data-element="${element}"]`).first();
};

export const label = (page: Page) => {
  return page.locator(LABEL);
};

export const characterLimit = (page: Page) => {
  return page.locator(COMMON_INPUT_CHARACTER_LIMIT);
};

export const visuallyHiddenCharacterCount = (page: Page) =>
  page.locator(VISUALLY_HIDDEN_CHARACTER_COUNT);

export const visuallyHiddenHint = (page: Page) =>
  page.locator(VISUALLY_HIDDEN_HINT);

export const characterCount = (page: Page) => page.locator(CHARACTER_COUNT);

export const characterLimitDefaultTextarea = (page: Page) =>
  page.locator(CHARACTER_LIMIT);

export const legend = (page: Page) => {
  return page.locator("legend");
};

export const openDialogByName = (page: Page, name: string) => {
  getDataElementByValue(page, "main-text").filter({ hasText: name });
};

export const portal = (page: Page) => {
  return page.locator(PORTAL).nth(1).locator("h1");
};

export const helpIcon = (page: Page) => {
  return page.locator(HELP_ICON_PREVIEW);
};

export const backgroundUILocator = (page: Page) => {
  return page.locator(BACKGROUND_UI_LOCATOR);
};

export const commonInputPrefix = (page: Page) => {
  return page.locator(COMMON_INPUT_PREFIX);
};
