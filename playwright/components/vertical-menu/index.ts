import type { Page } from "@playwright/test";
import {
  VERTICAL_MENU_TRIGGER,
  VERTICAL_MENU_COMPONENT,
  VERTICAL_MENU_ITEM,
  VERTICAL_MENU_FULL_SCREEN,
} from "./locators";

// component preview locators
export const verticalMenuComponent = (page: Page) =>
  page.locator(VERTICAL_MENU_COMPONENT);
export const verticalMenuItem = (page: Page) =>
  page.locator(VERTICAL_MENU_ITEM);
export const verticalMenuTrigger = (page: Page) =>
  page.locator(VERTICAL_MENU_TRIGGER);
export const verticalMenuFullScreen = (page: Page) =>
  page.locator(VERTICAL_MENU_FULL_SCREEN);
