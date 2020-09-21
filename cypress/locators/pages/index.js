import {
  BUTTON_DATA_COMPONENT, CLOSE_DATA_ELEMENT, BACK_ARROW,
} from './locators';

// component preview locators
export const dataComponentButtonByText = text => cy.iFrame(BUTTON_DATA_COMPONENT).contains(text);
export const closeDataElement = () => cy.get(CLOSE_DATA_ELEMENT);
export const backArrow = () => cy.iFrame(BACK_ARROW);

export const closeDataElementIFrame = () => cy.iFrame(CLOSE_DATA_ELEMENT);
