import { TITLE_DATA_ELEMENT, BUTTON_DATA_COMPONENT, CLOSE_DATA_ELEMENT } from './locators';

// no iFrame locators
export const titleNoIframe = () => cy.get(TITLE_DATA_ELEMENT);
export const dataComponentButtonByText = text => cy.get(BUTTON_DATA_COMPONENT).contains(text);
export const closeDataElement = () => cy.get(CLOSE_DATA_ELEMENT);
