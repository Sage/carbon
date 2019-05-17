import { inlineInputs } from '../../locators/inline-inputs';

const INPUT_INDEX_1 = 0;
const INPUT_INDEX_2 = 1;

Then('first inline input on preview is {string}', (text) => {
  inlineInputs(INPUT_INDEX_1).should('have.value', text);
});

Then('second inline input on preview is {string}', (text) => {
  inlineInputs(INPUT_INDEX_2).should('have.value', text);
});

When('I set first inline input to {string}', (text) => {
  inlineInputs(INPUT_INDEX_1).clear().type(text);
});

When('I set second inline input to {string}', (text) => {
  inlineInputs(INPUT_INDEX_2).clear().type(text);
});
