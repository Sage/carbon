import { flashPreview, messagePreview, flashButton } from '../../locators/flash';
import { icon } from '../../locators';
import { DEBUG_FLAG } from '..';

When('I wait {int}', (timeout) => {
  cy.wait(timeout, { log: DEBUG_FLAG });
});

Then('Flash is visible', () => {
  flashPreview().should('exist');
});

Then('Flash is set to {word}', (as) => {
  if (as === 'success') {
    icon().should('have.attr', 'data-element', 'tick');
  } else {
    icon().should('have.attr', 'data-element', 'error');
  }
});

Then('Flash message is set to {word}', (message) => {
  messagePreview().should('have.text', message);
});

Then('I open Flash dialog', () => {
  flashButton().click();
});
