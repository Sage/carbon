import { Page } from "@playwright/test";
import {
  TEXTAREA,
  CHARACTER_LIMIT,
  VISUALLY_HIDDEN_CHARACTER_COUNT,
  VISUALLY_HIDDEN_HINT,
  CHARACTER_COUNT,
} from "./locators";

// component preview locators
export const textarea = (page: Page) => page.locator(TEXTAREA);

export const textareaChildren = (page: Page) =>
  page.locator(TEXTAREA).locator("textarea");

export const characterLimitDefaultTextarea = (page: Page) =>
  page.locator(CHARACTER_LIMIT);

export const visuallyHiddenCharacterCount = (page: Page) =>
  page.locator(VISUALLY_HIDDEN_CHARACTER_COUNT);

export const visuallyHiddenHint = (page: Page) =>
  page.locator(VISUALLY_HIDDEN_HINT);

export const characterCount = (page: Page) => page.locator(CHARACTER_COUNT);
