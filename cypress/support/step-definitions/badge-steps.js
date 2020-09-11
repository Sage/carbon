import {
  badge,
  badgeCounterNoIFrame, 
  badgeNoIFrame,
} from '../../locators/badge';

Then('Badge component counter is set to {int}', (value) => {
  badgeCounterNoIFrame().invoke('show').should('be.visible').invoke('text')
    .and('contain', value);
});

Then('Badge component counter does not exist', () => {
  badgeNoIFrame().should('not.exist');
});

When('I focus onto Badge component', () => {
  badgeNoIFrame().focus();
});

When('I click onto Badge component', () => {
  badge().click();
});
