import {
  FLAT_TABLE_COMPONENT, FLAT_TABLE_CELL,
} from './locators';

// component preview locators
export const flatTableInIframe = () => cy.iFrame(FLAT_TABLE_COMPONENT);
export const flatTableBodyRowsInIframe = () => flatTableInIframe().find('tbody tr');
export const flatTableBodyRowByPositionInIframe = index => flatTableBodyRowsInIframe().eq(index);

export const flatTable = () => cy.get(FLAT_TABLE_COMPONENT);
export const flatTableHeader = () => flatTable().find('thead tr');
export const flatTableHeaderCells = () => flatTableHeader().find('th');
export const flatTableBodyRowByPosition = index => flatTable().find('tbody tr').eq(index);

export const flatTableClickableRow = index => cy.get(FLAT_TABLE_COMPONENT).find('tbody tr').eq(index);
export const flatTableSortable = () => cy.get(FLAT_TABLE_COMPONENT).find('thead tr th div [type=button]');
export const flatTableCell = index => cy.get(FLAT_TABLE_CELL).eq(index);
