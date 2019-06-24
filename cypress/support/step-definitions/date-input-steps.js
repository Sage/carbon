import {
  dateInput, dayPickerDay, minDate, maxDate,
} from '../../locators/date-input/index';
import { labelPreview } from '../../locators';

const TEXT_ALIGN = 'text-align';
const DAY = 'DayPicker-Day--';
const TODAY_DAY = Cypress.moment().format('ddd MMM D, YYYY');
const YESTERDAY_DAY = Cypress.moment().subtract(1, 'days').format('ddd MMM D, YYYY');
const TOMORROW_DAY = Cypress.moment().add(1, 'days').format('ddd MMM D, YYYY');

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

When('I set minDate to today', () => {
  minDate().clear().type(TODAY_DAY);
});

When('I set maxDate to today', () => {
  maxDate().clear().type(TODAY_DAY);
});

Then('the date before minDate is not available', () => {
  dayPickerDay(YESTERDAY_DAY).should('have.attr', 'aria-disabled').should('contains', 'true');
  dayPickerDay(YESTERDAY_DAY).should('have.attr', 'aria-selected').should('contains', 'false');
});

Then('the date after maxDate is not available', () => {
  dayPickerDay(TOMORROW_DAY).should('have.attr', 'aria-disabled').should('contains', 'true');
  dayPickerDay(TOMORROW_DAY).should('have.attr', 'aria-selected').should('contains', 'false');
});

When('I click dateInput', () => {
  dateInput().click();
});

When('I choose date yesterday via DayPicker', () => {
  dayPickerDay(YESTERDAY_DAY).click();
});

When('I choose date tomorrow via DayPicker', () => {
  dayPickerDay(TOMORROW_DAY).click();
});

Then('the date is set to today', () => {
  dayPickerDay(TODAY_DAY).should('have.attr', 'aria-label').should('contains', TODAY_DAY);
  dayPickerDay(TODAY_DAY).should('have.attr', 'class').should('contains', `${DAY}today`);
  dayPickerDay(TODAY_DAY).should('have.attr', 'class').should('contains', `${DAY}selected`);
});
