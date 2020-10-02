import {
  dialogPreview,
  closeIconButton,
  dialogSubtitle,
  confirmButton,
  confirmButtonIFrame,
  cancelButton,
  cancelButtonIFrame,
  dialogPreviewIFrame,
} from '../../locators/confirm';
import { getDataElementByValue, icon } from '../../locators';
import { positionOfElement } from '../helper';

Then('component subtitle on preview is {word}', (subtitle) => {
  dialogSubtitle().should('have.text', subtitle);
});

When('I click on a cancelButton', () => {
  cancelButtonIFrame().click();
});

When('I click on a confirmButton', () => {
  confirmButtonIFrame().click();
});

Then('confirm button content on preview is {word}', (confirmButtonText) => {
  confirmButton().should('have.text', confirmButtonText);
});

Then('cancel button content on preview is {word}', (cancelButtonText) => {
  cancelButton().should('have.text', cancelButtonText);
});

Then('dialog title context on preview is {word}', (title) => {
  getDataElementByValue('title').should('have.text', title);
});

Then('Confirm dialog is visible', () => {
  dialogPreviewIFrame().should('be.visible');
});

Then('Confirm dialog is not visible in iFrame', () => {
  dialogPreviewIFrame().should('not.exist');
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

Then('Confirm dialog input height is {int}', (height) => {
  dialogPreview().should('have.attr', 'style')
    .and('contain', `min-height: ${height}px`);
});

Then('Confirm dialog size property on preview is {int}', (size) => {
  dialogPreview().should('have.css', 'width', `${size}px`);
});

Then('Button type is {word}', (buttonType) => {
  if (buttonType === 'destructive') {
    confirmButton().should('have.css', 'background-color', 'rgb(199, 56, 79)');
  } else {
    confirmButton().should('have.css', 'background-color', 'rgb(0, 129, 93)');
  }
});

Then('{word} icon is displayed on the header', (iconType) => {
  if (iconType === 'empty') {
    icon().should('not.exist');
  } else {
    icon().eq(positionOfElement('first')).should('have.attr', 'data-element', iconType);
  }
});
