import { Page } from "@playwright/test";
import { DRAWER, DRAWER_ASIDE_CONTENT, DRAWER_SIDEBAR } from "./locators";

// component preview locators
export const drawer = (page: Page) => page.locator(DRAWER);
export const drawerAsideContent = (page: Page) =>
  page.locator(DRAWER_ASIDE_CONTENT);
export const drawerSidebar = (page: Page) => page.locator(DRAWER_SIDEBAR);
