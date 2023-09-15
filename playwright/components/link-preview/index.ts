import type { Page } from "@playwright/test";
import { PILL_CLOSE_ICON } from "../locators";
import { dlsRoot } from "../../../playwright/components/index";
import { LinkPreviewProps } from "../../../src/components/link-preview";

// component preview locators
export const linkPreview = (page: Page) => {
  return dlsRoot(page).locator("a");
};

export const linkPreviewAs = (page: Page, as: LinkPreviewProps["as"]) => {
  let selector: string;

  switch (as) {
    case "a":
      selector = "a";
      break;
    case "div":
      selector = "div";
      break;
    default:
      throw new Error(`Invalid 'as' value: ${as}`);
  }

  return dlsRoot(page).locator(selector).first();
};

export const linkPreviewCloseIcon = (page: Page) => {
  return page.locator(PILL_CLOSE_ICON);
};
