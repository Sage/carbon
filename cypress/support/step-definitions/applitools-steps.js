Then('Element displays correctly', () => {
  if (Cypress.env('CYPRESS_APPLITOOLS')) {
    cy.eyesCheckWindow();
  }
});
