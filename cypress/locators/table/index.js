import {
  ROW, CHECKBOX_CELL, TABLE, TABLE_HEADER, PAGINATION_BUTTON, ACTION_TOOLBAR,
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
export const pagination = () => cy.iFrame(PAGINATION_BUTTON);
export const paginationButtonByIndex = index => pagination().find('div:nth-child(2) > button').eq(index);
export const paginationButton = () => pagination().find('div:nth-child(2) > button');
export const actionToolbar = index => cy.iFrame(ACTION_TOOLBAR).find('div:nth-child(2) > div').eq(index);
export const actionToolbarButton = () => cy.iFrame(ACTION_TOOLBAR).find('div:nth-child(2)').find('[data-element="main-text"]').parent();
export const checkboxInHeader = () => cy.iFrame(CHECKBOX_CELL);
