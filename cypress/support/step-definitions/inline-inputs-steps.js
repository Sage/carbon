import { inlineInput } from '../../locators/inline-inputs';
import { pressTABKey } from '../helper';

Then('{int}{word} inline input on preview is {string}', (number, word, text) => {
  inlineInput(number).should('have.value', text);
});

When('I set {int}{word} inline input to {string}', (number, word, text) => {
  inlineInput(number).first().clear().type(text);
  pressTABKey(1);
});
