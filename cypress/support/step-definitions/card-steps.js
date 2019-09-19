import { card } from '../../locators/card';
import { getKnobsInput } from '../../locators';

Then('Card component has {int} padding and {int} margin', (leftRight, topBottom) => {
  card().should('have.css', 'padding', `0px ${leftRight}px`);
  card().children().should('have.css', 'margin', `${topBottom}px 0px`);
});

Then('Card component is interactive', () => {
  card().should('have.css', 'cursor', 'pointer');
});

Then('Card component has set width to {string}', (width) => {
  cy.wait(200); // needed to be here due to animation
  card().should('have.css', 'width', `${width}`);
});

Then('Card component has not set width to {string}', (width) => {
  cy.wait(200); // needed to be here due to animation
  card().should('not.have.css', 'width', `${width}`);
});

When('I select card spacing to {string}', (selection) => {
  getKnobsInput('card spacing').select(selection);
});

When('I check interactive card checkbox', () => {
  getKnobsInput('interactive card').check();
});

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
