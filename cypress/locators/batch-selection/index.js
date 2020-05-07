import { BATCH_SELECTION_COMPONENT, BATCH_SELECTION_COUNTER, BATCH_SELECTION_BASIC_ID } from './locators';

// component preview locators
export const batchSelectionComponent = () => cy.iFrame(BATCH_SELECTION_COMPONENT);
export const batchSelectionCounter = () => batchSelectionComponent()
  .find(BATCH_SELECTION_COUNTER);
export const batchSelectionButtons = index => batchSelectionComponent()
  .find('button').eq(index).children();

// DS locators
export const batchSelectionBasicId = () => cy.iFrame(BATCH_SELECTION_BASIC_ID);
export const batchSelectionComponentDS = () => batchSelectionBasicId()
  .find(BATCH_SELECTION_COMPONENT);
export const batchSelectionButtonsDS = index => batchSelectionComponentDS()
  .find('button').eq(index).children();