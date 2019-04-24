import { checkTheSizeOfTheElement } from '../helper';
import {
  alertChildren, alertDialogPreview, alertHeight,
} from '../../locators/alert';

Then('alert height is set to {string}', (height) => {
  alertHeight().should('have.attr', 'height').should('contain', `${height}`);
});

Then('alert height is not set to {string}', (height) => {
  cy.debug();
  alertHeight().should('have.attr', 'height').should('not.contain', `${height}`);
});

Then('alert size property on preview is {string}', (size) => {
  checkTheSizeOfTheElement(alertDialogPreview(), size);
});

Then('Alert children on preview is {string}', (children) => {
  alertChildren().should('have.text', children);
});

Then('alert is not visible', () => {
  alertDialogPreview().should('not.exist');
});

Then('alert is visible', () => {
  alertDialogPreview().should('be.visible');
});

Then('alert is not visible', () => {
  alertDialogPreview().should('not.exist');
});

Then('alert is visible', () => {
  alertDialogPreview().should('be.visible');
});
