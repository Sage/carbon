import { visitComponentUrl } from '../helper';
import {
  asSelect, sizeSelect, subtextInput, titleInput,
  heightInput, labelInput,
} from '../../locators';
import {
  openButton, dialogInnerContent, dialogTitle, cancelLabel, confirmLabel, backgroundUICheckbox,
  backGroundUILocator, disableEscKeyCheckbox, dialogPreview, showCloseIconCheckbox,
  closeIconButton, dialogSubtitle, stickyFormFooterCheckbox, childrenTextArea,
} from '../../locators/confirm';

const CARBON_DIALOG_PREFIX = 'carbon-dialog__dialog--';
const STICKY_FORM_FOOTER_PARAMETER = 'carbon-dialog__dialog--sticky-form-footer';

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

Then('dialog inner context children on preview is {string}', (children, cancelButton, confirmButton) => {
  dialogInnerContent().should('have.text', children, cancelButton, confirmButton);
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

When('I check enableBackgroundUI', () => {
  backgroundUICheckbox().check();
});

When('I uncheck enableBackgroundUI', () => {
  backgroundUICheckbox().uncheck({ force: true });
});

Then('Background UI is enabled', () => {
  backGroundUILocator().should('not.exist');
});

Then('Background UI is disabled', () => {
  backGroundUILocator().should('exist');
});

When('I check disableEscKey', () => {
  disableEscKeyCheckbox().check();
});

When('I uncheck disableEscKey', () => {
  disableEscKeyCheckbox().uncheck({ force: true });
});

When('I hit ESC key on Confirm dialog', () => {
  dialogPreview().trigger('keydown', { keyCode: 27, which: 27 });
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
  dialogPreview().should('have.class', CARBON_DIALOG_PREFIX + size);
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
