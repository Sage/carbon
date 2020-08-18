import { PORTRAIT_PREVIEW, PORTRAIT_INITIALS, PORTRAIT_USER_IMAGE } from './locators';

// component preview locators
export const portraitPreview = () => cy.get(PORTRAIT_PREVIEW);
export const portraitInitials = () => cy.get(PORTRAIT_INITIALS);
export const portraitUserImage = () => cy.get(PORTRAIT_USER_IMAGE);
