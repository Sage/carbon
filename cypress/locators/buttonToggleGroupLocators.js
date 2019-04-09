//knobs locators
const INPUT_WIDTH_INPUT = '#inputWidth'
const FIELD_HELP_INPUT = '#fieldHelp'
const LABLEL_INLINE_CHECKBOX = '#labelInline'
const LABEL_ALIGN_SELECT = 'select[name="labelAlign"]'
const LABEL_WIDTH_INPUT = '#labelWidth'
export const inputWidthInput = () => cy.get(INPUT_WIDTH_INPUT)
export const fieldHelpInput = () => cy.get(FIELD_HELP_INPUT)
export const lableInlineCheckbox = () => cy.get(LABLEL_INLINE_CHECKBOX)
export const labelAlignSelect = () => cy.get(LABEL_ALIGN_SELECT)
export const labelWidthInput = () => cy.get(LABEL_WIDTH_INPUT)

//component preview locators
const BUTTON_TOGGLE_GROUP_PREVIEW = '.carbon-button-toggle-group'
const FIELD_HELP_PREVIEW = '.common-input__help-text'
const LABEL_HELP_PREVIEW = '.carbon-tooltip__container'
const INPUT_WIDTH_PREVIEW = '.carbon-button-toggle-group > .common-input__field'
export const buttonToggleGroupPreview = () => cy.iFrame(BUTTON_TOGGLE_GROUP_PREVIEW)
export const fieldHelpPreview = () => cy.iFrame(FIELD_HELP_PREVIEW)
export const labelHelpPreview = () => cy.iFrame(LABEL_HELP_PREVIEW)
export const inputWidthPreview = () => cy.iFrame(INPUT_WIDTH_PREVIEW)