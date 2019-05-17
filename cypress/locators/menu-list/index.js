import {
  MENU_LIST_CHILDREN, MENU_TITLE, MENU_LIST_SEARCH, MENU_LIST, MENU_LIST_ITEMS,
} from './locators';

// component preview locators
export const menuListChildren = () => cy.iFrame(MENU_LIST_CHILDREN).children();
export const menuTitle = () => cy.iFrame(MENU_TITLE).first();
export const menuListSearchInput = () => cy.iFrame(MENU_LIST_SEARCH);
export const menuList = () => cy.iFrame(MENU_LIST_ITEMS);
export const menuSecondOption = () => cy.iFrame(MENU_LIST).contains('.carbon-link__content', 'Menu Item Two');
