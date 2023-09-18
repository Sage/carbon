import type { Page } from "@playwright/test";

import VERTICAL_DIVIDER_COMPONENT from "./locators";

export const verticalDividerComponent = (page: Page) => {
  return page.locator(VERTICAL_DIVIDER_COMPONENT);
};

export default verticalDividerComponent;
