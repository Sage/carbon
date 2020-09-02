import {
  MENU_LIST_CHILDREN, MENU_LIST_SEARCH, MENU_LIST, MENU_LIST_ITEMS, MENU_DATA_COMPONENT,
} from './locators';

// component preview locators
export const menuListChildren = () => cy.get(MENU_LIST_CHILDREN).children();
export const menuListSearchInput = () => cy.get(MENU_LIST_SEARCH);
export const menuSecondOption = () => cy.get(MENU_LIST).contains('.carbon-link__content', 'Menu Item Two');
export const menuListElements = () => cy.get(MENU_DATA_COMPONENT).find('ul');

// component locators in Iframe
export const menuSecondOptionIframe = () => cy.iFrame(MENU_LIST).contains('.carbon-link__content', 'Menu Item Two');
export const menuListSearchInputIframe = () => cy.iFrame(MENU_LIST_SEARCH);
export const menuList = () => cy.iFrame(MENU_LIST_ITEMS);