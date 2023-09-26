import type { Page } from "@playwright/test";
import HELP_COMPONENT from "./locators";

// component preview locators
const helpComponent = (page: Page) => {
  return page.locator(HELP_COMPONENT);
};

export default helpComponent;
