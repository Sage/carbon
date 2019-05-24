import { MENU_PREVIEW, SUBMENU_BLOCK } from './locators';

// component preview locators
export const menuPreview = () => cy.iFrame(MENU_PREVIEW);
export const menuListItems = index => cy.iFrame(MENU_PREVIEW)
  .find(`ul[class="carbon-menu__items"] > li:nth-child(${index}) > div`);
export const submenuBlock = (firstLiIndex, secondLiIndex) => cy.iFrame(SUBMENU_BLOCK)
  .find(`li:nth-child(${firstLiIndex}) > div > ul`)
  .find(`li:nth-child(${secondLiIndex}) > div`).children();
