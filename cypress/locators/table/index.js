import {
  ROW, CHECKBOX_CELL, TABLE,
} from './locators';

// component preview locators
export const rows = () => cy.iFrame(ROW).parent();
export const rowByNumber = number => rows().then($rows => $rows[number]);
export const checkboxCell = () => rows().find(CHECKBOX_CELL);
export const caption = () => cy.iFrame(TABLE).children().children()
  .find('caption');
export const table = () => cy.iFrame(TABLE);
