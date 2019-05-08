import {
  labelPreview, errorIcon, dateInput,
} from '../../locators/date-range/index';

const TEXT_ALIGN = 'text-align';
const START_LABEL = 'start';
const END_LABEL = 'end';

Then('start label on preview is {string}', (label) => {
  labelPreview(1).should('have.text', label);
});

Then('end label on preview is {string}', (label) => {
  labelPreview(2).should('have.text', label);
});

Then('labels are set to inline', () => {
  labelPreview(1).should('have.css', TEXT_ALIGN, 'left');
  labelPreview(2).should('have.css', TEXT_ALIGN, 'left');
});

Then('labels are not set to inline', () => {
  labelPreview(1).should('not.have.css', TEXT_ALIGN, 'left');
  labelPreview(2).should('not.have.css', TEXT_ALIGN, 'left');
});

Then('start message error on preview is {string}', (errorMessage) => {
  errorMessage().should('have.text', errorMessage);
});

Then('end message error on preview is {string}', (errorMessage) => {
  errorMessage().should('have.text', errorMessage);
});

When('I hover mouse onto error icon', () => {
  errorIcon().trigger('mouseover');
});

When('I click into startDateInput', () => {
  dateInput(1, START_LABEL).click();
});

When('I click into endDateInput', () => {
  dateInput(2, END_LABEL).click();
});
