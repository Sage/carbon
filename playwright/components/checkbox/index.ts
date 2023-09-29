import type { Page } from "@playwright/test";
import {
  CHECKBOX_COMPONENT,
  CHECKBOX_ROLE,
  CHECKBOX_GROUP,
  CHECKBOX_GROUP_FLEX,
} from "./locators";

// component preview locators
export const checkboxComponent = (page: Page) =>
  page.locator(CHECKBOX_COMPONENT);
export const checkboxRole = (page: Page) => page.locator(CHECKBOX_ROLE);
export const checkboxLabel = (page: Page) =>
  checkboxComponent(page).locator("label");
export const checkboxInlineFieldHelp = (page: Page) =>
  checkboxComponent(page).locator("span");
export const checkboxIcon = (page: Page) =>
  checkboxComponent(page).locator("span[data-component='icon']");
export const checkboxSvg = (page: Page) =>
  checkboxComponent(page).locator("svg");
export const checkboxHelpIcon = (page: Page) =>
  checkboxComponent(page).locator("[data-component='help']");

export const checkboxGroup = (page: Page) => page.locator(CHECKBOX_GROUP);
export const checkboxgroupLegend = (page: Page) =>
  checkboxGroup(page).locator("legend");
export const checkboxGroupIcon = (page: Page) =>
  checkboxGroup(page).locator("span[data-component='icon']");
export const checkboxGroupFlex = (page: Page) =>
  page.locator(CHECKBOX_GROUP_FLEX);
