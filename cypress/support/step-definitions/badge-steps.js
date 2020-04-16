import { badge, badgeCounter } from '../../locators/badge';

Then('Badge component rendered properly', () => {
  badge().should('have.css', 'padding', '0px')
    .and('have.css', 'padding', '0px')
    .and('have.css', 'width', '22px')
    .and('have.css', 'height', '22px')
    .and('have.css', 'border-radius', '50%')
    .and('have.css', 'text-align', 'center')
    .and('have.css', 'margin-top', '0px')
    .and('have.css', 'margin-right', '0px')
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'top', '-11px')
    .and('have.css', 'right', '-11px')
    .and('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box')
    .and('have.css', 'border', '2px solid rgb(0, 128, 93)')
    .and('have.css', 'color', 'rgb(0, 128, 93)');
});

Then('Badge component counter is set to {int}', (value) => {
  badgeCounter().invoke('show').should('be.visible').invoke('text')
    .and('contain', value);
});

Then('Badge component counter does not exist', () => {
  badge().should('not.exist');
});

When('I focus onto Badge component', () => {
  badge().focus();
});

When('I click onto Badge component', () => {
  badge().click();
});
