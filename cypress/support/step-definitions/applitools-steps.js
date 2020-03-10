Then('Element displays correctly', () => {
  if ( Cypress.env('CYPRESS_APPLITOOLS') ) {
    cy.eyesCheckWindow({
      target: 'region',
      selector: '#storybook-preview-iframe'
    });
  }
});

Then('Element displays correctly in iframe', () => {
  if ( Cypress.env('CYPRESS_APPLITOOLS') ) {
    cy.eyesCheckWindow({
      target: 'region',
      selector: '#story-root'
    });
  }
});

