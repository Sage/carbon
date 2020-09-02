import { BATCH_SELECTION_COMPONENT, BATCH_SELECTION_COUNTER, BATCH_SELECTION_BASIC_ID } from './locators';

// component preview locators
export const batchSelectionComponent = () => cy.get(BATCH_SELECTION_COMPONENT);
export const batchSelectionCounter = () => batchSelectionComponent()
  .find(BATCH_SELECTION_COUNTER);

export const batchSelectionButtonsDS = index => cy.iFrame(BATCH_SELECTION_BASIC_ID)
  .find(BATCH_SELECTION_COMPONENT)
  .find('button').eq(index)
  .children();
