import { RADIO_BUTTON, RADIO_BUTTON_COMPONENT } from './locators';

// component preview locators
export const radioButtonComponent = () => cy.iFrame(RADIO_BUTTON_COMPONENT);
export const radioButtonByPosition = position => cy.iFrame(RADIO_BUTTON).eq(position);
export const radioButtonComponentByPosition = position => cy.iFrame(RADIO_BUTTON_COMPONENT)
  .eq(position);
export const reversedRadioButton = (position, index) => radioButtonComponentByPosition(position).find('div > div > div').children().eq(index)
  .find('input');

export const radioButtonComponentNoiFrame = () => cy.get(RADIO_BUTTON_COMPONENT);
export const radioButton = () => cy.get(RADIO_BUTTON);
