import {
  RADIO_BUTTON,
  RADIO_BUTTON_COMPONENT,
  RADIO_BUTTON_GROUP_COMPONENT,
  RADIO_BUTTON_FIELDSET_COMPONENT,
  RADIO_BUTTON_LEGEND_COMPONENT,
  RADIO_GROUP,
} from './locators';

// component preview locators
export const radioButtonComponent = () => cy.iFrame(RADIO_BUTTON_COMPONENT);
export const radioButtonByPosition = position => cy.iFrame(RADIO_BUTTON).eq(position);
export const radioButtonComponentByPosition = position => cy.iFrame(RADIO_BUTTON_COMPONENT)
  .eq(position);
export const radioButtonComponentNoiFrame = () => cy.get(RADIO_BUTTON_COMPONENT);
export const radioButtonGroup = () => cy.iFrame(RADIO_BUTTON_GROUP_COMPONENT);
export const radioButtonFieldset = () => cy.iFrame(RADIO_BUTTON_FIELDSET_COMPONENT);
export const radioButtonLegend = () => cy.iFrame(RADIO_BUTTON_LEGEND_COMPONENT);

// component preview locators in no iFrame
export const radioGroup = () => cy.get(RADIO_GROUP);
export const radioButtonLegendInNoIFrame = () => cy.get(RADIO_BUTTON_LEGEND_COMPONENT);
export const radioButtonGroupInNoIFrame = () => cy.get(RADIO_BUTTON_GROUP_COMPONENT);
