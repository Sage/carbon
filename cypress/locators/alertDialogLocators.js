//knobs locators
const SHOW_CLOSE_ICON_CHECKBOX = '#showCloseIcon'
const STICKY_FORM_FOOTER = '#stickyFormFooter'
const DISABLE_ESC_KEY_CHECHBOX = '#disableEscKey'
export const showCloseIconCheckbox = () => cy.get(SHOW_CLOSE_ICON_CHECKBOX)
export const stickyFormFooter = () => cy.get(STICKY_FORM_FOOTER)
export const disableEscKeyCheckbox = () => cy.get(DISABLE_ESC_KEY_CHECHBOX)


//component preview locators
const CLOSE_ICON_BUTTON = '.icon-close'
const ALERT_CHILDREN = '.carbon-dialog__inner-content'
const ALERT_DIALOG = '.carbon-dialog__dialog'
const DIALOG_TITLE = '#carbon-dialog-title'
const DIALOG_SUBTITLE = '#carbon-dialog-subtitle'
const BACKGROUND_UI_BLOCKER = '.carbon-modal__background'
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON)
export const alertChildren = () => cy.iFrame(ALERT_CHILDREN)
export const dialogPreview = () => cy.iFrame(ALERT_DIALOG)
export const backgroundBlocker = () => cy.iFrame(BACKGROUND_UI_BLOCKER)
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE)
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE)
