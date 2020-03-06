import { LABEL_PREVIEW_WIDTH } from './locators';
import { DLS_ROOT } from '../locators';

// component preview locators
export const dlsRoot = () => cy.iFrame(DLS_ROOT);
export const buttonToggleGroupLabelPreview = () => dlsRoot().find('label').first();
export const labelPreviewWidth = () => cy.iFrame(LABEL_PREVIEW_WIDTH);
export const labelPreviewByText = () => cy.iFrame(LABEL_PREVIEW_WIDTH)
  .find('div[data-component="button-toggle"]')
  .find('label');
