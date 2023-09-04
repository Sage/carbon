import type { Page } from "@playwright/test";
import {
  SLIDE,
  PREVIOUS_ARROW_BUTTON,
  NEXT_ARROW_BUTTON,
  CAROUSEL,
  SLIDE_SELECTOR,
} from "./locators";

// component preview locators
export const slide = (page: Page, index: number) => {
  return page.locator(SLIDE).nth(index);
};
export const previousArrowButton = (page: Page) => {
  return page.locator(PREVIOUS_ARROW_BUTTON);
};
export const nextArrowButton = (page: Page) => {
  return page.locator(NEXT_ARROW_BUTTON);
};
export const carousel = (page: Page) => {
  return page.locator(CAROUSEL);
};
export const slideSelector = (page: Page) => {
  return page.locator(CAROUSEL).locator(SLIDE_SELECTOR);
};
