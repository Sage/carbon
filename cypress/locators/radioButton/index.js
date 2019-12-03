import { RADIO_BUTTON, RADIO_BUTTON_COMPONENT } from './locators';

// component preview locators
export const radioButton = () => cy.get(RADIO_BUTTON);
export const radioButtonByPosition = position => cy.iFrame(RADIO_BUTTON).eq(position);
export const radioButtonComponent = position => cy.iFrame(RADIO_BUTTON_COMPONENT).eq(position);
