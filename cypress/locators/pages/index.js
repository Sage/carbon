import {
  BUTTON_DATA_COMPONENT, CLOSE_DATA_ELEMENT, BACK_ARROW,
} from './locators';

// iFrame locators
export const dataComponentButtonByText = text => cy.iFrame(BUTTON_DATA_COMPONENT).contains(text);
export const closeDataElement = () => cy.iFrame(CLOSE_DATA_ELEMENT);
export const backArrow = () => cy.iFrame(BACK_ARROW);
