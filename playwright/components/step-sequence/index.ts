import { Page } from "@playwright/test";
import {
  STEP_SEQUENCE_ITEM_INDICATOR,
  STEP_SEQUENCE_DATA_COMPONENT,
  STEP_SEQUENCE_DATA_COMPONENT_ITEM,
} from "./locators";

// component preview locators
export const stepSequenceItemIndicator = (page: Page) =>
  page.locator(STEP_SEQUENCE_ITEM_INDICATOR).first();

export const stepSequenceDataComponentItem = (page: Page) =>
  page.locator(STEP_SEQUENCE_DATA_COMPONENT_ITEM);

export const stepSequenceDataComponent = (page: Page) =>
  page.locator(STEP_SEQUENCE_DATA_COMPONENT);
