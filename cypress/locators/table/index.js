import {
  ROW, CHECKBOX_CELL, TABLE, TABLE_HEADER,
} from './locators';

// component preview locators
export const rows = () => cy.iFrame(ROW).parent();
export const rowByNumber = number => rows().then($rows => $rows[number]);
export const rowNumbers = index => cy.iFrame(ROW).eq(index);
export const checkboxCell = () => rows().find(CHECKBOX_CELL);
export const caption = () => cy.iFrame(TABLE).children().children()
  .find('caption');
export const tableHeader = () => cy.iFrame(TABLE_HEADER);
export const sortIcon = index => tableHeader(index).find('span');
