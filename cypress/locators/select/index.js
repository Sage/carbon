import {
  SELECT_OPTIONS,
  SELECT_OPTION_ROWS,
  DROPDOWN_BUTTON,
  SELECT_LIST,
  SELECT_TEXT,
  SELECT_INPUT,
  MULTI_SELECT,
  SELECT_LIST_WRAPPER,
} from "./locators";
import { PILL_PREVIEW } from "../pill/locators";
import { getDataElementByValue } from "..";

// component preview locators
export const selectDataComponent = (component) =>
  cy.get(`[data-component="${component}-select"]`);
export const selectList = () => cy.get(SELECT_LIST);
export const selectOption = (index) => cy.get(SELECT_OPTIONS).eq(index);
export const selectOptionRow = (index) => cy.get(SELECT_OPTION_ROWS).eq(index);
export const dropdownButton = () => cy.get(DROPDOWN_BUTTON);
export const selectInput = () => cy.get(SELECT_INPUT);
export const multiSelectPill = () => cy.get(PILL_PREVIEW);
export const multiSelectPillByPosition = (index) =>
  cy.get(PILL_PREVIEW).eq(index);
export const multiSelectDataComponent = () => cy.get(MULTI_SELECT);
export const selectListText = (text) => cy.get(SELECT_LIST).contains(text);
export const multiColumnsSelectListHeader = () =>
  selectList().find("thead > tr > th");
export const multiColumnsSelectListBody = () =>
  selectList().find("tbody > tr:nth-child(3) > td");
export const boldedAndUnderlinedValue = (text) =>
  selectList()
    .find("tbody > tr:nth-child(1) > td:nth-child(2) > span")
    .contains(text);
export const selectListPosition = () => cy.get(SELECT_LIST_WRAPPER).parent();
export const selectText = () => getDataElementByValue(SELECT_TEXT);
