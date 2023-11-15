import { Page } from "@playwright/test";
import {
  MULTI_ACTION_BUTTON_LIST,
  MULTI_ACTION_BUTTON_COMPONENT,
} from "./locators";

// component preview locators
export const multiActionButtonComponent = (page: Page) =>
  page.locator(MULTI_ACTION_BUTTON_COMPONENT);

export const multiActionButtonListContainer = (page: Page) =>
  page.locator(MULTI_ACTION_BUTTON_LIST);

export const multiActionButtonList = (page: Page) =>
  multiActionButtonListContainer(page).locator("div > *");

export const multiActionButtonText = (page: Page) =>
  multiActionButtonComponent(page).locator('[data-element="main-text"]');

export const multiActionButton = (page: Page) =>
  multiActionButtonComponent(page).locator("button");
