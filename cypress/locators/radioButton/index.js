import {
  RADIO_BUTTON_COMPONENT,
  RADIO_BUTTON_GROUP_COMPONENT,
  RADIO_BUTTON_FIELDSET_GROUP,
} from "./locators";
import { FIELD_HELP_PREVIEW } from "../locators";

// component preview locators
export const radioButtonFieldset = () =>
  cy.get(RADIO_BUTTON_FIELDSET_GROUP).children();
export const radioButtonLegend = () =>
  cy.get(RADIO_BUTTON_FIELDSET_GROUP).find("legend").parent();
export const radioButtonGroup = () => cy.get(RADIO_BUTTON_GROUP_COMPONENT);
export const radioButtonComponent = () => cy.get(RADIO_BUTTON_COMPONENT);
export const radioButtonComponentByPosition = (position) =>
  radioButtonComponent().eq(position);
export const radioButtonInputByPosition = (position) =>
  radioButtonComponentByPosition(position).find("input");
export const radioButtonFieldHelp = (position) =>
  radioButtonComponentByPosition(position).find(FIELD_HELP_PREVIEW);
