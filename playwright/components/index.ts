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
  STICKY_FOOTER,
} from "./locators";

export const icon = (page: Page) => {
  return page.locator(ICON);
};

export const getDataElementByValue = (page: Page, element: string) => {
  return page.locator(`[data-element="${element}"]`);
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

export const label = (page: Page) => {
  return page.locator(LABEL);
};

export const legendSpan = (page: Page) => {
  return page.locator("legend > span");
};
