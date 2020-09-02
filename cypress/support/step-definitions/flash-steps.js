import { flashPreview, messagePreview } from '../../locators/flash';
import { getDataElementByValueIframe } from '../../locators';
import { DEBUG_FLAG } from '..';

Then('Flash as is set to {string} and icon is set to {string}', (as, iconValue) => {
  flashPreview().should('exist');
  getDataElementByValueIframe(iconValue).should('exist');
});

Then('Flash message is set to {string}', (message) => {
  messagePreview().should('have.text', message);
});

When('I wait {int}', (timeout) => {
  cy.wait(timeout, { log: DEBUG_FLAG });
});

Then('Flash is not visible', () => {
  flashPreview().should('not.exist');
});

Then('Flash is visible', () => {
  flashPreview().should('exist');
});
