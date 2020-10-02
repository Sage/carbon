import {
  ROW,
  CHECKBOX_CELL,
  TABLE,
  TABLE_HEADER,
  PAGINATION_BUTTON,
  ACTION_TOOLBAR,
  TABLE_AJAX,
} from './locators';
import { BUTTON_DATA_COMPONENT } from '../pages/locators';

// component preview locators
export const rows = () => cy.get(ROW).parent();
export const rowByNumber = number => rows().then($rows => $rows[number]);
export const rowNumbers = index => cy.get(ROW).eq(index);
export const checkboxCell = () => rows().find(CHECKBOX_CELL);
export const caption = () => cy.get(TABLE).children().children()
  .find('caption');
export const tableHeader = () => cy.get(TABLE_HEADER);
export const sortIcon = index => tableHeader(index).find('span');
export const pagination = () => cy.get(PAGINATION_BUTTON);
export const paginationButtonByIndex = index => pagination().find('div:nth-child(2) > button').eq(index);
export const actionToolbar = index => cy.get(ACTION_TOOLBAR).find('div:nth-child(2) > div').eq(index);
export const actionToolbarButton = () => cy.get(ACTION_TOOLBAR).find('div:nth-child(2)').find(BUTTON_DATA_COMPONENT).parent();
export const checkboxInHeader = () => cy.get(CHECKBOX_CELL);
export const tableBody = () => cy.get(TABLE)
  .find('table > tbody');
export const tableAjax = () => cy.get(TABLE_AJAX)
  .find('table > tbody');

//components in IFrame
export const tableHeaderInIFrame = () => cy.iFrame(TABLE_HEADER);
export const paginationButtonByIndexInIFrame = index => cy.iFrame(PAGINATION_BUTTON)
  .find('div:nth-child(2) > button').eq(index);