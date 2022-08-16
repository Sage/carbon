import { GLOBAL_HEADER, GLOBAL_HEADER_LOGO_WRAPPER } from "./locators";

export const globalHeader = () => cy.get(GLOBAL_HEADER);
export const globalHeaderLogo = () =>
  cy.get(GLOBAL_HEADER_LOGO_WRAPPER).children().first();
