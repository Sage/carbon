import type { Page } from "@playwright/test";
import { BUTTON_TOGGLE_PREVIEW, BUTTON_TOGGLE_BUTTON } from "./locators";

// component preview locators
export const buttonTogglePreview = (page: Page) =>
  page.locator(BUTTON_TOGGLE_PREVIEW);
export const buttonToggleButton = (page: Page) =>
  page.locator(BUTTON_TOGGLE_BUTTON);
