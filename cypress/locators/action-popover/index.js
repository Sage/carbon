import {
  ACTION_POPOVER_BUTTON,
  ACTION_POPOVER_DATA_COMPONENT,
  ACTION_POPOVER_SUBMENU,
} from "./locators";

// component preview locators
export const actionPopoverButton = () => cy.get(ACTION_POPOVER_BUTTON);
export const actionPopoverSubmenuNoIFrame = () =>
  cy.get(ACTION_POPOVER_SUBMENU).eq(1);
export const actionPopover = () => cy.get(ACTION_POPOVER_DATA_COMPONENT);
export const actionPopoverButtonNoIframe = () =>
  cy.iFrame(ACTION_POPOVER_BUTTON);
export const actionPopoverInnerItem = (index) =>
  cy.iFrame(ACTION_POPOVER_DATA_COMPONENT).first().children().eq(index);
export const actionPopoverSubmenu = (index) =>
  cy.iFrame(ACTION_POPOVER_SUBMENU).eq(1).children().eq(index);
export const actionPopoverSubmenuByIndex = (index) =>
  cy.get(ACTION_POPOVER_SUBMENU).eq(1).children().eq(index);
