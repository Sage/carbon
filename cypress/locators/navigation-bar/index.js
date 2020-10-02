import { NAVIGATION_BAR } from './locators';

// component preview locators
export const navigationBarChildren = () => cy.get(NAVIGATION_BAR).children();
