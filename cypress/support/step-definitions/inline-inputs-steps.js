import { inlineInput } from '../../locators/inline-inputs';

const TEXT_INPUT_INDEX = 1;
const NUMBER_INPUT_INDEX = 2;

Then('first inline input on preview is {string}', (text) => {
  inlineInput(TEXT_INPUT_INDEX).first().should('have.value', text);
});

Then('second inline input on preview is {string}', (text) => {
  inlineInput(NUMBER_INPUT_INDEX).should('have.value', text);
});

When('I set first inline input to {string}', (text) => {
  inlineInput(TEXT_INPUT_INDEX).first().clear().type(text);
});

When('I set second inline input to {string}', (text) => {
  inlineInput(NUMBER_INPUT_INDEX).clear().type(text);
});
