When('Element displays correctly', () => {
  cy.eyesCheckWindow({
    sizeMode: 'selector',
    selector: {
      type: 'css',
      selector: '#storybook-preview-iframe'
    }
  });
});


