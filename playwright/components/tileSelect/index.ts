import type { Page } from "@playwright/test";
import {
  TILE_SELECT_DATA_COMPONENT,
  TILE_SELECT_GROUP_DESCRIPTION,
} from "./locators";

export const tileSelectDataComponent = (page: Page) => {
  return page.locator(TILE_SELECT_DATA_COMPONENT);
};

export const tileSelectChildren = (page: Page) =>
  tileSelectDataComponent(page).locator("div:nth-child(1)");

export const inputElement = (page: Page) =>
  tileSelectChildren(page).locator("input");

export const titleElement = (page: Page) =>
  tileSelectChildren(page).locator("h3");

export const subtitleElement = (page: Page) =>
  tileSelectChildren(page).locator("h4");

export const descElement = (page: Page) =>
  tileSelectChildren(page).locator("p");

export const tileGroupDescription = (page: Page) => {
  return page.locator(TILE_SELECT_GROUP_DESCRIPTION);
};
