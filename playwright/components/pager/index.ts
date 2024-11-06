import type { Page } from "@playwright/test";
import {
  PAGER_SUMMARY,
  PAGE_SELECT,
  MAX_PAGES,
  PAGER_NEXT_ARROW,
  PAGER_PREVIOUS_ARROW,
  COMMON_PART_OF_PAGER_LINK,
  PAGER_FIRST_ARROW,
  PAGER_LAST_ARROW,
  SHOW_LABEL_BEFORE,
  PAGE_SIZE_LABEL_AFTER,
  CURRENT_PAGE,
  CURRENT_PAGE_LABEL,
  SELECT_LIST_WRAPPER,
  INPUT_ICON_TOGGLE,
  CURRENT_PAGE_INPUT,
} from "./locators";
import { COMMMON_DATA_ELEMENT_INPUT } from "../locators";
import { getDataElementByValue } from "..";

// component preview locators
export const pagerSummary = (page: Page) =>
  page
    .locator(PAGER_SUMMARY)
    .locator("div")
    .filter({ hasText: "items" })
    .first();
export const pageSelect = (page: Page) =>
  page.locator(PAGE_SELECT).locator(COMMMON_DATA_ELEMENT_INPUT);
export const pageSelectElement = (page: Page) => page.locator(PAGE_SELECT);
export const maxPages = (page: Page) => page.locator(MAX_PAGES);
export const currentPageWrapper = (page: Page) => page.locator(CURRENT_PAGE);
export const currentPageLabelWrapper = (page: Page) =>
  page.locator(CURRENT_PAGE_LABEL);
export const currentPageInput = (page: Page) =>
  page.locator(CURRENT_PAGE_INPUT);
export const previousArrow = (page: Page) =>
  getDataElementByValue(
    page,
    `${COMMON_PART_OF_PAGER_LINK}${PAGER_PREVIOUS_ARROW}`,
  );
export const nextArrow = (page: Page) =>
  getDataElementByValue(
    page,
    `${COMMON_PART_OF_PAGER_LINK}${PAGER_NEXT_ARROW}`,
  );
export const firstArrow = (page: Page) =>
  getDataElementByValue(
    page,
    `${COMMON_PART_OF_PAGER_LINK}${PAGER_FIRST_ARROW}`,
  );
export const lastArrow = (page: Page) =>
  getDataElementByValue(
    page,
    `${COMMON_PART_OF_PAGER_LINK}${PAGER_LAST_ARROW}`,
  );
export const showLabelBefore = (page: Page) =>
  page
    .locator(PAGER_SUMMARY)
    .locator("label")
    .filter({ hasText: SHOW_LABEL_BEFORE });
export const pageSizeLabelAfter = (page: Page) =>
  page
    .locator(PAGER_SUMMARY)
    .locator("div")
    .nth(0)
    .locator("div")
    .nth(0)
    .locator("div")
    .filter({ hasText: PAGE_SIZE_LABEL_AFTER });
export const currentPageSection = (page: Page) =>
  page.locator(PAGER_SUMMARY).locator("div").nth(1).locator("div");
export const pager = (page: Page) => page.locator(PAGER_SUMMARY);
export const selectListWrapper = (page: Page) =>
  page.locator(SELECT_LIST_WRAPPER);
export const inputIconToggle = (page: Page) => page.locator(INPUT_ICON_TOGGLE);
