import { ANIMATED_MENU_BUTTON_LABEL_PREVIEW, ANIMATED_MENU_BUTTON_PREVIEW } from './locators';

// component preview locators
export const animatedMenuButtonPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_PREVIEW);
export const animatedMenuButtonLabelPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_LABEL_PREVIEW);
