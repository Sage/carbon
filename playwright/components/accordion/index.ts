import type { Page } from "@playwright/test";
import {
  ACCORDION_PREVIEW,
  ACCORDION_TITLE_CONTAINER,
  ACCORDION_ICON,
  ACCORDION_CONTENT,
} from "./locators";

// locators
const accordionTitleContainer = (page: Page) => {
  return page.locator(ACCORDION_PREVIEW).locator(ACCORDION_TITLE_CONTAINER);
};

const accordionDefaultTitle = (page: Page) => {
  return page.locator(ACCORDION_TITLE_CONTAINER);
};

const accordionTitleContainerByPosition = (page: Page, index: number) => {
  return page
    .locator(ACCORDION_PREVIEW)
    .locator(`${ACCORDION_TITLE_CONTAINER}:nth-child(${index + 1}) > *`);
};

const accordionIcon = (page: Page) => {
  return accordionTitleContainer(page).locator(ACCORDION_ICON);
};

const accordionContent = (page: Page) => {
  return page.locator(ACCORDION_PREVIEW).locator(ACCORDION_CONTENT);
};

const accordion = (page: Page) => {
  return page.locator(ACCORDION_PREVIEW);
};

export {
  accordionTitleContainer,
  accordionDefaultTitle,
  accordionTitleContainerByPosition,
  accordionIcon,
  accordionContent,
  accordion,
};
