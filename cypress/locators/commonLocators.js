const HEIGHT_INPUT = '#height'
const CHILDREN_TEXTAREA = '#children'
const LABEL_INPUT = '#label'
const LABEL_HELP_INPUT = '#labelHelp'

export const FORM = 'form'
export const STORYBOOK_BUTTON_PREVIEW = "#story-root > button"
export const STORYBOOK_LABEL_PREVIEW = "#story-root > div > label"
export const STORYBOOK_HELP_ICON_PREVIEW = ".icon-question"

export const labelInput = () => cy.get(LABEL_INPUT)
export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA)
export const sizeSelect = () => cy.get(FORM).contains('size').find('select')
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea')
export const asSelect = () => cy.get(FORM).contains('as').find('select')
export const heightInput = () => cy.get(HEIGHT_INPUT)
export const labelHelpInput = () => cy.get(LABEL_HELP_INPUT)

export const buttonPreview = () => cy.iFrame(STORYBOOK_BUTTON_PREVIEW)
export const labelPreview = () => cy.iFrame(STORYBOOK_LABEL_PREVIEW)
export const helpIcon = () => cy.iFrame(STORYBOOK_HELP_ICON_PREVIEW)

