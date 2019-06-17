import { VIOLATIONS } from './locators';

// Accessibility locators
export const violations = () => cy.get(VIOLATIONS)
  .find('div:nth-child(1)')
  .find('div')
  .find('button:nth-child(1)')
  .find('span');
