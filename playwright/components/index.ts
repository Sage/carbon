import type { Page } from "@playwright/test";
import { ICON, CLOSE_ICON_BUTTON } from "./locators";

export const icon = (page: Page) => {
  return page.locator(ICON);
};

export const getDataElementByValue = (page: Page, element: string) => {
  return page.locator(`[data-element="${element}"]`);
};

export const closeIconButton = (page: Page) => {
  return page.locator(CLOSE_ICON_BUTTON);
};