import {
  EMAIL, AVATAR, INITIALS, NAME,
} from './locators';

// component preview locators
export const emailPreview = () => cy.get(EMAIL);
export const avatarPreview = () => cy.get(AVATAR);
export const initialsPreview = () => cy.get(INITIALS);
export const namePreview = () => cy.get(NAME);
