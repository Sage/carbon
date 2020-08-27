import {
  STEP_SEQUENCE, STEP_SEQUENCE_ELEMENT, STEP_SEQUENCE_ITEM_INDICATOR, STEP_SEQUENCE_ITEM,
} from './locators';

// component preview locators
export const stepSequence = () => cy.get(STEP_SEQUENCE);
export const stepSequenceElement = () => cy.get(STEP_SEQUENCE_ELEMENT);
export const stepSequenceItem = () => cy.get(STEP_SEQUENCE_ITEM);
export const stepSequenceItemIndicator = () => cy.get(STEP_SEQUENCE_ITEM_INDICATOR);
export const ariaLabel = label => cy.get(`li[aria-label="${label}"]`);
