import { dialogFullScreenChildren, dialogFullScreenPreview, dialogFullScreenPreviewClosedState } from '../../locators/dialog-full-screen';
import { dialogStickyFormFooter } from '../../locators/dialog';

Then('Dialog Full Screen children on preview is {string}', (children) => {
  dialogFullScreenChildren().should('have.text', children);
});

Then('Dialog Full Screen is visible', () => {
  dialogFullScreenPreview().should('be.visible');
});

Then('Dialog Full Screen is not visible', () => {
  dialogFullScreenPreviewClosedState().should('exist');
});

Then('Dialog Full Screen stickyFormFooter is visible', () => {
  dialogStickyFormFooter().should('exist')
    .and('be.visible');
});
