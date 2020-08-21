import {
  CHILDREN_PREVIEW, FOOTNOTE_PREVIEW,
} from './locators';

// component preview locators
export const childrenPreview = () => cy.get(CHILDREN_PREVIEW);
export const footnotePreview = () => cy.get(FOOTNOTE_PREVIEW);
