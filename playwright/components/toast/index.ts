import type { Page } from "@playwright/test";
import { TOAST_COMPONENT, TOAST_CONTENT } from "./locators";

export const toastComponent = (page: Page) => {
  return page.locator(TOAST_COMPONENT);
};

export const toastContent = (page: Page) => {
  return page.locator(TOAST_CONTENT);
};
