import { violations } from '../../locators/accessibility';
import { clickAccessebilityTab, reRunAccesibilityTests } from '../helper';

Then('{string} component has no violations in Accessibility section', () => {
  violations().invoke('text').then(($text) => {
    const text = $text.split(' ');
    expect(text[0]).to.be.lessThan(Cypress.env('max_violation_value'));
  });
});

When('I open Accessibility Tab', () => {
  clickAccessebilityTab();
});

When('I re-run violations tests', () => {
  reRunAccesibilityTests();
});
