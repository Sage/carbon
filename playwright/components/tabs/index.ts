import { Page } from "@playwright/test";

// component preview locators
export const tabList = (page: Page) => {
  return page.locator(`[role="tablist"]`);
};

export const tabById = (page: Page, id: number) => {
  return page.locator(`[data-tabid="tab-${id}"]`);
};

export const tabContentById = (page: Page, id: number) => {
  return page.locator(`[aria-labelledby="tab-${id}-tab"]`);
};

export const tabTitleById = (page: Page, id: number) => {
  return page.locator(`#tab-${id}-tab`);
};
