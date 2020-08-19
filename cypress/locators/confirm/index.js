import { CLOSE_ICON_BUTTON } from '../locators';
import {
  DIALOG_INNER_CONTENT,
  DIALOG,
  CANCEL_BUTTON,
  CONFIRM_BUTTON,
  DIALOG_SUBTITLE,
} from './locators';

// component preview locators
export const dialogInnerContent = () => cy.get(DIALOG_INNER_CONTENT);
export const dialogPreview = () => cy.get(DIALOG);
export const closeIconButton = () => cy.get(CLOSE_ICON_BUTTON);
export const dialogSubtitle = () => cy.get(DIALOG_SUBTITLE);
export const confirmButton = () => cy.get(CONFIRM_BUTTON);
export const cancelButton = () => cy.get(CANCEL_BUTTON);

// component preview locators in IFrame
export const dialogPreviewIFrame = () => cy.iFrame(DIALOG);
export const dialogSubtitleIFrame = () => cy.iFrame(DIALOG_SUBTITLE);
export const confirmButtonIFrame = () => cy.iFrame(CONFIRM_BUTTON);
export const cancelButtonIFrame = () => cy.iFrame(CANCEL_BUTTON);