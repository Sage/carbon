import {
  checkbox,
  checkboxRole,
  checkboxDataComponentNoIframe,
  checkboxRoleNoIFrame,
} from '../../locators/checkbox';
import { labelNoIFrame, fieldHelpPreviewNoIFrame } from '../../locators';
import { positionOfElement } from '../helper';

Then('Checkbox is set to fieldHelpInline and has margin-left set to {string}', (marginLeft) => {
  fieldHelpPreviewNoIFrame().should('have.css', 'margin-left', marginLeft)
    .and('have.css', 'margin-top', '0px')
    .and('have.css', 'padding-left', '8px');
});

Then('Checkbox is not set to fieldHelpInline and has margin set to {string}', (margin) => {
  fieldHelpPreviewNoIFrame().should('have.css', 'margin', margin);
});

Then('Checkbox is set to reverse and has width {string}', (width) => {
  checkboxDataComponentNoIframe().children().children().children()
    .find(`div:nth-child(${positionOfElement('third')})`)
    .should('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'width', width);
});

Then('Checkbox is not set to reverse and has width {string}', (width) => {
  checkboxDataComponentNoIframe().children().children().children()
    .find(`div:nth-child(${positionOfElement('second')})`)
    .should('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'width', width);
});

Then('Checkbox labelAlign on preview is set to {string}', (labelAlign) => {
  labelNoIFrame().should('have.css', 'text-align', labelAlign);
});

Then('Checkbox size on preview is set to {string}', (size) => {
  if (size === 'small') {
    checkboxRoleNoIFrame().should('have.css', 'width', '16px')
      .and('have.css', 'height', '16px');
  } else {
    checkboxRoleNoIFrame().should('have.css', 'width', '24px')
      .and('have.css', 'height', '24px');
  }
});

Given('I check {string} checkbox', (position) => {
  checkbox(positionOfElement(position)).click();
});

When('I check {string} checkbox {int} times', (position, times) => {
  for (let i = 0; i < times; i++) {
    checkbox(positionOfElement(position), times).click();
  }
});

Then('checkbox label on preview is {word}', (text) => {
  labelNoIFrame().should('have.text', `${text} (default)`);
});

Then('Checkbox is enabled', () => {
  checkboxDataComponentNoIframe().should('not.be.disabled')
    .and('not.have.attr', 'disabled');
  checkboxDataComponentNoIframe().children().should('not.be.disabled')
    .and('not.have.attr', 'disabled');
  checkboxRoleNoIFrame().should('not.be.disabled')
    .and('not.have.attr', 'disabled');
});

Then('Checkbox is disabled', () => {
  checkboxDataComponentNoIframe().should('have.attr', 'disabled');
  checkboxDataComponentNoIframe().children().should('have.attr', 'disabled');
  checkboxRoleNoIFrame().should('have.attr', 'disabled');
});

When('I mark checkbox on preview', () => {
  checkboxRole().check();
});

Then('Checkbox tick has color {string}', (color) => {
  checkboxRole().parent()
    .find('div > svg > path')
    .should('have.css', 'fill', color);
});
