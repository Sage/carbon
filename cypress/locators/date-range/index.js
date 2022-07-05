import { LABEL } from "../locators";
import DATE_RANGE from "./locators";

// component preview locators
export const dateRange = (index) => cy.get(DATE_RANGE).children().eq(index);
export const dateRangeComponentLabel = (index) =>
  cy.get(DATE_RANGE).find(LABEL).eq(index);
export const dateRangeComponentInput = (index) =>
  cy.get(DATE_RANGE).find("input").eq(index);
