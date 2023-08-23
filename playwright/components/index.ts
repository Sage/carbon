import type { Page } from "@playwright/test";
import { ICON, CLOSE_ICON_BUTTON, TOOLTIP_PREVIEW, DLS_ROOT } from "./locators";

export const icon = (page: Page) => {
  return page.locator(ICON);
};

export const getDataElementByValue = (page: Page, element: string) => {
  return page.locator(`[data-element="${element}"]`);
};

export const closeIconButton = (page: Page) => {
  return page.locator(CLOSE_ICON_BUTTON);
};

export const tooltipPreview = (page: Page) => {
  return page.locator(TOOLTIP_PREVIEW);
};

export const dlsRoot = (page: Page) => {
  return page.locator(DLS_ROOT);
};
