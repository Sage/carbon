import { Page } from "@playwright/test";
import {
  FLAT_TABLE_COMPONENT,
  FLAT_TABLE_CELL,
  FLAT_TABLE_CHECKBOX_CELL,
  FLAT_TABLE_CHECKBOX_HEADER,
  FLAT_TABLE_SUBROW,
  FLAT_TABLE_PAGE_SIZE_SELECT,
  FLAT_TABLE_PAGE_SELECT_LIST,
  FLAT_TABLE_PAGE_SELECT_NEXT,
  FLAT_TABLE_PAGE_SELECT_PREVIOUS,
  FLAT_TABLE_CURRENT_PAGE,
  PAGE_SELECT,
  PAGE_SELECT_INPUT,
  FLAT_TABLE_WRAPPER,
  FLAT_TABLE_PAGER,
  FLAT_TABLE_STICKY_ROW,
  FLAT_TABLE_ICON,
  FLAT_TABLE_ROW,
} from "./locators";
import { FlatTableCheckboxProps } from "../../../src/components/flat-table/flat-table-checkbox/flat-table-checkbox.component";

// component preview locators
export const flatTable = (page: Page) => page.locator(FLAT_TABLE_COMPONENT);
export const flatTableWrapper = (page: Page) =>
  page.locator(FLAT_TABLE_WRAPPER);
export const flatTableHeader = (page: Page) =>
  flatTable(page).locator("thead tr");
export const flatTableHeaderCells = (page: Page) =>
  flatTableHeader(page).locator("th");
export const flatTableHeaderRowByPosition = (page: Page, index: number) =>
  flatTableHeader(page).nth(index);
export const flatTableBody = (page: Page) =>
  page.locator(FLAT_TABLE_COMPONENT).locator("tbody");
export const flatTableBodyRowByPosition = (page: Page, index: number) =>
  flatTable(page).locator("tbody tr").nth(index);
export const flatTableBodyRows = (page: Page) =>
  flatTable(page).locator("tbody tr");

export const flatTableClickableRow = (page: Page, index: number) =>
  page.locator(FLAT_TABLE_COMPONENT).locator("tbody tr").nth(index);
export const flatTableSortable = (page: Page) =>
  page.locator(FLAT_TABLE_COMPONENT).locator("thead tr th button");
export const flatTableCell = (page: Page, index: number) =>
  page.locator(FLAT_TABLE_CELL).nth(index);
export const flatTableCheckboxCell = (page: Page, index: number) =>
  page.locator(FLAT_TABLE_CHECKBOX_CELL).nth(index);
export const flatTableCheckboxHeader = (page: Page) =>
  page.locator(FLAT_TABLE_CHECKBOX_HEADER);

export const flatTableSubrows = (page: Page) => page.locator(FLAT_TABLE_SUBROW);
export const flatTableSubrowByPosition = (page: Page, index: number) =>
  flatTableSubrows(page).nth(index);
export const flatTableSubrowFirstCell = (page: Page, index: number) =>
  flatTableSubrows(page).nth(index).locator("td div");

export const flatTableCaption = (page: Page) =>
  flatTable(page).locator("caption");

export const flatTablePageSizeSelect = (page: Page) =>
  page.locator(FLAT_TABLE_PAGE_SIZE_SELECT);
export const flatTablePageSelectListPosition = (page: Page) =>
  page.locator(FLAT_TABLE_PAGE_SELECT_LIST);
export const pageSelectElement = (page: Page) => page.locator(PAGE_SELECT);
export const pageSelectInput = (page: Page) => page.locator(PAGE_SELECT_INPUT);
export const flatTablePager = (page: Page) => page.locator(FLAT_TABLE_PAGER);
export const flatTablePageSelectNext = (page: Page) =>
  page.locator(FLAT_TABLE_PAGE_SELECT_NEXT);
export const flatTablePageSelectPrevious = (page: Page) =>
  page.locator(FLAT_TABLE_PAGE_SELECT_PREVIOUS);
export const flatTableCurrentPageInput = (page: Page) =>
  page.locator(FLAT_TABLE_CURRENT_PAGE).locator("input");

export const flatTableRowHeader = (page: Page) =>
  page.locator(FLAT_TABLE_STICKY_ROW);
export const flatTableHeaderCellsButtonIcon = (page: Page) =>
  flatTableHeader(page).locator("[data-element='sort-icon']");
export const flatTableExpandableIcon = (page: Page, index: number) =>
  flatTableCell(page, index).locator(FLAT_TABLE_ICON);

export const flatTableDraggableItem = (page: Page, position: number) =>
  flatTable(page)
    .locator("tbody")
    .locator("tr")
    .nth(position)
    .locator("td")
    .nth(0)
    .locator("div > span");
export const flatTableDraggableItemByPosition = (page: Page, index: number) =>
  flatTable(page).locator("tbody tr").locator("..").locator("tr").nth(index);
export const flatTableCheckboxAsProp = (
  page: Page,
  index: number,
  asVal: FlatTableCheckboxProps["as"],
) =>
  page
    .locator(FLAT_TABLE_ROW)
    .nth(index)
    .locator(asVal as string);
