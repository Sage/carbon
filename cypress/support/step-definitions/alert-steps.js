import {
  alertChildren, alertDialogPreview, alertHeight,
} from '../../locators/alert';

Then('Alert height is set to {string}', (height) => {
  alertHeight().should('have.attr', 'height').should('contain', `${height}`);
});

Then('Alert height is not set to {string}', (height) => {
  alertHeight().should('have.attr', 'height').should('not.contain', `${height}`);
});

Then('Alert size property on preview is {string}', (size) => {
  alertDialogPreview().should('have.css', 'width', `${size}px`);
});

Then('Alert children on preview is {string}', (children) => {
  alertChildren().should('have.text', children);
});

Then('Alert is not visible', () => {
  alertDialogPreview().should('not.exist');
});

Then('Alert is visible', () => {
  alertDialogPreview().should('be.visible');
});

Then('Alert is not visible', () => {
  alertDialogPreview().should('not.exist');
});

Then('Alert is visible', () => {
  alertDialogPreview().should('be.visible');
});
