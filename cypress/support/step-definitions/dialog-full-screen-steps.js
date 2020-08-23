import {
  dialogFullScreenChildren,
  dialogFullScreenPreviewIFrame,
  dialogFullScreenPreviewClosedStateIFrame,
} from '../../locators/dialog-full-screen';
import { dialogStickyFormFooter } from '../../locators/dialog';

Then('Dialog Full Screen children on preview is {word}', (children) => {
  dialogFullScreenChildren().should('contain.text', children);
});

Then('Dialog Full Screen is visible', () => {
  dialogFullScreenPreviewIFrame().should('be.visible');
});

Then('Dialog Full Screen is not visible', () => {
  dialogFullScreenPreviewClosedStateIFrame().should('exist');
});

Then('Dialog Full Screen stickyFormFooter is visible', () => {
  dialogStickyFormFooter().should('exist')
    .and('be.visible');
});
