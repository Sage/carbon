import {
  checkboxCommonInputField, checkboxLabelPreview,
  checkbox, checkboxDataComponent, checkboxRole, checkboxByID, dataComponentGroup,
  labelForIconInCheckboxGroup,
} from '../../locators/checkbox';
import { label, fieldHelpPreview, getDataElementByValueNoIframe } from '../../locators';
import { ICON } from '../../locators/locators';
import { positionOfElement } from '../helper';

Then('Checkbox is set to fieldHelpInline and has margin-left set to {string}', (marginLeft) => {
  fieldHelpPreview().should('have.css', 'margin-left', marginLeft)
    .and('have.css', 'margin-top', '0px')
    .and('have.css', 'padding-left', '6px');
});

Then('Checkbox is not set to fieldHelpInline and has margin set to {string}', (margin) => {
  fieldHelpPreview().should('have.css', 'margin', margin);
});

Then('Checkbox is set to reverse and has width {string}', (width) => {
  checkboxDataComponent().children().children().children()
    .find(`div:nth-child(${positionOfElement('third')})`)
    .should('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'width', width);
});

Then('Checkbox is not set to reverse and has width {string}', (width) => {
  checkboxDataComponent().children().children().children()
    .find(`div:nth-child(${positionOfElement('second')})`)
    .should('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'width', width);
});

Then('checkbox inputWidth is set to {int}', (width) => {
  checkboxCommonInputField().should('have.attr', 'style')
    .and('contain', `width: ${width}%`);
});

Then('Checkbox inputWidth is not set', () => {
  checkboxCommonInputField().should('not.have.attr', 'style');
});

Then('Checkbox labelAlign on preview is set to {string}', (labelAlign) => {
  label().should('have.css', 'text-align', labelAlign);
});

Then('Checkbox size on preview is set to {string}', (size) => {
  if (size === 'small') {
    checkboxRole().should('have.css', 'width', '16px')
      .and('have.css', 'height', '16px');
  } else {
    checkboxRole().should('have.css', 'width', '24px')
      .and('have.css', 'height', '24px');
  }
});

Then('Checkbox label width is not set', () => {
  checkboxLabelPreview().should('not.have.attr', 'style');
});

Given('I check {string} checkbox', (position) => {
  checkbox(positionOfElement(position)).click();
});

When('I check {string} checkbox {int} times', (position, times) => {
  for (let i = 0; i < times; i++) {
    checkbox(positionOfElement(position), times).click();
  }
});

When('I hover mouse onto {string} icon in no iFrame for checkbox', (position) => {
  switch (position) {
    case 'error':
      checkboxByID('required').trigger('mouseover');
      break;
    case 'warning':
    case 'info':
    case 'optional':
      checkboxByID(position).trigger('mouseover');
      break;
    default: throw new Error('There are only three icon elements on the page');
  }
});

When('I hover mouse onto {word} icon in no iFrame for checkbox group', (position) => {
  dataComponentGroup().find(ICON).eq(positionOfElement(position));
});

Then('label icon for checkbox group on preview in no iFrame is set to {string}', (text) => {
  labelForIconInCheckboxGroup().should('have.attr', 'aria-label', text);
});

Then('{string} icon name in no iFrame on preview is {string}', (position, iconName) => {
  getDataElementByValueNoIframe(iconName).eq(positionOfElement(position));
});

Then('checkbox label on preview is {word}', (text) => {
  label().should('have.text', `${text} (default)`);
});

Then('Checkbox is enabled', () => {
  checkboxDataComponent().should('not.be.disabled')
    .and('not.have.attr', 'disabled');
  checkboxDataComponent().children().should('not.be.disabled')
    .and('not.have.attr', 'disabled');
  checkboxRole().should('not.be.disabled')
    .and('not.have.attr', 'disabled');
});

Then('Checkbox is disabled', () => {
  checkboxDataComponent().should('have.attr', 'disabled');
  checkboxDataComponent().children().should('have.attr', 'disabled');
  checkboxRole().should('have.attr', 'disabled');
});

When('I mark checkbox on preview', () => {
  checkboxRole().check();
});

Then('Checkbox tick has color {string}', (color) => {
  checkboxRole().parent()
    .find('div > svg > path')
    .should('have.css', 'fill', color);
});
