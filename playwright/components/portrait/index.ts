import type { Page } from "@playwright/test";
import { PORTRAIT_PREVIEW, PORTRAIT_INITIALS } from "./locators";

// component preview locators
export const portraitPreview = (page: Page) => page.locator(PORTRAIT_PREVIEW);
export const portraitInitials = (page: Page) => page.locator(PORTRAIT_INITIALS);
export const portraitImage = (page: Page) =>
  page.locator(PORTRAIT_PREVIEW).locator("img");
