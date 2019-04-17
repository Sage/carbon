import { dialogFullScreenChildren, dialogFullScreenPreview } from '../../locators/dialog-full-screen-locators';

When('I hit ESC key on Full Dialog Screen', () => {
  dialogFullScreenPreview().trigger('keydown', { keyCode: 27, which: 27 });
});

Then('Dialog Full Screen children on preview is {string}', (children) => {
  dialogFullScreenChildren().should('have.text', children);
});

Then('Dialog Full Screen is visible', () => {
  dialogFullScreenPreview().should('be.visible');
});

Then('Dialog Full Screen is not visible', () => {
  dialogFullScreenPreview().should('not.exist');
});
