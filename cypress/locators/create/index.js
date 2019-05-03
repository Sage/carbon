import { CLASS_NAME, LINK_CONTENT_PREVIEW, LINK } from './locators';

// knobs locators
export const className = () => cy.get(CLASS_NAME);

// component preview locators
export const contentPreview = () => cy.iFrame(LINK_CONTENT_PREVIEW);
export const link = () => cy.iFrame(LINK);
