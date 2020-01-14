import { BUTTON_SUBTEXT_PREVIEW, BUTTON_DATA_COMPONENT_PREVIEW } from './locators';

// component preview locators
export const buttonSubtextPreview = () => cy.iFrame(BUTTON_SUBTEXT_PREVIEW);
export const buttonDataComponent = () => cy.iFrame(BUTTON_DATA_COMPONENT_PREVIEW);
