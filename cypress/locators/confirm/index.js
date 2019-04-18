import { FORM } from '../locators';
import {
  OPEN_BUTTON, CHILDREN_TEXTAREA, TITLE_INPUT, HEIGHT_INPUT, SUBTILE_INPUT, SHOW_CLOSE_ICON_CONFIRM,
  STICKY_FORM_FOOTER_CHECKBOX, BACKGROUND_UI_CHECKBOX, CONFIRM_LABEL, CANCEL_LABEL,
  DIALOG_INNER_CONTENT, DIALOG_TITLE, BACKGROUND_UI_LOCATOR, DIALOG,
} from './locators';
import { DISABLE_ESC_KEY_CHECHBOX, CLOSE_ICON_BUTTON, DIALOG_SUBTITLE } from '../alert-dialog/locators';

// knobs locators
export const openButton = () => cy.get(OPEN_BUTTON);
export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA);
export const titleInput = () => cy.get(TITLE_INPUT);
export const disableEscKeyCheckbox = () => cy.get(DISABLE_ESC_KEY_CHECHBOX);
export const heightInput = () => cy.get(HEIGHT_INPUT);
export const subtitleInput = () => cy.get(FORM).find(SUBTILE_INPUT);
export const showCloseIconCheckbox = () => cy.get(SHOW_CLOSE_ICON_CONFIRM);
export const stickyFormFooterCheckbox = () => cy.get(STICKY_FORM_FOOTER_CHECKBOX);
export const backgroundUICheckbox = () => cy.get(BACKGROUND_UI_CHECKBOX);
export const confirmLabel = () => cy.get(CONFIRM_LABEL);
export const cancelLabel = () => cy.get(CANCEL_LABEL);

// component preview locators
export const dialogInnerContent = () => cy.iFrame(DIALOG_INNER_CONTENT);
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE);
export const backGroundUILocator = () => cy.get(BACKGROUND_UI_LOCATOR);
export const dialogPreview = () => cy.iFrame(DIALOG);
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE);
