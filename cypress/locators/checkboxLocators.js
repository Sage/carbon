//knobs locators
const REVERSE_CHECKBOX = '#reverse'
const FIELD_HELP_INLINE_CHECKBOX = '#fieldHelpInline'
export const reverseCheckbox = () => cy.get(REVERSE_CHECKBOX)
export const fieldHelpInlineCheckbox = () => cy.get(FIELD_HELP_INLINE_CHECKBOX)

//component preview locators
const CHECKBOX_HELP = '.carbon-checkbox__help-text'
const CHECKBOX_COMMOM_INPUT_FIELD = '.carbon-checkbox > .common-input__field'
const CHECKBOX_LABEL = '.common-input__label'
export const checkboxHelpTextPreview = () => cy.iFrame(CHECKBOX_HELP)
export const checkboxCommonInputField = () => cy.iFrame(CHECKBOX_COMMOM_INPUT_FIELD)
export const checkboxLabelPreview = () => cy.iFrame(CHECKBOX_LABEL)