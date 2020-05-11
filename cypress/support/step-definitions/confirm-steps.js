import {
  dialogTitle, dialogPreview, closeIconButton,
  dialogSubtitle, confirmButton, cancelButton,
} from '../../locators/confirm';

Then('component subtitle on preview is {word}', (subtitle) => {
  dialogSubtitle().should('have.text', subtitle);
});

When('I click on a cancelButton', () => {
  cancelButton().click();
});

When('I click on a confirmButton', () => {
  confirmButton().click();
});

Then('confirm button content on preview is {word}', (confirmButtonText) => {
  confirmButton().should('have.text', confirmButtonText);
});

Then('cancel button content on preview is {word}', (cancelButtonText) => {
  cancelButton().should('have.text', cancelButtonText);
});

Then('dialog title context on preview is {word}', (title) => {
  dialogTitle().should('have.text', title);
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

Then('dialog subtitle context is {word}', (title) => {
  dialogSubtitle().should('have.text', title);
});

Then('Confirm dialog input height is {string}', (height) => {
  dialogPreview().should('have.attr', 'style')
    .and('contain', `min-height: ${height}px`);
});

Then('Confirm dialog size property on preview is {string}', (size) => {
  dialogPreview().should('have.css', 'width', `${size}px`);
});
