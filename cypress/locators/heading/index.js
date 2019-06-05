import {
  HEADING_PREVIEW, TITLE_PREVIEW, SUBHEADER_PREVIEW, SEPARATOR_PREVIEW,
} from './locators';

// component preview locators
export const headingPreview = () => cy.iFrame(HEADING_PREVIEW);
export const titlePreview = () => cy.iFrame(TITLE_PREVIEW);
export const subheaderPreview = () => cy.iFrame(SUBHEADER_PREVIEW);
export const separatorPreview = () => cy.iFrame(SEPARATOR_PREVIEW);
