import { TITLE_DATA_ELEMENT, BUTTON_DATA_COMPONENT } from "./locators";

//no iFrame locators
export const titleNoIframe = () => cy.get(TITLE_DATA_ELEMENT);
export const dataComponentButtonByText = text => cy.get(BUTTON_DATA_COMPONENT).contains(text);