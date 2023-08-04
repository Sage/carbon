import {
  ACTION_POPOVER_BUTTON,
  ACTION_POPOVER_DATA_COMPONENT,
  ACTION_POPOVER_SUBMENU,
  ACTION_POPOVER_MENU_ITEM_ICON,
  ACTION_POPOVER_MENU_ITEM_INNER_TEXT,
  ACTION_POPOVER_MENU_ITEM_CHEVRON,
  ACTION_POPOVER_WRAPPER,
} from "./locators";

// component preview locators
export const actionPopoverButton = () => cy.get(ACTION_POPOVER_BUTTON);
export const actionPopover = () => cy.get(ACTION_POPOVER_DATA_COMPONENT);
export const actionPopoverInnerItem = (index) =>
  cy
    .get(ACTION_POPOVER_DATA_COMPONENT)
    .first()
    .children()
    .eq(index)
    .find("button")
    .first();
export const actionPopoverSubmenu = (index) =>
  cy.get(ACTION_POPOVER_SUBMENU).eq(1).children().eq(index).find("button");
export const actionPopoverMenuItemIcon = () =>
  cy.get(ACTION_POPOVER_MENU_ITEM_ICON);
export const actionPopoverMenuItemInnerText = () =>
  cy.get(ACTION_POPOVER_MENU_ITEM_INNER_TEXT);
export const actionPopoverMenuItemChevron = () =>
  cy.get(ACTION_POPOVER_MENU_ITEM_CHEVRON);
export const actionPopoverSubmenuByIndex = () =>
  cy.get(ACTION_POPOVER_SUBMENU).eq(1);
export const actionPopoverWrapper = () => cy.get(ACTION_POPOVER_WRAPPER);
