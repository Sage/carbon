import { Page } from "@playwright/test";
import { LABEL } from "../locators";
import { DATE_RANGE } from "./locators";

// component preview locators
export const dateRange = (page: Page, index: number) =>
  page.locator(DATE_RANGE).nth(index);

export const dateRangeComponentLabel = (page: Page, index: number) =>
  page.locator(DATE_RANGE).locator(LABEL).nth(index);

export const dateRangeComponentInput = (page: Page, index: number) =>
  page.locator(DATE_RANGE).locator("input").nth(index);
