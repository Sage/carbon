import {
  stepSequence, stepSequenceElement, stepSequenceItemIndicator, ariaLabel,
} from '../../locators/step-sequence';

const ARIA_LABEL = 'Step 1 of 5';

Then('orientation is set to {string}', (orientation) => {
  stepSequence().should('have.attr', 'orientation', orientation);
  stepSequenceElement().should('have.attr', 'orientation', orientation);
});

Then('indicator {string} is set', (indicator) => {
  cy.wait(100); // required because iframe content is changed
  stepSequenceItemIndicator().should('have.text', indicator);
});

Then('hidden label {string} is set', (hiddenLabel) => {
  ariaLabel(ARIA_LABEL).contains(hiddenLabel).should('have.text', hiddenLabel);
});

Then('ariaLabel {string} is set', (label) => {
  ariaLabel(label).should('exist');
});

Then('children {string} is set', (children) => {
  ariaLabel(ARIA_LABEL).should('have.text', children);
});
