import {
  switchLoading, switchInput,
} from '../../locators/switch';

Then('Switch component is loading', () => {
  switchInput().should('have.attr', 'disabled');
  switchLoading().should('have.attr', 'data-component', 'loader');
});

Then('Switch component is not loading', () => {
  switchInput().should('not.have.attr', 'disabled');
});
