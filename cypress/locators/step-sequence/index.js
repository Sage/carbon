import {
  STEP_SEQUENCE_ITEM_INDICATOR, STEP_SEQUENCE_DATA_COMPONENT,
} from './locators';

// component preview locators
export const stepSequenceItemIndicator = () => cy.get(STEP_SEQUENCE_ITEM_INDICATOR);
export const ariaLabel = label => cy.get(`li[aria-label="${label}"]`);
export const stepSequenceDataComponent = () => cy.get(STEP_SEQUENCE_DATA_COMPONENT);
