import { Page } from "@playwright/test";
import { DRAWER, DRAWER_ASIDE_CONTENT } from "./locators";

// component preview locators
export const drawer = (page: Page) => page.locator(DRAWER);
export const drawerAsideContent = (page: Page) =>
  page.locator(DRAWER_ASIDE_CONTENT);
