import {
  switchPreview, switchProperties, switchInput, switchDataComponent,
} from '../../locators/switch';
import { label } from '../../locators';

const COMMON_INPUT = 'common-input';
const FIRST_SWITCH = '0';
const SECOND_SWITCH = '1';
const THIRD_SWITCH = '2';

Then('Switch component is set to fieldHelpInline', () => {
  switchProperties().should('have.class', 'carbon-checkbox__help-text--inline');
});

Then('Switch component is not set to fieldHelpInline', () => {
  switchProperties().should('not.have.class', 'carbon-checkbox__help-text--inline');
});

Then('Switch component is set to labelInline', () => {
  label().should('have.class', `${COMMON_INPUT}__label--inline`);
});

Then('Switch component is not set to labelInline', () => {
  label().should('not.have.class', `${COMMON_INPUT}__label--inline`);
});

Then('Switch component is reversed', () => {
  switchPreview().should('have.class', 'carbon-switch__reverse');
});

Then('Switch component is not reversed', () => {
  switchPreview().should('not.have.class', 'carbon-switch__reverse');
});

Then('Switch component is loading', () => {
  switchPreview().should('have.class', `${COMMON_INPUT}--readonly`)
    .and('have.class', `${COMMON_INPUT}--disabled`);
  switchInput().should('have.attr', 'disabled');
  switchInput().should('have.attr', 'readonly');
});

Then('Switch component is not loading', () => {
  switchPreview().should('not.have.class', `${COMMON_INPUT}--readonly`)
    .and('not.have.class', `${COMMON_INPUT}--disabled`);
  switchInput().should('not.have.attr', 'disabled');
  switchInput().should('not.have.attr', 'readonly');
});

Then('I toggle {string} switch {int} times', (position, times) => {
  for (let i = 0; i < times; i++) {
    switch (position) {
      case 'first':
        switchDataComponent(FIRST_SWITCH, times).click();
        break;
      case 'second':
        switchDataComponent(SECOND_SWITCH, times).click();
        break;
      case 'third':
        switchDataComponent(THIRD_SWITCH, times).click();
        break;
      default: throw new Error('There are only three switch elements on the page');
    }
  }
});
