import applitoolsSettings from '../../../applitools.config';

Then('Element displays correctly', () => {
  applitoolsSettings.testName = cy.state('ctx').test.title;
  applitoolsSettings.batchName = cy.state('ctx').test.parent.title;

  cy.eyesOpen(applitoolsSettings).then(() => {
    cy.eyesCheckWindow().then(() => {
      cy.eyesClose();
    });
  });
});
