import {
  MESSAGE_PREVIEW,
  MESSAGE_CHILDREN,
  MESSAGE_DISMISS_ICON,
} from "./locators";

// component preview locators
export const messagePreview = () => cy.get(MESSAGE_PREVIEW);
export const messageChildren = () => cy.get(MESSAGE_CHILDREN);
export const messageDismissIcon = () => cy.get(MESSAGE_DISMISS_ICON);
