import {
  MESSAGE_TYPE, MESSAGE_PREVIEW,
  MESSAGE_CHILDREN, MESSAGE_DISMISS_ICON,
} from './locators';

// component preview locators
export const messagePreview = () => cy.iFrame(MESSAGE_PREVIEW);
export const messageType = () => cy.iFrame(MESSAGE_TYPE);
export const messageChildren = () => cy.iFrame(MESSAGE_CHILDREN);
export const messageDismissIcon = () => cy.iFrame(MESSAGE_DISMISS_ICON);
