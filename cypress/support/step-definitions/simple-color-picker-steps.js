import {
  simpleColorPickerInput,
  simpleColorPickerDiv,
  simpleColorPickerPreview,
  experimentalSimpleColorPickerInput,
} from '../../locators/simple-color-picker';
import { getKnobsInput } from '../../locators';

const FIRST_ELEMENT = 1;
const SECOND_ELEMENT = 2;
const THIRD_ELEMENT = 3;

Then('Simple Color Picker name on preview is set to {string}', (value) => {
  simpleColorPickerInput(FIRST_ELEMENT)
    .should('have.attr', 'name', `${value}`);
  simpleColorPickerInput(SECOND_ELEMENT)
    .should('have.attr', 'name', `${value}`);
  simpleColorPickerInput(THIRD_ELEMENT)
    .should('have.attr', 'name', `${value}`);
});

Then('Simple Color Picker availableColors on preview is set to {string} with rgb {string} parameter', (color, rgb) => {
  const colorArray = color.split(',');
  const rgbArray = rgb.split(';');

  colorArray.forEach((entry) => {
    simpleColorPickerInput(colorArray.indexOf(entry) + 1)
      .should('have.attr', 'value', entry);
    simpleColorPickerDiv(colorArray.indexOf(entry) + 1)
      .should('have.css', 'background-color', rgbArray[colorArray.indexOf(entry)]);
  });
});

Then('Simple Color Picker availableColors on preview is set to {string}', (value) => {
  simpleColorPickerPreview().children()
    .should('have.length', `${value}`);
});

Then('Simple Color Picker {int} element was picked up', (index) => {
  cy.wait(500);
  for (let i = 1; i < index; ++i) {
    simpleColorPickerDiv(i + 1)
      .should('have.attr', 'data-element', 'tick')
      .should('have.attr', 'data-component', 'icon');
  }
});

When('I pick {int} color', (index) => {
  if (index === 1) {
    simpleColorPickerInput(SECOND_ELEMENT).click();
    simpleColorPickerInput(FIRST_ELEMENT).click();
  }
  for (let i = 0; i < index; ++i) {
    simpleColorPickerInput(i + 1).click();
  }
});

When('I pick {int} simple color input', (index) => {
  for (let i = 0; i < index; ++i) {
    experimentalSimpleColorPickerInput(i + 1).click();
  }
});

Then('Experimental Simple Color Picker {int} element was picked up', (index) => {
  experimentalSimpleColorPickerInput(index).should('have.attr', 'aria-checked', 'true');
});

When('I select {int} color', (index) => {
  experimentalSimpleColorPickerInput(index).click();
});

When('I press {word} on the {int} color', (key, index) => {
  switch (key) {
    case 'ArrowDown':
      experimentalSimpleColorPickerInput(index).trigger('keydown', { key: 'ArrowDown', keyCode: 40, which: 40 });
      break;
    case 'ArrowUp':
      experimentalSimpleColorPickerInput(index).trigger('keydown', { key: 'ArrowUp', keyCode: 38, which: 38 });
      break;
    case 'ArrowRight':
      experimentalSimpleColorPickerInput(index).trigger('keydown', { key: 'ArrowRight', keyCode: 39, which: 39 });
      break;
    case 'ArrowLeft':
      experimentalSimpleColorPickerInput(index).trigger('keydown', { key: 'ArrowLeft', keyCode: 37, which: 37 });
      break;
    default: throw new Error('There are only arrow keys allowed');
  }
});

Then('It renders with all colors', () => {
  cy.fixture('simpleColorPicker.json').then(($json) => {
    for (let i = 0; i < $json.length; ++i) {
      experimentalSimpleColorPickerInput(i + 1).should('have.value', $json[i].color);
      experimentalSimpleColorPickerInput(i + 1).should('have.attr', 'aria-label', $json[i].label);
    }
  });
});

When('I input new color json into {string} input field', (inputFieldName) => {
  cy.fixture('simpleColorPickerNew.json').then(($json) => {
    getKnobsInput(inputFieldName).clear({ force: true }).then($selector => $selector.val(JSON.stringify($json)))
      .type(' ');
  });
});

Then('It renders with all new colors', () => {
  cy.fixture('simpleColorPickerNew.json').then(($json) => {
    for (let i = 0; i < $json.length; ++i) {
      experimentalSimpleColorPickerInput(i + 1).should('have.value', $json[i].color);
      experimentalSimpleColorPickerInput(i + 1).should('have.attr', 'aria-label', $json[i].label);
    }
  });
});
