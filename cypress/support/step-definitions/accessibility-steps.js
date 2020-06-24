const A11YOptions = {
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a', // WCAG 2.0 & WCAG 2.1 Level A
      'wcag2aa', // WCAG 2.0 & WCAG 2.1 Level AA
      'wcag21a', // WCAG 2.1 Level A
      'wcag21aa', // WCAG 2.1 Level AA
      // 'best-practice', // Best practices endorsed by Deque
    ],
  },
};

Then('{string} component has no accessibility violations', () => {
  cy.injectAxe();
  cy.checkA11y(null, A11YOptions);
});
