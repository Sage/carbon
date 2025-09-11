import type { Page } from "@playwright/test";

import DIVIDER_COMPONENT from "./locators";

export const dividerComponent = (page: Page) => {
  return page.locator(DIVIDER_COMPONENT);
};

export default dividerComponent;
