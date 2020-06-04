import {
  MIN_DATE, MAX_DATE, DATE_INPUT, DATE_ICON,
  DAY_PICKER_WRAPPER, DAY_PICKER_LEFT_ARROW, DAY_PICKER_RIGHT_ARROW,
  DAY_PICKER_MONTH, DAY_PICKER_WEEKDAYS, DAY_PICKER_BODY,
  DAY_PICKER_WEEK,
} from './locators';

// knobs locators
export const minDate = () => cy.get(MIN_DATE);
export const maxDate = () => cy.get(MAX_DATE);

// component preview locators
export const dateInput = () => cy.iFrame(DATE_INPUT);
export const dateIcon = () => cy.iFrame(DATE_ICON);
export const dayPickerWrapper = () => cy.iFrame(DAY_PICKER_WRAPPER);
export const dayPickerLeftArrow = () => cy.iFrame(DAY_PICKER_LEFT_ARROW);
export const dayPickerRightArrow = () => cy.iFrame(DAY_PICKER_RIGHT_ARROW);
export const dayPickerMonth = () => cy.iFrame(DAY_PICKER_MONTH);
export const dayPickerWeekdays = () => cy.iFrame(DAY_PICKER_WEEKDAYS);
export const dayPickerBody = () => cy.iFrame(DAY_PICKER_BODY);
export const dayPickerWeek = () => cy.iFrame(DAY_PICKER_WEEK);
export const dayPickerDay = date => cy.iFrame(`div[aria-label="${date}"]`);
