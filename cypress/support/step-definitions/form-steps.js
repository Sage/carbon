import {
  saveButton, cancelButton, leftAlignedActions, rightAlignedActions,
  errorsSummary, errorMessage, inputValidation, buttons, errorTooltip,
  additionalActions,
} from '../../locators/form';
import { DEBUG_FLAG } from '..';
import { tooltipPreview } from '../../locators/help';

const FIRST_ELEMENT = 1;
const SECOND_ELEMENT = 2;
const THIRD_ELEMENT = 3;

Then('save button is visible', () => {
  saveButton().should('be.visible');
});

Then('save button is not visible', () => {
  saveButton().should('not.exist');
});

Then('cancel button is visible', () => {
  cancelButton().should('be.visible');
});

Then('cancel button is not visible', () => {
  cancelButton().should('not.exist');
});

Then('buttons are aligned to {string}', (direction) => {
  if (direction === 'right') {
    buttons(FIRST_ELEMENT).should('have.attr', 'data-component', 'cancel');
    buttons(SECOND_ELEMENT).should('have.attr', 'data-component', 'form-summary');
    buttons(SECOND_ELEMENT).should('have.css', 'align-items', 'center')
      .and('have.css', 'margin', '-8px')
      .and('have.css', 'white-space', 'nowrap')
      .and('have.css', 'padding', '8px');
  } else {
    buttons(FIRST_ELEMENT).should('have.attr', 'data-component', 'form-summary');
    buttons(FIRST_ELEMENT).should('have.css', 'align-items', 'center')
      .and('have.css', 'margin', '-8px')
      .and('have.css', 'white-space', 'nowrap')
      .and('have.css', 'padding', '8px');
    buttons(SECOND_ELEMENT).should('have.attr', 'data-component', 'cancel');
  }
});

Then('save button is disabled', () => {
  saveButton().should('have.attr', 'disabled');
});

Then('save button is not disabled', () => {
  saveButton().should('not.have.attr', 'disabled');
});

Then('cancel button text is set to {string}', (text) => {
  cancelButton().should('have.text', text);
});

Then('save button text is set to {string}', (text) => {
  saveButton().should('have.text', text);
});

Then('additional actions text is set to {string}', (text) => {
  additionalActions().should('have.text', text);
});

Then('additionalAction button is set to {string} and has text {string}', (buttonState, text) => {
  if (buttonState === 'Button') {
    buttons(THIRD_ELEMENT).should('be.visible');
    buttons(THIRD_ELEMENT).children().should('have.attr', 'role', 'button')
      .and('have.attr', 'data-component', 'button');
    buttons(THIRD_ELEMENT).children().children().children()
      .should('have.text', text);
  } else {
    buttons(THIRD_ELEMENT).should('be.visible');
    buttons(THIRD_ELEMENT).children().should('have.attr', 'data-component', 'link')
      .and('have.attr', 'tabindex', '0');
    buttons(THIRD_ELEMENT).children().children().children()
      .should('have.text', text);
  }
});

Then('alignedActions button is set to {string} and has text {string}', (buttonState, text) => {
  if (buttonState === 'Button') {
    buttons(FIRST_ELEMENT).should('be.visible');
    buttons(FIRST_ELEMENT).children().should('have.attr', 'role', 'button')
      .and('have.attr', 'data-component', 'button');
    buttons(FIRST_ELEMENT).children().children()
      .contains(text);
  } else {
    cy.wait(100, { log: DEBUG_FLAG }); // added due to changing animation;
    buttons(FIRST_ELEMENT).should('be.visible');
    buttons(FIRST_ELEMENT).children().should('have.attr', 'data-component', 'link')
      .and('have.attr', 'tabindex', '0');
    buttons(FIRST_ELEMENT).children().children()
      .contains(text);
  }
});

Then('left aligned actions text is set to {string}', (text) => {
  leftAlignedActions().should('have.text', text);
});

Then('right aligned actions text is set to {string}', (text) => {
  rightAlignedActions().should('have.text', text);
});

Then('summary is visible', () => {
  errorsSummary().should('be.visible');
});

Then('summary is not visible', () => {
  errorsSummary().should('not.be.visible');
});

Then('I save form', () => {
  saveButton().click();
});

Then('input is validated', () => {
  inputValidation().should('be.visible');
  inputValidation().trigger('mouseover');
});

Then('error message is {string}', (text) => {
  errorMessage().should('have.text', text);
});

Then('input is validated for default component', () => {
  errorTooltip().should('be.visible');
  errorTooltip().trigger('mouseover');
});

Then('error message is {string} for default component', (text) => {
  tooltipPreview().first().should('have.text', text);
  errorsSummary().should('have.text', 'There is 1 error');
});
