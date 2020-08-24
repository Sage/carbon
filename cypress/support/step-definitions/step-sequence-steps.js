import {
  stepSequence,
  stepSequenceElement,
  stepSequenceItemIndicator,
  ariaLabel,
} from '../../locators/step-sequence';

const ARIA_LABEL = 'Step 1 of 5';
const INDICATOR = '1';

Then('orientation is set to {string}', (orientation) => {
  stepSequence().should('have.attr', 'orientation', orientation);
  stepSequenceElement().should('have.attr', 'orientation', orientation);
});

Then('indicator is set to {word}', (indicator) => {
  stepSequenceItemIndicator().should('have.text', indicator);
});

Then('hidden label is set to {word}', (hiddenLabel) => {
  ariaLabel(ARIA_LABEL).contains(hiddenLabel).should('have.text', hiddenLabel);
});

Then('ariaLabel is set to {word}', (label) => {
  ariaLabel(label).should('exist');
});

Then('children is set {word}', (children) => {
  ariaLabel(ARIA_LABEL).should('have.text', `${INDICATOR} ${children}`);
});
