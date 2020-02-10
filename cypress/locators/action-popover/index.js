import {
  ACTION_POPOVER_BUTTON,
  ACTION_POPOVER_DATA_COMPONENT,
  ACTION_POPOVER_DIVIDER,
  ACTION_POPOVER_SUBMENU,
} from './locators';

// component preview locators
export const actionPopoverButton = () => cy.get(ACTION_POPOVER_BUTTON);
export const actionPopoverButtonNoIframe = () => cy.iFrame(ACTION_POPOVER_BUTTON);
export const actionPopover = () => cy.get(ACTION_POPOVER_DATA_COMPONENT);
export const actionPopoverDivider = () => cy.get(ACTION_POPOVER_DIVIDER);
export const actionPopoverInnerItem = index => cy.iFrame(ACTION_POPOVER_DATA_COMPONENT).first()
  .children().eq(index);
export const actionPopoverSubmenu = index => cy.iFrame(ACTION_POPOVER_SUBMENU).children().eq(index);
