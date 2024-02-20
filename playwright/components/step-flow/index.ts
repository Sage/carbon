import { Page } from "playwright-core";
import {
  STEP_FLOW_PROGRESS_INDICATOR,
  STEP_FLOW_CATEGORY_TEXT,
  STEP_FLOW_TITLE_TEXT_WRAPPER,
  STEP_FLOW_TITLE_TEXT,
  STEP_FLOW_VISUALLY_HIDDEN_TITLE_TEXT,
  STEP_FLOW_PROGRESS_INDICATOR_BAR,
  STEP_FLOW_LABEL,
  STEP_FLOW_DISMISS_ICON,
} from "./locators";

// component preview locators
export const stepFlowProgressIndicator = (page: Page) =>
  page.locator(STEP_FLOW_PROGRESS_INDICATOR);

export const stepFlowCategoryText = (page: Page) =>
  page.locator(STEP_FLOW_CATEGORY_TEXT);

export const stepFlowTitleText = (page: Page) =>
  page.locator(STEP_FLOW_TITLE_TEXT);

export const stepFlowTitleTextWrapper = (page: Page) =>
  page.locator(STEP_FLOW_TITLE_TEXT_WRAPPER);

export const stepFlowVisuallyHiddenTitleText = (page: Page) =>
  page.locator(STEP_FLOW_VISUALLY_HIDDEN_TITLE_TEXT);

export const stepFlowProgressIndicatorBar = (page: Page) =>
  page.locator(STEP_FLOW_PROGRESS_INDICATOR_BAR);

export const stepFlowLabel = (page: Page) => page.locator(STEP_FLOW_LABEL);

export const stepFlowDismissIcon = (page: Page) =>
  page.locator(STEP_FLOW_DISMISS_ICON);
