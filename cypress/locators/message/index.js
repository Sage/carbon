import {
  MESSAGE_PREVIEW,
  MESSAGE_CHILDREN,
  MESSAGE_TITLE,
  MESSAGE_DISMISS_ICON,
  MESSAGE_DISMISS_ICON_BUTTON,
  MESSAGE_CONTENT,
  VARIANT_PREVIEW,
} from "./locators";

// component preview locators
export const messagePreview = () => cy.get(MESSAGE_PREVIEW);
export const messageChildren = () => cy.get(MESSAGE_CHILDREN);
export const messageTitle = () => cy.get(MESSAGE_TITLE);
export const messageDismissIcon = () => cy.get(MESSAGE_DISMISS_ICON);
export const messageDismissIconButton = () =>
  cy.get(MESSAGE_DISMISS_ICON_BUTTON);
export const messageContent = () => cy.get(MESSAGE_CONTENT);
export const variantPreview = () => cy.get(VARIANT_PREVIEW);
