//knobs locators
const HEIGHT_INPUT = '#height'
const CHILDREN_TEXTAREA = '#children'
const LABEL_INPUT = '#label'
const LABEL_HELP_INPUT = '#labelHelp'
const DISABLE_ESC_KEY_CHECHBOX = '#disableEscKey'
const TITLE_INPUT = '#title'
const SUBTILE_INPUT = '#subtitle'
const ENABLE_BACKGROUND_UI_CHECKBOX = '#enableBackgroundUI'
export const FORM = '#storybook-panel-root'
export const enableBackgroundUICheckbox = () => cy.get(FORM).find(ENABLE_BACKGROUND_UI_CHECKBOX)
export const titleInput = () => cy.get(TITLE_INPUT)
export const subtitleInput = () => cy.get(FORM).find(SUBTILE_INPUT)
export const disableEscKeyCheckbox = () => cy.get(DISABLE_ESC_KEY_CHECHBOX)
export const knobsTab = () => cy.get(FORM).find('button').contains('Knobs')
export const labelInput = () => cy.get(LABEL_INPUT)
export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA)
export const sizeSelect = () => cy.get(FORM).contains('size').find('select')
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea')
export const asSelect = () => cy.get(FORM).contains('as').find('select')
export const heightInput = () => cy.get(HEIGHT_INPUT)
export const labelHelpInput = () => cy.get(LABEL_HELP_INPUT)

//component preview locators
const DIALOG_TITLE = '#carbon-dialog-title'
const DIALOG_SUBTITLE = '#carbon-dialog-subtitle'
const BACKGROUND_UI_BLOCKER = '.carbon-modal__background'
const HELP_ICON_PREVIEW = '.icon-question'
const BUTTON_ICON_PREVIEW = '.carbon-icon'
export const STORY_ROOT = '#story-root'
export const commonButtonPreview = () => cy.iFrame(STORY_ROOT).find('button')
export const backgroundBlocker = () => cy.iFrame(BACKGROUND_UI_BLOCKER)
export const dialogTitle = () => cy.iFrame(DIALOG_TITLE)
export const dialogSubtitle = () => cy.iFrame(DIALOG_SUBTITLE)
export const labelPreview = () => cy.iFrame(STORY_ROOT).find('label').first()
export const helpIcon = () => cy.iFrame(HELP_ICON_PREVIEW)
export const buttonIconPreview = () => cy.iFrame(BUTTON_ICON_PREVIEW)
