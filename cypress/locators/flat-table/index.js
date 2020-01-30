import {
  FLAT_TABLE_STICKY_ROW_HEADER, FLAT_TABLE_ROW, FLAT_TABLE_COMPONENT,
} from './locators';

export const flatTableStickyRowHeader = index => cy.iFrame(FLAT_TABLE_STICKY_ROW_HEADER).eq(index);
export const flatTableHeader = () => cy.iFrame(FLAT_TABLE_ROW).eq(0);
export const flatTable = () => cy.iFrame(FLAT_TABLE_COMPONENT);
export const flatTableBodyRow = () => flatTable().find('tbody').children();

export const flatTableBodyRowByPosition = index => flatTable().find('tbody').find('tr').eq(index);
export const flatTableHeaderCell = index => flatTableHeader().find('th').eq(index); 
export const flatTabelCellContent = index => flatTableBodyRow(index).children();
