import { checkTheSizeOfTheElement } from '../helper';
import { backgroundBlocker, dialogPreview, dialogStickyFormFooter } from '../../locators/dialog/index';
import { STORY_ROOT } from '../../locators/locators';

import {
  closeIconButton, stickyFormFooter,
} from '../../locators/index';

When('I click close icon', () => {
  closeIconButton().click();
});

Then('background UI is enabled', () => {
  backgroundBlocker().should('not.exist');
});

Then('background UI is disabled', () => {
  backgroundBlocker().should('exist');
});

Then('Dialog height is set to {string}', (height) => {
  dialogPreview().should('have.attr', 'style').should('contain', `min-height: ${height}px`);
});

Then('Dialog height is not set to {string}', (height) => {
  dialogPreview().should('have.attr', 'style').should('not.contain', `min-height: ${height}px`);
});

Then('Dialog size property on preview is {string}', (size) => {
  checkTheSizeOfTheElement(dialogPreview(), size);
});

Then('dialog is visible', () => {
  dialogPreview().should('be.visible');
});

Then('dialog is not visible', () => {
  dialogPreview().should('not.exist');
});

When('I enable stickyFormFooter', () => {
  stickyFormFooter().check();
});

When('I disable stickyFormFooter', () => {
  stickyFormFooter().uncheck();
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
  backgroundBlocker().click(position, { force: true });
});
