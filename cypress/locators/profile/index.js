import { EMAIL, AVATAR, NAME } from "./locators";

// component preview locators
export const emailPreview = () => cy.get(EMAIL);
export const avatarPreview = () => cy.get(AVATAR);
export const namePreview = () => cy.get(NAME);
