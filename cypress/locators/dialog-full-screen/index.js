import { DIALOG_FULL_SCREEN_CHILDREN, DIALOG_FULL_SCREEN } from './locators';

// component preview locators
export const dialogFullScreenChildren = () => cy.iFrame(DIALOG_FULL_SCREEN_CHILDREN);
export const dialogFullScreenPreview = () => cy.iFrame(DIALOG_FULL_SCREEN);
