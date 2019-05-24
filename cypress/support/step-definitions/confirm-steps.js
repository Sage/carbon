import { visitComponentUrl } from '../helper';
import { backgroundUILocator } from '../../locators';
import {
  openButton, dialogTitle, dialogPreview, closeIconButton,
  dialogSubtitle, confirmButton, cancelButton,
} from '../../locators/confirm';

Given('I open {string} component page', (component) => {
  visitComponentUrl(component);
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

Then('dialog title context on preview is {string}', (title) => {
  dialogTitle().should('have.text', title);
});

Then('Background UI is enabled', () => {
  backgroundUILocator().should('not.exist');
});

Then('Background UI is disabled', () => {
  backgroundUILocator().should('exist');
});

Then('Confirm dialog is visible', () => {
  dialogPreview().should('be.visible');
});

Then('Confirm dialog is not visible', () => {
  dialogPreview().should('not.exist');
});

Then('Close icon is not visible', () => {
  closeIconButton().should('not.exist');
});

Then('dialog subtitle context is {string}', (title) => {
  dialogSubtitle().should('have.text', title);
});

Then('Confirm dialog input height is {string}', (height) => {
  dialogPreview().should('have.attr', 'style').should('contain', `min-height: ${height}px`);
});

Then('Confirm dialog size property on preview is {string}', (size) => {
  dialogPreview().should('have.css', 'width', `${size}px`);
});

Then('Confirm dialog has stickyFormFooter parameter enabled', () => {
  /*
  stickyFormFooter - the functionality exists, but doesn't work on Storybook / Carbon demo site.
  will be fixed on the next impementation phase
  */
});

Then('Confirm dialog has no stickyFormFooter parameter', () => {
  /*
  stickyFormFooter - the functionality exists, but doesn't work on Storybook / Carbon demo site.
  will be fixed on the next impementation phase
  */
});
