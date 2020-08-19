import {
  DIALOG_FULL_SCREEN_CHILDREN,
  DIALOG_FULL_SCREEN,
  DIALOG_FULL_SCREEN_CLOSE_STATE
} from './locators';

// component preview locators
export const dialogFullScreenChildren = () => cy.get(DIALOG_FULL_SCREEN_CHILDREN).eq(0);
export const dialogFullScreenPreviewIFrame = () => cy.iFrame(DIALOG_FULL_SCREEN);
export const dialogFullScreenPreviewClosedStateIFrame = () => cy.iFrame(DIALOG_FULL_SCREEN_CLOSE_STATE);
