import {
  PAGER_SUMMARY,
  PAGE_SELECT,
  MAX_PAGES,
  PAGE_SELECT_ITEM,
  PAGER_NEXT_ARROW,
  PAGER_PREVIOUS_ARROW,
} from "./locators";
import { COMMMON_DATA_ELEMENT_INPUT } from "../locators";

// component preview locators
export const pagerSummary = () => cy.get(PAGER_SUMMARY).children().eq(2);
export const pageSelect = () =>
  cy.get(PAGE_SELECT).find(COMMMON_DATA_ELEMENT_INPUT);
export const pageSelectItems = () => cy.get(PAGE_SELECT_ITEM);
export const maxPages = () => cy.get(MAX_PAGES);
export const currentPageInput = () => cy.get(PAGER_SUMMARY).find("input");
export const previousArrow = () => cy.get(PAGER_PREVIOUS_ARROW);
export const nextArrow = () => cy.get(PAGER_NEXT_ARROW);
