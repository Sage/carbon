import { TEXTBOX, TEXTBOX_DATA_COMPONENT } from './locators';

// component preview locators
export const textbox = () => cy.get(TEXTBOX);
export const textboxInIFrame = () => cy.iFrame(TEXTBOX);
export const textboxByPosition = position => cy.get(TEXTBOX).eq(position);
export const textboxDataComponent = () => cy.get(TEXTBOX_DATA_COMPONENT);
export const textboxIcon = () => cy.iFrame(TEXTBOX).find('span').eq(0).children();
export const textboxInput = () => cy.iFrame(TEXTBOX).children();
