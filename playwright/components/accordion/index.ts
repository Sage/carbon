import type { Page } from "@playwright/test";
import ACCORDION_TITLE_CONTAINER from "./locators";

// locators
export const accordionDefaultTitle = (page: Page) => {
  return page.locator(ACCORDION_TITLE_CONTAINER);
};

export default accordionDefaultTitle;
