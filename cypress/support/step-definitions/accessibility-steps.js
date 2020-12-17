const { noPreview } = require('../../locators');

const A11YOptions = {
  runOnly: {
    type: 'tag',
    values: [
      //'wcag2a', // WCAG 2.0 & WCAG 2.1 Level A
      //'wcag2aa', // WCAG 2.0 & WCAG 2.1 Level AA
      'wcag21a', // WCAG 2.1 Level A
      'wcag21aa', // WCAG 2.1 Level AA
      //'best-practice', // Best practices endorsed by Deque
    ]
  },
};

const terminalLog = (violations) => {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )
 
  cy.task('table', violationData)
}

Then('{string} component has no accessibility violations', () => {
  noPreview().wait(1000).should('not.be.visible').then(() => {
    cy.injectAxe().wait(250).then(() => {
      cy.checkA11y(null, A11YOptions, terminalLog);
    })
  });
});
