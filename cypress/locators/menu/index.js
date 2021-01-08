import {
  MENU_PREVIEW,
  SUBMENU,
  SCROLL_BLOCK,
} from './locators';

// component preview locators
export const menuPreview = () => cy.get(MENU_PREVIEW);
export const submenu = () => cy.get(SUBMENU);
export const submenuBlock = () => cy.get(SUBMENU)
  .find('ul');
export const innerMenu = index => submenuBlock()
  .find(`li:nth-child(${index})`)
  .find('div');
export const scrollBlock = () => cy.get(SUBMENU).find(SCROLL_BLOCK);
export const lastSubmenuElement = () => submenuBlock()
  .find('li div').last();
