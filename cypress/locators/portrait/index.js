import { PORTRAIT_PREVIEW, PORTRAIT_INITIALS } from "./locators";

// component preview locators
export const portraitPreview = () => cy.get(PORTRAIT_PREVIEW);
export const portraitInitials = () => cy.get(PORTRAIT_INITIALS);
export const portraitImage = () => cy.get(PORTRAIT_PREVIEW).find("img");
