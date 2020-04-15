import { commonDataElementInputPreviewNoIframe } from '../../locators';
import { asyncWaitForIcon, positionOfElement } from '../helper';
import { errorMessageNoIframe, inputValidationNoIframe } from '../../locators/validations';

Then('I click onto {string} input for validations component into iFrame', (position) => {
  commonDataElementInputPreviewNoIframe().eq(positionOfElement(position)).click();
});

Then('I wait on async {string} icon', (name) => {
  asyncWaitForIcon(name);
});

Then('I hover mouse onto validated input in iFrame', () => {
  inputValidationNoIframe().trigger('mouseover');
});

Then('Error message for deprecated input is {string}', (text) => {
  errorMessageNoIframe().should('have.text', text);
});
