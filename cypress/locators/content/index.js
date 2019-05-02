import {
  INLINE, BODY_FULL_WIDTH, TITLE_WIDTH, CONTENT_PREVIEW,
  CONTENT_TITLE, CONTENT_BODY,
} from './locators';

// knobs locators
export const inlineCheckbox = () => cy.get(INLINE);
export const bodyFullWidthCheckbox = () => cy.get(BODY_FULL_WIDTH);
export const titleWidth = () => cy.get(TITLE_WIDTH);

// component preview locators
export const contentPreview = () => cy.iFrame(CONTENT_PREVIEW);
export const contentTitle = () => cy.iFrame(CONTENT_TITLE);
export const contentBody = () => cy.iFrame(CONTENT_BODY);
