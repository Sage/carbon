import { CLOSE_ICON_BUTTON } from '../locators';
import {
  OPEN_BUTTON, DIALOG_INNER_CONTENT, DIALOG_TITLE, DIALOG, CANCEL_BUTTON, CONFIRM_BUTTON,
} from './locators';
import { DIALOG_SUBTITLE } from '../dialog/locators';

// knobs locators
export const openButton = () => cy.get(OPEN_BUTTON);

// component preview locators
export const dialogInnerContent = () => cy.iFrame(DIALOG_INNER_CONTENT);
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE);
export const dialogPreview = () => cy.iFrame(DIALOG);
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE);
export const confirmButton = () => cy.iFrame(CONFIRM_BUTTON);
export const cancelButton = () => cy.iFrame(CANCEL_BUTTON);
