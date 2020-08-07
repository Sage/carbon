import {
  RADIO_BUTTON,
  RADIO_BUTTON_COMPONENT,
  RADIO_BUTTON_GROUP_COMPONENT,
  RADIO_BUTTON_FIELDSET_GROUP,
} from './locators';

// component preview locators
export const radioButtonComponent = () => cy.iFrame(RADIO_BUTTON_COMPONENT);
export const radioButtonByPosition = position => cy.iFrame(RADIO_BUTTON).eq(position);

// no Iframe locators
export const radioButtonFieldset = () => cy.get(RADIO_BUTTON_FIELDSET_GROUP).children();
export const radioButtonLegend = () => cy.get(RADIO_BUTTON_FIELDSET_GROUP).find('legend').parent();
export const radioButtonGroupNoIframe = () => cy.get(RADIO_BUTTON_GROUP_COMPONENT);
export const radioButtonComponentByPositionNoIframe = position => cy.get(RADIO_BUTTON_COMPONENT)
  .eq(position);
