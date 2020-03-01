import {
  fieldHelpPreview, labelByPosition, fieldHelpPreviewByPosition, labelWidthSliderByName, label, fieldHelp,
} from '../../locators';
import {
  radioButtonByPosition, radioButtonComponentByPosition, reversedRadioButton, 
  radioButtonComponentNoiFrame,
  radioButtonComponent,
} from '../../locators/radioButton/index';
import { setSlidebar } from '../helper';

const INLINE = 'carbon-radio-button__help-text--inline';
const FIRST_RADIOBUTTON = 0;
const SECOND_RADIOBUTTON = 1;
const THIRD_RADIOBUTTON = 2;
const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;

// / dopracować zeby text() wykonac na lokatorze a nie selektorze, prawdopodobnie do obejscie z uzyciem then
When('I click onto {string} radioButton for validations component in iFrame', (radioButtonName) => {
  radioButtonComponentNoiFrame().each(($el, index, $list) => {
    const labelText = $el.find('label').text();
    if (labelText.includes(radioButtonName)) {
      cy.wrap($el).find(`div:nth-child(1) input`).should('have.attr', 'type', 'radio').click();
    }
  })
});

Then('fieldHelpInline is enabled', () => {
  fieldHelpPreview().should('have.class', INLINE);
});

Then('fieldHelpInline is disabled', () => {
  fieldHelpPreview().should('not.have.class', INLINE);
});

Then('{word} radioButton on preview is {string}', (name, text) => {
  cy.wait(3000);
  cy.checkRadioButtonLabel(text).should('have.text', text);
});

Then('{string} RadioButton has value {string}', (radioButtonName, text) => {
  cy.findRadioButtonByLabelName(1, radioButtonName).should('have.value', text);
});

Then('{string} RadioButton component is disabled', (radioButtonName) => {
  cy.radioButtonComponentIsDisabled(1, radioButtonName);
});

Then('{string} RadioButton component is enabled', (position) => {
  switch (position) {
    case 'First':
      radioButtonComponentByPosition(SECOND_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      radioButtonByPosition(FIRST_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      break;
    case 'Second':
      radioButtonComponentByPosition(SECOND_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      radioButtonByPosition(SECOND_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      break;
    case 'Third':
      radioButtonComponentByPosition(SECOND_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      radioButtonByPosition(THIRD_RADIOBUTTON).should('not.have.attr', 'disabled')
        .and('not.be.disabled');
      break;
    default: throw new Error('There are only three radio elements on the page');
  }
});

Then('{string} radio button is set to reverse', (radioButtonName) => {
  cy.findRadioButtonByLabelName(2, radioButtonName);
});

Then('{string} radio button is not set to reverse', (radioButtonName) => {
  cy.findRadioButtonByLabelName(1, radioButtonName);
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

Then('{string} field help is not set to fieldHelpInline and has margin-left set to {string}', (radioButtonName, marginLeft) => {
  radioButtonComponent().each(($el, index, $list) => {
    const labelText = $el.text();
    if (labelText.includes(radioButtonName)) {
      cy.log(labelText);
      fieldHelpPreviewByPosition(index).should('have.css', 'margin-left', marginLeft); // sprawdzic
      cy.wrap($el).find('div div span[data-element="help"]').should('have.css', 'margin-left', marginLeft);
    }
  })
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
  label().each(($el, index, $list) => {
    const labelText = $el.text();
    if (labelText.includes(radioButtonName)) {
      cy.wrap($el).should('have.css', 'width', `${width}px`);
    }
  })
});

When('I set RadioButton {word} {word} slider to {int}', (propertyName, text, width) => {
  setSlidebar(labelWidthSliderByName(propertyName, text), width);
});
