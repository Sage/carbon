import {
  CONTENT_PREVIEW,
  CONTENT_TITLE,
  CONTENT_BODY,
} from './locators';

// component preview locators
export const contentPreview = () => cy.get(CONTENT_PREVIEW);
export const contentTitle = () => cy.get(CONTENT_TITLE);
export const contentBody = () => cy.get(CONTENT_BODY);
