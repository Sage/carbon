import {
  alertDialogPreviewIFrame,
  alertChildren,
  alertDialogPreview,
} from '../../locators/dialog';

Then('Alert height is set to {string}', (height) => {
  alertDialogPreview().should('have.attr', 'height').should('contain', `${height}`);
});

Then('Alert height is not set to {string}', (height) => {
  alertDialogPreview().should('have.attr', 'height')
    .and('not.contain', `${height}`);
});

Then('Alert size property on preview is {string}', (size) => {
  alertDialogPreview().should('have.css', 'width', `${size}px`);
});

Then('Alert children on preview is {string}', (children) => {
  alertChildren().should('have.text', children);
});

Then('Alert is not visible', () => {
  alertDialogPreviewIFrame().should('not.exist');
});

Then('Alert is not visible in NoIFrame', () => {
  alertDialogPreview().should('not.exist');
});

Then('Alert is visible', () => {
  alertDialogPreviewIFrame().should('be.visible');
});

Then('Alert is visible in NoIFrame', () => {
  alertDialogPreview().should('be.visible');
});

Then('Alert is not visible', () => {
  alertDialogPreview().should('not.exist');
});

Then('Alert is visible', () => {
  alertDialogPreview().should('be.visible');
});
