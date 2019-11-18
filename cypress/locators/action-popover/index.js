import {
  ACTION_POPOVER_BUTTON,
  ACTION_POPOVER_DATA_COMPONENT,
  ACTION_POPOVER_DIVIDER,
  ELLIPSIS_VERTICAL_ICON,
} from './locators';

// component preview locators
export const actionPopoverButton = () => cy.iFrame(ACTION_POPOVER_BUTTON);
export const actionPopover = () => cy.iFrame(ACTION_POPOVER_DATA_COMPONENT);
export const actionPopoverDivider = () => cy.iFrame(ACTION_POPOVER_DIVIDER);
export const actionPopoverInnerItem = index => actionPopover().eq(0)
  .find(`div:nth-child(${index})`);
export const ellipsisIcon = () => cy.iFrame(ELLIPSIS_VERTICAL_ICON);
