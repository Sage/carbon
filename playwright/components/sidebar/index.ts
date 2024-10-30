import { Page } from "@playwright/test";
import {
  SIDEBAR_PREVIEW,
  SIDEBAR_COMPONENT,
  SIDEBAR_CONTENT,
} from "./locators";

// component preview locators
export const sidebarPreview = (page: Page) => page.locator(SIDEBAR_PREVIEW);

export const sidebarComponent = (page: Page) => page.locator(SIDEBAR_COMPONENT);

export const sidebarContent = (page: Page) => page.locator(SIDEBAR_CONTENT);
