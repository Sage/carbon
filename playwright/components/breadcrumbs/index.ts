import type { Page } from "@playwright/test";
import BREADCRUMBS from "./locators";

// component preview locators
const breadcrumbsComponent = (page: Page) => {
  return page.locator(BREADCRUMBS);
};

const allCrumbs = (page: Page) => {
  return breadcrumbsComponent(page).locator("ol").locator("li");
};

const crumbAtIndex = (page: Page, index: number) => {
  return allCrumbs(page).nth(index);
};

export { breadcrumbsComponent, allCrumbs, crumbAtIndex };
