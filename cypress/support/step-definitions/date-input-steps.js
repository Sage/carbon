import {
  dateInput, dayPickerDay, minDate, maxDate, dateInputNoIframe,
  dayPickerDayNoIframe,
} from '../../locators/date-input/index';

const DAY_PICKER_PREFIX = 'DayPicker-Day--';
const TODAY_CALENDAR = Cypress.moment().format('ddd MMM D, YYYY');
const YESTERDAY_CALENDAR = Cypress.moment().subtract(1, 'days').format('ddd MMM D, YYYY');
const TOMORROW_CALENDAR = Cypress.moment().add(1, 'days').format('ddd MMM D, YYYY');
const VALIDATION_DATE = '/04/2019';
const TODAY_KNOBS = Cypress.moment().format('YYYY-MM-DD');
const TODAY_DATE_INPUT = Cypress.moment().format('DD/MM/YYYY');

Then('Date input is disabled', () => {
  dateInput().parent()
    .should('have.attr', 'disabled');
});

Then('Date input is enabled', () => {
  dateInput().parent()
    .should('not.have.attr', 'disabled');
});

Then('Date input component is readOnly', () => {
  dateInput().parent()
    .should('have.attr', 'readonly');
});

Then('Date input component is not readOnly', () => {
  dateInput().parent()
    .should('not.have.attr', 'readonly');
});

Then('Date input is disabled for deprecated component', () => {
  dateInput().should('have.attr', 'disabled');
});

Then('Date input is enabled for deprecated component', () => {
  dateInput().should('not.have.attr', 'disabled');
});

Then('Date input component is readOnly for deprecated component', () => {
  dateInput().should('have.attr', 'readonly');
});

Then('Date input component is not readOnly for deprecated component', () => {
  dateInput().should('not.have.attr', 'readonly');
});

When('I set dateInput to today', () => {
  dateInput().clear().type(TODAY_DATE_INPUT);
});

When('I set minDate to today', () => {
  minDate().clear().type(TODAY_KNOBS);
});

When('I set maxDate to today', () => {
  maxDate().clear().type(TODAY_KNOBS);
});

Then('the date before minDate is not available', () => {
  dayPickerDay(YESTERDAY_CALENDAR).should('have.attr', 'aria-disabled').should('contains', 'true');
  dayPickerDay(YESTERDAY_CALENDAR).should('have.attr', 'aria-selected').should('contains', 'false');
});

Then('the date after maxDate is not available', () => {
  dayPickerDay(TOMORROW_CALENDAR).should('have.attr', 'aria-disabled').should('contains', 'true');
  dayPickerDay(TOMORROW_CALENDAR).should('have.attr', 'aria-selected').should('contains', 'false');
});

When('I click dateInput', () => {
  dateInput().click();
});

When('I choose date yesterday via DayPicker', () => {
  dayPickerDay(YESTERDAY_CALENDAR).click();
});

When('I choose date tomorrow via DayPicker', () => {
  dayPickerDay(TOMORROW_CALENDAR).click();
});

When('I type specific date {string}', (day) => {
  dateInput().clear().type(`${day}${VALIDATION_DATE}`);
});

When('I type specific date {string} in iFrame', (day) => {
  dateInputNoIframe().clear().type(`${day}${VALIDATION_DATE}`);
});

Then('the date is set to today', () => {
  dayPickerDay(TODAY_CALENDAR).should('have.attr', 'aria-label').should('contains', TODAY_CALENDAR);
  dayPickerDay(TODAY_CALENDAR).should('have.attr', 'class').should('contains', `${DAY_PICKER_PREFIX}today`);
  dayPickerDay(TODAY_CALENDAR).should('have.attr', 'class').should('contains', `${DAY_PICKER_PREFIX}selected`);
});

Then('I click onto specific day {string} via DayPicker for validation component into iFrame', (specificDay) => {
  dayPickerDayNoIframe(specificDay).click();
});
