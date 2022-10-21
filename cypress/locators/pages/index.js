import { BUTTON_DATA_COMPONENT, BACK_ARROW } from "./locators";

// component preview locators
export const dataComponentButtonByText = (text) =>
  cy.get(BUTTON_DATA_COMPONENT).contains(text);
export const backArrow = () => cy.get(BACK_ARROW);
