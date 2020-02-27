import { alertDialogPreview as dialogPreview, dialogStickyFormFooter, dialogStickyFormFooterButton } from '../../locators/dialog/index';
import { closeIconButton, backgroundUILocator, storyRoot } from '../../locators/index';
import { DEBUG_FLAG } from '..';

const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;

When('I click close icon', () => {
  closeIconButton().click();
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
  cy.wait(500, { log: DEBUG_FLAG }); // storybook needs time to render properly stickyFormFooter
  dialogStickyFormFooter().should('be.visible');
});

Then('stickyFormFooter is disabled', () => {
  dialogStickyFormFooter().should('not.be.visible');
});

When('I click on {string} outside dialog', (position) => {
  storyRoot().click(position, { force: true });
});

When('I click on background {string} outside dialog', (position) => {
  backgroundUILocator().click(position, { force: true });
});

Then('footer buttons have color {string} and has {int} px border', (color, px) => {
  dialogStickyFormFooterButton(FIRST_ELEMENT).should('have.css', 'border', `${px}px solid ${color}`)
    .and('have.css', 'color', color);
  dialogStickyFormFooterButton(SECOND_ELEMENT).children().should('have.css', 'background')
    .and('contain', color);
  dialogStickyFormFooterButton(SECOND_ELEMENT).children().should('have.css', 'border-color', 'rgba(0, 0, 0, 0)')
    .and('have.css', 'color', 'rgb(255, 255, 255)');
});
