import {
  flashPreview, getIconPreview, messageInput, messagePreview, timeoutInput,
} from '../../locators/flash';

const FLASH_PREFIX = 'carbon-flash--';

Then('Flash as is set to {string} and icon is set to {string}', (as, icon) => {
  flashPreview().should('have.class', `${FLASH_PREFIX}${as}`);
  getIconPreview(icon).should('exist');
});

When('I set message property to {string}', (message) => {
  messageInput().clear().type(message);
});

Then('Flash message is set to {string}', (message) => {
  messagePreview().should('have.text', message);
});

When('I set timeout property to {int}', (timeout) => {
  timeoutInput().clear().type(timeout);
});

When('I wait {int}', (timeout) => {
  cy.wait(timeout);
});

Then('Flash is not visible', () => {
  flashPreview().should('not.exist');
});

Then('Flash is visible', () => {
  flashPreview().should('exist');
});
