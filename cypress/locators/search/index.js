import { SEARCH_COMPONENT } from './locators';

// component preview locators
export const searchComponent = () => cy.iFrame(SEARCH_COMPONENT);
export const searchInput = () => searchComponent().find('input');
export const searchInnerIcon = () => searchComponent().find('span');
export const searchIcon = () => cy.iFrame('button[type="button"]');
export const searchCrossIcon = () => searchComponent().find('span[data-element="cross"]');
