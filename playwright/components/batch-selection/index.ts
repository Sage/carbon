import type { Page } from "@playwright/test";
import { BATCH_SELECTION_COMPONENT, BATCH_SELECTION_COUNTER } from "./locators";

// component preview locators
const batchSelectionComponent = (page: Page) => {
  return page.locator(BATCH_SELECTION_COMPONENT);
};

const batchSelectionCounter = (page: Page) => {
  return batchSelectionComponent(page).locator(BATCH_SELECTION_COUNTER);
};

const batchSelectionButtonsByPosition = (page: Page, index: number) => {
  return page
    .locator(BATCH_SELECTION_COMPONENT)
    .locator(`button:nth-child(${index + 2})`);
};

export {
  batchSelectionComponent,
  batchSelectionCounter,
  batchSelectionButtonsByPosition,
};
