import { flashPreview, getIconPreview, messagePreview } from '../../locators/flash';

const FLASH_PREFIX = 'carbon-flash--';

Then('Flash as is set to {string} and icon is set to {string}', (as, icon) => {
  flashPreview().should('have.class', `${FLASH_PREFIX}${as}`);
  getIconPreview(icon).should('exist');
});

Then('Flash message is set to {string}', (message) => {
  messagePreview().should('have.text', message);
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
