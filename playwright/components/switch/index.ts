import { Page } from "@playwright/test";
import SWITCH_DATA_COMPONENT from "./locators";

// component preview locators
export const switchDataComponent = (page: Page) =>
  page.locator(SWITCH_DATA_COMPONENT);
export const switchInput = (page: Page) =>
  switchDataComponent(page).locator("input");
export const switchStyling = (page: Page) =>
  switchDataComponent(page).locator("[data-component='slider']");
export const switchLoading = (page: Page) =>
  switchDataComponent(page).locator("[data-component='loader']");
export const switchLabel = (page: Page) =>
  switchDataComponent(page).locator("label");
export const switchLabelParent = (page: Page) =>
  switchLabel(page).locator("..");
export const switchHelpIcon = (page: Page) =>
  switchDataComponent(page).locator("[data-component='help']");
export const switchFieldHelp = (page: Page) =>
  switchDataComponent(page).locator("[data-element='help']");
export const switchIcon = (page: Page) =>
  switchDataComponent(page).locator("span[data-component='icon']");
export const switchSvg = (page: Page) =>
  switchDataComponent(page).locator("svg");
