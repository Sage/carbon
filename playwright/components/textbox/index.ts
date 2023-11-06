import type { Page } from "@playwright/test";

import { TEXTBOX, TEXTBOX_DATA_COMPONENT, TEXTBOX_PREFIX } from "./locators";

// component preview locators
export const textbox = (page: Page) => {
  return page.locator(TEXTBOX);
};

export const textboxDataComponent = (page: Page) => {
  return page.locator(TEXTBOX_DATA_COMPONENT);
};

export const textboxPrefix = (page: Page) => {
  return page.locator(TEXTBOX_PREFIX);
};

export const textboxInput = (page: Page) => {
  return page.locator(TEXTBOX).locator("input");
};
