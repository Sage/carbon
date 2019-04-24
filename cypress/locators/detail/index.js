import {
  CHILDREN_PREVIEW, FOOTNOTE_PREVIEW, FOOTNOTE_INPUT, ICON_SELECT, ICON_PREVIEW,
} from './locators';

// knobs locators
export const footnoteInput = () => cy.get(FOOTNOTE_INPUT);
export const iconSelect = () => cy.get(ICON_SELECT);

// component preview locators
export const childrenPreview = () => cy.iFrame(CHILDREN_PREVIEW);
export const footnotePreview = () => cy.iFrame(FOOTNOTE_PREVIEW);
export const iconPreview = () => cy.iFrame(ICON_PREVIEW);
