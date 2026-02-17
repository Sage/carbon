import { Page } from "@playwright/test";

// component preview locators
export const tabById = (page: Page, id: number) => {
  return page.locator(`[data-tabid="tab-${id}"]`);
};

export const tabContentById = (page: Page, id: number) => {
  return page.locator(`[aria-labelledby="tab-${id}"]`);
};
