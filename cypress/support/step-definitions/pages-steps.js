import {
  dataComponentButtonByText, closeDataElement, backArrow,
} from '../../locators/pages';
import { DEBUG_FLAG } from '..';
import { getDataElementByValueIframe } from '../../locators';

Then('My {word} Page is visible', (word) => {
  getDataElementByValueIframe('title').should('have.text', `My ${word} Page`);
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
      getDataElementByValueIframe('title').should('not.have.text', 'My Second Page');
      getDataElementByValueIframe('title').should('not.have.text', 'My Third Page');
      break;
    case 'Second':
      getDataElementByValueIframe('title').should('not.have.text', 'My First Page');
      getDataElementByValueIframe('title').should('not.have.text', 'My Third Page');
      break;
    case 'Third':
      getDataElementByValueIframe('title').should('not.have.text', 'My First Page');
      getDataElementByValueIframe('title').should('not.have.text', 'My Second Page');
      break;
    default: throw new Error(`Unknown page ${word}`);
  }
});

Then('page is closed', () => {
  getDataElementByValueIframe('title').should('not.exist');
});
