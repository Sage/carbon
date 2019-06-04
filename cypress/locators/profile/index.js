import {
  EMAIL, AVATAR, PROFILE, INITIALS, NAME,
} from './locators';

// component preview locators
export const emailPreview = () => cy.iFrame(EMAIL);
export const avatarPreview = () => cy.iFrame(AVATAR);
export const initialsPreview = () => cy.iFrame(INITIALS);
export const profile = () => cy.iFrame(PROFILE);
export const namePreview = () => cy.iFrame(NAME);
