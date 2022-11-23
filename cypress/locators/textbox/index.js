import { TEXTBOX, TEXTBOX_DATA_COMPONENT, TEXTBOX_PREFIX } from "./locators";

// component preview locators
export const textbox = () => cy.get(TEXTBOX);
export const textboxDataComponent = () => cy.get(TEXTBOX_DATA_COMPONENT);
export const textboxPrefix = () => cy.get(TEXTBOX_PREFIX);
export const textboxInput = () => cy.get(TEXTBOX).children();
