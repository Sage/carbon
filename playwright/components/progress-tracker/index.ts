import { Page } from "@playwright/test";
import {
  PROGRESS_TRACKER,
  PROGRESS_TRACKER_CURRENT_VALUE,
  PROGRESS_TRACKER_CUSTOM_VALUE_PREPOSITION,
  PROGRESS_TRACKER_DESCRIPTION,
  PROGRESS_TRACKER_LINE,
  PROGRESS_TRACKER_MAX_VALUE,
} from "./locators";

// component preview locators
export const progressTrackerComponent = (page: Page) =>
  page.locator(PROGRESS_TRACKER);

export const progressTrackerLine = (page: Page) =>
  page.locator(PROGRESS_TRACKER_LINE);

export const progressTrackerMinVal = (page: Page) =>
  progressTrackerComponent(page).locator(PROGRESS_TRACKER_CURRENT_VALUE);

export const progressTrackerMaxVal = (page: Page) =>
  progressTrackerComponent(page).locator(PROGRESS_TRACKER_MAX_VALUE);

export const progressTrackerCustomValuePreposition = (page: Page) =>
  progressTrackerComponent(page).locator(
    PROGRESS_TRACKER_CUSTOM_VALUE_PREPOSITION,
  );

export const progressTrackerDescription = (page: Page) =>
  progressTrackerComponent(page).locator(PROGRESS_TRACKER_DESCRIPTION);
