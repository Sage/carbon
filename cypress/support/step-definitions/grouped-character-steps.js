import { commonDataElementInputPreview } from '../../locators';

When('I put {string} example grouped character', (text) => {
  commonDataElementInputPreview().clear().type(text, { delay: 1000, force: true });
});

Then('example grouped character is {string}', (text) => {
  commonDataElementInputPreview().should('have.value', text);
});
