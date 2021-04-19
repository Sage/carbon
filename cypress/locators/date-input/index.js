import {
  MIN_DATE,
  MAX_DATE,
  DATE_INPUT,
  DATE_ICON,
  DAY_PICKER_WRAPPER,
} from "./locators";

// knobs locators
export const minDate = () => cy.get(MIN_DATE);
export const maxDate = () => cy.get(MAX_DATE);

// component preview locators
export const dateInput = () => cy.iFrame(DATE_INPUT);
export const dayPickerDay = (date) => cy.iFrame(`div[aria-label="${date}"]`);

export const dateInputNoIFrame = () => cy.get(DATE_INPUT).parent();
export const dateIcon = () => cy.get(DATE_ICON);
export const dayPickerWrapper = () => cy.get(DAY_PICKER_WRAPPER);
export const dayPickerParentNoIFrame = () =>
  cy.get(DAY_PICKER_WRAPPER).parent().parent();
