import {
  TITLE_DATA_ELEMENT, BUTTON_DATA_COMPONENT, CLOSE_DATA_ELEMENT, BACK_ARROW,
} from './locators';

// iFrame locators
export const title = () => cy.iFrame(TITLE_DATA_ELEMENT);
export const dataComponentButtonByText = text => cy.iFrame(BUTTON_DATA_COMPONENT).contains(text);
export const closeDataElement = () => cy.iFrame(CLOSE_DATA_ELEMENT);
export const backArrow = () => cy.iFrame(BACK_ARROW);
