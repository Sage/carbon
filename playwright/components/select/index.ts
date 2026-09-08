import type { Page } from "@playwright/test";
import {
  SELECT_OPTIONS,
  DROPDOWN_BUTTON,
  SELECT_LIST,
  SELECT_INPUT,
  MULTI_SELECT,
  SELECT_LIST_WRAPPER,
  FILTERABLE_ADD_BUTTON,
  SELECT_LIST_SCROLLABLE_WRAPPER,
} from "./locators";
import { PILL_PREVIEW } from "../pill/locators";

// component preview locators
export const selectDataComponent = (page: Page, component: string) =>
  page.locator(`[data-component="${component}-select"]`);

export const selectList = (page: Page) => page.locator(SELECT_LIST);

export const selectOptionByText = (page: Page, text: string) =>
  page.locator(SELECT_OPTIONS).filter({ hasText: text });

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
  text: string,
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

export const selectListWrapper = (page: Page) =>
  page.locator(SELECT_LIST_WRAPPER);

export const selectListScrollableWrapper = (page: Page) =>
  page.locator(SELECT_LIST_SCROLLABLE_WRAPPER);

export const filterableSelectAddElementButton = (page: Page) =>
  page.locator(FILTERABLE_ADD_BUTTON);

export const filterableSelectButtonIcon = (page: Page) =>
  filterableSelectAddElementButton(page).locator("span:nth-child(2)");
