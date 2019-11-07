import { RADIO_BUTTON } from './locators';

// component preview locators
export const radioButton = () => cy.get(RADIO_BUTTON);
export const radioButtonByPosition = position => cy.iFrame(RADIO_BUTTON).eq(position);
