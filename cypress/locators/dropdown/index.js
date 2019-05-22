import { DROPDOWN_COMPONENT, DROPDOWN_LABEL } from './locators';

// component preview locators
export const dropdownComponentPreview = () => cy.iFrame(DROPDOWN_COMPONENT);
export const dropdownLabelPreview = () => cy.iFrame(DROPDOWN_LABEL);
