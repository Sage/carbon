import {
  BUTTON_DATA_COMPONENT, CLOSE_DATA_ELEMENT, BACK_ARROW,
} from './locators';

// component preview locators
export const dataComponentButtonByText = text => cy.get(BUTTON_DATA_COMPONENT).contains(text);
export const closeDataElement = () => cy.get(CLOSE_DATA_ELEMENT);
export const backArrow = () => cy.get(BACK_ARROW);

export const closeDataElementIFrame = () => cy.iFrame(CLOSE_DATA_ELEMENT);

export const dataComponentButtonByTextNoIFrame = text => cy.get(BUTTON_DATA_COMPONENT)
  .contains(text);
