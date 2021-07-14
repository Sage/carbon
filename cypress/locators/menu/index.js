import { DLS_ROOT } from "../locators";
import {
  SUBMENU,
  SCROLL_BLOCK,
  MENU_DIVIDER,
  SEGMENT_TITLE,
  MENU,
} from "./locators";

// component preview locators
export const submenu = () => cy.get(SUBMENU);
export const submenuBlock = () => cy.get(SUBMENU).find("ul");
export const innerMenu = (index, htmlProp) =>
  submenuBlock().find(`li:nth-child(${index})`).find(htmlProp);
export const scrollBlock = () => cy.get(SUBMENU).find(SCROLL_BLOCK);
export const lastSubmenuElement = (htmlProp) =>
  submenuBlock().find(htmlProp).last();
export const menuDivider = () => cy.get(MENU_DIVIDER);
export const segmentTitle = () => cy.get(SEGMENT_TITLE);
export const menuComponent = (index) =>
  cy.get(MENU).first().find(`li:nth-child(${index})`);
export const submenuItem = (index) =>
  menuComponent(index).find(SUBMENU).find("ul > li");
export const menuCanvas = () => cy.get(DLS_ROOT);
