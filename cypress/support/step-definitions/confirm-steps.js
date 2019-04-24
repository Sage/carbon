import { visitComponentUrl, checkTheSizeOfTheElement } from '../helper';
import {
  asSelect, sizeSelect, subtextInput, titleInput, heightInput, labelInput,
  disableEscKeyCheckbox, backgroundUILocator,
} from '../../locators';
import {
  openButton, dialogTitle, cancelLabel, confirmLabel,
  dialogPreview, showCloseIconCheckbox, closeIconButton,
  dialogSubtitle, stickyFormFooterCheckbox,
  childrenTextArea, confirmButton, cancelButton,
} from '../../locators/confirm';

const STICKY_FORM_FOOTER_PARAMETER = 'TODO';

Given('I open {string} component page', (component) => {
  visitComponentUrl(component);
});

When('I set children to {string}', (text) => {
  childrenTextArea().clear().type(text);
});

When('I type {string} to as property', (asProperty) => {
  asSelect().type(asProperty);
});

When('I set component size to {string}', (size) => {
  sizeSelect().select(size);
});

When('I set component subtext to {string}', (subtext) => {
  subtextInput().type(subtext);
});

When('I set label to {string}', (label) => {
  labelInput().clear().type(label);
});

When('I set title to {string}', (title) => {
  titleInput().clear().type(title);
});

Then('component subtitle on preview is {string}', (subtitle) => {
  dialogSubtitle().should('have.text', subtitle);
});

When('I click on a openButton', () => {
  openButton().click();
});

When('I click on a cancelButton', () => {
  cancelButton().click();
});

When('I click on a confirmButton', () => {
  confirmButton().click();
});

Then('confirm button content on preview is {string}', (confirmButtonText) => {
  confirmButton().should('have.text', confirmButtonText);
});

Then('cancel button content on preview is {string}', (cancelButtonText) => {
  cancelButton().should('have.text', cancelButtonText);
});

Then('dialog title context children on preview is {string}', (title) => {
  dialogTitle().should('have.text', title);
});

When('I set cancelButton to {string}', (text) => {
  cancelLabel().clear().type(text);
});

When('I set confirmButton to {string}', (text) => {
  confirmLabel().clear().type(text);
});

Then('Background UI is enabled', () => {
  backgroundUILocator().should('not.exist');
});

Then('Background UI is disabled', () => {
  backgroundUILocator().should('exist');
});

When('I check disableEscKey', () => {
  disableEscKeyCheckbox().check();
});

When('I uncheck disableEscKey', () => {
  disableEscKeyCheckbox().uncheck({ force: true });
});

Then('Confirm dialog is visible', () => {
  dialogPreview().should('be.visible');
});

Then('Confirm dialog is not visible', () => {
  dialogPreview().should('not.exist');
});

When('I check closeIconCheckbox', () => {
  showCloseIconCheckbox().check();
});

When('I uncheck closeIconCheckbox', () => {
  showCloseIconCheckbox().uncheck({ force: true });
});

Then('Close icon is not visible', () => {
  closeIconButton().should('not.exist');
});

Then('dialog subtitle context is {string}', (title) => {
  dialogSubtitle().should('have.text', title);
});

When('I set input height to {string}', (height) => {
  heightInput().clear().type(height);
});

Then('Confirm dialog input height is {string}', (height) => {
  dialogPreview().should('have.attr', 'style').should('contain', `min-height: ${height}px`);
});

Then('Confirm dialog size property on preview is {string}', (size) => {
  checkTheSizeOfTheElement(dialogPreview(), size);
});

When('I check stickyFormFooter', () => {
  stickyFormFooterCheckbox().check();
});

When('I uncheck stickyFormFooter', () => {
  stickyFormFooterCheckbox().uncheck({ force: true });
});

Then('Confirm dialog has stickyFormFooter parameter enabled', () => {
  dialogPreview().should('have.class', STICKY_FORM_FOOTER_PARAMETER);
});

Then('Confirm dialog has no stickyFormFooter parameter', () => {
  dialogPreview().should('not.have.class', STICKY_FORM_FOOTER_PARAMETER);
});
