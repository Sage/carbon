import { FORM } from './commonLocators';

// knobs locators
const OPEN_BUTTON = 'button[type="button"][name="open"]';
const CHILDREN_TEXTAREA = 'textarea[id="children"]';
const TITLE_INPUT = '#title';
const DISABLE_ESC_KEY_CHECHBOX = '#disableEscKey';
const HEIGHT_INPUT = '#height';
const SUBTILE_INPUT = '#subtitle';
const SHOW_CLOSE_ICON_CONFIRM = '#showCloseIcon';
const STICKY_FORM_FOOTER_CHECKBOX = '#stickyFormFooter';
const BACKGROUND_UI_CHECKBOX = '#enableBackgroundUI';
const CONFIRM_LABEL = '#confirmLabel';
const CANCEL_LABEL = '#cancelLabel';
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

const DIALOG_INNER_CONTENT = '.carbon-dialog__inner-content';
const DIALOG_TITLE = '.carbon-dialog-title';
const BACKGROUND_UI_LOCATOR = '.carbon-modal__background modal-background-enter';
const DIALOG = '.carbon-dialog__dialog';
const CLOSE_ICON_BUTTON = '.icon-close';
const DIALOG_SUBTITLE = '#carbon-dialog-subtitle';
export const dialogInnerContent = () => cy.iFrame(DIALOG_INNER_CONTENT);
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE);
export const backGroundUILocator = () => cy.get(BACKGROUND_UI_LOCATOR);
export const dialogPreview = () => cy.iFrame(DIALOG);
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON);
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE);
