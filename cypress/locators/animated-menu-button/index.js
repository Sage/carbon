import { ANIMATED_MENU_BUTTON_LABEL_PREVIEW, ANIMATED_MENU_BUTTON_PREVIEW } from './locators';

// component preview locators
export const animatedMenuButtonPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_PREVIEW);
export const animatedMenuButtonLabelPreview = () => cy.iFrame(ANIMATED_MENU_BUTTON_LABEL_PREVIEW);

// component preview locators noIFrame
export const animatedMenuButtonPreviewNoIFrame = () => cy.get(ANIMATED_MENU_BUTTON_PREVIEW);
// eslint-disable-next-line max-len
export const animatedMenuButtonLabelPreviewNoIFrame = () => cy.get(ANIMATED_MENU_BUTTON_LABEL_PREVIEW);
