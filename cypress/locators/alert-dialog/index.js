import {
  SHOW_CLOSE_ICON_CHECKBOX, STICKY_FORM_FOOTER, DISABLE_ESC_KEY_CHECKBOX, CLOSE_ICON_BUTTON,
  ALERT_CHILDREN, ALERT_DIALOG, BACKGROUND_UI_BLOCKER, DIALOG_TITLE, DIALOG_SUBTITLE,
} from './locators';

// knobs locators
export const showCloseIconCheckbox = () => cy.get(SHOW_CLOSE_ICON_CHECKBOX);
export const stickyFormFooter = () => cy.get(STICKY_FORM_FOOTER);
export const disableEscKeyCheckbox = () => cy.get(DISABLE_ESC_KEY_CHECKBOX);

// component preview locators
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const alertChildren = () => cy.iFrame(ALERT_CHILDREN);
export const dialogPreview = () => cy.iFrame(ALERT_DIALOG);
export const backgroundBlocker = () => cy.iFrame(BACKGROUND_UI_BLOCKER);
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE);
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE);
