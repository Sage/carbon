import { FLASH_PREVIEW, MESSAGE_PREVIEW } from './locators';

// component preview locators
export const flashPreview = () => cy.iFrame(FLASH_PREVIEW);
export const messagePreview = () => cy.iFrame(MESSAGE_PREVIEW);
