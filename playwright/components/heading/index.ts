import type { Page } from "@playwright/test";
import {
  HEADING_PREVIEW,
  HEADING_TITLE,
  HEADING_HELP,
  SUBHEADER_PREVIEW,
  DIVIDER_PREVIEW,
} from "./locators";

import { TOOLTIP_PREVIEW } from "../locators";

// component preview locators export
export const headingPreview = (page: Page) => {
  return page.locator(HEADING_PREVIEW);
};

export const headingTitle = (page: Page) => {
  return page.locator(HEADING_TITLE);
};

export const headingHelp = (page: Page) => {
  return page.locator(HEADING_HELP);
};

export const headingHelpTooltip = (page: Page) => {
  return page.locator(TOOLTIP_PREVIEW);
};

export const subheaderPreview = (page: Page) => {
  return page.locator(SUBHEADER_PREVIEW);
};

export const dividerPreview = (page: Page) => {
  return page.locator(DIVIDER_PREVIEW);
};
export const separatorPreview = (page: Page) => {
  return page.locator(HEADING_PREVIEW).locator("div > hr");
};
