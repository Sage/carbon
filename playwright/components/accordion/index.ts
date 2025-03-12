import type { Page } from "@playwright/test";
import {
  ACCORDION_PREVIEW,
  ACCORDION_DETAILS,
  ACCORDION_SUMMARY,
  ACCORDION_TITLE_WRAPPER,
  ACCORDION_TITLE_CONTENT,
  ACCORDION_TITLE,
  ACCORDION_TITLE_CONTAINER,
  ACCORDION_ICON,
  ACCORDION_MARKER,
  ACCORDION_SUBTITLE,
  ACCORDION_CONTENT,
  ACCORDION_ADD_CONTENT,
  ACCORDION_REMOVE_CONTENT,
} from "./locators";

// locators
const accordion = (page: Page) => {
  return page.locator(ACCORDION_PREVIEW);
};

const accordionDetails = (page: Page) => {
  return page.locator(ACCORDION_PREVIEW).locator(ACCORDION_DETAILS);
};

const accordionSummary = (page: Page) => {
  return page.locator(ACCORDION_PREVIEW).locator(ACCORDION_SUMMARY);
};

const accordionTitleWrapper = (page: Page) => {
  return page.locator(ACCORDION_TITLE_WRAPPER);
};

const accordionTitleContent = (page: Page) => {
  return page.locator(ACCORDION_TITLE_CONTENT);
};

const accordionTitle = (page: Page) => {
  return page.locator(ACCORDION_TITLE);
};

const accordionIcon = (page: Page) => {
  return page.locator(ACCORDION_ICON);
};

const accordionMarker = (page: Page) => {
  return page.locator(ACCORDION_MARKER);
};

const accordionSubtitle = (page: Page) => {
  return page.locator(ACCORDION_SUBTITLE);
};

const accordionContent = (page: Page) => {
  return page.locator(ACCORDION_CONTENT);
};

const accordionTitleContainerByPosition = (page: Page, index: number) => {
  return page
    .locator(ACCORDION_PREVIEW)
    .locator(`${ACCORDION_TITLE_CONTAINER}:nth-child(${index + 1}) > *`);
};

const accordionAddContent = (page: Page) => {
  return page.locator(ACCORDION_ADD_CONTENT);
};

const accordionRemoveContent = (page: Page) => {
  return page.locator(ACCORDION_REMOVE_CONTENT);
};

export {
  accordion,
  accordionDetails,
  accordionSummary,
  accordionTitleWrapper,
  accordionTitleContent,
  accordionTitle,
  accordionIcon,
  accordionMarker,
  accordionSubtitle,
  accordionContent,
  accordionTitleContainerByPosition,
  accordionAddContent,
  accordionRemoveContent,
};
