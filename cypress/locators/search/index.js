import { SEARCH_COMPONENT, CROSS_ICON, SEARCH_ICON } from "./locators";
import { BUTTON_DATA_COMPONENT_PREVIEW } from "../button/locators";
import { BUTTON } from "../locators";
import { getDataElementByValue } from "..";

// component preview locators
export const searchDefault = () => cy.get(SEARCH_COMPONENT);
export const searchDefaultInput = () => searchDefault().find("input");
export const searchDefaultInnerIcon = () =>
  searchDefault().find("span:nth-child(1)");
export const searchCrossIcon = () => searchDefault().find(CROSS_ICON);
export const searchButton = () =>
  searchDefault().find(BUTTON_DATA_COMPONENT_PREVIEW);
export const searchIcon = () => cy.get(BUTTON);
export const searchFindIcon = () => getDataElementByValue(SEARCH_ICON);
