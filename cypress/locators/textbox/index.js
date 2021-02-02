import { TEXTBOX, TEXTBOX_DATA_COMPONENT, TEXTBOX_PREFIX } from "./locators";

// component preview locators
export const textbox = () => cy.get(TEXTBOX);
export const textboxByPosition = (position) => cy.get(TEXTBOX).eq(position);
export const textboxDataComponent = () => cy.get(TEXTBOX_DATA_COMPONENT);
export const textboxPrefixByPosition = (index) =>
  cy.get(TEXTBOX_PREFIX).eq(index);

export const textboxInIFrame = () => cy.iFrame(TEXTBOX);
export const textboxIcon = () =>
  cy.iFrame(TEXTBOX).find("span").eq(0).children();
export const textboxInput = () => cy.iFrame(TEXTBOX).children();
