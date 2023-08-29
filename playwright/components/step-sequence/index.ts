import type { Page } from "@playwright/test";
import {
  STEP_SEQUENCE_DATA_COMPONENT,
  STEP_SEQUENCE_DATA_COMPONENT_ITEM,
} from "./locators";

// component preview locators
export const stepSequenceDataComponentItem = (page: Page) => {
  return page.locator(STEP_SEQUENCE_DATA_COMPONENT_ITEM);
};
export const stepSequenceDataComponent = (page: Page) => {
  return page.locator(STEP_SEQUENCE_DATA_COMPONENT);
};
