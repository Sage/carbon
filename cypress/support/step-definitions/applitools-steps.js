Then('Element displays correctly', () => {
  if (Cypress.env('CYPRESS_APPLITOOLS')) {
    cy.wait(2500);
    cy.eyesCheckWindow();
  }
});
