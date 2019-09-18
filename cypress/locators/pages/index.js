import { TITLE_DATA_ELEMENT, BUTTON_DATA_COMPONENT, CLOSE_DATA_ELEMENT } from './locators';

// no iFrame locators
export const title = () => cy.iFrame(TITLE_DATA_ELEMENT);
export const dataComponentButtonByText = text => cy.iFrame(BUTTON_DATA_COMPONENT).contains(text);
export const closeDataElement = () => cy.iFrame(CLOSE_DATA_ELEMENT);
