import { fieldHelpPreview, labelByPosition, fieldHelpPreviewByPosition } from '../../locators';
import { radioButton, radioButtonByPosition } from '../../locators/radioButton/index';
import { DEBUG_FLAG } from '..';

const INLINE = 'carbon-radio-button__help-text--inline';
const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;
const THIRD_ELEMENT = 2;

Then('fieldHelpInline is enabled', () => {
  fieldHelpPreview().should('have.class', INLINE);
});

Then('fieldHelpInline is disabled', () => {
  fieldHelpPreview().should('not.have.class', INLINE);
});

When('I click onto {string} radioButton for validations component into iFrame', (position) => {
  switch (position) {
    case 'first':
      radioButton().eq(FIRST_ELEMENT).click();
      break;
    case 'second':
      radioButton().eq(SECOND_ELEMENT).click();
      break;
    case 'third':
      radioButton().eq(THIRD_ELEMENT).click();
      break;
    default: throw new Error('There are only three validation icon elements on the page');
  }
});

Then('{string} radioButton on preview is {string}', (position, text) => {
  switch (position) {
    case 'First':
      labelByPosition(FIRST_ELEMENT).should('have.text', text);
      break;
    case 'Second':
      labelByPosition(SECOND_ELEMENT).should('have.text', text);
      break;
    case 'Third':
      labelByPosition(THIRD_ELEMENT).should('have.text', text);
      break;
    default: throw new Error('There are only three radio buttonelements on the page');
  }
});

Then('{string} RadioButton has value {string}', (position, text) => {
  switch (position) {
    case 'First':
      radioButtonByPosition(FIRST_ELEMENT).should('have.attr', 'value').should('contain', text);
      break;
    case 'Second':
      radioButtonByPosition(SECOND_ELEMENT).should('have.attr', 'value').should('contain', text);
      break;
    case 'Third':
      radioButtonByPosition(THIRD_ELEMENT).should('have.attr', 'value').should('contain', text);
      break;
    default: throw new Error('There are only three radio elements on the page');
  }
});

Then('{string} RadioButton component is disabled', (position) => {
  switch (position) {
    case 'First':
      radioButtonByPosition(FIRST_ELEMENT).should('be.disabled').should('have.css', 'color', 'rgb(84, 84, 84)');
      break;
    case 'Second':
      radioButtonByPosition(SECOND_ELEMENT).should('be.disabled').should('have.css', 'color', 'rgb(84, 84, 84)');
      break;
    case 'Third':
      radioButtonByPosition(THIRD_ELEMENT).should('be.disabled').should('have.css', 'color', 'rgb(84, 84, 84)');
      break;
    default: throw new Error('There are only three radio elements on the page');
  }
});
// dokończyc
Then('{string} RadioButton is set to reverse', (position) => {
  switch (position) {
    case 'First':
      radioButtonByPosition(FIRST_ELEMENT).should('be.disabled').should('have.css', 'color', 'rgb(84, 84, 84)');
      break;
    case 'Second':
      radioButtonByPosition(SECOND_ELEMENT).should('be.disabled').should('have.css', 'color', 'rgb(84, 84, 84)');
      break;
    case 'Third':
      radioButtonByPosition(THIRD_ELEMENT).should('be.disabled').should('have.css', 'color', 'rgb(84, 84, 84)');
      break;
    default: throw new Error('There are only three radio elements on the page');
  }
});

Then('{string} RadioButton size on preview is set to {string}', (position, size) => {
  if (size === 'small') {
    switch (position) {
      case 'First':
        radioButtonByPosition(FIRST_ELEMENT).should('have.css', 'width', '16px')
          .and('have.css', 'height', '16px');
        break;
      case 'Second':
        radioButtonByPosition(SECOND_ELEMENT).should('have.css', 'width', '16px')
          .and('have.css', 'height', '16px');
        break;
      case 'Third':
        radioButtonByPosition(THIRD_ELEMENT).should('have.css', 'width', '16px')
          .and('have.css', 'height', '16px');
        break;
      default: throw new Error('There are only three radio elements on the page');
    }
  } else {
    switch (position) {
      case 'First':
        radioButtonByPosition(FIRST_ELEMENT).should('have.css', 'width', '24px')
          .and('have.css', 'height', '24px');
        break;
      case 'Second':
        radioButtonByPosition(SECOND_ELEMENT).should('have.css', 'width', '24px')
          .and('have.css', 'height', '24px');
        break;
      case 'Third':
        radioButtonByPosition(THIRD_ELEMENT).should('have.css', 'width', '24px')
          .and('have.css', 'height', '24px');
        break;
      default: throw new Error('There are only three radio elements on the page');
    }
  }
});

Then('{string} field help is set to fieldHelpInline', (position) => {
  switch (position) {
    case 'First':
      fieldHelpPreviewByPosition(FIRST_ELEMENT).should('have.css', 'margin-right', '6px')
        .and('have.css', 'margin-left', '0px');
      break;
    case 'Second':
      fieldHelpPreviewByPosition(SECOND_ELEMENT).should('have.css', 'margin-left', '0px');
      break;
    case 'Third':
      fieldHelpPreviewByPosition(THIRD_ELEMENT).should('have.css', 'margin-right', '6px')
        .and('have.css', 'margin-left', '0px');
      break;
    default: throw new Error('There are only three field help elements on the page');
  }
});
