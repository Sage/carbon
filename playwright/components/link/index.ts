import type { Page } from "@playwright/test";
import { SKIP_LINK } from "./locators";

export const link = (page: Page) => {
  return page.locator('[data-component="link"]');
};

export const linkChildren = (page: Page) => {
  return link(page);
};

export const skipLink = (page: Page) => {
  return page.locator(SKIP_LINK).locator('[data-component="link"]');
};

export const relLink = (page: Page) => {
  return page.locator('a[data-component="link"]');
};
