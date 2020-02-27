import {
  PAGER_SUMMARY, PAGE_SELECT, MAX_PAGES, PAGE_INPUT, PAGE_SELECT_ITEM,
  PAGER_NEXT_ARROW, PAGER_PREVIOUS_ARROW,
} from './locators';

// component preview locators
export const pagerSummary = () => cy.iFrame(PAGER_SUMMARY).children().eq(2);
export const pageSelect = () => cy.iFrame(PAGE_SELECT);
export const pageSelectItems = () => cy.iFrame(PAGE_SELECT_ITEM);
export const maxPages = () => cy.iFrame(MAX_PAGES);
export const currentPageInput = () => cy.iFrame(PAGE_INPUT).find('input');
export const previousArrow = () => cy.iFrame(PAGER_PREVIOUS_ARROW);
export const nextArrow = () => cy.iFrame(PAGER_NEXT_ARROW);
