import { Page } from "@playwright/test";
import { TEXTAREA } from "./locators";

// component preview locators
export const textarea = (page: Page) => page.locator(TEXTAREA);

export const textareaChildren = (page: Page) =>
  page.locator(TEXTAREA).locator("textarea");
