import { dataComponentButtonByText, title, closeDataElement } from '../../locators/pages';

const OPEN_PREVIEW = 'Open Preview';

Then('My {word} Page is visible', (word) => {
  cy.wait(500); // wait was added due to changing animation
  title().should('have.text', `My ${word} Page`);
});

Then('My {word} Page is not visible', () => {
  cy.wait(500); // wait was added due to changing animation
  title().should('not.exist');
});

When('I go to {word} page', (word) => {
  dataComponentButtonByText(`Go to ${word} page`).click();
});

When('I open no iFrame component preview', () => {
  dataComponentButtonByText(OPEN_PREVIEW).click();
});

When('I close page', () => {
  closeDataElement().click();
});
