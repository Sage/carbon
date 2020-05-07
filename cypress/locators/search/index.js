import { SEARCH_COMPONENT, SEARCH_DEFAULT_ID, CROSS_ICON,
  SEARCH_WITH_SEARCH_BUTTON_ID } from './locators';
import { BUTTON_DATA_COMPONENT_PREVIEW } from '../button/locators';

// DS locators
export const searchDefaultDS = () => cy.iFrame(SEARCH_DEFAULT_ID);
export const searchWithButtonDS = () => cy.iFrame(SEARCH_WITH_SEARCH_BUTTON_ID);
export const searchDefaultInputDS = () => searchDefaultDS().find('input');
export const searchDefaultInnerIconDS = () => searchDefaultDS().find('span:nth-child(1)');
export const searchCrossIconDS = () => searchDefaultDS().find(CROSS_ICON);
export const searchWitchButtonInputDS = () => searchWithButtonDS().find('input');
export const searchButtonDS = () => searchWithButtonDS().find(BUTTON_DATA_COMPONENT_PREVIEW);

// component preview locators
export const searchInput = () => cy.iFrame(SEARCH_COMPONENT).find('input');
export const searchIcon = () => cy.iFrame('button[type="button"]');

// component preview locators in no iFrame
export const searchInputNoiFrame = () => cy.get(SEARCH_COMPONENT).find('input');
