import {
  HEADING_PREVIEW,
  TITLE_PREVIEW,
  SUBHEADER_PREVIEW,
  SEPARATOR_PREVIEW,
} from './locators';

// component preview locators
export const headingPreview = () => cy.get(HEADING_PREVIEW);
export const titlePreview = () => cy.get(TITLE_PREVIEW);
export const subheaderPreview = () => cy.get(SUBHEADER_PREVIEW);
export const separatorPreview = () => cy.get(SEPARATOR_PREVIEW);
