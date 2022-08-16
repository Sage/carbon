import {
  HEADING_PREVIEW,
  SUBHEADER_PREVIEW,
  DIVIDER_PREVIEW,
} from "./locators";

// component preview locators
export const headingPreview = () => cy.get(HEADING_PREVIEW);
export const subheaderPreview = () => cy.get(SUBHEADER_PREVIEW);
export const headingTitle = () => headingPreview().find("div > h1");
export const dividerPreview = () => cy.get(DIVIDER_PREVIEW);
export const separatorPreview = () => cy.get(HEADING_PREVIEW).find("div > hr");
