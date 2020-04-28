import {
  FLAT_TABLE_ROW, FLAT_TABLE_COMPONENT, FLAT_TABLE_CELL,
} from './locators';

// component preview locators
export const flatTable = () => cy.iFrame(FLAT_TABLE_COMPONENT);
export const flatTableRows = () => cy.iFrame(FLAT_TABLE_ROW);
export const flatTableBodyRows = () => flatTable().find('tbody tr');
export const flatTableHeader = () => flatTable().find('thead tr');
export const flatTableHeaderCells = () => flatTableHeader().find('th');
export const flatTableBodyRowByPosition = index => flatTableBodyRows().eq(index);
export const flatTableStickyRow = index => flatTableBodyRowByPosition(index).find('th');
export const flatTableBodyCellByPosition = (rowIndex, cellIndex) => flatTableBodyRowByPosition(rowIndex).find('td').eq(cellIndex);
export const flatTableCell = index => cy.iFrame(FLAT_TABLE_CELL).eq(index);

export const flatTableNoiFrame = () => cy.get(FLAT_TABLE_COMPONENT);
export const flatTableRowsNoiFrame = () => cy.get(FLAT_TABLE_ROW);
export const flatTableHeaderNoiFrame = () => flatTableNoiFrame().find('thead tr');
export const flatTableHeaderCellsNoiFrame = () => flatTableHeaderNoiFrame().find('th');
export const flatTableBodyRowByPositionNoiFrame = index => flatTableNoiFrame().find('tbody tr').eq(index);
export const flatTableBodyCellByPositionNoiFrame = (rowIndex, cellIndex) => flatTableBodyRowByPositionNoiFrame(rowIndex).find('td').eq(cellIndex);
