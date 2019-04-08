//knobs locators
const HEIGHT_INPUT = '#height'
const CHILDREN_TEXTAREA = '#children'
const LABEL_INPUT = '#label'
const LABEL_HELP_INPUT = '#labelHelp'
const TITLE_INPUT = '#title'
const SUBTILE_INPUT = '#subtitle'
const ENABLE_BACKGROUND_UI_CHECKBOX = '#enableBackgroundUI'
export const FORM = '#storybook-panel-root'
export const enableBackgroundUICheckbox = () => cy.get(FORM).find(ENABLE_BACKGROUND_UI_CHECKBOX)
export const titleInput = () => cy.get(TITLE_INPUT)
export const subtitleInput = () => cy.get(FORM).find(SUBTILE_INPUT)
export const knobsTab = () => cy.get(FORM).find('button').contains('Knobs')
export const labelInput = () => cy.get(LABEL_INPUT)
export const childrenTextArea = () => cy.get(CHILDREN_TEXTAREA)
export const sizeSelect = () => cy.get(FORM).contains('size').find('select')
export const subtextInput = () => cy.get(FORM).contains('subtext').find('textarea')
export const asSelect = () => cy.get(FORM).contains('as').find('select')
export const heightInput = () => cy.get(HEIGHT_INPUT)
export const labelHelpInput = () => cy.get(LABEL_HELP_INPUT)

//component preview locators
const HELP_ICON_PREVIEW = '.icon-question'
export const STORY_ROOT = '#story-root'
export const commonButtonPreview = () => cy.iFrame(STORY_ROOT).find('button')
export const labelPreview = () => cy.iFrame(STORY_ROOT).find('label').first()
export const helpIcon = () => cy.iFrame(HELP_ICON_PREVIEW)
