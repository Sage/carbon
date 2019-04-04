//knobs locators
const SHOW_CLOSE_ICON_CHECKBOX = '#showCloseIcon'
export const showCloseIconCheckbox = () => cy.get(SHOW_CLOSE_ICON_CHECKBOX)

//component preview locators
const CLOSE_ICON_BUTTON = '.icon-close'
const ALERT_CHILDREN = '.carbon-dialog__inner-content'
const ALERT_DIALOG = '.carbon-dialog__dialog'
export const closeIconButton = () => cy.iFrame(CLOSE_ICON_BUTTON)
export const alertChildren = () => cy.iFrame(ALERT_CHILDREN)
export const dialogPreview = () => cy.iFrame(ALERT_DIALOG)

