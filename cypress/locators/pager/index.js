import {
  PAGER_SUMMARY,
  PAGE_SELECT,
  MAX_PAGES,
  PAGER_NEXT_ARROW,
  PAGER_PREVIOUS_ARROW,
  COMMON_PART_OF_PAGER_LINK,
  PAGER_FIRST_ARROW,
  PAGER_LAST_ARROW,
  SHOW_LABEL_BEFORE,
  PAGE_SIZE_LABEL_AFTER,
  CURRENT_PAGE,
  CURRENT_PAGE_LABEL,
} from "./locators";
import { COMMMON_DATA_ELEMENT_INPUT } from "../locators";
import { getDataElementByValue } from "..";

// component preview locators
export const pagerSummary = () => cy.get(PAGER_SUMMARY).children().eq(2);
export const pageSelect = () =>
  cy.get(PAGE_SELECT).find(COMMMON_DATA_ELEMENT_INPUT);
export const pageSelectElement = () => cy.get(PAGE_SELECT);
export const maxPages = () => cy.get(MAX_PAGES);
export const currentPageWrapper = () => cy.get(CURRENT_PAGE);
export const currentPageLabelWrapper = () => cy.get(CURRENT_PAGE_LABEL);
export const currentPageInput = () => cy.get(PAGER_SUMMARY).find("input");
export const previousArrow = () =>
  getDataElementByValue(`${COMMON_PART_OF_PAGER_LINK}${PAGER_PREVIOUS_ARROW}`);
export const nextArrow = () =>
  getDataElementByValue(`${COMMON_PART_OF_PAGER_LINK}${PAGER_NEXT_ARROW}`);
export const firstArrow = () =>
  getDataElementByValue(`${COMMON_PART_OF_PAGER_LINK}${PAGER_FIRST_ARROW}`);
export const lastArrow = () =>
  getDataElementByValue(`${COMMON_PART_OF_PAGER_LINK}${PAGER_LAST_ARROW}`);
export const showLabelBefore = () => cy.contains(SHOW_LABEL_BEFORE);
export const pageSizeLabelAfter = () =>
  cy
    .get(PAGER_SUMMARY)
    .children()
    .eq(0)
    .find("div")
    .contains(PAGE_SIZE_LABEL_AFTER);
export const currentPageSection = () =>
  cy.get(PAGER_SUMMARY).children().eq(1).find("div");
export const pager = () => cy.get(PAGER_SUMMARY);
