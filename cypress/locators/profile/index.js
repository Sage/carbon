import { EMAIL, AVATAR, NAME, INITIALS, PROFILE } from "./locators";

// component preview locators
export const emailPreview = () => cy.get(EMAIL);
export const avatarPreview = () => cy.get(AVATAR);
export const namePreview = () => cy.get(NAME);
export const initialPreview = () => cy.get(INITIALS);
export const profilePreview = () => cy.get(PROFILE);
