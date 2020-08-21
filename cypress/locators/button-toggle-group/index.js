import { LABEL_PREVIEW_WIDTH } from './locators';

// component preview locators
export const labelPreviewWidthIframe = () => cy.iFrame(LABEL_PREVIEW_WIDTH);
export const labelPreviewWidth = () => cy.get(LABEL_PREVIEW_WIDTH);
export const labelPreviewByText = () => cy.iFrame(LABEL_PREVIEW_WIDTH)
  .find('div[data-component="button-toggle"]')
  .find('label');
