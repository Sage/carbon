import { CELL, CELL_ICON, TBODY } from './locators';

// component preview locators
export const draggableRecordByText = text => cy.get(CELL).contains(text)
  .parent()
  .find('td:nth-child(1)')
  .find(CELL_ICON);
export const draggableRecordByPosition = position => cy.get(TBODY).find(`tr:nth-child(${position}) > td:nth-child(2)`);
