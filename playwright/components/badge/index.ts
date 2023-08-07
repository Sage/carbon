import type { Page } from "@playwright/test";
import { BADGE, BADGE_COUNTER, BADGE_CROSS_ICON } from "./locators";

const badge = (page: Page) => {
  return page.locator(BADGE);
};

const badgeCounter = (page: Page) => {
  return page.locator(BADGE_COUNTER);
};

const badgeCrossIcon = (page: Page) => {
  return page.locator(BADGE_CROSS_ICON);
};

export { badge, badgeCounter, badgeCrossIcon };
