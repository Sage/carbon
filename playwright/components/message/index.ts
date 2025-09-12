import type { Page } from "@playwright/test";
import MESSAGE_PREVIEW from "./locators";

// component preview locators
const messagePreview = (page: Page) => {
  return page.locator(MESSAGE_PREVIEW);
};

export default messagePreview;
