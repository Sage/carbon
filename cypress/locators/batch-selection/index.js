import { BATCH_SELECTION_COMPONENT, BATCH_SELECTION_COUNTER } from './locators';

// component preview locators
export const batchSelectionComponent = () => cy.iFrame(BATCH_SELECTION_COMPONENT);
export const batchSelectionCounter = () => batchSelectionComponent()
  .find(BATCH_SELECTION_COUNTER);
export const batchSelectionButtons = index => batchSelectionComponent()
  .find('button').eq(index).children();
