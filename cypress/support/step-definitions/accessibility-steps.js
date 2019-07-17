import { violations } from '../../locators/accessibility';
import { clickAccessebilityTab } from '../helper';
import { reRunTestsButton } from '../../locators';

Then('{string} component has no violations in Accessibility section', () => {
  // wait for storybook accessibility tests finished
  reRunTestsButton().should('have.text', 'Rerun tests');
  violations().invoke('text').then(($text) => {
    const text = $text.split(' ');
    expect(text[0]).to.be.at.most(Cypress.env('max_violation_value'));
  });
});

When('I open Accessibility Tab', () => {
  clickAccessebilityTab();
});
