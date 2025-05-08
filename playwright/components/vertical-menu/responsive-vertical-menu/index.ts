import type { Page } from "@playwright/test";
import {
  RESPONSIVE_VERTICAL_MENU_LAUNCHER,
  RESPONSIVE_VERTICAL_MENU_WRAPPER,
  RESPONSIVE_VERTICAL_MENU_PRIMARY,
  RESPONSIVE_VERTICAL_MENU_SECONDARY,
  RESPONSIVE_VERTICAL_MENU_ITEM_CUSTOM_ICON,
  RESPONSIVE_VERTICAL_MENU_ITEM_ICON,
  RESPONSIVE_VERTICAL_MENU_ITEM_EXPANDER,
} from "./locators";

export const responsiveVerticalMenuLauncher = (page: Page) =>
  page.locator(RESPONSIVE_VERTICAL_MENU_LAUNCHER);
export const responsiveVerticalMenuWrapper = (page: Page) =>
  page.locator(RESPONSIVE_VERTICAL_MENU_WRAPPER);
export const responsiveVerticalMenuPrimary = (page: Page) =>
  page.locator(RESPONSIVE_VERTICAL_MENU_PRIMARY);
export const responsiveVerticalMenuSecondary = (page: Page) =>
  page.locator(RESPONSIVE_VERTICAL_MENU_SECONDARY);
export const responsiveVerticalMenuCustomIcon = (page: Page) =>
  page.locator(RESPONSIVE_VERTICAL_MENU_ITEM_CUSTOM_ICON);
export const responsiveVerticalMenuIcon = (page: Page) =>
  page.locator(RESPONSIVE_VERTICAL_MENU_ITEM_ICON);
export const responsiveVerticalMenuExpander = (page: Page) =>
  page.locator(RESPONSIVE_VERTICAL_MENU_ITEM_EXPANDER);
export const responsiveVerticalMenuNthPrimaryItem = (
  page: Page,
  index: number,
) => page.locator(RESPONSIVE_VERTICAL_MENU_PRIMARY).nth(index);
export const responsiveVerticalMenuNthSecondaryItem = (
  page: Page,
  index: number,
) => page.locator(RESPONSIVE_VERTICAL_MENU_SECONDARY).nth(index);

export const responsiveVerticalMenuNestedMenu = (page: Page, id: string) =>
  page.locator(`[data-component="${id}-nested-menu"]`);
export const responsiveVerticalMenuNestedMenuNthChild = (
  page: Page,
  id: string,
  index: number,
) => page.locator(`[data-component="${id}-nested-menu"]`).nth(index);
export const responsiveVerticalMenuMenuItem = (page: Page, id: string) =>
  page.locator(`[data-component="responsive-vertical-menu-item-${id}"]`);
