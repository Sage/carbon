import { type Page } from "@playwright/test";
import { BADGE, BADGE_COUNTER, BADGE_CROSS_ICON } from "./locators";

const badge = async (page: Page) => {
  return page.locator(BADGE);
}

const badgeCounter = async (page: Page) => {
  return page.locator(BADGE_COUNTER);
}

const badgeCrossIcon = async (page: Page) => {
  return page.locator(BADGE_CROSS_ICON);
}

export { badge, badgeCounter, badgeCrossIcon };