import { inlineInput } from '../../locators/inline-inputs';
import { pressTABKey } from '../helper';

Then('{int}{word} inline input on preview is {word}', (number, word, text) => {
  inlineInput(number).then(($el) => {
    expect($el[0].getAttribute('value')).to.equal(text);
  });
});

When('I set {int}{word} inline input to {word}', (number, word, text) => {
  inlineInput(number).then(($el) => {
    $el[0].setAttribute('value', text);
  });
  pressTABKey(1);
});
