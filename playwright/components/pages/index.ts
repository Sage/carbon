import type { Page } from "@playwright/test";
import { BUTTON_DATA_COMPONENT, BACK_ARROW } from "./locators";

// component preview locators
export const dataComponentButtonByText = (page: Page, text: string) =>
  page.locator(BUTTON_DATA_COMPONENT).filter({ hasText: text });
export const backArrow = (page: Page) => page.locator(BACK_ARROW);
