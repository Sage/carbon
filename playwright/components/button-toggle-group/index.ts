import type { Page } from "@playwright/test";
import {
  BUTTON_TOGGLE_GROUP_CONTAINER,
  BUTTON_TOGGLE_GROUP_HELP,
  BUTTON_TOGGLE_GROUP_HELP_ICON,
} from "./locators";

// component preview locators
export const buttonToggleLabel = (page: Page) =>
  page
    .locator(BUTTON_TOGGLE_GROUP_CONTAINER)
    .locator('div[data-component="button-toggle"]')
    .locator("label");
export const buttonToggleGroup = (page: Page) =>
  page.locator(BUTTON_TOGGLE_GROUP_CONTAINER);
export const buttonToggleGroupHelp = (page: Page) =>
  page.locator(BUTTON_TOGGLE_GROUP_HELP);
export const buttonToggleGroupHelpIcon = (page: Page) =>
  page.locator(BUTTON_TOGGLE_GROUP_HELP_ICON);
