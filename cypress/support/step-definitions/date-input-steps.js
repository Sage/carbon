import {
  dateInput, dayPickerDay, minDate, maxDate,
} from '../../locators/date-input/index';
import { labelPreview } from '../../locators';

const TEXT_ALIGN = 'text-align';
const DAY = 'DayPicker-Day--';
const TODAY_DAY = Cypress.moment().format('ddd MMM D, YYYY');

Then('Date input is disabled', () => {
  dateInput().should('have.attr', 'disabled');
});

Then('Date input is enabled', () => {
  dateInput().should('not.have.attr', 'disabled');
});

Then('Date input component is readOnly', () => {
  dateInput().should('have.attr', 'readonly');
});

Then('Date input component is not readOnly', () => {
  dateInput().should('not.have.attr', 'readonly');
});

Then('label is set to inline', () => {
  labelPreview().should('have.css', TEXT_ALIGN, 'left');
});

When('I set minDate to {string}', (minDateParameter) => {
  minDate().clear().type(minDateParameter);
});

When('I set maxDate to {string}', (maxDateParameter) => {
  maxDate().clear().type(maxDateParameter);
});

Then('the date {string} before minDate is not available', (date) => {
  dayPickerDay(date).should('have.attr', 'aria-disabled').should('contains', 'true');
  dayPickerDay(date).should('have.attr', 'aria-selected').should('contains', 'false');
});

Then('the date {string} after maxDate is not available', (date) => {
  dayPickerDay(date).should('have.attr', 'aria-disabled').should('contains', 'true');
  dayPickerDay(date).should('have.attr', 'aria-selected').should('contains', 'false');
});

When('I click dateInput', () => {
  dateInput().click();
});

When('I choose date {string} via DayPicker', (date) => {
  dayPickerDay(date).click();
});

Then('the date is set to today', () => {
  dayPickerDay(TODAY_DAY).should('have.attr', 'aria-label').should('contains', TODAY_DAY);
  dayPickerDay(TODAY_DAY).should('have.attr', 'class').should('contains', `${DAY}today`);
  dayPickerDay(TODAY_DAY).should('have.attr', 'class').should('contains', `${DAY}selected`);
});
