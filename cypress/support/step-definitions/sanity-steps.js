import { clickAccessebilityTab, reRunAccesibilityTests } from '../helper';
import { violations } from '../../locators/sanity';

Then('{string} component has no violations in Accessibility section', () => {
  clickAccessebilityTab();
  reRunAccesibilityTests();
  violations().invoke('text').then(($text) => {
    const text = $text.split(' ');
    expect(text[0]).to.be.lessThan(Cypress.env('max_violation_value'));
  });
});
