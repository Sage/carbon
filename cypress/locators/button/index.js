import { BUTTON_SUBTEXT_PREVIEW, BUTTON_DATA_COMPONENT_PREVIEW } from './locators';

// component preview locators
export const buttonDataComponentIFrame = () => cy.iFrame(BUTTON_DATA_COMPONENT_PREVIEW);

// component preview locators in no IFrame
export const buttonDataComponent = () => cy.get(BUTTON_DATA_COMPONENT_PREVIEW);
export const buttonSubtextPreview = () => cy.get(BUTTON_SUBTEXT_PREVIEW);

