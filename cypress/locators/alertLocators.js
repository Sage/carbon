const STORYBOOK_PREVIEW = '#storybook-preview-iframe'
const CHILDREN_TEXTAREA = '#children'
const FORM = 'form'
const ALERT_DIALOG = '.carbon-dialog__dialog'
const ALERT_DIALOG_TITLE = '#carbon-dialog-title'
const ALERT_DIALOG_SUBTITLE = '#carbon-dialog-subtitle'
const ALERT_DIALOG_CHILDREN = '.carbon-dialog__inner-content'
const CLOSE_ICON = '.icon-close'
const BACKGROUND_UI_BLOCKER = '.carbon-modal__background'
const DISABLE_ESC_KEY = '#disableEscKey'

//here
export const enableBackgroundUICheckbox = () => cy.get(FORM).find('#enableBackgroundUI')
export const openPreviewButton = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), "#story-root > button"); })
export const backgroundBlocker = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), BACKGROUND_UI_BLOCKER); })
export const titleInput = () => cy.get(FORM).find('#title')
export const subtitleInput = () => cy.get(FORM).find('#subtitle')
export const alertTitle = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ALERT_DIALOG_TITLE); })
export const alertSubtitle = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ALERT_DIALOG_SUBTITLE); })
export const alertChildren = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ALERT_DIALOG_CHILDREN); })
export const disableEscKeyCheckbox = () => cy.get(DISABLE_ESC_KEY)
export const alertDialog = () =>cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), ALERT_DIALOG); })

//old
export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA);
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea');
export const sizeSelect = () => cy.get(FORM).contains('size').find('select')
export const asSelect = () => cy.get(FORM).contains('as').find('select')
export const disabledCheckbox = () => cy.get(FORM).contains('disabled').find('input')
export const themeSelect = () => cy.get(FORM).contains('theme').find('select')

export const buttonSubtextPreview = () => cy.get(STORYBOOK_PREVIEW).then(($iframe) => { return iget($iframe.contents(), '.carbon-button__subtext'); })


export const closeIcon = () => cy.get(CLOSE_ICON)



function iget(doc, selector) { return cy.wrap(doc.find(selector)); }