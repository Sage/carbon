import type { Page } from "@playwright/test";
import {
  ACTION_POPOVER_BUTTON,
  ACTION_POPOVER_DATA_COMPONENT,
  ACTION_POPOVER_SUBMENU,
  ACTION_POPOVER_MENU_ITEM_ICON,
  ACTION_POPOVER_MENU_ITEM_INNER_TEXT,
  ACTION_POPOVER_MENU_ITEM_CHEVRON,
  ACTION_POPOVER_WRAPPER,
} from "./locators";

// component preview locators
export const actionPopoverButton = (page: Page) =>
  page.locator(ACTION_POPOVER_BUTTON);

export const actionPopover = (page: Page) =>
  page.locator(ACTION_POPOVER_DATA_COMPONENT);

export const actionPopoverInnerItem = (page: Page, index: number) =>
  page
    .locator(ACTION_POPOVER_DATA_COMPONENT)
    .first()
    .locator("> li")
    .nth(index)
    .locator("button")
    .first();

export const actionPopoverSubmenu = (page: Page, index: number) =>
  page
    .locator(ACTION_POPOVER_SUBMENU)
    .nth(1)
    .locator(`> li:nth-child(${index + 1})`)
    .locator("button");

export const actionPopoverMenuItemIcon = (page: Page) =>
  page.locator(ACTION_POPOVER_MENU_ITEM_ICON);

export const actionPopoverMenuItemInnerText = (page: Page) =>
  page.locator(ACTION_POPOVER_MENU_ITEM_INNER_TEXT);

export const actionPopoverMenuItemChevron = (page: Page) =>
  page.locator(ACTION_POPOVER_MENU_ITEM_CHEVRON);

export const actionPopoverSubmenuByIndex = (page: Page) =>
  page.locator(ACTION_POPOVER_SUBMENU).nth(1);

export const actionPopoverWrapper = (page: Page) =>
  page.locator(ACTION_POPOVER_WRAPPER);
