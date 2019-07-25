import { SELECT, SELECT_INPUT } from './locators';

// component preview locators
export const select = () => cy.iFrame(SELECT).children().children();
export const selectInput = () => cy.iFrame(SELECT_INPUT);
export const selectPill = () => cy.iFrame(SELECT).children()
  .find('[data-component="pill"]');
