import {
  MENU_LIST_PREVIEW, MENU_TITLE, MENU_LIST_SEARCH, MENU_LIST,
} from './locators';

// component preview locators
export const menuListPreview = () => cy.iFrame(MENU_LIST_PREVIEW);
export const menuTitle = () => cy.iFrame(MENU_TITLE);
export const menuListSearchInput = () => cy.iFrame(MENU_LIST_SEARCH);
export const menuList = () => cy.iFrame(MENU_LIST);
export const menuSecondOption = () => cy.iFrame(MENU_LIST).contains('.carbon-link__content', 'Menu Item Two');
