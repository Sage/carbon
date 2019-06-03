import { PORTRAIT_PREVIEW, PORTRAIT_INITIALS, PORTRAIT_USER_IMAGE } from './locators';

// component preview locators
export const portraitPreview = () => cy.iFrame(PORTRAIT_PREVIEW);
export const portraitInitials = () => cy.iFrame(PORTRAIT_INITIALS);
export const portraitUserImage = () => cy.iFrame(PORTRAIT_USER_IMAGE);
