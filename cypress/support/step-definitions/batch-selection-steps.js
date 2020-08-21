import {
  batchSelectionComponent,
  batchSelectionCounter,
  batchSelectionButtonsDS,
} from '../../locators/batch-selection';
import { positionOfElement } from '../helper';

Then('Batch selection component is {word}', (parameter) => {
  batchSelectionComponent().should('have.attr', parameter);
});

Then('Batch selection component selectedCount is set to {string}', (value) => {
  batchSelectionCounter().invoke('text').should('contains', `${value} selected`);
});

When('I focus Batch selection {string} button', (index) => {
  batchSelectionButtonsDS(positionOfElement(index)).parent().focus();
});

Then('Batch selection component {string} button is focused', (index) => {
  batchSelectionButtonsDS(positionOfElement(index)).parent().should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});
