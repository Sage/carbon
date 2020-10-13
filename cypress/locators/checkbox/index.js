import {
  CHECKBOX,
} from './locators';

// component preview locators
export const checkboxRole = () => cy.iFrame(CHECKBOX);
export const checkbox = position => cy.get(CHECKBOX).eq(position);
