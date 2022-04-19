import {
  MESSAGE_PREVIEW,
  MESSAGE_CHILDREN,
  MESSAGE_TITLE,
  MESSAGE_DISMISS_ICON,
  VARIANT_PREVIEW,
} from "./locators";

// component preview locators
export const messagePreview = () => cy.get(MESSAGE_PREVIEW);
export const messageChildren = () => cy.get(MESSAGE_CHILDREN);
export const messageTitle = () => cy.get(MESSAGE_TITLE);
export const messageDismissIcon = () => cy.get(MESSAGE_DISMISS_ICON);
export const variantPreview = () => cy.get(VARIANT_PREVIEW);
