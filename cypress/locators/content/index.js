import { CONTENT_PREVIEW, CONTENT_TITLE, CONTENT_BODY } from './locators';

// component preview locators
export const contentPreview = () => cy.iFrame(CONTENT_PREVIEW);
export const contentTitle = () => cy.iFrame(CONTENT_TITLE);
export const contentBody = () => cy.iFrame(CONTENT_BODY);
