import { DLS_ROOT } from "../locators";
import {
  SUBMENU,
  SCROLL_BLOCK,
  MENU_DIVIDER,
  SEGMENT_TITLE,
  MENU,
  FULLSCREEN_MENU,
  MENU_ITEM,
  SEARCH_COMPONENT,
  CROSS_ICON,
} from "./locators";

import { BUTTON_DATA_COMPONENT_PREVIEW } from "../button/locators";

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
export const fullScreenMenuWrapper = () => cy.get(FULLSCREEN_MENU);
export const fullscreenMenu = (index) =>
  cy.get(FULLSCREEN_MENU).find("div").eq(index);
export const fullScreenMenuItem = (index) =>
  cy.get(`${FULLSCREEN_MENU} ${MENU}`).find(`li:nth-child(${index})`);
export const menu = () => cy.get(MENU);
export const menuItem = () => cy.get(MENU_ITEM);

// component preview locators for Search
export const searchDefault = () => cy.get(SEARCH_COMPONENT);
export const searchDefaultInput = () => searchDefault().find("input");
export const searchCrossIcon = () => searchDefault().find(CROSS_ICON);
export const searchButton = () =>
  searchDefault().find(BUTTON_DATA_COMPONENT_PREVIEW);
