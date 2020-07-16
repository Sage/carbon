import {
  MENU_PREVIEW,
  MENU_ITEM,
} from './locators';

// component preview locators
export const menuPreview = () => cy.get(MENU_PREVIEW);
export const menuListItems = () => cy.get(MENU_PREVIEW)
  .find(MENU_ITEM);
export const submenuBlock = () => cy.get(MENU_ITEM)
  .find('ul');
export const innerMenu = index => submenuBlock()
  .find(`li:nth-child(${index})`)
  .find('div');
