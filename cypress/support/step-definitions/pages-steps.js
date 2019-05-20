import { dataComponentButtonByText, titleNoIframe } from '../../locators/pages';

Then('My {word} Page is visible', (word) => {
  titleNoIframe().should('have.text', `My ${word} Page`);
});

Then('My {word} Page is not visible', () => {
  titleNoIframe().should('not.exist');
});

When('I go to {word} page', (word) => {
  dataComponentButtonByText(`Go to ${word} page.`).click();
});

When('I open no iFrame component preview', () => {
  dataComponentButtonByText('Open Preview').click();
});

When('I close page', () => {
  cy.get('[data-element="close"]').click();
});
