import {
  ACTION_POPOVER_BUTTON,
  ACTION_POPOVER_DATA_COMPONENT,
  ACTION_POPOVER_DIVIDER,
} from './locators';

// component preview locators
export const actionPopoverButton = () => cy.get(ACTION_POPOVER_BUTTON);
export const actionPopoverButtonNoIframe = () => cy.iFrame(ACTION_POPOVER_BUTTON);
export const actionPopover = () => cy.get(ACTION_POPOVER_DATA_COMPONENT);
export const actionPopoverDivider = () => cy.get(ACTION_POPOVER_DIVIDER);
export const actionPopoverInnerItem = index => cy.iFrame(ACTION_POPOVER_DATA_COMPONENT).first()
  .children().eq(index);
