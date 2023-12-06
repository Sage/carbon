import NUMERAL_DATE_COMPONENT from "./locators";
import DATE_INPUT from "../date-input/locators";

export const numeralDateComponent = () => cy.get(NUMERAL_DATE_COMPONENT);
export const numeralDateInput = () => numeralDateComponent().find(DATE_INPUT);
export const numeralDateInputByPosition = (index) =>
  numeralDateInput().eq(index);
