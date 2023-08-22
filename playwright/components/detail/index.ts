import type { Page } from "@playwright/test";
import { CHILDREN_PREVIEW, FOOTNOTE_PREVIEW } from "./locators";

// component preview locators
const childrenPreview = (page: Page) => {
  return page.locator(CHILDREN_PREVIEW);
};

const footnotePreview = (page: Page) => {
  return page.locator(FOOTNOTE_PREVIEW);
};

export { childrenPreview, footnotePreview };
