import {
  FLASH_PREVIEW, MESSAGE_INPUT, TIMEOUT_INPUT, MESSAGE_PREVIEW,
} from './locators';

// knobs locators
export const messageInput = () => cy.get(MESSAGE_INPUT);
export const timeoutInput = () => cy.get(TIMEOUT_INPUT);

// component preview locators
export const flashPreview = () => cy.iFrame(FLASH_PREVIEW);
export const getIconPreview = icon => cy.iFrame(`[data-element="${icon}"]`);
export const messagePreview = () => cy.iFrame(MESSAGE_PREVIEW);
