import {
  checkboxHelpTextPreview, checkboxCommonInputField, checkboxLabelPreview, checkbox,
} from '../../locators/checkbox';

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

Then('Checkbox label width is set to {int}', (width) => {
  checkboxLabelPreview().should('have.attr', 'style').should('contain', `width: ${width}%`);
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
    default: throw new Error('There are only seven checkboxes elements on the page');
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
      default: throw new Error('There are only seven checkboxes elements on the page');
    }
  }
});
