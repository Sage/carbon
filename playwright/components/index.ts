import type { Page } from "@playwright/test";
import { ICON, TOOLTIP_PREVIEW, DLS_ROOT } from "./locators";

export const icon = (page: Page) => {
  return page.locator(ICON);
};

export const tooltipPreview = (page: Page) => {
  return page.locator(TOOLTIP_PREVIEW);
};

export const dlsRoot = (page: Page) => {
  return page.locator(DLS_ROOT);
};
