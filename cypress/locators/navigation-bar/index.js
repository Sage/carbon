import { NAVIGATION_BAR } from './locators';

// component preview locators
export const navigationBarPreview = () => cy.iFrame(NAVIGATION_BAR);
export const navigationBarChildren = () => cy.iFrame(NAVIGATION_BAR).children();
