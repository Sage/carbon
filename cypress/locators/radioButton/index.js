import {
  RADIO_BUTTON,
  RADIO_BUTTON_COMPONENT,
  RADIO_BUTTON_GROUP_COMPONENT,
  RADIO_BUTTON_FIELDSET_GROUP,
} from './locators';

// component preview locators
export const radioButtonComponent = () => cy.iFrame(RADIO_BUTTON_COMPONENT);
export const radioButtonByPosition = position => cy.iFrame(RADIO_BUTTON).eq(position);
export const radioButtonComponentByPosition = position => cy.iFrame(RADIO_BUTTON_COMPONENT)
  .eq(position);
export const radioButtonGroup = () => cy.iFrame(RADIO_BUTTON_GROUP_COMPONENT);
export const radioButtonFieldset = () => cy.iFrame(RADIO_BUTTON_FIELDSET_GROUP).children();
export const radioButtonLegend = () => cy.iFrame(RADIO_BUTTON_FIELDSET_GROUP).find('legend').parent();
