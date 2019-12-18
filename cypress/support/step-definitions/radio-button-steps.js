import {
  fieldHelpPreview, labelByPosition, fieldHelpPreviewByPosition, labelWidthSliderByName,
} from '../../locators';
import { radioButton, radioButtonByPosition, radioButtonComponent } from '../../locators/radioButton/index';
import { setSlidebar } from '../helper';

const INLINE = 'carbon-radio-button__help-text--inline';
const FIRST_RADIOBUTTON = 0;
const SECOND_RADIOBUTTON = 1;
const THIRD_RADIOBUTTON = 2;
const FIRST_ELEMENT = 1;

Then('fieldHelpInline is enabled', () => {
  fieldHelpPreview().should('have.class', INLINE);
});

Then('fieldHelpInline is disabled', () => {
  fieldHelpPreview().should('not.have.class', INLINE);
});

When('I click onto {string} radioButton for validations component into iFrame', (position) => {
  switch (position) {
    case 'first':
      radioButton().eq(FIRST_RADIOBUTTON).click();
      break;
    case 'second':
      radioButton().eq(SECOND_RADIOBUTTON).click();
      break;
    case 'third':
      radioButton().eq(THIRD_RADIOBUTTON).click();
      break;
    default: throw new Error('There are only three validation icon elements on the page');
  }
});

Then('{string} radioButton on preview is {string}', (position, text) => {
  switch (position) {
    case 'First':
      labelByPosition(FIRST_RADIOBUTTON).should('have.text', text);
      break;
    case 'Second':
      labelByPosition(SECOND_RADIOBUTTON).should('have.text', text);
      break;
    case 'Third':
      labelByPosition(THIRD_RADIOBUTTON).should('have.text', text);
      break;
    default: throw new Error('There are only three radio button elements on the page');
  }
});

Then('{string} RadioButton has value {string}', (position, text) => {
  switch (position) {
    case 'First':
      radioButtonByPosition(FIRST_RADIOBUTTON).should('have.attr', 'value').should('contain', text);
      break;
    case 'Second':
      radioButtonByPosition(SECOND_RADIOBUTTON).should('have.attr', 'value').should('contain', text);
      break;
    case 'Third':
      radioButtonByPosition(THIRD_RADIOBUTTON).should('have.attr', 'value').should('contain', text);
      break;
    default: throw new Error('There are only three radio elements on the page');
  }
});

Then('{string} RadioButton component is disabled', (position) => {
  switch (position) {
    case 'First':
      radioButtonComponent(FIRST_RADIOBUTTON).should('have.attr', 'disabled');
      radioButtonByPosition(FIRST_RADIOBUTTON).should('be.disabled')
        .and('have.attr', 'disabled');
      break;
    case 'Second':
      radioButtonComponent(SECOND_RADIOBUTTON).should('have.attr', 'disabled');
      radioButtonByPosition(SECOND_RADIOBUTTON).should('be.disabled')
        .and('have.attr', 'disabled');
      break;
    case 'Third':
      radioButtonComponent(THIRD_RADIOBUTTON).should('have.attr', 'disabled');
      radioButtonByPosition(THIRD_RADIOBUTTON).should('be.disabled')
        .and('have.attr', 'disabled');
      break;
    default: throw new Error('There are only three radio elements on the page');
  }
});

