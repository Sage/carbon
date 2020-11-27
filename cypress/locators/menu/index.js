import {
  MENU_PREVIEW,
  MENU_ITEM,
  SUBMENU,
} from './locators';

// component preview locators
export const menuPreview = () => cy.get(MENU_PREVIEW);
export const menuListItems = () => cy.get(MENU_PREVIEW)
  .find(MENU_ITEM);
export const submenu = () => cy.get(SUBMENU);
export const submenuBlock = () => cy.get(SUBMENU)
  .find('ul');
export const innerMenu = index => submenuBlock()
  .find(`li:nth-child(${index})`)
  .find('div');
