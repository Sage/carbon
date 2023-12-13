import { Page } from "@playwright/test";
import {
  SPLIT_TOGGLE_BUTTON,
  ADDITIONAL_BUTTONS,
  SPLIT_MAIN_BUTTON,
  MAIN_BUTTON,
} from "./locators";

// component preview locators
export const splitToggleButton = (page: Page) =>
  page.locator(SPLIT_TOGGLE_BUTTON);
export const additionalButtonsContainer = (page: Page) =>
  page.locator(ADDITIONAL_BUTTONS);

export const additionalButton = (page: Page, index: number) =>
  additionalButtonsContainer(page).locator("button").nth(index);

export const splitMainButtonDataComponent = (page: Page, index: number) =>
  page.locator(SPLIT_MAIN_BUTTON).locator("div > *").nth(index);

export const mainButton = (page: Page) => page.locator(MAIN_BUTTON);
export const splitMainButton = (page: Page) => page.locator(SPLIT_MAIN_BUTTON);