Then('{string} RadioButton component is enabled', (position) => {
  switch (position) {
    case 'First':
      radioButtonComponent(SECOND_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      radioButtonByPosition(FIRST_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      break;
    case 'Second':
      radioButtonComponent(SECOND_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      radioButtonByPosition(SECOND_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      break;
    case 'Third':
      radioButtonComponent(SECOND_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      radioButtonByPosition(THIRD_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      break;
    default: throw new Error('There are only three radio elements on the page');
  }
});

Then('{string} RadioButton is set to reverse', (position) => {
  switch (position) {
    case 'First':
      radioButtonComponent(FIRST_RADIOBUTTON).children().children()
        .find(`div:nth-child(${FIRST_ELEMENT})`)
        .should('have.css', 'box-sizing', 'border-box');
      break;
    case 'Second':
      radioButtonComponent(SECOND_RADIOBUTTON).children().children()
        .find(`div:nth-child(${FIRST_ELEMENT})`)
        .should('have.css', 'box-sizing', 'border-box');
      break;
    case 'Third':
      radioButtonComponent(FIRST_RADIOBUTTON).children().children()
        .find(`div:nth-child(${FIRST_ELEMENT})`)
        .should('have.css', 'box-sizing', 'border-box');
      break;
    default: throw new Error('There are only three radio elements on the page');
  }
});

Then('{string} RadioButton is not set to reverse', (position) => {
  switch (position) {
    case 'First':
      radioButtonComponent(FIRST_RADIOBUTTON).children().children()
        .find(`div:nth-child(${FIRST_ELEMENT})`)
        .should('have.css', 'box-sizing', 'border-box');
      break;
    case 'Second':
      radioButtonComponent(SECOND_RADIOBUTTON).children().children()
        .find(`div:nth-child(${FIRST_ELEMENT})`)
        .should('have.css', 'box-sizing', 'border-box');
      break;
    case 'Third':
      radioButtonComponent(FIRST_RADIOBUTTON).children().children()
        .find(`div:nth-child(${FIRST_ELEMENT})`)
        .should('have.css', 'box-sizing', 'border-box');
      break;
    default: throw new Error('There are only three radio elements on the page');
  }
});

Then('{string} RadioButton size on preview is set to {string}', (position, size) => {
  if (size === 'small') {
    switch (position) {
      case 'First':
        radioButtonByPosition(FIRST_RADIOBUTTON).should('have.css', 'width', '16px')
          .and('have.css', 'height', '16px');
        break;
      case 'Second':
        radioButtonByPosition(SECOND_RADIOBUTTON).should('have.css', 'width', '16px')
          .and('have.css', 'height', '16px');
        break;
      case 'Third':
        radioButtonByPosition(THIRD_RADIOBUTTON).should('have.css', 'width', '16px')
          .and('have.css', 'height', '16px');
        break;
      default: throw new Error('There are only three radio elements on the page');
    }
  } else {
    switch (position) {
      case 'First':
        radioButtonByPosition(FIRST_RADIOBUTTON).should('have.css', 'width', '24px')
          .and('have.css', 'height', '24px');
        break;
      case 'Second':
        radioButtonByPosition(SECOND_RADIOBUTTON).should('have.css', 'width', '24px')
          .and('have.css', 'height', '24px');
        break;
      case 'Third':
        radioButtonByPosition(THIRD_RADIOBUTTON).should('have.css', 'width', '24px')
          .and('have.css', 'height', '24px');
        break;
      default: throw new Error('There are only three radio elements on the page');
    }
  }
});

Then('{string} field help is set to fieldHelpInline and has margin-left set to {string} and has margin-right {string}', (position, marginLeft, marginRight) => {
  switch (position) {
    case 'First':
      fieldHelpPreviewByPosition(FIRST_RADIOBUTTON).should('have.css', 'margin-left', marginLeft)
        .and('have.css', 'margin-right', marginRight);
      break;
    case 'Second':
      fieldHelpPreviewByPosition(SECOND_RADIOBUTTON).should('have.css', 'margin-left', marginLeft)
        .and('have.css', 'margin-right', marginRight);
      break;
    case 'Third':
      fieldHelpPreviewByPosition(THIRD_RADIOBUTTON).should('have.css', 'margin-left', marginLeft)
        .and('have.css', 'margin-right', marginRight);
      break;
    default: throw new Error('There are only three field help elements on the page');
  }
});

Then('{string} field help is not set to fieldHelpInline and has margin-left set to {string}', (position, marginLeft) => {
  switch (position) {
    case 'First':
      fieldHelpPreviewByPosition(FIRST_RADIOBUTTON).should('have.css', 'margin-left', marginLeft);
      break;
    case 'Second':
      fieldHelpPreviewByPosition(SECOND_RADIOBUTTON).should('have.css', 'margin-left', marginLeft);
      break;
    case 'Third':
      fieldHelpPreviewByPosition(THIRD_RADIOBUTTON).should('have.css', 'margin-left', marginLeft);
      break;
    default: throw new Error('There are only three field help elements on the page');
  }
});

Then('{string} RadioButton {string} inputWidth is set to {int}', (position, name, width) => {
  switch (position) {
    case 'First':
      radioButtonByPosition(FIRST_RADIOBUTTON).parent()
        .should('have.css', 'width', `${width}px`);
      break;
    case 'Second':
      radioButtonByPosition(SECOND_RADIOBUTTON).parent()
        .should('have.css', 'width', `${width}px`);
      break;
    case 'Third':
      radioButtonByPosition(THIRD_RADIOBUTTON).parent()
        .should('have.css', 'width', `${width}px`);
      break;
    default: throw new Error('There are only three label elements on the page');
  }
});

Then('{string} RadioButton label width is set to {int}', (position, width) => {
  switch (position) {
    case 'First':
      labelByPosition(FIRST_RADIOBUTTON).should('have.css', 'width', `${width}px`);
      break;
    case 'Second':
      labelByPosition(SECOND_RADIOBUTTON).should('have.css', 'width', `${width}px`);
      break;
    case 'Third':
      labelByPosition(THIRD_RADIOBUTTON).should('have.css', 'width', `${width}px`);
      break;
    default: throw new Error('There are only three label elements on the page');
  }
});

When('I set RadioButton {word} {word} slider to {int}', (propertyName, text, width) => {
  setSlidebar(labelWidthSliderByName(propertyName, text), width);
});
