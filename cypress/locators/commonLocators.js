//knobs locators
const HEIGHT_INPUT = '#height'
const CHILDREN_TEXTAREA = '#children'
const LABEL_INPUT = '#label'
const LABEL_HELP_INPUT = '#labelHelp'
const TITLE_INPUT = '#title'
const SUBTILE_INPUT = '#subtitle'
const ENABLE_BACKGROUND_UI_CHECKBOX = '#enableBackgroundUI'
const INPUT_WIDTH_SLIDER = 'input[name="inputWidth"]'
const LABEL_WIDTH_SLIDER = 'input[name="labelWidth"]'
const FIELD_HELP_INPUT = '#fieldHelp'
const LABLEL_INLINE_CHECKBOX = '#labelInline'
const LABEL_ALIGN_SELECT = 'select[name="labelAlign"]'
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
export const alignSelect = () => cy.get(FORM).contains('align').find('select');
export const heightInput = () => cy.get(HEIGHT_INPUT)
export const labelHelpInput = () => cy.get(LABEL_HELP_INPUT)
export const inputWidthSlider = () => cy.get(INPUT_WIDTH_SLIDER)
export const labelWidthSlider = () => cy.get(LABEL_WIDTH_SLIDER)
export const fieldHelpInput = () => cy.get(FIELD_HELP_INPUT)
export const lableInlineCheckbox = () => cy.get(LABLEL_INLINE_CHECKBOX)
export const labelAlignSelect = () => cy.get(LABEL_ALIGN_SELECT)

//component preview locators
const HELP_ICON_PREVIEW = '.icon-question'
const LABEL_HELP_PREVIEW = '.carbon-tooltip__container'
const FIELD_HELP_PREVIEW = '.common-input__help-text'
export const STORY_ROOT = '#story-root'
export const commonButtonPreview = () => cy.iFrame(STORY_ROOT).find('button')
export const labelPreview = () => cy.iFrame(STORY_ROOT).find('label').first()
export const helpIcon = () => cy.iFrame(HELP_ICON_PREVIEW)
export const labelHelpPreview = () => cy.iFrame(LABEL_HELP_PREVIEW)
export const fieldHelpPreview = () => cy.iFrame(FIELD_HELP_PREVIEW)


