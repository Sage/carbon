import { fieldHelpPreview, labelByPosition, labelWidthSliderByName } from '../../locators';
import { radioButtonByPosition, radioButtonComponentNoiFrame } from '../../locators/radioButton/index';
import { setSlidebar } from '../helper';

const INLINE = 'carbon-radio-button__help-text--inline';
const FIRST_RADIOBUTTON = 0;
const SECOND_RADIOBUTTON = 1;
const THIRD_RADIOBUTTON = 2;
const RADIOBUTTON_INPUT_CSS = 'div:nth-child(1) input';

When('I click onto {string} radioButton for validations component in iFrame', (radioButtonName) => {
  radioButtonComponentNoiFrame().each(($el) => {
    const labelText = $el.find('label').text();
    if (labelText.includes(radioButtonName)) {
      cy.wrap($el).find(RADIOBUTTON_INPUT_CSS).should('have.attr', 'type', 'radio').click();
    }
  });
});

Then('fieldHelpInline is enabled', () => {
  fieldHelpPreview().should('have.class', INLINE);
});

Then('fieldHelpInline is disabled', () => {
  fieldHelpPreview().should('not.have.class', INLINE);
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

Then('{string} RadioButton has value {string}', (radioButtonName, text) => {
  cy.radioButton(radioButtonName, RADIOBUTTON_INPUT_CSS).should('have.attr', 'value').should('contain', text);
});

Then('{string} RadioButton component is disabled', (radioButtonName) => {
  cy.radioButton(radioButtonName, RADIOBUTTON_INPUT_CSS).should('have.attr', 'type', 'radio')
    .and('be.disabled')
    .and('have.attr', 'disabled');
});

Then('{string} RadioButton component is enabled', (radioButtonName) => {
  cy.radioButtonComponent(radioButtonName).should('not.be.disabled').and('not.have.attr', 'disabled');
  cy.radioButton(radioButtonName, RADIOBUTTON_INPUT_CSS).should('have.attr', 'type', 'radio')
    .and('not.be.disabled')
    .and('not.have.attr', 'disabled');
});

Then('{string} RadioButton is set to reverse', (radioButtonName) => {
  cy.radioButton(radioButtonName, 'div:nth-child(2) input').should('have.attr', 'role', 'radio');
});

Then('{string} RadioButton is not set to reverse', (radioButtonName) => {
  cy.radioButton(radioButtonName, RADIOBUTTON_INPUT_CSS).should('have.attr', 'role', 'radio');
});

Then('{string} RadioButton size on preview is set to {string}', (radioButtonName, size) => {
  if (size === 'small') {
    cy.radioButton(radioButtonName, RADIOBUTTON_INPUT_CSS).should('have.css', 'width', '16px')
      .and('have.css', 'height', '16px');
  } else {
    cy.radioButton(radioButtonName, RADIOBUTTON_INPUT_CSS).should('have.css', 'width', '24px')
      .and('have.css', 'height', '24px');
  }
});

Then('{string} field help is set to fieldHelpInline and has margin-left set to {string} and has margin-right {string}', (radioButtonName, marginLeft, marginRight) => {
  cy.radioButton(radioButtonName, 'div div span[data-element="help"]').should('have.css', 'margin-left', marginLeft)
    .and('have.css', 'margin-right', marginRight);
});

Then('{string} field help is not set to fieldHelpInline and has margin-left set to {string}', (radioButtonName, marginLeft) => {
  cy.radioButton(radioButtonName, 'div div span[data-element="help"]').should('have.css', 'margin-left', marginLeft);
});

Then('{string} RadioButton {string} inputWidth is set to {string}', (position, name, width) => {
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

Then('{string} RadioButton label width is set to {string}', (radioButtonName, width) => {
  cy.radioButton(radioButtonName, 'label').should('have.css', 'width', `${width}px`);
});

When('I set RadioButton {word} {word} slider to {int}', (propertyName, text, width) => {
  setSlidebar(labelWidthSliderByName(propertyName, text), width);
});
