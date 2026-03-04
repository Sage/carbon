import type { Page } from "@playwright/test";
import { CHECKBOX_COMPONENT, CHECKBOX_GROUP } from "./locators";

// component preview locators
export const checkboxComponent = (page: Page) =>
  page.locator(CHECKBOX_COMPONENT);
export const checkboxIcon = (page: Page) =>
  checkboxComponent(page).locator("span[data-component='icon']");
export const checkboxGroup = (page: Page) => page.locator(CHECKBOX_GROUP);
export const checkboxGroupIcon = (page: Page) =>
  checkboxGroup(page).locator("span[data-component='icon']");
