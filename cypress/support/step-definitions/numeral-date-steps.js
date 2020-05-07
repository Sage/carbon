import { numeralDateInputByPosition, numeralDateComponent, numeralDateInputByPositionDS } from '../../locators/numeralDate';
import { ERROR_TOOLTIP } from '../../locators/form/locators';
import { positionOfElement } from '../helper';

Then('Number Date component has {int} separate inputs', (index) => {
  for (let i = 0; i < index; ++i) {
    numeralDateInputByPosition(i).should('be.visible');
  }
});

Then('Numeral Date inputs have {string} border color', (color) => {
  const allNumeralDate = 3;
  for (let i = 0; i < allNumeralDate; ++i) {
    numeralDateInputByPosition(i).parent().should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-bottom-color', color)
      .and('have.css', 'border-left-color', color)
      .and('have.css', 'border-right-color', color)
      .and('have.css', 'border-top-color', color);
  }
});

Then('error message for Numeral Date input is {string}', (text) => {
  numeralDateInputByPosition(2).parent().find(ERROR_TOOLTIP).should('have.attr', 'aria-label', text)
    .and('be.visible');
});

Then('error icon is visible in third input', () => {
  numeralDateComponent().find(ERROR_TOOLTIP).should('be.visible');
});

Then('I click on first input', () => {
  numeralDateInputByPositionDS(positionOfElement('first')).click();
});

Then('I type numeral characters {string} in {string} inputs', (text, position) => {
  numeralDateInputByPositionDS(positionOfElement(position)).clear().type(text);
  numeralDateInputByPositionDS(positionOfElement(position)).parent().should('have.css', 'outline-color', 'rgb(255, 181, 0)');
});

Then('{string} numeral input is set to {string}', (position, text) => {
  numeralDateInputByPositionDS(positionOfElement(position)).should('have.value', text);
});

Then('I type no numeral characters {string} in inputs', (text) => {
  numeralDateInputByPositionDS(positionOfElement('first')).clear().type(text);
  numeralDateInputByPositionDS(positionOfElement('second')).clear().type(text);
  numeralDateInputByPositionDS(positionOfElement('third')).clear().type(text);
});

Then('inputs have value {string}', (text) => {
  numeralDateInputByPositionDS(positionOfElement('first')).should('have.value', text);
  numeralDateInputByPositionDS(positionOfElement('second')).should('have.value', text);
  numeralDateInputByPositionDS(positionOfElement('third')).should('have.value', text);
});
