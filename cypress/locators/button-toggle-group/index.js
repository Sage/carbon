import { BUTTON_TOGGLE_GROUP_PREVIEW, LABEL_PREVIEW_WIDTH } from './locators';

// component preview locators
export const buttonToggleGroupPreview = () => cy.iFrame(BUTTON_TOGGLE_GROUP_PREVIEW);
export const labelPreviewWidth = () => cy.iFrame(LABEL_PREVIEW_WIDTH);
