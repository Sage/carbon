import { Page } from "@playwright/test";
import {
  LOADER_SPINNER_WRAPPER,
  LOADER_SPINNER_SVG,
  LOADER_SPINNER_OUTER_ARC,
  LOADER_SPINNER_INNER_ARC,
  LOADER_SPINNER_VISIBLE_LABEL,
  LOADER_SPINNER_HIDDEN_LABEL,
} from "./locators";

// component preview locators
export const loaderSpinnerWrapper = (page: Page) =>
  page.locator(LOADER_SPINNER_WRAPPER);

export const loaderSpinnerSvg = (page: Page) =>
  page.locator(LOADER_SPINNER_SVG);

export const loaderSpinnerOuterArc = (page: Page) =>
  page.locator(LOADER_SPINNER_OUTER_ARC);

export const loaderSpinnerInnerArc = (page: Page) =>
  page.locator(LOADER_SPINNER_INNER_ARC);

export const loaderSpinnerVisibleLabel = (page: Page) =>
  page.locator(LOADER_SPINNER_VISIBLE_LABEL);

export const loaderSpinnerHiddenLabel = (page: Page) =>
  page.locator(LOADER_SPINNER_HIDDEN_LABEL);
