import { FLASH_PREVIEW } from './locators';
import { BUTTON_DATA_COMPONENT_PREVIEW } from '../button/locators';

// component preview locators
export const flashPreview = () => cy.get(FLASH_PREVIEW);
export const messagePreview = () => flashPreview().find('div:nth-child(2)');
export const flashButton = () => cy.get(BUTTON_DATA_COMPONENT_PREVIEW);
