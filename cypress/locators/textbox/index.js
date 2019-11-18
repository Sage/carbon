import { TEXTBOX, TEXTBOX_DATA_COMPONENT } from './locators';

// component preview locators
export const textbox = () => cy.iFrame(TEXTBOX);
export const textboxByPosition = position => cy.iFrame(TEXTBOX).eq(position);
export const textboxDataComponent = () => cy.iFrame(TEXTBOX_DATA_COMPONENT);
