import {
  alertDialogPreview,
  alertChildrenNoIframe,
  alertDialogPreviewNoIFrame,
} from '../../locators/dialog';

Then('Alert height is set to {string}', (height) => {
  alertDialogPreviewNoIFrame().should('have.attr', 'height').should('contain', `${height}`);
});

Then('Alert height is not set to {string}', (height) => {
  alertDialogPreviewNoIFrame().should('have.attr', 'height')
    .and('not.contain', `${height}`);
});

Then('Alert size property on preview is {string}', (size) => {
  alertDialogPreviewNoIFrame().should('have.css', 'width', `${size}px`);
});

Then('Alert children on preview is {string}', (children) => {
  alertChildrenNoIframe().should('have.text', children);
});

Then('Alert is not visible', () => {
  alertDialogPreview().should('not.exist');
});

Then('Alert is not visible in NoIFrame', () => {
  alertDialogPreviewNoIFrame().should('not.exist');
});

Then('Alert is visible', () => {
  alertDialogPreview().should('be.visible');
});

Then('Alert is visible in NoIFrame', () => {
  alertDialogPreviewNoIFrame().should('be.visible');
});

Then('Alert is not visible', () => {
  alertDialogPreviewNoIFrame().should('not.exist');
});

Then('Alert is visible', () => {
  alertDialogPreviewNoIFrame().should('be.visible');
});
