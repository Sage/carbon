import {
  labelPreview, errorIcon, dateInput,
} from '../../locators/date-range/index';

const TEXT_ALIGN = 'text-align';
const START_LABEL = 'start';
const END_LABEL = 'end';
const START_LABEL_INDEX = 1;
const END_LABEL_INDEX = 2;

Then('startLabel on preview is {string}', (label) => {
  labelPreview(START_LABEL_INDEX).should('have.text', label);
});

Then('endLabel on preview is {string}', (label) => {
  labelPreview(END_LABEL_INDEX).should('have.text', label);
});

Then('labels are set to inline', () => {
  labelPreview(START_LABEL_INDEX).should('have.css', TEXT_ALIGN, 'left');
  labelPreview(END_LABEL_INDEX).should('have.css', TEXT_ALIGN, 'left');
});

Then('labels are not set to inline', () => {
  labelPreview(START_LABEL_INDEX).should('not.have.css', TEXT_ALIGN, 'left');
  labelPreview(END_LABEL_INDEX).should('not.have.css', TEXT_ALIGN, 'left');
});

Then('startMessage error on preview is {string}', (errorMessage) => {
  errorMessage().should('have.text', errorMessage);
});

Then('endMessage error on preview is {string}', (errorMessage) => {
  errorMessage().should('have.text', errorMessage);
});

When('I hover mouse onto error icon', () => {
  errorIcon().trigger('mouseover');
});

When('I click into startDateInput', () => {
  dateInput(START_LABEL_INDEX, START_LABEL).click();
});

When('I click into endDateInput', () => {
  dateInput(END_LABEL_INDEX, END_LABEL).click();
});
