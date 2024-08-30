import { Page } from "@playwright/test";
import {
  LOADER_STAR_HIDDEN_LABEL,
  LOADER_STAR_SVG,
  LOADER_STAR_VISIBLE_LABEL,
  LOADER_STAR_WRAPPER,
} from "./locators";

// component preview locators
export const loaderStarWrapper = (page: Page) =>
  page.locator(LOADER_STAR_WRAPPER);

export const loaderStarSvg = (page: Page) => page.locator(LOADER_STAR_SVG);

export const loaderStarHiddenLabel = (page: Page) =>
  page.locator(LOADER_STAR_HIDDEN_LABEL);

export const loaderStarVisibleLabel = (page: Page) =>
  page.locator(LOADER_STAR_VISIBLE_LABEL);
