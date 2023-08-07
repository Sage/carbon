import {
  VERTICAL_MENU_TRIGGER,
  VERTICAL_MENU_COMPONENT,
  VERTICAL_MENU_ITEM,
  VERTICAL_MENU_FULL_SCREEN,
} from "./locators";

// component preview locators
export const verticalMenuComponent = () => cy.get(VERTICAL_MENU_COMPONENT);
export const verticalMenuItem = () => cy.get(VERTICAL_MENU_ITEM);
export const verticalMenuTrigger = () => cy.get(VERTICAL_MENU_TRIGGER);
export const verticalMenuFullScreen = () => cy.get(VERTICAL_MENU_FULL_SCREEN);
