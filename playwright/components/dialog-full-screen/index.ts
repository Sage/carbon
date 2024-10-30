import type { Page } from "@playwright/test";
import DIALOG_FULL_SCREEN_CONTENT from "./locators";

const dialogFullScreenContent = (page: Page) => {
  return page.locator(DIALOG_FULL_SCREEN_CONTENT);
};

export default dialogFullScreenContent;
