import { RADIO_BUTTON, RADIO_BUTTON_COMPONENT } from './locators';

// component preview locators
export const radioButtonComponent = () => cy.iFrame(RADIO_BUTTON_COMPONENT);
export const radioButtonByPosition = position => cy.iFrame(RADIO_BUTTON).eq(position);
export const radioButtonComponentNoiFrame = () => cy.get(RADIO_BUTTON_COMPONENT);
