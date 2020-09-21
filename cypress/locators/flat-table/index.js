import {
  FLAT_TABLE_COMPONENT, FLAT_TABLE_CELL, FLAT_TABLE_STICKY_ROW_ID, 
  FLAT_TABLE_STICKY_HEADER_ID, FLAT_TABLE_WITH_CLICKABLE_ROWS_ID, FLAT_TABLE_SORTABLE_ID,
} from './locators';

// component preview locators
export const flatTable = () => cy.iFrame(FLAT_TABLE_COMPONENT);
export const flatTableBodyRows = () => flatTable().find('tbody tr');
export const flatTableBodyRowByPosition = index => flatTableBodyRows().eq(index);

export const flatTableNoiFrame = () => cy.get(FLAT_TABLE_COMPONENT);
export const flatTableHeaderNoiFrame = () => flatTableNoiFrame().find('thead tr');
export const flatTableHeaderCellsNoiFrame = () => flatTableHeaderNoiFrame().find('th');
export const flatTableBodyRowByPositionNoiFrame = index => flatTableNoiFrame().find('tbody tr').eq(index);

// DS locators
export const flatTableBodyRowByPositionDS = index => cy.iFrame(FLAT_TABLE_STICKY_ROW_ID)
  .find(FLAT_TABLE_COMPONENT).find('tbody tr').eq(index);
export const flatTableWithStickyHeadDS = () => cy.iFrame(FLAT_TABLE_STICKY_HEADER_ID);
export const flatTableHeaderCellDS = () => flatTableWithStickyHeadDS()
  .find(FLAT_TABLE_COMPONENT).find('thead tr th');
export const flatTableClickableRowByPositionDS = index => cy.iFrame(FLAT_TABLE_WITH_CLICKABLE_ROWS_ID)
  .find(FLAT_TABLE_COMPONENT).find('tbody tr').eq(index);
export const fltaTableSortableDS = () => cy.iFrame(FLAT_TABLE_SORTABLE_ID)
  .find(FLAT_TABLE_COMPONENT).find('thead tr th div:nth-child(1)');
export const flatTableCellDS = index => cy.iFrame(FLAT_TABLE_SORTABLE_ID)
  .find(FLAT_TABLE_CELL).eq(index);
