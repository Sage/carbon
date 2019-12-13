import {
  checkboxHelpTextPreview, checkboxCommonInputField, checkboxLabelPreview,
  checkbox, checkboxDataComponent, checkboxRole,
} from '../../locators/checkbox';
import { label, fieldHelpPreview } from '../../locators';

const CHECKBOX_HELP_TEXT_CLASS_PREFIX = 'carbon-checkbox__help-text--';
const CHECKBOX_LABEL_CLASS_PREFIX = 'common-input__label--';

const FIRST_CHECKBOX = 0;
const SECOND_CHECKBOX = 1;
const THIRD_CHECKBOX = 2;
const FOURTH_CHECKBOX = 3;
const FIFTH_CHECKBOX = 4;
const SIXTH_CHECKBOX = 5;
const SEVENTH_CHECKBOX = 6;

Then('checkbox helpText property is set to {string}', (property) => {
  checkboxHelpTextPreview().should('have.class', CHECKBOX_HELP_TEXT_CLASS_PREFIX + property);
});

Then('checkbox helpText property is not set to {string}', (property) => {
  checkboxHelpTextPreview().should('not.have.class', CHECKBOX_HELP_TEXT_CLASS_PREFIX + property);
});

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
    .find(`div:nth-child(${THIRD_CHECKBOX})`)
    .should('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'width', width);
});

Then('Checkbox is not set to reverse and has width {string}', (width) => {
  checkboxDataComponent().children().children().children()
    .find(`div:nth-child(${SECOND_CHECKBOX})`)
    .should('have.css', 'box-sizing', 'border-box')
    .and('have.css', 'width', width);
});

Then('checkbox inputWidth is set to {int}', (width) => {
  checkboxCommonInputField().should('have.attr', 'style').should('contain', `width: ${width}%`);
});

Then('Checkbox inputWidth is not set', () => {
  checkboxCommonInputField().should('not.have.attr', 'style');
});

Then('Checkbox label property is set to {string}', (property) => {
  checkboxLabelPreview().should('have.class', CHECKBOX_LABEL_CLASS_PREFIX + property);
});

Then('Checkbox label property is not set to {string}', (property) => {
  checkboxLabelPreview().should('not.have.class', CHECKBOX_LABEL_CLASS_PREFIX + property);
});

Then('Checkbox deprecated label width is set to {int}', (width) => {
  checkboxLabelPreview().should('have.attr', 'style').should('contain', `width: ${width}%`);
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
  switch (position) {
    case 'first':
      checkbox(FIRST_CHECKBOX).click();
      break;
    case 'second':
      checkbox(SECOND_CHECKBOX).click();
      break;
    case 'third':
      checkbox(THIRD_CHECKBOX).click();
      break;
    case 'fourth':
      checkbox(FOURTH_CHECKBOX).click();
      break;
    case 'fifth':
      checkbox(FIFTH_CHECKBOX).click();
      break;
    case 'sixth':
      checkbox(SIXTH_CHECKBOX).click();
      break;
    case 'seventh':
      checkbox(SEVENTH_CHECKBOX).click();
      break;
    default: throw new Error('There are only seven checkbox elements on the page');
  }
});

When('I check {string} checkbox {int} times', (position, times) => {
  for (let i = 0; i < times; i++) {
    switch (position) {
      case 'first':
        checkbox(FIRST_CHECKBOX, times).click();
        break;
      case 'second':
        checkbox(SECOND_CHECKBOX, times).click();
        break;
      case 'third':
        checkbox(THIRD_CHECKBOX, times).click();
        break;
      case 'fourth':
        checkbox(FOURTH_CHECKBOX, times).click();
        break;
      case 'fifth':
        checkbox(FIFTH_CHECKBOX, times).click();
        break;
      case 'sixth':
        checkbox(SIXTH_CHECKBOX, times).click();
        break;
      case 'seventh':
        checkbox(SEVENTH_CHECKBOX, times).click();
        break;
      default: throw new Error('There are only seven checkbox elements on the page');
    }
  }
});

Then('checkbox on preview is {string}', (text) => {
  label().should('have.text', `${text} (default)`);
});

Then('Checkbox is enabled', () => {
  checkboxDataComponent().should('not.be.disabled');
  checkboxDataComponent().should('not.have.attr', 'disabled');
  checkboxDataComponent().children().should('not.be.disabled');
  checkboxDataComponent().children().should('not.have.attr', 'disabled');
  checkboxRole().should('not.be.disabled');
  checkboxRole().should('not.have.attr', 'disabled');
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
