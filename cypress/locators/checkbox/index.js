import {
  CHECKBOX, CHECKBOX_DATA_COMPONENT,
} from './locators';

// component preview locators

export const checkboxRole = () => cy.iFrame(CHECKBOX);
export const checkbox = position => cy.get(CHECKBOX).eq(position);
export const checkboxRoleNoIFrame = () => cy.get(CHECKBOX);
export const checkboxDataComponentNoIframe = () => cy.get(CHECKBOX_DATA_COMPONENT);
