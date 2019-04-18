import {
  REVERSE_CHECKBOX, FIELD_HELP_INLINE_CHECKBOX, CHECKBOX_HELP,
  CHECKBOX_COMMOM_INPUT_FIELD, CHECKBOX_LABEL,
} from './locators';

// knobs locators
export const reverseCheckbox = () => cy.get(REVERSE_CHECKBOX);
export const fieldHelpInlineCheckbox = () => cy.get(FIELD_HELP_INLINE_CHECKBOX);

// component preview locators
export const checkboxHelpTextPreview = () => cy.iFrame(CHECKBOX_HELP);
export const checkboxCommonInputField = () => cy.iFrame(CHECKBOX_COMMOM_INPUT_FIELD);
export const checkboxLabelPreview = () => cy.iFrame(CHECKBOX_LABEL);
