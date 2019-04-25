import { dialogFullScreenChildren, dialogFullScreenPreview } from '../../locators/dialog-full-screen';

Then('Dialog Full Screen children on preview is {string}', (children) => {
  dialogFullScreenChildren().should('have.text', children);
});

Then('Dialog Full Screen is visible', () => {
  dialogFullScreenPreview().should('be.visible');
});

Then('Dialog Full Screen is not visible', () => {
  dialogFullScreenPreview().should('not.be.visible');
});
