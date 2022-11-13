import {
  FLAT_TABLE_COMPONENT,
  FLAT_TABLE_CELL,
  FLAT_TABLE_SUBROW,
  FLAT_TABLE_PAGE_SIZE_SELECT,
  FLAT_TABLE_PAGE_SELECT_LIST,
  PAGE_SELECT_INPUT,
  FLAT_TABLE_WRAPPER,
} from "./locators";

// component preview locators
export const flatTable = () => cy.get(FLAT_TABLE_COMPONENT);
export const flatTableWrapper = () => cy.get(FLAT_TABLE_WRAPPER);
export const flatTableHeader = () => flatTable().find("thead tr");
export const flatTableHeaderCells = () => flatTableHeader().find("th");
export const flatTableBodyRowByPosition = (index) =>
  flatTable().find("tbody tr").eq(index);
export const flatTableBodyRows = () => flatTable().find("tbody tr");

export const flatTableClickableRow = (index) =>
  cy.get(FLAT_TABLE_COMPONENT).find("tbody tr").eq(index);
export const flatTableSortable = () =>
  cy.get(FLAT_TABLE_COMPONENT).find("thead tr th div [type=button]");
export const flatTableCell = (index) => cy.get(FLAT_TABLE_CELL).eq(index);

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
