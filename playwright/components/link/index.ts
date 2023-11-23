import type { Page } from "@playwright/test";
import { link } from "..";
import { SKIP_LINK } from "./locators";

// component preview locators
export const linkChildren = (page: Page) => {
  return link(page).locator("a, button");
};

export const skipLink = (page: Page) => {
  return page.locator(SKIP_LINK).locator("a");
};
