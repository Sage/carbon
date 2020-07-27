import {
  SAVE_BUTTON,
  CANCEL_BUTTON,
  ADDITIONAL_ACTIONS,
  LEFT_ALIGNED_ACTIONS,
  RIGHT_ALIGNED_ACTIONS,
  FORM_DATA_ELEMENT,
} from './locators';

// component preview locators
export const saveButton = () => cy.get(SAVE_BUTTON);
export const cancelButton = () => cy.get(CANCEL_BUTTON);
export const buttons = index => cy.get(FORM_DATA_ELEMENT)
  .find('div:nth-child(4) > div:nth-child(1)')
  .find(`div:nth-child(${index})`);
export const additionalActions = () => cy.get(ADDITIONAL_ACTIONS);
export const leftAlignedActions = () => cy.get(LEFT_ALIGNED_ACTIONS);
export const rightAlignedActions = () => cy.get(RIGHT_ALIGNED_ACTIONS);