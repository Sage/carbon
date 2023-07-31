import { type Page } from "@playwright/test";
import BREADCRUMBS from "./locators";

// component preview locators
const breadcrumbsComponent = async (page: Page) => {
  return await page.locator(BREADCRUMBS);
}

const crumb = async (page: Page, index: number) => {
  return (await breadcrumbsComponent(page)).locator("ol").locator("li").nth(index);
}

export { breadcrumbsComponent, crumb };