import {
  STEP_SEQUENCE_ITEM_INDICATOR,
  STEP_SEQUENCE_DATA_COMPONENT,
} from "./locators";

// component preview locators
export const stepSequenceItemIndicator = () =>
  cy.get(STEP_SEQUENCE_ITEM_INDICATOR).eq(0);
export const stepSequenceDataComponent = () =>
  cy.get(STEP_SEQUENCE_DATA_COMPONENT);
