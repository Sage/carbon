import {
  dataComponentButtonByText, title, closeDataElement, backArrow,
} from '../../locators/pages';
import { DEBUG_FLAG } from '..';

Then('My {word} Page is visible', (word) => {
  title().should('have.text', `My ${word} Page`);
});

When('I go to {word} page', (word) => {
  dataComponentButtonByText(`Go to ${word} page`).click();
  cy.wait(500, { log: DEBUG_FLAG }); // wait was added due to changing animation
});

When('I close page', () => {
  closeDataElement().click({ multiple: true });
  cy.wait(500, { log: DEBUG_FLAG }); // wait was added due to changing animation
});

Then('I go back', () => {
  backArrow().click();
  cy.wait(1000, { log: DEBUG_FLAG }); // wait was added due to changing animation
});

Then('other pages except {word} Page are not visible', (word) => {
  switch (word) {
    case 'First':
      title().should('not.have.text', 'My Second Page');
      title().should('not.have.text', 'My Third Page');
      break;
    case 'Second':
      title().should('not.have.text', 'My First Page');
      title().should('not.have.text', 'My Third Page');
      break;
    case 'Third':
      title().should('not.have.text', 'My First Page');
      title().should('not.have.text', 'My Second Page');
      break;
    default: throw new Error(`Unknown page ${word}`);
  }
});

Then('page is closed', () => {
  title().should('not.exist');
});
