import {
  EMAIL, AVATAR, PROFILE, INITIALS, NAME,
} from './locators';

// component preview locators
export const emailPreview = () => cy.get(EMAIL);
export const avatarPreview = () => cy.get(AVATAR);
export const initialsPreview = () => cy.get(INITIALS);
export const profile = () => cy.get(PROFILE);
export const namePreview = () => cy.get(NAME);
