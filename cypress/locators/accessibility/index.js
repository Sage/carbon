import { FORM } from '../locators';

// Accessibility locators
export const violations = () => cy.get(FORM).contains('Violations');
