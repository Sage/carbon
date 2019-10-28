import {
  CHECKBOX_HELP, CHECKBOX_COMMON_INPUT_FIELD, CHECKBOX_LABEL, CHECKBOX,
} from './locators';

// component preview locators
export const checkboxHelpTextPreview = () => cy.iFrame(CHECKBOX_HELP);
export const checkboxCommonInputField = () => cy.iFrame(CHECKBOX_COMMON_INPUT_FIELD);
export const checkboxLabelPreview = () => cy.iFrame(CHECKBOX_LABEL);

// component preview locators into iFrame
export const checkbox = position => cy.get(CHECKBOX).eq(position);
