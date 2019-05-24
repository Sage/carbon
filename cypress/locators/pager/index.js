import {
  PAGER_SUMMARY, PAGE_SELECT, MAX_PAGES, PAGER_NAVIGATION, PAGE_INPUT,
} from './locators';

// component preview locators
export const pagerSummary = () => cy.iFrame(PAGER_SUMMARY);
export const pageSelect = () => cy.iFrame(PAGE_SELECT);
export const maxPages = () => cy.iFrame(MAX_PAGES);
export const pagerNavigation = direction => cy.iFrame(`${PAGER_NAVIGATION}${direction}`);
export const pageInput = () => cy.iFrame(PAGE_INPUT);
