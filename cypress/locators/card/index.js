import { CARD } from './locators';

// component preview locators
export const card = () => cy.iFrame(CARD).eq(0);
