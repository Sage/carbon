const HEIGHT_INPUT = '#height'
const CHILDREN_TEXTAREA = '#children'
const LABEL_INPUT = '#label'
const LABEL_HELP_INPUT = '#labelHelp'
const LABEL_PREVIEW = "#story-root > div > label"
const HELP_ICON_PREVIEW = '.icon-question'
const BUTTON_ICON_PREVIEW = '.carbon-icon'

export const FORM = 'form'
export const COMMON_BUTTON_PREVIEW = "#story-root > button"

export const labelInput = () => cy.get(LABEL_INPUT)
export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA)
export const sizeSelect = () => cy.get(FORM).contains('size').find('select')
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea')
export const asSelect = () => cy.get(FORM).contains('as').find('select')
export const heightInput = () => cy.get(HEIGHT_INPUT)
export const labelHelpInput = () => cy.get(LABEL_HELP_INPUT)
export const buttonPreview = () => cy.iFrame(COMMON_BUTTON_PREVIEW)
export const labelPreview = () => cy.iFrame(LABEL_PREVIEW)
export const helpIcon = () => cy.iFrame(HELP_ICON_PREVIEW)
export const buttonIconPreview = () => cy.iFrame(BUTTON_ICON_PREVIEW)
