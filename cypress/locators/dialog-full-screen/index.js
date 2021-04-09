import {
  DIALOG_FULL_SCREEN_CHILDREN,
  DIALOG_FULL_SCREEN,
  DIALOG_FULL_SCREEN_CLOSE_STATE,
} from "./locators";

// component preview locators
export const dialogFullScreenChildren = () =>
  cy.get(DIALOG_FULL_SCREEN_CHILDREN).eq(0);
export const dialogFullScreenPreview = () => cy.get(DIALOG_FULL_SCREEN);
export const dialogFullScreenPreviewClosedState = () =>
  cy.get(DIALOG_FULL_SCREEN_CLOSE_STATE);
