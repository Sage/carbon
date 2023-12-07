import { Page } from "@playwright/test";
import GRID_COMPONENT from "./locators";

export const gridItem = (page: Page, index: number) =>
  page.locator(GRID_COMPONENT).locator("> *").nth(index);
export const gridContainer = (page: Page) => page.locator(GRID_COMPONENT);
