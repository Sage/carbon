import { card } from '../../locators/card';

When('I hover mouse onto Card component', () => {
  card().click('right', { force: true });
  card().trigger('mousemove', { force: true });
});

Then('Card component has non-interactive shadow', () => {
  card().should('not.have.css', 'cursor', 'pointer')
    .and('have.css', 'box-shadow', 'rgba(0, 20, 29, 0.2) 0px 3px 3px 0px, rgba(0, 20, 29, 0.15) 0px 2px 4px 0px');
});

Then('Card component has interactive shadow', () => {
  card().should('have.css', 'cursor', 'pointer')
    .and('have.css', 'box-shadow', 'rgba(0, 20, 29, 0.2) 0px 5px 5px 0px, rgba(0, 20, 29, 0.1) 0px 10px 10px 0px');
});
