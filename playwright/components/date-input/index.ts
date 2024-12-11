import type { Page } from "@playwright/test";

import { DAY_PICKER_WRAPPER, DAY_PICKER_HEADING } from "./locators";

// component preview locators

export const dayPickerWrapper = (page: Page) =>
  page.locator(DAY_PICKER_WRAPPER);
export const dayPickerHeading = (page: Page) =>
  page.locator(DAY_PICKER_HEADING);
