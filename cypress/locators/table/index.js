import {
  ROW, CHECKBOX_CELL, CAPTION, TABLE,
} from './locators';

// component preview locators
export const rows = () => cy.iFrame(ROW).parent();
export const rowByNumber = number => rows().then($rows => $rows[number]);
export const checkboxCell = () => rows().find(CHECKBOX_CELL);
export const caption = () => cy.iFrame(CAPTION);
export const table = () => cy.iFrame(TABLE);
