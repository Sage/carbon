import { LABEL_PREVIEW_WIDTH } from './locators';

// component preview locators
export const labelPreviewWidthIFrame = () => cy.iFrame(LABEL_PREVIEW_WIDTH);
export const labelPreviewWidth = () => cy.get(LABEL_PREVIEW_WIDTH);
export const labelPreviewByTextIFrame = () => cy.iFrame(LABEL_PREVIEW_WIDTH)
  .find('div[data-component="button-toggle"]')
  .find('label');
