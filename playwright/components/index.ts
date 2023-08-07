import type { Page } from "@playwright/test";
import { ICON } from "./locators";

const icon = (page: Page) => {
  return page.locator(ICON);
};

export default icon;
