import { DROPDOWN_INPUT, DROPDOWN_COMPONENT, DROPDOWN_LABEL } from './locators';

// component preview locators
export const dropdownInputPreview = () => cy.iFrame(DROPDOWN_INPUT);
export const dropdownComponentPreview = () => cy.iFrame(DROPDOWN_COMPONENT);
export const dropdownLabelPreview = () => cy.iFrame(DROPDOWN_LABEL);
