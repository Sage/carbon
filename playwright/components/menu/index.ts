import type { Page } from "@playwright/test";
import { DLS_ROOT } from "../locators";
import {
  SUBMENU,
  SCROLL_BLOCK,
  MENU_DIVIDER,
  SEGMENT_TITLE,
  MENU,
  FULLSCREEN_MENU,
  MENU_ITEM,
} from "./locators";

// component preview locators
export const submenu = (page: Page) => page.locator(SUBMENU);
export const submenuBlock = (page: Page) => page.locator(SUBMENU).locator("ul");
export const innerMenu = (page: Page, index: number, htmlProp: string) =>
  submenuBlock(page).locator(`li:nth-child(${index})`).locator(htmlProp);
export const scrollBlock = (page: Page) =>
  page.locator(SUBMENU).locator(SCROLL_BLOCK);
export const lastSubmenuElement = (page: Page, htmlProp: string) =>
  submenuBlock(page).locator(htmlProp).last();
export const menuDivider = (page: Page) => page.locator(MENU_DIVIDER);
export const segmentTitle = (page: Page) => page.locator(SEGMENT_TITLE);
export const menuComponent = (page: Page, index: number) =>
  page.locator(MENU).first().locator(`li:nth-child(${index})`);
export const submenuItem = (page: Page, index: number) =>
  menuComponent(page, index).locator(SUBMENU).locator("ul > li");
export const menuCanvas = (page: Page) => page.locator(DLS_ROOT);
export const fullScreenMenuWrapper = (page: Page) =>
  page.locator(FULLSCREEN_MENU);
export const fullscreenMenu = (page: Page, index: number) =>
  page.locator(FULLSCREEN_MENU).locator("div").nth(index);
export const fullScreenMenuItem = (page: Page, index: number) =>
  page.locator(`${FULLSCREEN_MENU} ${MENU}`).locator(`li:nth-child(${index})`);
export const menu = (page: Page) => page.locator(MENU);
export const menuItem = (page: Page) => page.locator(MENU_ITEM);
