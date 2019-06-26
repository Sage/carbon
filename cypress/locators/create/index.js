import { LINK_CONTENT_PREVIEW } from './locators';

// component preview locators
export const contentPreview = () => cy.iFrame(LINK_CONTENT_PREVIEW).children();
