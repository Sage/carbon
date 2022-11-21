import { FORM_COMPONENT, FORM_FOOTER_COMPONENT } from "./locators";
// component preview locators
export const formPreview = () => cy.get(FORM_COMPONENT);
export const formFooterComponent = () => cy.get(FORM_FOOTER_COMPONENT);
export const formButtonComponent = () =>
  formFooterComponent().find("div > button");
