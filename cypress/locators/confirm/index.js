import { FORM, CLOSE_ICON_BUTTON } from '../locators';
import {
  OPEN_BUTTON, CHILDREN_AREA, TITLE_INPUT, HEIGHT_INPUT, SUBTILE_INPUT, SHOW_CLOSE_ICON_CONFIRM,
  STICKY_FORM_FOOTER_CHECKBOX, CONFIRM_LABEL, CANCEL_LABEL,
  DIALOG_INNER_CONTENT, DIALOG_TITLE, DIALOG, CANCEL_BUTTON, CONFIRM_BUTTON,
} from './locators';
import { DIALOG_SUBTITLE } from '../dialog/locators';

// knobs locators
export const openButton = () => cy.get(OPEN_BUTTON);
export const titleInput = () => cy.get(TITLE_INPUT);
export const heightInput = () => cy.get(HEIGHT_INPUT);
export const subtitleInput = () => cy.get(FORM).find(SUBTILE_INPUT);
export const showCloseIconCheckbox = () => cy.get(SHOW_CLOSE_ICON_CONFIRM);
export const stickyFormFooterCheckbox = () => cy.get(STICKY_FORM_FOOTER_CHECKBOX);
export const confirmLabel = () => cy.get(CONFIRM_LABEL);
export const cancelLabel = () => cy.get(CANCEL_LABEL);

// component preview locators
export const dialogInnerContent = () => cy.iFrame(DIALOG_INNER_CONTENT);
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE);
export const dialogPreview = () => cy.iFrame(DIALOG);
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE);
export const childrenArea = () => cy.iFrame(CHILDREN_AREA);
export const confirmButton = () => cy.iFrame(CONFIRM_BUTTON);
export const cancelButton = () => cy.iFrame(CANCEL_BUTTON);
