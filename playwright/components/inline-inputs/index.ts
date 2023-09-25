import type { Page } from "@playwright/test";
import {
  INLINE_INPUT_CONTAINER,
  INLINE_INPUTS_PREVIEW,
  INLINE_LABEL,
  INLINE_CHILDREN,
} from "./locators";

// component preview locators

export const inlineInputContainer = (page: Page) => {
  return page.locator(INLINE_INPUT_CONTAINER);
};

export const inlineInputsPreview = (page: Page) => {
  return page.locator(INLINE_INPUTS_PREVIEW);
};

export const inlineLabel = (page: Page) => {
  return page.locator(INLINE_LABEL);
};

export const inlinelabelWidth = (page: Page) => {
  return page.locator(INLINE_INPUTS_PREVIEW).locator(`div`).nth(0);
};

export const inlineChildren = (page: Page) => {
  return page.locator(INLINE_CHILDREN);
};
