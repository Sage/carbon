import { SUBMENU, SCROLL_BLOCK, MENU_DIVIDER, SEGMENT_TITLE } from "./locators";

// component preview locators
export const submenu = () => cy.get(SUBMENU);
export const submenuBlock = () => cy.get(SUBMENU).find("ul");
export const innerMenu = (index) =>
  submenuBlock().find(`li:nth-child(${index})`).find("div");
export const scrollBlock = () => cy.get(SUBMENU).find(SCROLL_BLOCK);
export const lastSubmenuElement = () => submenuBlock().find("li div").last();
export const menuDivider = () => cy.get(MENU_DIVIDER);
export const segmentTitle = () => cy.get(SEGMENT_TITLE);
