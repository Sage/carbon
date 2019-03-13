import { iget } from "../support/helper";
import { STORYBOOK_PREVIEW, FORM, STORYBOOK_BUTTON_PREVIEW } from "./commonLocators";

const ALERT_DIALOG = '.carbon-dialog__dialog'
const ALERT_DIALOG_TITLE = '#carbon-dialog-title'
const ALERT_DIALOG_SUBTITLE = '#carbon-dialog-subtitle'
const ALERT_DIALOG_CHILDREN = '.carbon-dialog__inner-content'
const CLOSE_ICON_BUTTON = '.icon-close'
const BACKGROUND_UI_BLOCKER = '.carbon-modal__background'
const DISABLE_ESC_KEY_CHECHBOX = '#disableEscKey'
const SHOW_CLOSE_ICON_CHECKBOX = '#showCloseIcon'
const TITLE_INPUT = '#title'
const SUBTILE_INPUT = '#subtitle'
const ENABLE_BACKGROUND_UI_CHECKBOX = '#enableBackgroundUI'

export const enableBackgroundUICheckbox = () => cy.get(FORM).find(ENABLE_BACKGROUND_UI_CHECKBOX)
export const openAlertButton = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), STORYBOOK_BUTTON_PREVIEW); })
export const backgroundBlocker = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), BACKGROUND_UI_BLOCKER); })
export const titleInput = () => cy.get(FORM).find(TITLE_INPUT)
export const subtitleInput = () => cy.get(FORM).find(SUBTILE_INPUT)
export const alertTitle = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ALERT_DIALOG_TITLE); })
export const alertSubtitle = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ALERT_DIALOG_SUBTITLE); })
export const alertChildren = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ALERT_DIALOG_CHILDREN); })
export const disableEscKeyCheckbox = () => cy.get(DISABLE_ESC_KEY_CHECHBOX)
export const alertDialog = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ALERT_DIALOG); })
export const showCloseIconCheckbox = () => cy.get(SHOW_CLOSE_ICON_CHECKBOX)
export const closeIconButton = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), CLOSE_ICON_BUTTON); })
