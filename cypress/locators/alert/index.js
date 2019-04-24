import {
  ALERT_CHILDREN, ALERT_DIALOG, ALERT_HEIGHT,
} from './locators';

// component preview locators
export const alertChildren = () => cy.iFrame(ALERT_CHILDREN);
export const alertDialogPreview = () => cy.iFrame(ALERT_DIALOG);
export const alertHeight = () => cy.iFrame(ALERT_HEIGHT);
