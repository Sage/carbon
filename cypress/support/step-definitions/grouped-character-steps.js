import {
  commonDataElementInputPreviewNoIframe,
} from '../../locators';

When('I put {string} example grouped character', (text) => {
  commonDataElementInputPreviewNoIframe().clear().type(text, { delay: 1000, force: true });
});

Then('example grouped character is {string}', (text) => {
  commonDataElementInputPreviewNoIframe().should('have.value', text);
});

Then('Input component value is set to {string}', (value) => {
  commonDataElementInputPreviewNoIframe().should('have.attr', 'value', value);
});
