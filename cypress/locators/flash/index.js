import { FLASH_PREVIEW, MESSAGE_PREVIEW } from './locators';

// component preview locators
export const flashPreview = () => cy.iFrame(FLASH_PREVIEW);
export const getIconPreview = icon => cy.iFrame(`[data-element="${icon}"]`);
export const messagePreview = () => cy.iFrame(MESSAGE_PREVIEW);
