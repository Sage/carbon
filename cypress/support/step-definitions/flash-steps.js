import { flashPreview, messagePreview } from '../../locators/flash';
import { getDataElementByValue, icon } from '../../locators';

const FLASH_PREFIX = 'icon-';

Then('Flash as is set to {string} and icon is set to {string}', (as, iconValue) => {
  flashPreview().should('exist');
  icon().should('have.class', `${FLASH_PREFIX}${iconValue}`);
  getDataElementByValue(iconValue).should('exist');
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
