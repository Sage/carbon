import type { Page } from "@playwright/test";
import {
  CONTENT_PREVIEW,
  CONTENT_TITLE,
  CONTENT_BODY,
  CONTENT_ELEMENT,
} from "./locators";

// component preview locators
const contentPreview = (page: Page) => {
  return page.locator(CONTENT_PREVIEW);
};

const contentTitle = (page: Page) => {
  return page.locator(CONTENT_TITLE);
};

const contentBody = (page: Page) => {
  return page.locator(CONTENT_BODY);
};

const contentElement = (page: Page) => {
  return page.locator(CONTENT_ELEMENT);
};

export { contentPreview, contentTitle, contentBody, contentElement };
