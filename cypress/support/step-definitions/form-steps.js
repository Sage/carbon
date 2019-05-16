import {
  saveButton, cancelButton, buttons, additionalActions, leftAlignedActions, rightAlignedActions,
  errorsSummary, errorMessage, inputValidation,
} from '../../locators/form';

const ALIGN_PREFIX = 'carbon-form__buttons--';

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
  buttons().should('have.class', `${ALIGN_PREFIX}${direction}`);
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
