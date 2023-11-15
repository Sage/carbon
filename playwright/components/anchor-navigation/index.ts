import { Page } from "@playwright/test";
import {
  ANCHOR_NAVIGATION,
  ANCHOR_NAVIGATION_STICKY_NAVIGATION,
  ANCHOR_NAVIGATION_ITEM,
} from "./locators";

// component preview locators
export const anchorNavigation = (page: Page) => page.locator(ANCHOR_NAVIGATION);
export const anchorNavigationStickyNavigation = (page: Page, text: string) =>
  anchorNavigation(page)
    .locator(ANCHOR_NAVIGATION_STICKY_NAVIGATION)
    .getByText(text);
export const anchorNavigationStickyMainPage = (page: Page, text: string) =>
  anchorNavigation(page).locator("div > h2").getByText(text);
export const anchorNavigationItem = (page: Page, index: number) =>
  page.locator(ANCHOR_NAVIGATION_ITEM).nth(index);
