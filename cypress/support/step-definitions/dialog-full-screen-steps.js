import { dialogFullScreenChildren, dialogFullScreenPreview, dialogFullScreenPreviewClosedState } from '../../locators/dialog-full-screen';
import { dialogStickyFormFooterIFrame } from '../../locators/dialog';

Then('Dialog Full Screen children on preview is {word}', (children) => {
  dialogFullScreenChildren().should('have.text', children);
});

Then('Dialog Full Screen is visible', () => {
  dialogFullScreenPreview().should('be.visible');
});

Then('Dialog Full Screen is not visible', () => {
  dialogFullScreenPreviewClosedState().should('exist');
});

Then('Dialog Full Screen stickyFormFooter is visible', () => {
  dialogStickyFormFooterIFrame().should('exist')
    .and('be.visible');
});
