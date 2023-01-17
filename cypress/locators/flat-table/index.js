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
  PAGE_SELECT_INPUT,
  FLAT_TABLE_WRAPPER,
  FLAT_TABLE_PAGER,
  FLAT_TABLE_STICKY_ROW,
  FLAT_TABLE_ICON,
  FLAT_TABLE_ROW,
} from "./locators";

// component preview locators
export const flatTable = () => cy.get(FLAT_TABLE_COMPONENT);
export const flatTableWrapper = () => cy.get(FLAT_TABLE_WRAPPER);
export const flatTableHeader = () => flatTable().find("thead tr");
export const flatTableHeaderCells = () => flatTableHeader().find("th");
export const flatTableHeaderRowByPosition = (index) =>
  flatTableHeader().eq(index);
export const flatTableBody = () => cy.get(FLAT_TABLE_COMPONENT).find("tbody");
export const flatTableBodyRowByPosition = (index) =>
  flatTable().find("tbody tr").eq(index);
export const flatTableBodyRows = () => flatTable().find("tbody tr");

export const flatTableClickableRow = (index) =>
  cy.get(FLAT_TABLE_COMPONENT).find("tbody tr").eq(index);
export const flatTableSortable = () =>
  cy.get(FLAT_TABLE_COMPONENT).find("thead tr th div [type=button]");
export const flatTableCell = (index) => cy.get(FLAT_TABLE_CELL).eq(index);
export const flatTableCheckboxCell = (index) =>
  cy.get(FLAT_TABLE_CHECKBOX_CELL).eq(index);
export const flatTableCheckboxHeader = () => cy.get(FLAT_TABLE_CHECKBOX_HEADER);

export const flatTableSubrows = () => cy.get(FLAT_TABLE_SUBROW);
export const flatTableSubrowByPosition = (index) =>
  flatTableSubrows().eq(index);
export const flatTableSubrowFirstCell = (index) =>
  flatTableSubrows().eq(index).find("td div");

export const flatTableCaption = () => flatTable().find("caption");

export const flatTablePageSizeSelect = () =>
  cy.get(FLAT_TABLE_PAGE_SIZE_SELECT);
export const flatTablePageSelectListPosition = () =>
  cy.get(FLAT_TABLE_PAGE_SELECT_LIST);
export const pageSelectInput = () => cy.get(PAGE_SELECT_INPUT);
export const flatTablePager = () => cy.get(FLAT_TABLE_PAGER);
export const flatTablePageSelectNext = () =>
  cy.get(FLAT_TABLE_PAGE_SELECT_NEXT);
export const flatTablePageSelectPrevious = () =>
  cy.get(FLAT_TABLE_PAGE_SELECT_PREVIOUS);
export const flatTableCurrentPageInput = () =>
  cy.get(FLAT_TABLE_CURRENT_PAGE).find("input");

export const flatTableRowHeader = () => cy.get(FLAT_TABLE_STICKY_ROW);
export const flatTableHeaderCellsIcon = () =>
  flatTableHeader().find("th > div > div").find("span");
export const flatTableExpandableIcon = (index) =>
  flatTableCell(index).find(FLAT_TABLE_ICON);

export const flatTableDraggableItem = (text) =>
  flatTable()
    .find("tbody tr")
    .contains(text)
    .parent()
    .parent()
    .find("td")
    .eq(0)
    .find("div > span");
export const flatTableDraggableItemByPosition = (index) =>
  flatTable().find("tbody tr").parent().find("tr").eq(index);
export const flatTableCheckboxAsProp = (index, asVal) =>
  cy.get(FLAT_TABLE_ROW).eq(index).find(asVal);
