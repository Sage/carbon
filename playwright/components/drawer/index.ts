import { Page } from "@playwright/test";
import {
  DRAWER,
  DRAWER_SIDEBAR,
  DRAWER_TOGGLE,
  DRAWER_ASIDE_CONTENT,
} from "./locators";

// component preview locators
export const drawerToggle = (page: Page) => page.locator(DRAWER_TOGGLE);
export const drawer = (page: Page) => page.locator(DRAWER);
export const drawerSidebar = (page: Page) => page.locator(DRAWER_SIDEBAR);
export const drawerSidebarContentInnerElement = (page: Page, index: number) =>
  page.locator(DRAWER_SIDEBAR).locator("li").nth(index);
export const drawerAsideContent = (page: Page) =>
  page.locator(DRAWER_ASIDE_CONTENT);
