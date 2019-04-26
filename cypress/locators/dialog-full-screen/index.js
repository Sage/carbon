import { DIALOG_FULL_SCREEN_CHILDREN, DIALOG_FULL_SCREEN, DIALOG_FULL_SCREEN_CLOSE_STATE } from './locators';

// component preview locators
export const dialogFullScreenChildren = () => cy.iFrame(DIALOG_FULL_SCREEN_CHILDREN);
export const dialogFullScreenPreview = () => cy.iFrame(DIALOG_FULL_SCREEN);
export const dialogFullScreenPreviewClosedState = () => cy.iFrame(DIALOG_FULL_SCREEN_CLOSE_STATE);
