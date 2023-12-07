import { Page } from "@playwright/test";
import { PILL_PREVIEW, PILL_CLOSE_ICON } from "./locators";

// component preview locators
export const pillPreview = (page: Page) => page.locator(PILL_PREVIEW);
export const pillCloseIcon = (page: Page) => page.locator(PILL_CLOSE_ICON);
