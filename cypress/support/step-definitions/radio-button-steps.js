import { fieldHelpPreview, labelByPosition, labelWidthSliderByName } from '../../locators';
import {
  radioButtonComponentNoiFrame,
  radioButtonByPosition,
  radioButtonComponentByPosition,
  radioButtonGroup,
  radioButtonFieldset,
  radioButtonLegend,
  radioGroup,
  radioButtonLegendInNoIFrame,
  radioButtonGroupInNoIFrame,
} from '../../locators/radioButton/index';
import { setSlidebar, positionOfElement } from '../helper';

const INLINE = 'carbon-radio-button__help-text--inline';
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
  labelByPosition(positionOfElement(position)).should('have.text', text);
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
  radioButtonByPosition(positionOfElement(position)).parent()
    .should('have.css', 'width', `${width}px`);
});

Then('{string} RadioButton label width is set to {string}', (radioButtonName, width) => {
  cy.radioButton(radioButtonName, 'label').should('have.css', 'width', `${width}px`);
});

When('I set RadioButton {word} {word} slider to {int}', (propertyName, text, width) => {
  setSlidebar(labelWidthSliderByName(propertyName, text), width);
});

Then('RadioButton are inline', () => {
  radioButtonGroup().should('have.css', 'display', 'flex');
  radioButtonComponentByPosition(positionOfElement('first')).should('have.css', 'margin-left', '0px');
  radioButtonComponentByPosition(positionOfElement('second')).should('have.css', 'margin-left', '32px');
  radioButtonComponentByPosition(positionOfElement('third')).should('have.css', 'margin-left', '32px');
});

Then('RadioButton are not inline', () => {
  radioButtonGroup().should('have.css', 'display', 'block');
  radioButtonComponentByPosition(positionOfElement('first')).should('have.css', 'margin-left', '0px');
  radioButtonComponentByPosition(positionOfElement('second')).should('have.css', 'margin-left', '0px');
  radioButtonComponentByPosition(positionOfElement('third')).should('have.css', 'margin-left', '0px');
});

Then('legend is inline with RadioButton', () => {
  radioButtonFieldset().should('have.css', 'display', 'flex');
  radioButtonLegend().should('have.css', 'margin-right', '32px')
    .and('have.css', 'height', '34px');
});

Then('legend is not inline with RadioButton', () => {
  radioButtonFieldset().should('have.css', 'display', 'block');
  radioButtonLegend().should('have.css', 'margin-right', '0px')
    .and('have.css', 'height', '26px');
});

Then('RadioButtonGroup overriden styles rendered properly', () => {
  radioGroup().should('have.css', 'background', 'rgb(240, 240, 240) none repeat scroll 0% 0% / auto padding-box border-box');
  radioButtonLegendInNoIFrame().should('have.css', 'color', 'rgb(180, 212, 85)');
  radioButtonGroupInNoIFrame().should('have.css', 'padding', '0px 12px');
});
