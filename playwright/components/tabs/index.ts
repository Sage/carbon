import { Page } from "@playwright/test";

// component preview locators
export const tabWrapper = (page: Page) => {
  return page.locator(`[data-role="tab-header-wrapper"]`);
};

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

export const navButtonWrapperById = (page: Page, direction: string) => {
  return page.locator(
    `[data-role="tab-navigation-button-wrapper-${direction}"]`,
  );
};

export const navButtonById = (page: Page, direction: string) => {
  return page.locator(`[data-role="tab-navigation-button-${direction}"]`);
};
