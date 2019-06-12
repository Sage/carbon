import { ROW, COLUMN } from './locators';

// component preview locators
export const row = () => cy.iFrame(ROW);
export const column = () => row().find(COLUMN);
