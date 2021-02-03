import { BATCH_SELECTION_COMPONENT, BATCH_SELECTION_COUNTER } from "./locators";

// component preview locators
export const batchSelectionComponent = () => cy.get(BATCH_SELECTION_COMPONENT);
export const batchSelectionCounter = () =>
  batchSelectionComponent().find(BATCH_SELECTION_COUNTER);

export const batchSelectionButtonsByPosition = (index) =>
  cy.get(BATCH_SELECTION_COMPONENT).find("button").eq(index).children();
