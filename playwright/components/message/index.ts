import type { Page } from "@playwright/test";
import {
  MESSAGE_PREVIEW,
  MESSAGE_CHILDREN,
  MESSAGE_TITLE,
  MESSAGE_DISMISS_ICON,
  MESSAGE_DISMISS_ICON_BUTTON,
  MESSAGE_CONTENT,
  VARIANT_PREVIEW,
  BUTTON_PREVIEW,
} from "./locators";

// component preview locators
export const messagePreview = (page: Page) => {
  return page.locator(MESSAGE_PREVIEW);
};

export const messageChildren = (page: Page) => {
  return page.locator(MESSAGE_CHILDREN);
};

export const messageTitle = (page: Page) => {
  return page.locator(MESSAGE_TITLE);
};

export const messageDismissIcon = (page: Page) => {
  return page.locator(MESSAGE_DISMISS_ICON);
};

export const messageDismissIconButton = (page: Page) => {
  return page.locator(MESSAGE_DISMISS_ICON_BUTTON);
};

export const messageContent = (page: Page) => {
  return page.locator(MESSAGE_CONTENT);
};

export const variantPreview = (page: Page) => {
  return page.locator(VARIANT_PREVIEW);
};

export const buttonPreview = (page: Page) => {
  return page.locator(BUTTON_PREVIEW);
};
