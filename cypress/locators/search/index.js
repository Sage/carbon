import { SEARCH_COMPONENT, CROSS_ICON } from './locators';
import { BUTTON_DATA_COMPONENT_PREVIEW } from '../button/locators';

// component preview locators
export const searchDefault = () => cy.get(SEARCH_COMPONENT);
export const searchDefaultInput = () => searchDefault().find('input');
export const searchDefaultInnerIcon = () => searchDefault().find('span:nth-child(1)');
export const searchCrossIcon = () => searchDefault().find(CROSS_ICON);
export const searchInnerIcon = () => searchDefault().find('button[type="button"]');
export const searchWitchButtonInput = () => searchDefault().find('input');
export const searchButton = () => searchDefault().find(BUTTON_DATA_COMPONENT_PREVIEW);
export const searchInput = () => cy.get(SEARCH_COMPONENT).find('input');
export const searchIcon = () => cy.get('button[type="button"]');
