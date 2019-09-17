import { card } from '../../locators/card';
import { getKnobsInput } from '../../locators';

Then('Card component has {int} padding and {int} margin', (leftRight, topBottom) => {
  card().should('have.css', 'padding', `0px ${leftRight}px`);
  card().children().should('have.css', 'margin', `${topBottom}px 0px`);
});

Then('Card component is interactive', () => {
  card().should('have.css', 'cursor', 'pointer');
});

When('I select card spacing to {string}', (selection) => {
  getKnobsInput('card spacing').select(selection);
});

When('I check interactive card checkbox', () => {
  getKnobsInput('interactive card').scrollIntoView();
  getKnobsInput('interactive card').check();
});
