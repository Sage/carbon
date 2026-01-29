import { Page } from "@playwright/test";
import { SEARCH_COMPONENT, CROSS_ICON } from "./locators";
import { BUTTON } from "../locators";

// component preview locators
export const searchDefault = (page: Page) => page.locator(SEARCH_COMPONENT);

export const searchDefaultInput = (page: Page) =>
  searchDefault(page).locator("input");

export const searchDefaultInnerIcon = (page: Page) =>
  searchDefault(page).locator("span:nth-child(1)");

export const searchCrossIcon = (page: Page) =>
  searchDefault(page).locator(CROSS_ICON);

export const searchButton = (page: Page) =>
  searchDefault(page).locator('[data-component="Search-button"]');

export const searchIcon = (page: Page) => page.locator(BUTTON);
