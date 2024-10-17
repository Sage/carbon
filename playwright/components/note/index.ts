import type { Page } from "@playwright/test";
import {
  DATA_CONTENTS,
  NOTE_COMPONENT,
  NOTE_STATUS,
  NOTE_FOOTER,
} from "./locators";

// component preview locators
const noteComponent = (page: Page) => {
  return page.locator(NOTE_COMPONENT);
};
const noteHeader = (page: Page) => {
  return page.locator(NOTE_COMPONENT).locator("h2");
};
const noteContent = (page: Page) => {
  return page.locator(DATA_CONTENTS);
};
const noteFooter = (page: Page) => {
  return page.locator(NOTE_FOOTER);
};
const noteFooterCreatedBy = (page: Page) => {
  return page.locator(NOTE_FOOTER).locator("div").first();
};
const noteFooterChangeTime = (page: Page) => {
  return page.locator(NOTE_FOOTER).locator("div").nth(1);
};
const noteStatus = (page: Page) => {
  return page.locator(NOTE_STATUS);
};

export {
  noteComponent,
  noteHeader,
  noteContent,
  noteFooter,
  noteFooterCreatedBy,
  noteFooterChangeTime,
  noteStatus,
};
