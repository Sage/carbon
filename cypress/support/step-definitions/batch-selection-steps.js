import {
  batchSelectionComponent,
  batchSelectionCounter,
  batchSelectionButtons,
} from '../../locators/batch-selection';

Then('Batch selection component is rendered properly', () => {
  batchSelectionComponent().should('have.css', 'align-items', 'center');
  batchSelectionComponent().children().should('have.length', 4);
  batchSelectionCounter().invoke('text').should('contains', '0 selected');
  batchSelectionCounter().should('have.css', 'padding', '10px 15px');
});

Then('Batch selection {int} button is rendered properly with proper {string} icon', (index, icon) => {
  batchSelectionButtons(index).should('have.attr', 'data-element', icon)
    .and('have.css', 'position', 'relative')
    .parent()
    .and('have.css', 'margin', '0px')
    .and('have.css', 'position', 'static')
    .and('have.css', 'padding', '10px');
});

Then('Batch selection component is {word}', (parameter) => {
  batchSelectionComponent().should('have.attr', parameter);
});

Then('Batch selection component selectedCount is set to {string}', (value) => {
  batchSelectionCounter().invoke('text').should('contains', `${value} selected`);
});

Then('Batch selection component colorTheme {string} is set to {string}', (color, value) => {
  if (color === 'dark') {
    batchSelectionComponent().should('have.css', 'background-color', value)
      .and('have.css', 'color', 'rgb(255, 255, 255)');
  } else if (color === 'white') {
    batchSelectionComponent().should('have.css', 'box-shadow', 'rgba(0, 20, 29, 0.2) 0px 5px 5px 0px, rgba(0, 20, 29, 0.1) 0px 10px 10px 0px');
  } else {
    batchSelectionComponent().should('have.css', 'background-color', value);
  }
});

When('I focus Batch selection {int} button', (index) => {
  batchSelectionButtons(index).parent().focus();
});

Then('Batch selection component {int} button is focused', (index) => {
  batchSelectionButtons(index).parent().should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});
