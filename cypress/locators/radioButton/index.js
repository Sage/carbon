import { RADIO_BUTTON, RADIO_BUTTON_COMPONENT } from './locators';

// component preview locators
export const radioButton = () => cy.get(RADIO_BUTTON);
export const radioButtonByPosition = position => cy.iFrame(RADIO_BUTTON).eq(position);
export const radioButtonComponentByPosition = position => cy.iFrame(RADIO_BUTTON_COMPONENT)
  .eq(position);
export const reversedRadioButton = (position, index) => radioButtonComponentByPosition(position).find('div > div > div').children().eq(index)
  .find('input');
