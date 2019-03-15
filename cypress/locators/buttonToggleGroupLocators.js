const INPUT_WIDTH_INPUT = '#inputWidth'
const INPUT_WIDTH_PREVIEW = '.carbon-button-toggle-group > .common-input__field'
const FIELD_HELP_INPUT = '#fieldHelp'
const FIELD_HELP_PREVIEW = '.common-input__help-text'
const LABEL_HELP_PREVIEW = '.carbon-tooltip__container'
const LABLEL_INLINE_CHECKBOX = '#labelInline'
const BUTTON_TOGGLE_GROUP_PREVIEW = '.carbon-button-toggle-group'
const LABEL_ALIGN_INPUT = '#labelAlign'
const LABEL_WIDTH_INPUT = '#labelWidth'

export const inputWidthInput = () => cy.get(INPUT_WIDTH_INPUT)
export const inputWidthPreview = () => cy.iFrame(INPUT_WIDTH_PREVIEW)
export const fieldHelpInput = () => cy.get(FIELD_HELP_INPUT)
export const fieldHelpPreview = () => cy.iFrame(FIELD_HELP_PREVIEW)
export const labelHelpPreview = () => cy.iFrame(LABEL_HELP_PREVIEW)
export const lableInlineCheckbox = () => cy.get(LABLEL_INLINE_CHECKBOX)
export const buttonToggleGroupPreview = () => cy.iFrame(BUTTON_TOGGLE_GROUP_PREVIEW)
export const labelAlignInput = () => cy.get(LABEL_ALIGN_INPUT)
export const labelWidthInput = () => cy.get(LABEL_WIDTH_INPUT)