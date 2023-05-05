import {
  DATE_INPUT,
  DATE_ICON,
  DAY_PICKER_WRAPPER,
  DAY_PICKER_HEADING,
  DAY,
} from "./locators";

// component preview locators
export const dateInput = () => cy.get(DATE_INPUT);
export const dayPickerDay = (date) => cy.get(`div[aria-label="${date}"]`);
export const dayPickerByText = (val) => cy.get(DAY).contains(val);
export const dateInputParent = () => cy.get(DATE_INPUT).parent();
export const dateIcon = () => cy.get(DATE_ICON);
export const dayPickerWrapper = () => cy.get(DAY_PICKER_WRAPPER);
export const dayPickerParent = () =>
  cy.get(DAY_PICKER_WRAPPER).parent().parent();
export const dayPickerHeading = () => cy.get(DAY_PICKER_HEADING).children();
export const dayPickerNavButtons = (index) =>
  cy.get(".DayPicker-NavBar").children().eq(index);
