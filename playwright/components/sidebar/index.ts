import { Page } from "@playwright/test";
import { SIDEBAR_PREVIEW, SIDEBAR_COMPONENT } from "./locators";

// component preview locators
export const sidebarPreview = (page: Page) => page.locator(SIDEBAR_PREVIEW);

export const sidebarComponent = (page: Page) => page.locator(SIDEBAR_COMPONENT);
