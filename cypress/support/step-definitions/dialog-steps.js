import { alertDialogPreview as dialogPreview, dialogStickyFormFooter } from '../../locators/dialog/index';
import { STORY_ROOT } from '../../locators/locators';
import { closeIconButton, backgroundUILocator } from '../../locators/index';

When('I click close icon', () => {
  closeIconButton().click();
});

Then('background UI is enabled', () => {
  backgroundUILocator().should('not.exist');
});

Then('background UI is disabled', () => {
  backgroundUILocator().should('exist');
});

Then('Dialog height is set to {string}', (height) => {
  dialogPreview().should('have.attr', 'style').should('contain', `min-height: ${height}px`);
});

Then('Dialog height is not set to {string}', (height) => {
  dialogPreview().should('have.attr', 'style').should('not.contain', `min-height: ${height}px`);
});

Then('Dialog size property on preview is {string}', (size) => {
  dialogPreview().should('have.css', 'width', `${size}px`);
});

Then('Dialog is visible', () => {
  dialogPreview().should('be.visible');
});

Then('Dialog is not visible', () => {
  dialogPreview().should('not.exist');
});

Then('stickyFormFooter is enabled', () => {
  dialogStickyFormFooter().should('be.visible');
});

Then('stickyFormFooter is disabled', () => {
  dialogStickyFormFooter().should('not.be.visible');
});

When('I click on {string} outside dialog', (position) => {
  cy.iFrame(STORY_ROOT).click(position, { force: true });
});

When('I click on background {string} outside dialog', (position) => {
  backgroundUILocator().click(position, { force: true });
});
