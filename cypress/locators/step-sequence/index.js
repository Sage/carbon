import {
  STEP_SEQUENCE, STEP_SEQUENCE_ELEMENT, STEP_SEQUENCE_ITEM_INDICATOR, STEP_SEQUENCE_ITEM,
} from './locators';

// component preview locators
export const stepSequence = () => cy.iFrame(STEP_SEQUENCE);
export const stepSequenceElement = () => cy.iFrame(STEP_SEQUENCE_ELEMENT);
export const stepSequenceItem = () => cy.iFrame(STEP_SEQUENCE_ITEM);
export const stepSequenceItemIndicator = () => cy.iFrame(STEP_SEQUENCE_ITEM_INDICATOR);
export const ariaLabel = label => cy.iFrame(`li[aria-label="${label}"]`);
