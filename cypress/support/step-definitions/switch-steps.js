import {
  switchLoading, switchInput, switchInputByPosition,
} from '../../locators/switch';
import { getDataElementByValue } from '../../locators';
import { positionOfElement } from '../helper';

Then('Switch is disabled', () => {
  getDataElementByValue('label').should('have.attr', 'disabled');
  switchInput().should('be.disabled')
    .and('have.attr', 'disabled');
});

Then('Switch is enabled', () => {
  getDataElementByValue('label').should('not.be.disabled')
    .and('not.have.attr', 'disabled');
  switchInput().should('not.be.disabled')
    .and('not.have.attr', 'disabled');
});

Then('Switch is set to {string}', (size) => {
  if (size === 'small') {
    switchInput().should('have.css', 'width', '60px')
      .and('have.css', 'height', '24px');
  } else if (size === 'large') {
    switchInput().should('have.css', 'width', '78px')
      .and('have.css', 'height', '40px');
  } else {
    throw new Error('Only small or large size can be applied');
  }
});

Then('Switch component is loading', () => {
  switchInput().should('have.attr', 'disabled');
  switchLoading().should('have.attr', 'data-component', 'loader');
});

Then('Switch component is not loading', () => {
  switchInput().should('not.have.attr', 'disabled');
  switchLoading().should('not.have.attr', 'data-component', 'loader');
});

Then('Switch component is reversed', () => {
  switchInputByPosition(positionOfElement('second')).should('have.attr', 'name', 'switch-default');
});

Then('Switch component is not reversed', () => {
  switchInputByPosition(positionOfElement('first')).should('have.attr', 'name', 'switch-default');
});
