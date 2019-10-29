import { fieldHelpPreview } from '../../locators';
import { radioButton } from '../../locators/radioButton/index';

const INLINE = 'carbon-radio-button__help-text--inline';
const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;
const THIRD_ELEMENT = 2;

Then('fieldHelpInline is enabled', () => {
  fieldHelpPreview().should('have.class', INLINE);
});

Then('fieldHelpInline is disabled', () => {
  fieldHelpPreview().should('not.have.class', INLINE);
});

When('I click onto {string} radioButton for validations component into iFrame', (position) => {
  switch (position) {
    case 'first':
      radioButton().eq(FIRST_ELEMENT).click();
      break;
    case 'second':
      radioButton().eq(SECOND_ELEMENT).click();
      break;
    case 'third':
      radioButton().eq(THIRD_ELEMENT).click();
      break;
    default: throw new Error('There are only three validation icon elements on the page');
  }
});
