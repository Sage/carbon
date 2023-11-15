import type { Page } from "@playwright/test";
import { EMAIL, NAME, TEXT, DETAILS, INITIALS, PROFILE } from "./locators";

// component preview locators

const emailPreview = (page: Page) => {
  return page.locator(EMAIL);
};

const namePreview = (page: Page) => {
  return page.locator(NAME);
};

const textPreview = (page: Page) => {
  return page.locator(TEXT);
};

const detailsPreview = (page: Page) => {
  return page.locator(DETAILS);
};

const profilePreview = (page: Page) => {
  return page.locator(PROFILE);
};

const initialPreview = (page: Page) => {
  return page.locator(INITIALS);
};
export {
  emailPreview,
  namePreview,
  textPreview,
  detailsPreview,
  profilePreview,
  initialPreview,
};
