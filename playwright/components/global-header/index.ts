import { Page } from "@playwright/test";
import { GLOBAL_HEADER, GLOBAL_HEADER_LOGO_WRAPPER } from "./locators";

export const globalHeader = (page: Page) => page.locator(GLOBAL_HEADER);
export const globalHeaderLogo = (page: Page) =>
  page.locator(GLOBAL_HEADER_LOGO_WRAPPER).nth(0).first();
