import { CELL, CELL_ICON, TBODY } from './locators';

// component preview locators
export const draggableRecordByText = text => cy.get(CELL).contains(text).parent().find(CELL_ICON);
export const draggableRecordByPosition = position => cy.get(TBODY).find(`:nth-child(${position}) > td`);
