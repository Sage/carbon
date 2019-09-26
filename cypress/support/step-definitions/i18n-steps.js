import { i18nPreview } from '../../locators/i18n';
import { DEBUG_FLAG } from '..';

Then('preview text is {string}', (text) => {
  cy.wait(500, { log: DEBUG_FLAG }); // required because component not always refreshed on time
  i18nPreview().should('contain', text);
});

Then('preview text is {string} with {string} tag and {string} id', (text, tag, id) => {
  cy.wait(500, { log: DEBUG_FLAG }); // required because component not always refreshed on time
  i18nPreview().children(`${tag}[id=${id}]`).should('have.text', text);
});
