import {
  SAVE_BUTTON, CANCEL_BUTTON, ADDITIONAL_ACTIONS, LEFT_ALIGNED_ACTIONS,
  RIGHT_ALIGNED_ACTIONS, ERRORS, ERROR_MESSAGE, INPUT_VALIDATION, FORM_DATA_ELEMENT,
  ERROR_TOOLTIP, FORM_FOOTER,
} from './locators';

// component preview locators
export const saveButton = () => cy.iFrame(SAVE_BUTTON);
export const cancelButton = () => cy.iFrame(CANCEL_BUTTON);
export const buttons = index => cy.iFrame(FORM_DATA_ELEMENT)
  .find('div:nth-child(4) > div:nth-child(1)')
  .find(`div:nth-child(${index})`);
export const additionalActions = () => cy.iFrame(ADDITIONAL_ACTIONS);
export const leftAlignedActions = () => cy.iFrame(LEFT_ALIGNED_ACTIONS);
export const rightAlignedActions = () => cy.iFrame(RIGHT_ALIGNED_ACTIONS);
export const errorsSummary = () => cy.iFrame(ERRORS);
export const errorMessage = () => cy.iFrame(ERROR_MESSAGE);
export const inputValidation = () => cy.iFrame(INPUT_VALIDATION);
export const formDataComponent = () => cy.iFrame(FORM_DATA_ELEMENT);
export const errorTooltip = () => cy.iFrame(ERROR_TOOLTIP);
export const footerDataComponent = () => cy.iFrame(FORM_FOOTER);
