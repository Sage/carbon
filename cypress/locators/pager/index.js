import {
  PAGER_SUMMARY, PAGE_SELECT, MAX_PAGES, PAGE_INPUT, PAGER_PREVIOUS_ARROW, PAGER_NEXT_ARROW,
} from './locators';

// component preview locators
export const pagerSummary = () => cy.iFrame(PAGER_SUMMARY)
  .find('div:nth-child(3)');
export const pageSelect = () => cy.iFrame(PAGE_SELECT);
export const maxPages = () => cy.iFrame(MAX_PAGES);
export const currentPageInput = () => cy.iFrame(PAGE_INPUT).find('input');
export const previousArrow = () => cy.iFrame(PAGER_PREVIOUS_ARROW);
export const nextArrow = () => cy.iFrame(PAGER_NEXT_ARROW);
