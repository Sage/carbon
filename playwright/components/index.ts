import type { Page } from "@playwright/test";
import { ICON, CY_ROOT } from "./locators";

const icon = (page: Page) => {
  return page.locator(ICON);
};

const cyRoot = (page: Page) => {
  return page.locator(CY_ROOT);
};

export { icon, cyRoot };
