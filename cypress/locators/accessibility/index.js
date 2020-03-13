import { FORM } from '../locators';

// Accessibility locators
export const violations = () => cy.get(FORM).find('button[data-index=0]').find('span');
