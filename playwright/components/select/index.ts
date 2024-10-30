import type { Page } from "@playwright/test";
import {
  SELECT_OPTIONS,
  SELECT_OPTION_ROWS,
  DROPDOWN_BUTTON,
  SELECT_LIST,
  SELECT_TEXT,
  SELECT_INPUT,
  MULTI_SELECT,
  SELECT_LIST_WRAPPER,
  SELECT_ELEMENT_INPUT,
  FILTERABLE_ADD_BUTTON,
  SELECT_RESET_BUTTON,
  SELECT_LIST_SCROLLABLE_WRAPPER,
} from "./locators";
import { PILL_PREVIEW } from "../pill/locators";
import { getDataElementByValue } from "..";

// component preview locators
export const selectDataComponent = (page: Page, component: string) =>
  page.locator(`[data-component="${component}-select"]`);

export const selectList = (page: Page) => page.locator(SELECT_LIST);

export const selectOption = (page: Page, index: number) =>
  page.locator(SELECT_OPTIONS).nth(index);

export const selectOptionByText = (page: Page, text: string) =>
  page.locator(SELECT_OPTIONS).filter({ hasText: text });

export const selectOptionRow = (page: Page, index: number) =>
  page.locator(SELECT_OPTION_ROWS).nth(index);

export const dropdownButton = (page: Page) => page.locator(DROPDOWN_BUTTON);

export const selectInput = (page: Page) => page.locator(SELECT_INPUT);

export const multiSelectPill = (page: Page) => page.locator(PILL_PREVIEW);

export const multiSelectPillByPosition = (page: Page, index: number) =>
  page.locator(PILL_PREVIEW).nth(index);

export const multiSelectPillByText = (page: Page, text: string) =>
  page.locator(PILL_PREVIEW).filter({ hasText: text });

export const multiSelectDataComponent = (page: Page) =>
  page.locator(MULTI_SELECT);

export const multiColumnsSelectListHeader = (page: Page) =>
  selectList(page).locator("thead > tr > th");

export const multiColumnsSelectListHeaderColumn = (page: Page, index: number) =>
  selectList(page).locator(`thead > tr > th:nth-child(${index})`);

export const multiColumnsSelectListBody = (page: Page) =>
  selectList(page).locator("tbody > tr:nth-child(3) > td");

export const multiColumnsSelectListRowAt = (page: Page, index: number) =>
  selectList(page).locator(`tbody > tr:nth-child(${index})`);

export const multiColumnsSelectListRow = (page: Page) =>
  multiColumnsSelectListRowAt(page, 2);

export const multiColumnsSelectListNoResultsMessage = (
  page: Page,
  text: string
) =>
  selectList(page)
    .locator("tbody > tr > td")
    .filter({ hasText: `No results for "${text}"` });

export const boldedAndUnderlinedValue = (page: Page, text: string) =>
  selectList(page)
    .locator("tbody > tr:nth-child(1) > td:nth-child(2) > span")
    .filter({ hasText: text });

export const selectListPosition = (page: Page) =>
  page.locator(SELECT_LIST_WRAPPER);

export const selectText = (page: Page) =>
  getDataElementByValue(page, SELECT_TEXT);

export const selectListCustomChild = (page: Page, index: number) =>
  selectList(page).locator(`li:nth-child(${index})`).locator("span");

export const selectListOptionGroup = (page: Page) =>
  selectList(page).locator("div:nth-child(1) > h4");

export const selectListWrapper = (page: Page) =>
  page.locator(SELECT_LIST_WRAPPER);

export const selectListScrollableWrapper = (page: Page) =>
  page.locator(SELECT_LIST_SCROLLABLE_WRAPPER);

export const selectElementInput = (page: Page) =>
  page.locator(SELECT_ELEMENT_INPUT);

export const filterableSelectAddElementButton = (page: Page) =>
  page.locator(FILTERABLE_ADD_BUTTON);

export const filterableSelectButtonIcon = (page: Page) =>
  filterableSelectAddElementButton(page).locator("span:nth-child(2)");

export const selectResetButton = (page: Page) =>
  page.locator(SELECT_RESET_BUTTON);
